/**
 *  Function for trial searching, fetching and listing.
 */

var _patient_loc = null;
var _trialSearchInterval = null;
var _trialSearchMustStop = false;

var _trialBatchSize = 10;		// 25 might be too much for some computers
var _trialNumExpected = 0;
var _trialNumDone = 0;
var _showGoodTrials = true;
var _trialsPerPage = 50;

var _run_id = null;
var _trials = null;


/**
 *  Entry function to trial search (by term)
 */
function searchTrialsByTerm(prob_term, gender, age, remember_term) {
	_trialSearchMustStop = false;
	_initTrialSearch(prob_term, null, gender, age, remember_term);
}

/**
 *  Alternative seacrh function, searching by medical condition
 */
function searchTrialsByCondition(prob_name, gender, age, remember_cond) {
	_trialSearchMustStop = false;
	_initTrialSearch(null, prob_name, gender, age, remember_cond);
}


function cancelTrialSearch() {
	_trialSearchMustStop = true;
	if (_trialSearchInterval) {
		window.clearInterval(_trialSearchInterval);
		_trialSearchInterval = null;
	}
	
	showTrialStatus();
	resetUI();
}

function resetUI() {
	_hideNoTrialsHint();
	_trials = null;
	
	$('#trial_selectors').find('.trial_selector').empty();
	$('#trial_selectors').find('.trial_opt_selector > ul').empty();
	$('#trial_selectors').hide();
	$('#trial_list').empty();
	
	geo_clearAllPins();
	geo_hideMap();
	$('#selected_trial').empty().hide();
	$('#g_map_toggle').hide().find('a').text('Show Map');
}


/**
 *  Kicks off trial search.
 *
 *  "term" takes precedence over "condition", only one is ever being used.
 */
function _initTrialSearch(term, condition, gender, age, remember_input) {
	if (_trialSearchInterval) {
		console.warn('Already searching');
		return;
	}
	
	// reset UI
	resetUI();
	_run_id = null;
	showTrialStatus('Starting...');
	
	// determine term or condition
	var data = {
		'gender': gender,
		'age': age,
		'remember_input': remember_input ? true : false
	};
	var term_or_cond = term ? term : condition;
	data[term ? 'term' : 'cond'] = term_or_cond;
	
	// fire off AJAX call
	$.ajax({
		'url': 'trial_runs',
		'data': data
	})
	.always(function(obj1, status, obj2) {
		if (_trialSearchMustStop) {
			return;
		}
		if ('success' == status) {
			_run_id = obj1;
			if (_trialSearchInterval) {
				window.clearInterval(_trialSearchInterval);
			}
			_trialSearchInterval = window.setInterval(function() { checkTrialStatus(); }, 1000);
		}
		else {
			console.error(obj1, ' -- ', status, ' -- ', obj2);
			showTrialStatus('Error searching for trials: ' + status + ', see console');
		}
	});
	
	// never forget
	if (remember_input) {
		_last_manual_input = term_or_cond;
	}
	
	// locate patient while waiting
	locatePatient();
}


/**
 *  This function obviously tries to locate the patient by the given address.
 */
function locatePatient() {
	var adr = $('#demo_location').val();
	if (!adr) {
		_patient_loc = null;
		return;
	}
	
	// locate (asynchronously)
	geo_locatePatient(adr, function(success, location) {
		if (success) {
			_patient_loc = location;
		}
		else {
			console.warn("Failed to locate the patient");
			_patient_loc = null;
		}
	});
}


/**
 *  This function is called at an interval, checking server side progress until the server signals "done".
 */
