/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * if VCAP_SERVICES exists then it returns
 * username, password and url
 * for the first service that stars with 'name' or {} otherwise
 * @param  String name, service name
 * @return {Object} the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */
module.exports.getServiceCreds = function(name) {
    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var service_name in services) {
            if (service_name.indexOf(name) === 0) {
                var service = services[service_name][0];
                return {
                    url: service.credentials.url,
                    username: service.credentials.username,
                    password: service.credentials.password
                };
            }
        }
    }else{
    	// THIS ELSE BLOCK IS TO RUN THE APPLICATION LOCALLY
    	if(name == 'cloudantNoSQLDB'){
    		return {
    			"username": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix",
    	        "password": "5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13",
    	        "host": "acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com",
    	        "port": 443,
    	        "url": "https://acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix:5bfe2ecae5c815202c4d78db2600812ef5099f337a6deb6dba96ce0b7a5b0e13@acb0bba8-0370-47c4-8e49-5ad1b1050873-bluemix.cloudant.com"
    		}
    	}
    	if(name == 'speech_to_text'){
    		return {
    			"url": "https://stream.watsonplatform.net/speech-to-text/api",
                "password": "eoOB2PFBEAWT",
                "username": "d5214313-4222-43f8-8c97-ea73eb5954d0"
    		}
    	}
    }
    return {};
};