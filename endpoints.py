#!/usr/bin/python
#
#  The SMART endpoints to use in the app, if the env var USE_SMART is 1

ENDPOINTS = [
	{
		"url": "http://sandbox-api-v06.smartplatforms.org",
		"name": "REST Sandbox 0.6",
		"app_id": "clinical-trials@apps.chip.org",
		"consumer_key": "clinical-trials@apps.chip.org",
		"consumer_secret": "xxx"
	},
	{
		"url": "http://localhost:7000",
		"name": "Localhost :7000",
		"app_id": "clinical-trials-localhost@apps.chip.org",
		"consumer_key": "clinical-trials-localhost@apps.chip.org",
		"consumer_secret": "FWJXOmuocStCWKaL"
	}
]