function checkTrialStatus() {
	if (!_run_id) {
		return;
	}
	
	$.ajax({
		'url': 'trial_runs/' + _run_id + '/progress'
	})
	.always(function(obj1, status, obj2) {
		if (_trialSearchMustStop) {
			return;
		}
		
		if ('success' == status) {
			
			// the run is done, get results
			if ('done' == obj1) {
				window.clearInterval(_trialSearchInterval);
				_trialSearchInterval = null;
				
				showTrialStatus('Filtering by demographics...');
				_filterTrialsByDemographics(_run_id);
			}
			
			// an error occurred
			else {
				if (obj1 && obj1.length > 5 && obj1.match(/^error/i)) {
					window.clearInterval(_trialSearchInterval);
					_trialSearchInterval = null;
				}
				
				showTrialStatus(obj1);
			}
		}
		else {
			console.error(obj1, status, obj2);
			showTrialStatus('Error checking trial status, see console');
			window.clearInterval(_trialSearchInterval);
			_trialSearchInterval = null;
		}
	});
}

function _filterTrialsByDemographics(run_id) {
	loadJSON(
		'trial_runs/' + run_id + '/filter/demographics',
		function(obj1, status, obj2) {
			showTrialStatus('Filtering by problem list...');
			_filterTrialsByProblems(run_id);
		},
		function(obj1, status, obj2) {
			showTrialStatus('Error filtering trials (demographics), see browser console');
		}
	);
}

function _filterTrialsByProblems(run_id) {
	loadJSON(
		'trial_runs/' + run_id + '/filter/problems',
		function(obj1, status, obj2) {
			loadTrialOverview(run_id);
		},
		function(obj1, status, obj2) {
			showTrialStatus('Error filtering trials (problems), see browser console');
		}
	);
}


function loadTrialOverview(run_id) {
	loadJSON(
		'trial_runs/' + run_id + '/overview',
		function(obj1, status, obj2) {
			if ('intervention_types' in obj1 && 'drug_phases' in obj1) {
				_showInterventionTypes(obj1['intervention_types']);
				_showTrialPhases(obj1['drug_phases']);
				
				// show UI
				showTrialStatus();
				$('#trial_selectors').show();
				$('#trials').show();
			}
			else {
				console.error('Malformed response:', obj1)
			}
		},
		function(obj1, status, obj2) {
			showTrialStatus('Error retrieving overview data, see browser console');
		}
	);
}



function _loadTrials(trial_tuples) {
	if (!trial_tuples || trial_tuples.length < 1) {
		showTrialStatus("There are no such trials");
		return;
	}
	
	showTrialStatus("Loading " + trial_tuples.length + " trial" + (1 == trial_tuples.length ? "" : "s") + "...");
	$('#g_map_toggle').show();
	
	_trialNumExpected = trial_tuples.length;
	_trialNumDone = 0;
	_showGoodTrials = true;
	
	// batch the trials
	var batch = {};
	var batches = [];
	
	var num_good = 0;
	var num_bad = 0;
	
	for (var i = 0; i < trial_tuples.length; i++) {
		var tpl = trial_tuples[i];
		var nct = tpl[0];
		var reason = null;
		if (tpl.length > 1) {
			reason = tpl[1];
			if (reason) {
				num_bad++;
			}
		}
		else {
			num_good++;
		}
		
		// manage the batch
		batch[nct] = reason;
		if (0 == (i + 1) % _trialBatchSize || i == trial_tuples.length - 1) {
			batches.push(batch);
			batch = {};
		}
	}
	
	// add the trial type selector
	if (num_bad > 0) {
		var opt_goodbad = $('#selector_goodbad');
		var good_trials = _getOptRadioElement('Potential Trials', num_good + ' of ' + trial_tuples.length, true);
		good_trials.data('is-good', true);
		opt_goodbad.append(good_trials);
		
		var bad_trials = _getOptRadioElement('Ineligible Trials', num_bad + ' of ' + trial_tuples.length, false);
		bad_trials.data('is-good', false);
		opt_goodbad.append(bad_trials);
	}
	
	// fire off!
	_loadTrialBatchContinuing(batches, -1, []);
}


/**
 *  Fetches the given batch of studies, does all the magic and calls itself until all batches have been loaded
 */
