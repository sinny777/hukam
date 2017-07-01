module.exports = function(PlaceArea) {
	
	PlaceArea.remoteMethod(
		    'addBoard',
		    {
		    	accepts: [
		            { arg: 'req', type: 'object', http: function(ctx) {
		              return ctx.req;
		            } 
		          }],	
		         http: {path: '/addboard', verb: 'post'},
		         returns: {arg: 'board', type: PlaceArea}
		    }
	);
	
	PlaceArea.observe('before save', function updateTimestamp(ctx, next) {
		console.log('\n\nInside PlaceArea.js before save: ');
		  if (ctx.instance) {
			  if(!ctx.instance.audit){
				  ctx.instance.audit = {};
			  }
			  if(!ctx.instance.id){
				  ctx.instance.audit.created = new Date();
			  }
		    ctx.instance.audit.modified = new Date();
		  } else {
			  if(!ctx.data.audit){
				  ctx.data.audit = {};
			  }
			  ctx.data.audit.modified = new Date();
			  
		  }
		 return next();
	});
	
	PlaceArea.addBoard = function(req, cb) {
		var payload = req.body;
		var Board = PlaceArea.app.models.Board;
		var findReq = {filter: {where: {"uniqueIdentifier": payload.uniqueIdentifier}}};
		console.log("In PlaceArea.addBoard, findReq : >>>> ", findReq);
		Board.find(findReq, function(err, boards) { 
			  if (err) {
				  cb(err, null);
              }
			  var board = boards[0];
			  board.placeAreaId = payload.placeAreaId;
			  board.status = "active";
			  for(var i = 1; i<= board.devices.length; i++){
				  var device = board.devices[i];
				  if(device){
					  device.status = "OFF";
					  device.deviceIndex = i;
				  }
			  }
			  
			  Board.upsert(board, function(err, board) { 
				  if (err) {
					  cb(err, null);
	              }
				  cb(null, board);
			  });
		  });
	};
	
};
