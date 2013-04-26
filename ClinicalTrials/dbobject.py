#!/usr/bin/env python
#
#	Representing an object that can store to SQLite
#
#	2013-04-16	Created by Pascal Pfiffner
#

import logging

from sqlite import SQLite


class DBObject (object):
	""" A superclass for objects that can dehydrate to and hydrate from SQLite.
	"""
	
	sqlite_handle = None
	sqlite_must_commit = False
	
	table_name = None
	table_key = None
	
	def __init__(self):
		self.id = None
		self.hydrated = False
	
	
	# -------------------------------------------------------------------------- Dehydration
	def should_insert(self):
		""" Return True if the receiver should be inserted (i.e. is not already
		in the db). """
		return False
	
	def will_insert(self):
		""" Called before the insert query is performed, you can use this as a
		hook. """
		pass
	
	def insert_tuple(self):
		""" Cheap solution for now: return the INSERT sql as first and a list
		of values as second object. """
		return None, None
	
	def did_insert(self):
		pass
	
	def insert(self):
		""" Runs an INSERT query for the receiver.
		This method will not check with "should_insert()"! """
		self.will_insert()
		
		sql, params = self.insert_tuple()
		if sql is None or params is None:
			return False
		
		DBObject.sqlite_assure_handle()
		self.id = DBObject.sqlite_handle.executeInsert(sql, params)
		DBObject.sqlite_must_commit = True
		self.did_insert()
		
		return True
	
	
	def should_update(self):
		return True
	
	def update_tuple(self):
		""" Cheap solution for now: return the UPDATE sql as first and a list
		of values as second object. """
		return None, None
	
	def update(self):
		""" Runs the UPDATE query on the receiver. """
		
		if not self.should_update():
			return True
		
		sql, params = self.update_tuple()
		if sql is None or params is None:
			return False
		
		DBObject.sqlite_assure_handle()
		if DBObject.sqlite_handle.execute(sql, params):
			DBObject.sqlite_must_commit = True
			self.hydrated = True
			return True
		
		return False
	
	def store(self):
		""" Stores the receiver's data to SQLite. You must MANUALLY COMMIT!
		"""
		
		# do we need to insert first?
		if self.should_insert():
			if not self.insert():
				logging.warning("Failed to INSERT %s" % self)
		
		# perform the update
		if self.update():
			return True
		
		logging.warning("Failed to UPDATE %s" % self)
		return False	
	
	
	# -------------------------------------------------------------------------- Hydration
	def from_db(self, data):
		""" Fill from an SQLite-retrieved list.
		"""
		pass
	
	
	# -------------------------------------------------------------------------- SQLite Methods
	def sqlite_execute(self, sql, params):
		""" Executes the given SQL statement with the given parameters.
		Returns True on success, False otherwise. """
		
		DBObject.sqlite_assure_handle()
		if DBObject.sqlite_handle.execute(sql, params):
			DBObject.sqlite_must_commit = True
			self.hydrated = True
			return True
		
		return False
	
	def sqlite_select(self, sql, params):
		""" Executes the SQL statement and returns the response. You can use
		this method in an iterator. """
		
		DBObject.sqlite_assure_handle()
		return DBObject.sqlite_handle.execute(sql, params)
	
	def sqlite_select_one(self, sql, params):
		""" Executes the SQL statement and returns the first response row.
		"""
		
		DBObject.sqlite_assure_handle()
		return DBObject.sqlite_handle.executeOne(sql, params)
	
	
	# -------------------------------------------------------------------------- Class Methods
	
	@classmethod
	def sqlite_assure_handle(cls):
		if cls.sqlite_handle is None:
			cls.sqlite_handle = SQLite.get('databases/storage.db')
	
	@classmethod
	def sqlite_commit_if_needed(cls):
		""" Commits to SQLite if the flag had been set. """
		if cls.sqlite_handle is None:
			return
		
		if cls.sqlite_must_commit:
			cls.sqlite_handle.commit()
			cls.sqlite_must_commit = False
	
	
	@classmethod
	def table_structure(cls):
		""" Return the table structure here. """
		return None
	
	@classmethod
	def setup_tables(cls):
		struct = cls.table_structure()
		if struct is None:
			return False
		
		cls.sqlite_assure_handle()
		if cls.sqlite_handle.create(cls.table_name, struct):
			cls.did_setup_tables()
	
	@classmethod
	def did_setup_tables(cls):
		pass
	
	