function _loadTrialBatchContinuing(batches, previous, intervention_types, drug_phases) {
	var current = previous + 1;
	if (!batches || current >= batches.length) {
		console.warn("We should have stopped, there's no batch number " + current + " in these batches: ", batches);
		return;
	}
	if (_trialSearchMustStop) {
		return;
	}
	
	if (!intervention_types) {
		intervention_types = [];
	}
	if (!drug_phases) {
		drug_phases = [];
	}
	if (!_trials) {
		_trials = [];
	}
	
	var batch = batches[current];
	var ncts = [];
	for (var nct in batch) {
		ncts.push(nct);
	}
	
	// fetch
	$.ajax({
		'url': 'trials/' + ncts.join(':'),
		'dataType': 'json',
		'context': {'reasons': batch}
	})
	.always(function(obj1, status, obj2) {
		if (_trialSearchMustStop) {
			return;
		}
		var cont = true;
		
		// got trials
		if ('success' == status) {
			var type_arr = [];
			var status_every = Math.max(5, Math.round(_trialNumExpected / 25));
			
			// loop trials
			var trials = 'trials' in obj1 ? obj1.trials : [];
			for (var i = 0; i < trials.length; i++) {
				
				// update status
				_trialNumDone++;
				if (_trialNumDone >= _trialNumExpected) {
					cont = false;
					showTrialStatus();
				}
				else if (0 == _trialNumDone % status_every) {
					var percent = Math.round(_trialNumDone / _trialNumExpected * 100);
					showTrialStatus("Loading (" + percent + "%)");
				}
				
				// trial
				var trial = new Trial(trials[i]);
				trial.reason = this.reasons[trial.nct];
				
				// pull out intervention types and phases
				intervention_types = intervention_types.concat(trial.interventionTypes());
				drug_phases = drug_phases.concat(trial.trialPhases());
				
				_trials.push(trial);
			}
		}
		
		// error, make sure the counter is still accurate and log a warning
		else {
			_trialNumDone += this.reasons.length;
			if (_trialNumDone >= _trialNumExpected) {
				showTrialStatus();
			}
			console.error("Failed loading NCTs:", ncts.join(', '), "obj1:", obj1, "obj2:", obj2);
		}
		
		// finish or fetch next
		if (cont) {
			_loadTrialBatchContinuing(batches, current, intervention_types, drug_phases);
		}
		else {
			_didLoadTrialBatches(batches, intervention_types, drug_phases);
		}
	});
}


/**
 *  Called when the last batch has been loaded.
 *
 *  Note that intervention_types and drug_phases possibly contains many duplicates.
 */
function _didLoadTrialBatches(batches, intervention_types, drug_phases) {
	_showNoTrialsHint();
	
	// add all intervention types and phases
	// _showInterventionTypes(intervention_types);
	// _showTrialPhases(drug_phases);
	
	// show UI
	$('#trial_selectors').show();
	$('#trials').show();
	_geocodeTrials(_patient_loc);
	
	// only a couple of trials? Show them!
	if (_trials && _trials.length <= 15) {
		$('#selector_inv_type > li').each(function(i, elem) {
			$(elem).addClass('active').find('input[type="checkbox"]').prop('checked', true);
		});
	}
	
	updateShownHiddenTrials();
	showTrialStatus();
}


function _showInterventionTypes(num_per_type) {
	if (num_per_type) {
		var opt_type = $('#selector_inv_type');
		var itypes = sortedKeysFromDict(num_per_type);
		
		for (var i = 0; i < itypes.length; i++) {
			var type = itypes[i];
			var elem = _getOptCheckElement(type, 0, false);
			elem.data('intervention-type', type);
			opt_type.append(elem);
			
			// number of trials
			elem.find('.num_matches').text(num_per_type[type]);
		}
		
		// sort types alphabetically
		sortChildren(opt_type, 'li', function(a, b) {
			return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
		});
	}
}

