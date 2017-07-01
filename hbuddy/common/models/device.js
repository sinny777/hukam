'use strict';

module.exports = function(Device) {
	
	var iotPlatformHandler = require('../../server/handlers/iotPlatformHandler')();
	
	Device.observe('before save', function updateTimestamp(ctx, next) {
		console.log('\n\nInside Device.js before save: ', ctx.instance);
		  if (ctx.instance) {
			  if(!ctx.instance.clientId){
				  iotPlatformHandler.registerDevice(ctx.instance, function(error, response, body){
					  if(error){
						  console.log("ERROR: >> ", error);
						  next(error);
					  }else{
						  if(response.statusCode != 201){
							  console.log("ERROR RESPONSE Message: >> ", response.statusMessage);
							  console.log("ERROR RESPONSE Body: >> ", body);
							  var error = new Error();
							  error.status = response.statusMessagee;
							  error.message = body.message;
							  error.code = response.statusCode;
							  next(error);
						  }else{
							  ctx.instance.clientId = body.clientId;
							  ctx.instance.typeId = body.typeId;
							  ctx.instance.status = body.status;
							  ctx.instance.registration = body.registration;
							  ctx.instance.refs = body.refs;
							  console.log("REGISTER RESPONSE, CODE: >>> ", response.statusCode, ", BODY: ", ctx.instance );
							  next();
						  }
					  }						  
				  });
			  }else{
				  iotPlatformHandler.updateDevice(ctx.instance, function(error, response, body){
					  if(error){
						  console.log("ERROR: >> ", error);
						  next(error);
					  }else{
						  
						  if(response.statusCode >= 400){
							  console.log("ERROR RESPONSE Message: >> ", response.statusMessage);
							  console.log("ERROR RESPONSE Body: >> ", body);
							  var error = new Error();
							  error.status = response.statusMessagee;
							  error.message = body.message;
							  error.code = response.statusCode;
							  next(error);
						  }else{
							  console.log("UPDATE RESPONSE, CODE: >>> ", response.statusCode, ", BODY: ", ctx.instance );
							  next();
						  }						  
					  }						  
				  });
			  }
		  } else {
			  console.log("Updating Partial Device Data, ctx.data: >> ", ctx.data);
			  if(!ctx.data.clientId){
				  // TODO: Register Device on IoT Platform
			  }else{
				  // TODO: Update Device on IoT Platform
			  }			  
		  }
		  
		});

};
