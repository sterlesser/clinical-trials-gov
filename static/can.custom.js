/*!
 * CanJS - 1.1.6
 * http://canjs.us/
 * Copyright (c) 2013 Bitovi
 * Tue, 06 Aug 2013 17:56:12 GMT
 * Licensed MIT
 * Includes: can/construct/construct.js,can/observe/observe.js,can/observe/compute/compute.js,can/model/model.js,can/view/view.js,can/view/ejs/ejs.js,can/control/control.js
 * Download from: http://bitbuilder.herokuapp.com/can.custom.js?configuration=jquery&minify=true&plugins=can%2Fconstruct%2Fconstruct.js&plugins=can%2Fobserve%2Fobserve.js&plugins=can%2Fobserve%2Fcompute%2Fcompute.js&plugins=can%2Fmodel%2Fmodel.js&plugins=can%2Fview%2Fview.js&plugins=can%2Fview%2Fejs%2Fejs.js&plugins=can%2Fcontrol%2Fcontrol.js
 */
(function(undefined){var __m5=function(){var t=window.can||{};("undefined"==typeof GLOBALCAN||GLOBALCAN!==!1)&&(window.can=t),t.isDeferred=function(t){var e=this.isFunction;return t&&e(t.then)&&e(t.pipe)};var e=0;return t.cid=function(t,n){return t._cid?t._cid:t._cid=(n||"")+ ++e},t.VERSION="@EDGE",t}(),__m6=function(t){return t.each=function(t,e,n){var r,i=0;if(t)if("number"==typeof t.length&&t.pop)for(t.attr&&t.attr("length"),r=t.length;r>i&&e.call(n||t[i],t[i],i,t)!==!1;i++);else if(t.hasOwnProperty)for(r in t)if(t.hasOwnProperty(r)&&e.call(n||t[r],t[r],r,t)===!1)break;return t},t}(__m5),__m3=function(t,e){t.extend(e,t,{trigger:function(e,n,r){e.trigger?e.trigger(n,r):t.event.trigger(n,r,e,!0)},addEvent:function(e,n){return t([this]).bind(e,n),this},removeEvent:function(e,n){return t([this]).unbind(e,n),this},buildFragment:function(e,n){var r,i=t.buildFragment;return e=[e],n=n||document,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,r=i.call(jQuery,e,n),r.cacheable?t.clone(r.fragment):r.fragment||r},$:t,each:e.each}),t.each(["bind","unbind","undelegate","delegate"],function(n,r){e[r]=function(){var e=this[r]?this:t([this]);return e[r].apply(e,arguments),this}}),t.each(["append","filter","addClass","remove","data","get"],function(t,n){e[n]=function(t){return t[n].apply(t,e.makeArray(arguments).slice(1))}});var n=t.cleanData;return t.cleanData=function(r){t.each(r,function(t,n){n&&e.trigger(n,"destroyed",[],!1)}),n(r)},e}(jQuery,__m5,__m6),__m2=function(t){var e=/_|-/,n=/\=\=/,r=/([A-Z]+)([A-Z][a-z])/g,i=/([a-z\d])([A-Z])/g,a=/([a-z\d])([A-Z])/g,s=/\{([^\}]+)\}/g,o=/"/g,u=/'/g,c=function(t,e,n){var r=t[e];return r===undefined&&n===!0&&(r=t[e]={}),r},f=function(t){return/^f|^o/.test(typeof t)};return t.extend(t,{esc:function(t){var e=null===t||t===undefined||isNaN(t)&&"NaN"==""+t;return(""+(e?"":t)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(o,"&#34;").replace(u,"&#39;")},getObject:function(e,n,r){var i,a,s,o,u=e?e.split("."):[],h=u.length,l=0;if(n=t.isArray(n)?n:[n||window],o=n.length,!h)return n[0];for(l;o>l;l++){for(i=n[l],s=undefined,a=0;h>a&&f(i);a++)s=i,i=c(s,u[a]);if(s!==undefined&&i!==undefined)break}if(r===!1&&i!==undefined&&delete s[u[a-1]],r===!0&&i===undefined)for(i=n[0],a=0;h>a&&f(i);a++)i=c(i,u[a],!0);return i},capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},underscore:function(t){return t.replace(n,"/").replace(r,"$1_$2").replace(i,"$1_$2").replace(a,"_").toLowerCase()},sub:function(e,n,r){var i=[];return e=e||"",i.push(e.replace(s,function(e,a){var s=t.getObject(a,n,r===!0?!1:undefined);return s===undefined?(i=null,""):f(s)&&i?(i.push(s),""):""+s})),null===i?i:1>=i.length?i[0]:i},replacer:s,undHash:e}),t}(__m3),__m1=function(t){var e=0;return t.Construct=function(){return arguments.length?t.Construct.extend.apply(t.Construct,arguments):undefined},t.extend(t.Construct,{newInstance:function(){var t,e=this.instance();return e.setup&&(t=e.setup.apply(e,arguments)),e.init&&e.init.apply(e,t||arguments),e},_inherit:function(e,n,r){t.extend(r||e,e||{})},_overwrite:function(t,e,n,r){t[n]=r},setup:function(e){this.defaults=t.extend(!0,{},e.defaults,this.defaults)},instance:function(){e=1;var t=new this;return e=0,t},extend:function(n,r,i){function a(){return e?undefined:this.constructor!==a&&arguments.length?arguments.callee.extend.apply(arguments.callee,arguments):this.constructor.newInstance.apply(this.constructor,arguments)}"string"!=typeof n&&(i=r,r=n,n=null),i||(i=r,r=null),i=i||{};var s,o,u,c,f=this,h=this.prototype;c=this.instance(),t.Construct._inherit(i,h,c);for(s in f)f.hasOwnProperty(s)&&(a[s]=f[s]);if(t.Construct._inherit(r,f,a),n){var l=n.split("."),o=l.pop(),d=t.getObject(l.join("."),window,!0),u=d,p=t.underscore(n.replace(/\./g,"_")),g=t.underscore(o);d[o]=a}t.extend(a,{constructor:a,prototype:c,namespace:u,_shortName:g,fullName:n,_fullName:p}),o!==undefined&&(a.shortName=o),a.prototype.constructor=a;var _=[f].concat(t.makeArray(arguments)),v=a.setup.apply(a,_);return a.init&&a.init.apply(a,v||_),a}}),t.Construct}(__m2),__m8=function(t){return t.bindAndSetup=function(){return t.addEvent.apply(this,arguments),this._init||(this._bindings?this._bindings++:(this._bindings=1,this._bindsetup&&this._bindsetup())),this},t.unbindAndTeardown=function(){return t.removeEvent.apply(this,arguments),this._bindings--,this._bindings||this._bindteardown&&this._bindteardown(),this},t}(__m3),__m7=function(t){var e=function(e){return e&&!t.isDeferred(e)&&(t.isArray(e)||t.isPlainObject(e)||e instanceof t.Observe)},n=function(e,n){return t.each(e,function(t){t&&t.unbind&&t.unbind("change"+n)})},r=function(e,r,s,o,u){return o=o||a,u=u||a.List,e instanceof a?s._bindings&&n([e],s._cid):e=t.isArray(e)?new u(e):new o(e),s._bindings&&i(e,r,s),e},i=function(e,n,r){e.bind("change"+r._cid,function(){var i=t.makeArray(arguments),a=i.shift();i[0]=("*"===n?[r.indexOf(e),i[0]]:[n,i[0]]).join("."),a.triggeredNS=a.triggeredNS||{},a.triggeredNS[r._cid]||(a.triggeredNS[r._cid]=!0,t.trigger(r,a,i))})};observeId=0,serialize=function(n,r,i){return n.each(function(n,a){i[a]=e(n)&&t.isFunction(n[r])?n[r]():n}),i},attrParts=function(e,n){return n?[e]:t.isArray(e)?e:(""+e).split(".")},batchNum=1,transactions=0,batchEvents=[],stopCallbacks=[],makeBindSetup=function(t){return function(){var e=this;this._each(function(n,r){n&&n.bind&&i(n,t||r,e)})}};var a=t.Map=t.Observe=t.Construct({bind:t.bindAndSetup,unbind:t.unbindAndTeardown,id:"id",canMakeObserve:e,startBatch:function(t){transactions++,t&&stopCallbacks.push(t)},stopBatch:function(e,n){if(e?transactions=0:transactions--,0==transactions){var r=batchEvents.slice(0),i=stopCallbacks.slice(0);batchEvents=[],stopCallbacks=[],batchNum++,n&&this.startBatch(),t.each(r,function(e){t.trigger.apply(t,e)}),t.each(i,function(t){t()})}},triggerBatch:function(e,n,r){if(!e._init){if(0==transactions)return t.trigger(e,n,r);n="string"==typeof n?{type:n}:n,n.batchNum=batchNum,batchEvents.push([e,n,r])}},keys:function(t){var e=[];a.__reading&&a.__reading(t,"__keys");for(var n in t._data)e.push(n);return e}},{setup:function(e){this._data={},t.cid(this,".observe"),this._init=1,this.attr(e),this.bind("change"+this._cid,t.proxy(this._changes,this)),delete this._init},_bindsetup:makeBindSetup(),_bindteardown:function(){var t=this._cid;this._each(function(e){n([e],t)})},_changes:function(t,e,n,r,i){a.triggerBatch(this,{type:e,batchNum:t.batchNum},[r,i])},_triggerChange:function(){a.triggerBatch(this,"change",t.makeArray(arguments))},_each:function(t){var e=this.__get();for(var n in e)e.hasOwnProperty(n)&&t(e[n],n)},attr:function(t,e){var n=typeof t;return"string"!==n&&"number"!==n?this._attrs(t,e):1===arguments.length?(a.__reading&&a.__reading(this,t),this._get(t)):(this._set(t,e),this)},each:function(){return a.__reading&&a.__reading(this,"__keys"),t.each.apply(undefined,[this.__get()].concat(t.makeArray(arguments)))},removeAttr:function(e){var n=this instanceof t.Observe.List,r=attrParts(e),i=r.shift(),s=n?this[i]:this._data[i];return r.length?s.removeAttr(r):(n?this.splice(i,1):i in this._data&&(delete this._data[i],i in this.constructor.prototype||delete this[i],a.triggerBatch(this,"__keys"),this._triggerChange(i,"remove",undefined,s)),s)},_get:function(t){var e="string"==typeof t&&!!~t.indexOf(".")&&this.__get(t);if(e)return e;var n=attrParts(t),r=this.__get(n.shift());return n.length?r?r._get(n):undefined:r},__get:function(t){return t?this._data[t]:this._data},_set:function(t,n,r){var i=attrParts(t,r),a=i.shift(),s=this.__get(a);if(e(s)&&i.length)s._set(i,n);else{if(i.length)throw"can.Observe: Object does not exist";this.__convert&&(n=this.__convert(a,n)),this.__set(a,n,s)}},__set:function(t,i,s){if(i!==s){var o=this.__get().hasOwnProperty(t)?"set":"add";this.___set(t,e(i)?r(i,t,this):i),"add"==o&&a.triggerBatch(this,"__keys",undefined),this._triggerChange(t,o,i,s),s&&n([s],this._cid)}},___set:function(t,e){this._data[t]=e,t in this.constructor.prototype||(this[t]=e)},bind:t.bindAndSetup,unbind:t.unbindAndTeardown,serialize:function(){return serialize(this,"serialize",{})},_attrs:function(n,r){if(n===undefined)return serialize(this,"attr",{});n=t.extend({},n);var i,s,o=this;a.startBatch(),this.each(function(i,a){return s=n[a],s===undefined?(r&&o.removeAttr(a),undefined):(o.__convert&&(s=o.__convert(a,s)),s instanceof t.Observe?o.__set(a,s,i):e(i)&&e(s)&&i.attr?i.attr(s,r):i!=s&&o.__set(a,s,i),delete n[a],undefined)});for(var i in n)s=n[i],this._set(i,s,!0);return a.stopBatch(),this},compute:function(e){return t.compute(this,e)}}),s=[].splice,o=a({setup:function(e,n){this.length=0,t.cid(this,".observe"),this._init=1,t.isDeferred(e)?this.replace(e):this.push.apply(this,t.makeArray(e||[])),this.bind("change"+this._cid,t.proxy(this._changes,this)),t.extend(this,n),delete this._init},_triggerChange:function(t,e,n,r){a.prototype._triggerChange.apply(this,arguments),~t.indexOf(".")||("add"===e?(a.triggerBatch(this,e,[n,+t]),a.triggerBatch(this,"length",[this.length])):"remove"===e?(a.triggerBatch(this,e,[r,+t]),a.triggerBatch(this,"length",[this.length])):a.triggerBatch(this,e,[n,+t]))},__get:function(t){return t?this[t]:this},___set:function(t,e){this[t]=e,+t>=this.length&&(this.length=+t+1)},_each:function(t){for(var e=this.__get(),n=0;e.length>n;n++)t(e[n],n)},_bindsetup:makeBindSetup("*"),serialize:function(){return serialize(this,"serialize",[])},splice:function(i,a){var o,u=t.makeArray(arguments);for(o=2;u.length>o;o++){var c=u[o];e(c)&&(u[o]=r(c,"*",this,this.constructor.Observe,this.constructor))}a===undefined&&(a=u[1]=this.length-i);var f=s.apply(this,u);return t.Observe.startBatch(),a>0&&(this._triggerChange(""+i,"remove",undefined,f),n(f,this._cid)),u.length>2&&this._triggerChange(""+i,"add",u.slice(2),f),t.Observe.stopBatch(),f},_attrs:function(e,n){return e===undefined?serialize(this,"attr",[]):(e=t.makeArray(e),a.startBatch(),this._updateAttrs(e,n),a.stopBatch(),undefined)},_updateAttrs:function(t,n){for(var r=Math.min(t.length,this.length),i=0;r>i;i++){var a=this[i],s=t[i];e(a)&&e(s)?a.attr(s,n):a!=s&&this._set(i,s)}t.length>this.length?this.push.apply(this,t.slice(this.length)):t.length<this.length&&n&&this.splice(t.length)}}),u=function(e){return e[0]&&t.isArray(e[0])?e[0]:t.makeArray(e)};return t.each({push:"length",unshift:0},function(t,n){var i=[][n];o.prototype[n]=function(){var n,a,s=[],o=t?this.length:0,u=arguments.length;for(this.constructor;u--;)a=arguments[u],s[u]=e(a)?r(a,"*",this,this.constructor.Observe,this.constructor):a;return n=i.apply(this,s),(!this.comparator||s.length)&&this._triggerChange(""+o,"add",s,undefined),n}}),t.each({pop:"length",shift:0},function(t,e){o.prototype[e]=function(){var n=u(arguments),r=t&&this.length?this.length-1:0,i=[][e].apply(this,n);return this._triggerChange(""+r,"remove",undefined,[i]),i&&i.unbind&&i.unbind("change"+this._cid),i}}),t.extend(o.prototype,{indexOf:function(e){return this.attr("length"),t.inArray(e,this)},join:[].join,reverse:[].reverse,slice:function(){var t=Array.prototype.slice.apply(this,arguments);return new this.constructor(t)},concat:function(){var e=[];return t.each(t.makeArray(arguments),function(n,r){e[r]=n instanceof t.Observe.List?n.serialize():n}),new this.constructor(Array.prototype.concat.apply(this.serialize(),e))},forEach:function(e,n){t.each(this,e,n||this)},replace:function(e){return t.isDeferred(e)?e.then(t.proxy(this.replace,this)):this.splice.apply(this,[0,this.length].concat(t.makeArray(e||[]))),this}}),t.List=a.List=o,a.setup=function(){t.Construct.setup.apply(this,arguments),this.List=a.List({Observe:this},{})},a}(__m3,__m8,__m1),__m9=function(t){var e=function(e,n){var r;t.Observe&&(r=t.Observe.__reading,t.Observe.__reading=function(t,e){i.push({obj:t,attr:e+""})});var i=[],a=e.call(n);return t.Observe&&(t.Observe.__reading=r),{value:a,observed:i}},n=function(n,r,i,a){var s,o={},u=!0,c={value:undefined,teardown:function(){for(var t in o){var e=o[t];e.observe.obj.unbind(e.observe.attr,f),delete o[t]}}},f=function(t){if(!(a&&!a.bound||t.batchNum!==undefined&&t.batchNum===s)){var e=c.value,n=h();c.value=n,n!==e&&i(n,e),s=s=t.batchNum}},h=function(){var i=e(n,r),a=i.observed,s=i.value;u=!u,t.each(a,function(t){o[t.obj._cid+"|"+t.attr]?o[t.obj._cid+"|"+t.attr].matched=u:(o[t.obj._cid+"|"+t.attr]={matched:u,observe:t},t.obj.bind(t.attr,f))});for(var c in o){var h=o[c];h.matched!==u&&(h.observe.obj.unbind(h.observe.attr,f),delete o[c])}return s};return c.value=h(),c.isListening=!t.isEmptyObject(o),c};return t.compute=function(r,i,a){if(r&&r.isComputed)return r;var s,o,u,c={bound:!1,hasDependencies:!1},f=function(){},h=function(){},l=function(){return u},d=function(t){u=t},p=!0;if(o=function(e){if(arguments.length){var n=u,r=d.call(i,e,n);return o.hasDependencies?l.call(i):(u=r===undefined?l.call(i):r,n!==u&&t.Observe.triggerBatch(o,"change",[u,n]),u)}return t.Observe.__reading&&p&&t.Observe.__reading(o,"change"),c.bound?u:l.call(i)},"function"==typeof r)d=r,l=r,p=a===!1?!1:!0,o.hasDependencies=!1,f=function(t){s=n(r,i||this,t,c),o.hasDependencies=s.isListening,u=s.value},h=function(){s&&s.teardown()};else if(i)if("string"==typeof i){var g=i,_=r instanceof t.Observe;_&&(o.hasDependencies=!0),l=function(){return _?r.attr(g):r[g]},d=function(t){_?r.attr(g,t):r[g]=t};var v;f=function(n){v=function(){n(l(),u)},t.bind.call(r,a||g,v),u=e(l).value},h=function(){t.unbind.call(r,a||g,v)}}else if("function"==typeof i)u=r,d=i;else{u=r;var m=i;l=m.get||l,d=m.set||d,f=m.on||f,h=m.off||h}else u=r;o.isComputed=!0,t.cid(o,"compute");var b=function(e,n){u=e,t.Observe.triggerBatch(o,"change",[e,n])};return t.extend(o,{_bindsetup:function(){c.bound=!0,f.call(this,b)},_bindteardown:function(){h.call(this,b),c.bound=!1},bind:t.bindAndSetup,unbind:t.unbindAndTeardown})},t.compute.binder=n,t.compute}(__m3,__m8),__m10=function(t){var e=function(e,n,r){var i=new t.Deferred;return e.then(function(){var e=t.makeArray(arguments);e[0]=n[r](e[0]),i.resolveWith(i,e)},function(){i.rejectWith(this,arguments)}),"function"==typeof e.abort&&(i.abort=function(){return e.abort()}),i},n=0,r=function(e){return t.Observe.__reading&&t.Observe.__reading(e,e.constructor.id),e.__get(e.constructor.id)},i=function(e,n,r,i,a,s){var o={};if("string"==typeof e){var u=e.split(/\s+/);o.url=u.pop(),u.length&&(o.type=u.pop())}else t.extend(o,e);return o.data="object"!=typeof n||t.isArray(n)?n:t.extend(o.data||{},n),o.url=t.sub(o.url,o.data,!0),t.ajax(t.extend({type:r||"post",dataType:i||"json",success:a,error:s},o))},a=function(e,n,i,a,s){var o;t.isArray(e)?(o=e[1],e=e[0]):o=e.serialize(),o=[o];var u,c,f=e.constructor;return"destroy"==n&&o.shift(),"create"!==n&&o.unshift(r(e)),c=f[n].apply(f,o),u=c.pipe(function(t){return e[s||n+"d"](t,c),e}),c.abort&&(u.abort=function(){c.abort()}),u.then(i,a),u},s={create:{url:"_shortName",type:"post"},update:{data:function(e,n){n=n||{};var r=this.id;return n[r]&&n[r]!==e&&(n["new"+t.capitalize(e)]=n[r],delete n[r]),n[r]=e,n},type:"put"},destroy:{type:"delete",data:function(t){var e={};return e.id=e[this.id]=t,e}},findAll:{url:"_shortName"},findOne:{}},o=function(t,e){return function(n){return n=t.data?t.data.apply(this,arguments):n,i(e||this[t.url||"_url"],n,t.type||"get")}};t.Model=t.Observe({fullName:"can.Model",_reqs:0,setup:function(e){if(this.store={},t.Observe.setup.apply(this,arguments),t.Model){this.List=u({Observe:this},{});var r=this,i=t.proxy(this._clean,r);t.each(s,function(n,a){if(t.isFunction(r[a])||(r[a]=o(n,r[a])),r["make"+t.capitalize(a)]){var s=r["make"+t.capitalize(a)](r[a]);t.Construct._overwrite(r,e,a,function(){t.Model._reqs++;var e=s.apply(this,arguments),n=e.then(i,i);return n.abort=e.abort,n})}}),"can.Model"!=r.fullName&&r.fullName||(r.fullName="Model"+ ++n),t.Model._reqs=0,this._url=this._shortName+"/{"+this.id+"}"}},_ajax:o,_makeRequest:a,_clean:function(){if(t.Model._reqs--,!t.Model._reqs)for(var e in this.store)this.store[e]._bindings||delete this.store[e];return arguments[0]},models:function(e,n){if(t.Model._reqs++,e){if(e instanceof this.List)return e;var r=this,i=[],a=n instanceof t.Observe.List?n:new(r.List||u),s=t.isArray(e),o=e instanceof u,c=s?e:o?e.serialize():e.data;return a.length&&a.splice(0),t.each(c,function(t){i.push(r.model(t))}),a.push.apply(a,i),s||t.each(e,function(t,e){"data"!==e&&a.attr(e,t)}),setTimeout(t.proxy(this._clean,this),1),a}},model:function(e){if(e){e instanceof this&&(e=e.serialize());var n=e[this.id],r=(n||0===n)&&this.store[n]?this.store[n].attr(e,this.removeAttr||!1):new this(e);return t.Model._reqs&&(this.store[e[this.id]]=r),r}}},{isNew:function(){var t=r(this);return!(t||0===t)},save:function(t,e){return a(this,this.isNew()?"create":"update",t,e)},destroy:function(e,n){if(this.isNew()){var r=this,i=t.Deferred();return i.then(e,n),i.done(function(t){r.destroyed(t)}).resolve(r)}return a(this,"destroy",e,n,"destroyed")},_bindsetup:function(){return this.constructor.store[this.__get(this.constructor.id)]=this,t.Observe.prototype._bindsetup.apply(this,arguments)},_bindteardown:function(){return delete this.constructor.store[r(this)],t.Observe.prototype._bindteardown.apply(this,arguments)},___set:function(e,n){t.Observe.prototype.___set.call(this,e,n),e===this.constructor.id&&this._bindings&&(this.constructor.store[r(this)]=this)}}),t.each({makeFindAll:"models",makeFindOne:"model",makeCreate:"model",makeUpdate:"model"},function(n,r){t.Model[r]=function(r){return function(){var i=t.makeArray(arguments),a=t.isFunction(i[1])?i.splice(0,1):i.splice(0,2),s=e(r.apply(this,a),this,n);return s.then(i[0],i[1]),s}}}),t.each(["created","updated","destroyed"],function(e){t.Model.prototype[e]=function(n){var r,i=this.constructor;r=n&&"object"==typeof n&&this.attr(n.attr?n.attr():n),t.trigger(this,"change",e),t.trigger(i,e,this)}});var u=t.Model.List=t.Observe.List({setup:function(e){t.isPlainObject(e)&&!t.isArray(e)?(t.Observe.List.prototype.setup.apply(this),this.replace(this.constructor.Observe.findAll(e))):t.Observe.List.prototype.setup.apply(this,arguments)},_changes:function(e,n){if(t.Observe.List.prototype._changes.apply(this,arguments),/\w+\.destroyed/.test(n)){var r=this.indexOf(e.target);-1!=r&&this.splice(r,1)}}});return t.Model}(__m3,__m7),__m11=function(t){var e=t.isFunction,n=t.makeArray,r=1,i=t.view=t.template=function(n,r,a,s){e(a)&&(s=a,a=undefined);var o=function(t){return i.frag(t)},u=e(s)?function(t){s(o(t))}:null,c=i.render(n,r,a,u),f=t.Deferred();return e(c)?c:t.isDeferred(c)?(c.then(function(t,e){f.resolve.call(f,o(t),e)},function(){f.fail.apply(f,arguments)}),f):o(c)};t.extend(i,{frag:function(t,e){return i.hookup(i.fragment(t),e)},fragment:function(e){var n=t.buildFragment(e,document.body);return n.childNodes.length||n.appendChild(document.createTextNode("")),n},toId:function(e){return t.map((""+e).split(/\/|\./g),function(t){return t?t:undefined}).join("_")},hookup:function(e,n){var r,a,s=[];return t.each(e.childNodes?t.makeArray(e.childNodes):e,function(e){1===e.nodeType&&(s.push(e),s.push.apply(s,t.makeArray(e.getElementsByTagName("*"))))}),t.each(s,function(t){t.getAttribute&&(r=t.getAttribute("data-view-id"))&&(a=i.hookups[r])&&(a(t,n,r),delete i.hookups[r],t.removeAttribute("data-view-id"))}),e},hookups:{},hook:function(t){return i.hookups[++r]=t," data-view-id='"+r+"'"},cached:{},cachedRenderers:{},cache:!0,register:function(t){this.types["."+t.suffix]=t},types:{},ext:".ejs",registerScript:function(){},preload:function(){},render:function(r,a,c,f){e(c)&&(f=c,c=undefined);var h=o(a);if(h.length){var l=new t.Deferred,d=t.extend({},a);return h.push(s(r,!0)),t.when.apply(t,h).then(function(e){var r,i=n(arguments),s=i.pop();if(t.isDeferred(a))d=u(e);else for(var o in a)t.isDeferred(a[o])&&(d[o]=u(i.shift()));r=s(d,c),l.resolve(r,d),f&&f(r,d)},function(){l.reject.apply(l,arguments)}),l}var p,g=e(f),l=s(r,g);if(g)p=l,l.then(function(t){f(a?t(a,c):t)});else{if("resolved"===l.state()&&l.__view_id){var _=i.cachedRenderers[l.__view_id];return a?_(a,c):_}l.then(function(t){p=a?t(a,c):t})}return p},registerView:function(e,n,r,a){var s=(r||i.types[i.ext]).renderer(e,n);return a=a||new t.Deferred,i.cache&&(i.cached[e]=a,a.__view_id=e,i.cachedRenderers[e]=s),a.resolve(s)}});var a=function(t,e){if(!t.length)throw"can.view: No template or empty template:"+e},s=function(e,n){var r,s,o,u=e.match(/\.[\w\d]+$/);if(e.match(/^#/)&&(e=e.substr(1)),(s=document.getElementById(e))&&(u="."+s.type.match(/\/(x\-)?(.+)/)[2]),u||i.cached[e]||(e+=u=i.ext),t.isArray(u)&&(u=u[0]),o=i.toId(e),e.match(/^\/\//)){var c=e.substr(2);e=window.steal?steal.config().root.mapJoin(""+steal.id(c)):c}if(r=i.types[u],i.cached[o])return i.cached[o];if(s)return i.registerView(o,s.innerHTML,r);var f=new t.Deferred;return t.ajax({async:n,url:e,dataType:"text",error:function(t){a("",e),f.reject(t)},success:function(t){a(t,e),i.registerView(o,t,r,f)}}),f},o=function(e){var n=[];if(t.isDeferred(e))return[e];for(var r in e)t.isDeferred(e[r])&&n.push(e[r]);return n},u=function(e){return t.isArray(e)&&"success"===e[1]?e[0]:e};return window.steal&&steal.type("view js",function(t,e){var n=i.types["."+t.type],r=i.toId(t.id);t.text="steal('"+(n.plugin||"can/view/"+t.type)+"',function(can){return "+"can.view.preload('"+r+"',"+t.text+");\n})",e()}),t.extend(i,{register:function(e){this.types["."+e.suffix]=e,window.steal&&steal.type(e.suffix+" view js",function(t,e){var n=i.types["."+t.type],r=i.toId(t.id+"");t.text=n.script(r,t.text),e()}),i[e.suffix]=function(n,r){if(!r){var a=function(){return i.frag(a.render.apply(this,arguments))};return a.render=function(){var t=e.renderer(null,n);return t.apply(t,arguments)},a}return i.preload(n,e.renderer(n,r)),t.view(n)}},registerScript:function(t,e,n){return"can.view.preload('"+e+"',"+i.types["."+t].script(e,n)+");"},preload:function(e,n){function r(){return i.frag(n.apply(this,arguments))}return i.cached[e]=(new t.Deferred).resolve(function(t,e){return n.call(t,t,e)}),r.render=n,r}}),t}(__m3),__m14=function(){var t={tagToContentPropMap:{option:"textContent"in document.createElement("option")?"textContent":"innerText",textarea:"value"},attrMap:{"class":"className",value:"value",innerText:"innerText",textContent:"textContent",checked:!0,disabled:!0,readonly:!0,required:!0},defaultValue:["input","textarea"],tagMap:{"":"span",table:"tbody",tr:"td",ol:"li",ul:"li",tbody:"tr",thead:"tr",tfoot:"tr",select:"option",optgroup:"option"},reverseTagMap:{tr:"tbody",option:"select",td:"tr",th:"tr",li:"ul"},getParentNode:function(t,e){return e&&11===t.parentNode.nodeType?e:t.parentNode},setAttr:function(e,n,r){var i=(""+e.nodeName).toLowerCase(),a=t.attrMap[n];a===!0?e[n]=!0:a?(e[a]=r,"value"===a&&can.inArray(i,t.defaultValue)>=0&&(e.defaultValue=r)):e.setAttribute(n,r)},getAttr:function(e,n){return(t.attrMap[n]&&e[t.attrMap[n]]?e[t.attrMap[n]]:e.getAttribute(n))||""},removeAttr:function(e,n){t.attrMap[n]===!0?e[n]=!1:e.removeAttribute(n)},contentText:function(t){return"string"==typeof t?t:t||0===t?""+t:""}};return t}(),__m13=function(can,elements){var newLine=/(\r|\n)+/g,clean=function(t){return t.split("\\").join("\\\\").split("\n").join("\\n").split('"').join('\\"').split("	").join("\\t")},getTag=function(t,e,n){if(t)return t;for(;e.length>n;){if("<"==e[n]&&elements.reverseTagMap[e[n+1]])return elements.reverseTagMap[e[n+1]];n++}return""},bracketNum=function(t){return--t.split("{").length- --t.split("}").length},myEval=function(script){eval(script)},attrReg=/([^\s]+)[\s]*=[\s]*$/,startTxt="var ___v1ew = [];",finishTxt="return ___v1ew.join('')",put_cmd="___v1ew.push(",insert_cmd=put_cmd,htmlTag=null,quote=null,beforeQuote=null,rescan=null,status=function(){return quote?"'"+beforeQuote.match(attrReg)[1]+"'":htmlTag?1:0};return can.view.Scanner=Scanner=function(t){can.extend(this,{text:{},tokens:[]},t),this.tokenReg=[],this.tokenSimple={"<":"<",">":">",'"':'"',"'":"'"},this.tokenComplex=[],this.tokenMap={};for(var e,n=0;e=this.tokens[n];n++)e[2]?(this.tokenReg.push(e[2]),this.tokenComplex.push({abbr:e[1],re:RegExp(e[2]),rescan:e[3]})):(this.tokenReg.push(e[1]),this.tokenSimple[e[1]]=e[0]),this.tokenMap[e[0]]=e[1];this.tokenReg=RegExp("("+this.tokenReg.slice(0).concat(["<",">",'"',"'"]).join("|")+")","g")},Scanner.prototype={helpers:[{name:/\s*\(([\$\w]+)\)\s*->([^\n]*)/,fn:function(t){var e=/\s*\(([\$\w]+)\)\s*->([^\n]*)/,n=t.match(e);return"can.proxy(function(__){var "+n[1]+"=can.$(__);"+n[2]+"}, this);"}}],scan:function(t,e){var n=[],r=0,i=this.tokenSimple,a=this.tokenComplex;t=t.replace(newLine,"\n"),this.transform&&(t=this.transform(t)),t.replace(this.tokenReg,function(e,s){var o=arguments[arguments.length-2];if(o>r&&n.push(t.substring(r,o)),i[e])n.push(e);else for(var u,c=0;u=a[c];c++)if(u.re.test(e)){n.push(u.abbr),u.rescan&&n.push(u.rescan(s));break}r=o+s.length}),t.length>r&&n.push(t.substr(r));var s,o,u,c="",f=[startTxt+(this.text.start||"")],h=function(t,e){f.push(put_cmd,'"',clean(t),'"'+(e||"")+");")},l=[],d=null,p=!1,g="",_=[],v=!1,m=0,b=this.tokenMap;for(htmlTag=quote=beforeQuote=null;(u=n[m++])!==undefined;){if(null===d)switch(u){case b.left:case b.escapeLeft:case b.returnLeft:p=htmlTag&&1;case b.commentLeft:d=u,c.length&&h(c),c="";break;case b.escapeFull:p=htmlTag&&1,rescan=1,d=b.escapeLeft,c.length&&h(c),rescan=n[m++],c=rescan.content||rescan,rescan.before&&h(rescan.before),n.splice(m,0,b.right);break;case b.commentFull:break;case b.templateLeft:c+=b.left;break;case"<":0!==n[m].indexOf("!--")&&(htmlTag=1,p=0),c+=u;break;case">":htmlTag=0;var y="/"==c.substr(c.length-1)||"--"==c.substr(c.length-2);p||!v&&elements.tagToContentPropMap[_[_.length-1]]?(y?h(c.substr(0,c.length-1),',can.view.pending(),"/>"'):h(c,',can.view.pending(),">"'),c="",p=0):c+=u,(y||v)&&(_.pop(),g=_[_.length-1],v=!1);break;case"'":case'"':htmlTag&&(quote&&quote===u?quote=null:null===quote&&(quote=u,beforeQuote=s));default:"<"===s&&(g=u.split(/\s/)[0],0===g.indexOf("/")&&_[_.length-1]===g.substr(1)?(g=_[_.length-1],v=!0):_.push(g)),c+=u}else switch(u){case b.right:case b.returnRight:switch(d){case b.left:o=bracketNum(c),1==o?(f.push(insert_cmd,"can.view.txt(0,'"+getTag(g,n,m)+"',"+status()+",this,function(){",startTxt,c),l.push({before:"",after:finishTxt+"}));\n"})):(r=l.length&&-1==o?l.pop():{after:";"},r.before&&f.push(r.before),f.push(c,";",r.after));break;case b.escapeLeft:case b.returnLeft:o=bracketNum(c),o&&l.push({before:finishTxt,after:"}));"});for(var x=d===b.escapeLeft?1:0,w={insert:insert_cmd,tagName:getTag(g,n,m),status:status()},k=0;this.helpers.length>k;k++){var A=this.helpers[k];if(A.name.test(c)){c=A.fn(c,w),A.name.source==/^>[\s]*\w*/.source&&(x=0);break}}"object"==typeof c?c.raw&&f.push(c.raw):f.push(insert_cmd,"can.view.txt("+x+",'"+g+"',"+status()+",this,function(){ "+(this.text.escape||"")+"return ",c,o?startTxt:"}));"),rescan&&rescan.after&&rescan.after.length&&(h(rescan.after.length),rescan=null)}d=null,c="";break;case b.templateLeft:c+=b.left;break;default:c+=u}s=u}c.length&&h(c),f.push(";");var O=f.join(""),N={out:"with(_VIEW) { with (_CONTEXT) {"+O+" "+finishTxt+"}}"};return myEval.call(N,"this.fn = (function(_CONTEXT,_VIEW){"+N.out+"});\r\n//@ sourceURL="+e+".js"),N}},Scanner}(__m11,__m14),__m17=function(t){var e=!0;try{document.createTextNode("")._=0}catch(n){e=!1}var r={},i={},a={},s="ejs_"+Math.random(),o=0,u=function(t){if(e||3!==t.nodeType)return t[s]?t[s]:t[s]=(t.nodeName?"element_":"obj_")+ ++o;for(var n in i)if(i[n]===t)return n;return i["text_"+ ++o]=t,"text_"+o},c=function(e,n){var i=r[u(e)];if(i){var a=t.inArray(n,i);a>=0&&i.splice(a,1),i.length||delete r[u(e)]}},f=function(t,e){var n=r[u(t)];n||(n=r[u(t)]=[]),n.push(e)},h={id:u,replace:function(e,n){e=t.makeArray(e);var i=e[0];t.each(t.makeArray(r[u(i)]),function(r){var s=a[r],o=t.inArray(i,s),u=t.inArray(e[e.length-1],s);if(o>=0&&u>=0){for(var l=o;u>=l;l++){var d=s[l];c(d,r)}s.splice.apply(s,[o,u-o+1].concat(n)),t.each(n,function(t){f(t,r)})}else h.unregister(s)})},register:function(e){var n=u(e);a[n]=e,t.each(e,function(t){f(t,n)})},unregister:function(e){var n=u(e);t.each(e,function(t){c(t,n)}),delete a[n]},nodeMap:r,nodeListMap:a};return h}(__m3),__m16=function(t,e,n,r){var i=function(e,n,r){var i=function(){r(a),t.unbind.call(e,"destroyed",i)},a={teardownCheck:function(t){t||i()}};return t.bind.call(e,"destroyed",i),n(a),a},a=function(t,e,n){return i(t,function(){e.bind("change",n)},function(t){e.unbind("change",n),t.nodeList&&r.unregister(t.nodeList)})},s=function(t){return(t||"").replace(/['"]/g,"").split("=")};insertElementsAfter=function(t,e){var n=t[t.length-1];n.nextSibling?n.parentNode.insertBefore(e,n.nextSibling):n.parentNode.appendChild(e)};var o={nodeLists:r,list:function(n,a,s,o,u){var c=[],f=function(e,n,i){var a=document.createDocumentFragment(),f=[];if(t.each(n,function(e){var n=s.call(o,e),r=t.view.frag(n,u);f.push(t.makeArray(r.childNodes)),a.appendChild(r)}),c[i]){var h=c[i][0];h.parentNode.insertBefore(a,h)}else insertElementsAfter(0==i?[l]:c[i-1],a);t.each(f,function(t){r.register(t)}),[].splice.apply(c,[i,0].concat(f))},h=function(e,n,i){var a=c.splice(i,n.length),s=[];t.each(a,function(t){[].push.apply(s,t),r.replace(t,[]),r.unregister(t)}),t.remove(t.$(s))},u=e.getParentNode(n,u),l=document.createTextNode("");i(u,function(){a.bind("add",f).bind("remove",h)},function(){a.unbind("add",f).unbind("remove",h),t.each(c,function(t){r.unregister(t)})}),insertElementsAfter([n],l),t.remove(t.$(n)),f({},a,0)},html:function(n,i,s){var o,s=e.getParentNode(n,s),u=a(s,i,function(t,e){var n=o[0].parentNode;n&&c(e),u.teardownCheck(o[0].parentNode)}),c=function(e){var i=t.view.frag(e,s),a=t.makeArray(i.childNodes);if(insertElementsAfter(o||[n],i),o){var c=t.makeArray(o);r.replace(o,a),t.remove(t.$(c))}else t.remove(t.$(n)),o=a,u.nodeList=o,r.register(o)};c(i(),[n])},text:function(t,n,r){var i=e.getParentNode(t,r),s=a(t.parentNode!==i?t.parentNode:i,n,function(t,e){"unknown"!=typeof o.nodeValue&&(o.nodeValue=""+e),s.teardownCheck(o.parentNode)}),o=document.createTextNode(n());t.parentNode!==i?(i=t.parentNode,i.insertBefore(o,t),i.removeChild(t)):(i.insertBefore(o,t),i.removeChild(t))},attributes:function(t,n,r){var i=function(n){var r=s(n),i=r.shift();i!=o&&o&&e.removeAttr(t,o),i&&(e.setAttr(t,i,r.join("=")),o=i)};if(a(t,n,function(t,e){i(e)}),arguments.length>=3)var o=s(r)[0];else i(n())},attributePlaceholder:"__!!__",attributeReplace:/__!!__/g,attribute:function(n,r,i){a(n,i,function(){e.setAttr(n,r,c.render())});var s,u=t.$(n);s=t.data(u,"hooks"),s||t.data(u,"hooks",s={});var c,f=e.getAttr(n,r),h=f.split(o.attributePlaceholder),l=[];l.push(h.shift(),h.join(o.attributePlaceholder)),s[r]?s[r].computes.push(i):s[r]={render:function(){var t=0,n=f?f.replace(o.attributeReplace,function(){return e.contentText(c.computes[t++]())}):e.contentText(c.computes[t++]());return n},computes:[i],batchNum:undefined},c=s[r],l.splice(1,0,i()),e.setAttr(n,r,l.join(""))}};return o}(__m3,__m14,__m11,__m17),__m15=function(t,e,n){var r=[],i=function(t){var n=e.tagMap[t]||"span";return"span"===n?"@@!!@@":"<"+n+">"+i(n)+"</"+n+">"},a=function(e,n){if("string"==typeof e)return e;if(!e&&0!==e)return"";var i=e.hookup&&function(t,n){e.hookup.call(e,t,n)}||"function"==typeof e&&e;return i?n?"<"+n+" "+t.view.hook(i)+"></"+n+">":(r.push(i),""):""+e},s=function(e){return"string"==typeof e||"number"==typeof e?t.esc(e):a(e)};return t.extend(t.view,{live:n,setupLists:function(){var e,n=t.view.lists;return t.view.lists=function(t,n){e={list:t,renderer:n}},function(){return t.view.lists=n,e}},pending:function(){var e=r.slice(0);return lastHookups=e,r=[],t.view.hook(function(n){t.each(e,function(t){t(n)})})},txt:function(o,u,c,f,h){var l=t.view.setupLists(),d=function(){},p=function(){g.unbind("change",d)},g=t.compute(h,f,!1);g.bind("change",d);var _=e.tagMap[u]||"span",v=l(),m=g();if(v)return"<"+_+t.view.hook(function(t,e){n.list(t,v.list,v.renderer,f,e)})+"></"+_+">";if(!g.hasDependencies)return p(),(o||0!==c?s:a)(m,0===c&&_);var b=e.tagToContentPropMap[u];if(0!==c||b){if(1===c)return r.push(function(t){n.attributes(t,g,g()),p()}),g();var y=0===c?b:c;return(0===c?lastHookups:r).push(function(t){n.attribute(t,y,g),p()
}),n.attributePlaceholder}return"<"+_+t.view.hook(o?function(t,e){n.text(t,g,e),p()}:function(t,e){n.html(t,g,e),p()})+">"+i(_)+"</"+_+">"}}),t}(__m11,__m14,__m16,__m2),__m12=function(t){var e=t.extend,n=function(t){if(this.constructor!=n){var r=new n(t);return function(t,e){return r.render(t,e)}}return"function"==typeof t?(this.template={fn:t},undefined):(e(this,t),this.template=this.scanner.scan(this.text,this.name),undefined)};return t.EJS=n,n.prototype.render=function(t,e){return t=t||{},this.template.fn.call(t,t,new n.Helpers(t,e||{}))},e(n.prototype,{scanner:new t.view.Scanner({tokens:[["templateLeft","<%%"],["templateRight","%>"],["returnLeft","<%=="],["escapeLeft","<%="],["commentLeft","<%#"],["left","<%"],["right","%>"],["returnRight","%>"]],transform:function(t){return t.replace(/<%([\s\S]+?)%>/gm,function(t,e){var n,r,i=[];e.replace(/[{}]/gm,function(t,e){i.push([t,e])});do for(n=!1,r=i.length-2;r>=0;r--)if("{"==i[r][0]&&"}"==i[r+1][0]){i.splice(r,2),n=!0;break}while(n);if(i.length>=2){var a,s=["<%"],o=0;for(r=0;a=i[r];r++)s.push(e.substring(o,o=a[1])),"{"==a[0]&&i.length-1>r||"}"==a[0]&&r>0?s.push("{"==a[0]?"{ %><% ":" %><% }"):s.push(a[0]),++o;return s.push(e.substring(o),"%>"),s.join("")}return"<%"+e+"%>"})}})}),n.Helpers=function(t,n){this._data=t,this._extras=n,e(this,n)},n.Helpers.prototype={list:function(e,n){t.each(e,function(t,r){n(t,r,e)})},each:function(e,n){t.isArray(e)?this.list(e,n):t.view.lists(e,n)}},t.view.register({suffix:"ejs",script:function(t,e){return"can.EJS(function(_CONTEXT,_VIEW) { "+new n({text:e,name:t}).template.out+" })"},renderer:function(t,e){return n({text:e,name:t})}}),t}(__m3,__m11,__m2,__m9,__m13,__m15),__m18=function(t){var e,n=function(e,n,r){return t.bind.call(e,n,r),function(){t.unbind.call(e,n,r)}},r=t.isFunction,i=t.extend,a=t.each,s=[].slice,o=/\{([^\}]+)\}/g,u=t.getObject("$.event.special",[t])||{},c=function(e,n,r,i){return t.delegate.call(e,n,r,i),function(){t.undelegate.call(e,n,r,i)}},f=function(e,r,i,a){return a?c(e,t.trim(a),r,i):n(e,r,i)},h=t.Control=t.Construct({setup:function(){if(t.Construct.setup.apply(this,arguments),t.Control){var e,n=this;n.actions={};for(e in n.prototype)n._isAction(e)&&(n.actions[e]=n._action(e))}},_shifter:function(e,n){var i="string"==typeof n?e[n]:n;return r(i)||(i=e[i]),function(){return e.called=n,i.apply(e,[this.nodeName?t.$(this):this].concat(s.call(arguments,0)))}},_isAction:function(t){var e=this.prototype[t],n=typeof e;return"constructor"!==t&&("function"==n||"string"==n&&r(this.prototype[e]))&&!!(u[t]||l[t]||/[^\w]/.test(t))},_action:function(n,r){if(o.lastIndex=0,r||!o.test(n)){var i=r?t.sub(n,[r,window]):n;if(!i)return null;var a=t.isArray(i),s=a?i[1]:i,u=s.split(/\s+/g),c=u.pop();return{processor:l[c]||e,parts:[s,u.join(" "),c],delegate:a?i[0]:undefined}}},processors:{},defaults:{}},{setup:function(e,n){var r,a=this.constructor,s=a.pluginName||a._fullName;return this.element=t.$(e),s&&"can_control"!==s&&this.element.addClass(s),(r=t.data(this.element,"controls"))||t.data(this.element,"controls",r=[]),r.push(this),this.options=i({},a.defaults,n),this.on(),[this.element,this.options]},on:function(e,n,r,i){if(!e){this.off();var a,s,o=this.constructor,u=this._bindings,c=o.actions,h=this.element,l=t.Control._shifter(this,"destroy");for(a in c)c.hasOwnProperty(a)&&(s=c[a]||o._action(a,this.options))&&u.push(s.processor(s.delegate||h,s.parts[2],s.parts[1],a,this));return t.bind.call(h,"destroyed",l),u.push(function(e){t.unbind.call(e,"destroyed",l)}),u.length}return"string"==typeof e&&(i=r,r=n,n=e,e=this.element),i===undefined&&(i=r,r=n,n=null),"string"==typeof i&&(i=t.Control._shifter(this,i)),this._bindings.push(f(e,r,i,n)),this._bindings.length},off:function(){var t=this.element[0];a(this._bindings||[],function(e){e(t)}),this._bindings=[]},destroy:function(){if(null!==this.element){var e,n=this.constructor,r=n.pluginName||n._fullName;this.off(),r&&"can_control"!==r&&this.element.removeClass(r),e=t.data(this.element,"controls"),e.splice(t.inArray(this,e),1),t.trigger(this,"destroyed"),this.element=null}}}),l=t.Control.processors,e=function(e,n,r,i,a){return f(e,n,t.Control._shifter(a,i),r)};return a(["change","click","contextmenu","dblclick","keydown","keyup","keypress","mousedown","mousemove","mouseout","mouseover","mouseup","reset","resize","scroll","select","submit","focusin","focusout","mouseenter","mouseleave","touchstart","touchmove","touchcancel","touchend","touchleave"],function(t){l[t]=e}),h}(__m3,__m1);window.can=__m5})();