function _showTrialPhases(num_per_phase) {
	if (num_per_phase) {
		var opt_phase = $('#selector_inv_phase');
		var phases = sortedKeysFromDict(num_per_phase);
		
		for (var i = 0; i < phases.length; i++) {
			var phase = phases[i];
			var elem = _getOptCheckElement(phase, 0, true);
			elem.data('phase', phase);
			opt_phase.append(elem);
			
			// number of trials
			elem.find('.num_matches').text(num_per_phase[phase]);
		}
		
		// sort phases alphabetically
		sortChildren(opt_phase, 'li', function(a, b) {
			return $(a).text().toLowerCase().localeCompare($(b).text().toLowerCase());
		});
	}
}


function _geocodeTrials(to_location) {
	Trial.geocode(_trials, to_location);
	
	// now order them by distance
	_trials.sort(function(a, b) {
		return a.closest - b.closest;
	});
}


function _getOptRadioElement(main, accessory, active) {
	var elem = $('<li/>', {'href': 'javascript:void(0)'});
	var uuid = newUUID();
	var input = $('<input/>', {'id': uuid, 'type': 'radio', 'name': 'ugly_hack'});
	input.change(_toggleShowGoodTrials);
	
	elem.append(input);
	elem.append($('<label/>', {'for': uuid}).text(main));
	elem.append($('<span/>').addClass('num_matches').text(accessory));
	
	if (active) {
		elem.addClass('active');
		input.attr('checked', true);
	}
	
	return elem;
}

function _getOptCheckElement(main, accessory, active) {
	var elem = $('<li/>', {'href': 'javascript:void(0)'});
	var uuid = newUUID();
	var input = $('<input/>', {'id': uuid, 'type': 'checkbox'});
	elem.append(input);
	elem.append($('<label/>', {'for': uuid}).text(main));
	elem.append($('<span/>').addClass('num_matches').text(accessory));
	
	input.change(_toggleOptCheckElement);
	
	if (active) {
		elem.addClass('active');
		input.attr('checked', true);
	}
	
	return elem;
}



function _toggleShowGoodTrials(evt) {
	_showGoodTrials = !_showGoodTrials;
	updateShownHiddenTrials();
}


function _toggleOptCheckElement(evt) {
	var elem = $(this).parent();
	
	// toggle class by input checked status
	if (elem.find('input').prop('checked')) {
		elem.addClass('active');
	}
	else {
		elem.removeClass('active');
	}
	
	updateShownHiddenTrials();
}


function _toggleKeyword(elem) {
	var keyword = $(elem).text();
	var norm = _normalizeKeyword(keyword);
	var for_nct = $(elem).parent().data('trial-nct');
	var offset = $(elem).offset().top;
	var scroll_top = $(window).scrollTop();
	
	// determine if it's already present
	var parent = $('#selector_keywords');
	var present = false;
	var num = 0;
	parent.children('span').each(function(idx) {
		if (norm == $(this).data('normalized')) {
			present = true;
			$(this).remove();
		}
		else {
			num++;
		}
	});
	
	// add keyword
	if (!present) {
		var span = $('<span/>').addClass('tag').addClass('active')
		.data('normalized', norm).text(keyword)
		.click(function(e) {
			_toggleKeyword(this);
		});
		parent.append(span).parent().show();
	}
	else if (0 == num) {
		parent.parent().hide();
	}
	
	updateShownHiddenTrials();
	
	// restore scroll position (element has been removed from DOM and replaced!)
	if (offset > 0) {
		offset -= 144;			// TODO: figure out why this is necessary (not correct for 2+ tags)
		
		var new_elem = null;
		$('#trial_list').children().each(function(idx) {
			var trial = $(this).find('.trial').data('trial');
			if (trial && trial.nct == for_nct) {
				new_elem = $(this);
				return false;
			}
		});
		
		if (new_elem) {
			var new_top = new_elem.offset().top - (offset - scroll_top);
			$(window).scrollTop(new_top);
		}
	}
}

function _normalizeKeyword(keyword) {
	return keyword ? keyword.toLowerCase() : null;
}


/**
 *  Loops all trials and shows or hides according to our globals.
 */
function updateShownHiddenTrials() {
	if (!_run_id) {
		showTrialStatus("I have lost track of our run, please search again");
		return;
	}
	
	// clean up pins
	geo_clearAllPins();
	$('#selected_trial').empty().hide();
	
	var qry_parts = [];
	
	// get active intervention types
	var active_types = [];
	$('#selector_inv_type').children('li').each(function(idx, item) {
		var elem = $(item);
		if (elem.hasClass('active')) {
			active_types.push(elem.data('intervention-type'));
		}
	});
	if (active_types.length > 0) {
		qry_parts.push('intv=' + active_types.join('|'));
	}
	
	// get active phases
	var active_phases = [];
	$('#selector_inv_phase').children('li').each(function(idx, item) {
		var elem = $(item);
		if (elem.hasClass('active')) {
			active_phases.push(elem.data('phase'));
		}
	});
	if (active_phases.length > 0) {
		qry_parts.push('phases=' + active_phases.join('|'));
	}
	
	// get active keywords
	var active_keywords = [];
	$('#selector_keywords').children('span').each(function(idx, item) {
		active_keywords.push($(item).data('normalized'));
	});
	if (active_keywords.length > 0) {
		qry_parts.push('keywords=' + active_keywords.join('|'));
	}
	
	var qry = (qry_parts.length > 0) ? qry_parts.join('&') : '';
	
	// TODO: locally caching all trials (webSQL?) would be neat
	loadJSON(
		'trial_runs/' + _run_id + '/trials?' + qry,
		function(obj1, status, obj2) {
			_showTrials(obj1, 0);
			window.setTimeout(geo_zoomToPins, 100);
		},
		function(obj1, status, obj2) {
			
		}
	);
}


/**
 *  Shows the given trials, up to _trialsPerPage, from the given start position.
 */
function _showTrials(trials, start) {
	var trial_list = $('#trial_list');
	if (!start || 0 == start) {
		trial_list.empty();
	}
	$('#show_more_trials').remove();
	
	// no trials to show
	if (!trials || 0 == trials.length || start >= trials.length) {
		if (trials.length > 0 && start >= trials.length) {
			console.warn('Cannot show trials starting at: ', start, 'trials: ', trials);
		}
		
		if (!trials || 0 == trials.length) {
			$('#g_map_toggle > span').text('');
			_showNoTrialsHint();
		}
		
		return;
	}
	
	var map = $('#g_map');
	
	// get active keywords
	var active_keywords = [];
	$('#selector_keywords').children('span').each(function(idx, item) {
		active_keywords.push($(item).data('normalized'));
	});
	
	// calculate range
	var show_max = start + _trialsPerPage;
	if (trials.length > show_max && trials.length < start + _trialsPerPage + (_trialsPerPage / 10)) {
		// if it's less than 10% more, show them all
		show_max = trials.length + start;
	}
	var has_more = false;
	var num_locations = 0;
	
	for (var i = start; i < trials.length; i++) {
		var trial = new Trial(trials[i]);
		num_locations += trial.showPins(map, false);
		
		// add the trial element to the list
		if (i < show_max) {
			var li = $('<li/>').append(can.view('templates/trial_item.ejs', {'trial': trial, 'active_keywords': active_keywords}));
			trial_list.append(li);
			trial.showClosestLocations(li, 0, 3);
		}
		else {
			has_more = true;
		}
	}
	
	$('#g_map_toggle > span').text(num_locations > 1000 ? ' (' + num_locations + ' trial locations)' : '');
	_hideNoTrialsHint();
	
	// are there more?
	if (has_more) {
		var more = trials.length - show_max;
		var li = $('<li/>', {'id': 'show_more_trials'}).append('<h1>There are ' + more + ' more trials</h1>');
		var link = $('<a/>', {'href': 'javascript:void(0);'}).text('Show ' + ((_trialsPerPage < more) ? _trialsPerPage + ' more' : 'all'))
		.click(function(e) {
			_showTrials(trials, start + _trialsPerPage);
		});
		
		li.append($('<h1/>').append(link));
		trial_list.append(li);
	}
}



/**
 *  Toggles the trial map
 */
function toggleTrialMap() {
	var map = $('#g_map');
	
	// hide
	if (map.is(':visible')) {
		var link_offset = $('#g_map_toggle').offset().top - $(window).scrollTop();
		geo_hideMap();
		$('#g_map_toggle > a').text('Show Map');
		$('#selected_trial').empty().hide();
		
		// scroll in place
		var new_offset = $('#g_map_toggle').offset().top - $(window).scrollTop();
		if (Math.abs(link_offset - new_offset) > 50) {
			$(window).scrollTop(Math.max(0, $('#g_map_toggle').offset().top - link_offset));
		}
	}
	
	// show
	else {
		geo_showMap();
		// map.append('<div id="g_map_loading">Loading...</div>');
		$('#g_map_toggle > a').text('Hide Map');
		
		// pins
		window.setTimeout(function() {
			for (var i = 0; i < _trials.length; i++) {
				_trials[i].showPins(map, false);
			}
			geo_zoomToPins();
		}, 200);
	}
}


/**
 *  May be called with multiple pins (if they are all clustered).
 */
function showTrialsforPins(pins) {
	if (1 == pins.length) {
		geo_highlightPin(pins[0]);
	}
	
	var map_offset = $('#g_map').offset().top - $(window).scrollTop();
	var area = $('#selected_trial').empty().show();
	
	// show all trials corresponding to the pins
	for (var i = 0; i < pins.length; i++) {
		var pin = pins[i];
		
		var li = $('<li/>').append(can.view('templates/trial_item.ejs', {'trial': pin.trial}));
		li.append('<a class="dismiss_link" href="javascript:void(0);" onclick="dismissShownTrial(this)">dismiss</a>');
		area.append(li);
		
		// and show the location
		pin.trial.showLocation(li, pin.location);
	}
	
	// scroll the map back
	var new_offset = $('#g_map').offset().top - $(window).scrollTop();
	if (Math.abs(new_offset - map_offset) > 50) {
		$(window).scrollTop(Math.max(200, $('#g_map').offset().top - map_offset));
	}
}

function dismissShownTrial(link) {
	var elem = $(link).closest('li').slideUp('fast', function() {
		$(this).remove();
		
		var area = $('#selected_trial');
		if (0 == area.find('li').length) {
			area.hide();
		}
	});
	geo_unhighlightPin();
}


/**
 *  Display the current trial loading status (or hide it if status is null)
 */
function showTrialStatus(status) {
	var stat = $('#trial_status');
	if (!status) {
		stat.hide();
		return;
	}
	
	stat.show().text(status);
}



function _showNoTrialsHint() {
	var hint = $('#no_trials_hint');
	if (!hint.is('*')) {
		hint = $('<h3/>', {'id': 'no_trials_hint'});
	}
	
	// check if at least one study type has been selected
	var has_type = false;
	$('#selector_inv_type').children('li').each(function(idx, item) {
		if ($(item).find('input').prop('checked')) {
			has_type = true;
			return false;
		}
	});
	
	// if there is a type, make sure we have selected at least one phase
	if (has_type) {
		var has_phase = false;
		if ($('#').is(':visible')) {
			$('#selector_inv_phase').children('li').each(function(idx, item) {
				if ($(item).find('input').prop('checked')) {
					has_phase = true;
					return false;
				}
			});
		}
		
		if (!has_phase) {
			hint.text("Please select at least one trial phase");
		}
		else {
			hint.text("It seems no trials match your criteria");
		}
	}
	else {
		hint.text("Please select at least one intervention or observation");
	}
	$('#trials').append(hint);
}

function _hideNoTrialsHint() {
	$('#no_trials_hint').remove();
}


