/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/
'use strict';

gransliveApp.directive('plUpload', function(accountService){
		return {
			restrict: 'A',
			scope: {
				'plProgressModel': '=',
				'plFilesModel': '=',
				'plFiltersModel': '=',
				'plMultiParamsModel':'=',
				'plInstance': '=',
				'plPrefix': '@'
			},
			link: function (scope, iElement, iAttrs) {

				scope.randomString = function(len, charSet) {
				    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				    var randomString = '';
				    for (var i = 0; i < len; i++) {
				    	var randomPoz = Math.floor(Math.random() * charSet.length);
				    	randomString += charSet.substring(randomPoz,randomPoz+1);
				    }
				    return randomString;
				}
				
				if(!iAttrs.id){
					var randomValue = scope.randomString(5);
					iAttrs.$set('id',randomValue);	
				}
				if(!iAttrs.plAutoUpload){
					iAttrs.$set('plAutoUpload','true');
				}
				if(!iAttrs.plMaxFileSize){
					iAttrs.$set('plMaxFileSize','10mb');
				}
				
				if(!iAttrs.plPrefix){
					iAttrs.$set('plPrefix','users/annonymous/');
				}
				
				if(!iAttrs.plUrl){
					iAttrs.$set('plUrl','upload.php');
				}
				if(!iAttrs.plFlashSwfUrl){
					iAttrs.$set('plFlashSwfUrl','/../js/utils/plupload/plupload.flash.swf');
				}
				if(!iAttrs.plSilverlightXapUrl){
					iAttrs.$set('plSilverlightXapUrl','/../js/utils/plupload/plupload.flash.silverlight.xap');
				 }
				if(typeof scope.plFiltersModel=="undefined"){
					scope.filters = [];
				}
				else{
					scope.filters = scope.plFiltersModel;
				}


				var options = {
					runtimes : 'html5,flash,silverlight,gears,html4',
						browse_button : iAttrs.id,
						multi_selection: true,
				//		container : 'abc',
						max_file_size : iAttrs.plMaxFileSize,
						url : iAttrs.plUrl,
						flash_swf_url : iAttrs.plFlashSwfUrl,
						silverlight_xap_url : iAttrs.plSilverlightXapUrl,
						filters : scope.filters
				}


				if(scope.plMultiParamsModel){
					options.multipart_params = scope.plMultiParamsModel;
				}

					var uploader = new plupload.Uploader(options);

					uploader.init();
					
					uploader.bind('Error', function(up, err) {

						if(iAttrs.onFileError){
							scope.$parent.$apply(onFileError);
						}
			        	up.refresh(); // Reposition Flash/Silverlight
   				 	});

				uploader.bind('FilesAdded',function(up,files){
					
					scope.$apply(function(){

						/*if(iAttrs.plFilesModel){
							if(!angular.isArray(scope.plFilesModel))
								scope.plFilesModel = [];
							scope.plFilesModel.push(files[0]);
						}*/
						
						if(iAttrs.plFilesModel){
							angular.forEach(files, function(file){
								scope.plFilesModel.push(file);
							});
						}
						
						if(iAttrs.onFileAdded){
							scope.$parent.$eval(iAttrs.onFileAdded);
						}
					});
					if(iAttrs.plAutoUpload=="true"){
						uploader.start();
					}

    			});
				
				uploader.bind('BeforeUpload',function(up, file){
					var fileKey = iAttrs.plPrefix+file.name;
					var uploadParams = {bucket:'glcontents', fileKey: fileKey, acl: 'public-read'};
					
					 accountService.createUploadDocument(uploadParams).then(function(response) {
						 	console.log(response);
				            	up.settings.url = response.endpoint+":80/"; 
				            	up.settings.multipart = true;
				            	up.settings.multipart_params = 
				            			{bucket: uploadParams.bucket, key: response.key, acl: uploadParams.acl, AWSAccessKeyId: 'AKIAIDNMWBSCQIADC7DA',
				            				policy: response.policy, signature: response.signature };
				            	up.settings.file_data_name  = 'file';
			                    up.settings.multiple_queues = true;
			                    up.refresh();
			            	
			            	file.status = plupload.UPLOADING;
			                up.trigger("UploadFile", file);
					   },
					   function(error) {
						   console.log('ERROR IN CREATING UPLOAD DOCUMENT: >>>>>> ' +JSON.stringify(error));
						   setTimeout(function(){
							   commonService.showMessage('alert-error', 'ERROR: ', 'ERROR IN CREATING UPLOAD DOCUMENT !', $scope);
						   }, 1);
					   });
					 
					 return false;
						
						/*if(iAttrs.onBeforeUpload){
							scope.$parent.$eval(iAttrs.onBeforeUpload);
						}*/

    			});
				
				uploader.bind('UploadFile',function(up, file){
					
					if(iAttrs.onBeforeUpload){
						scope.$parent.$eval(iAttrs.onBeforeUpload);
					}

				});
				
    			uploader.bind('FileUploaded', function(up, file, res) {
					if(iAttrs.onFileUploaded){
							scope.$parent.$apply(iAttrs.onFileUploaded);
						}
				});

				uploader.bind('UploadProgress',function(up,file){

					if(!iAttrs.plProgressModel){
						return;
					}
					
					if(iAttrs.plFilesModel){
						scope.$apply(function(){
							scope.sum = 0;
							angular.forEach(scope.plFilesModel,function(file,key){
								scope.sum = scope.sum + file.percent;
							});
							scope.plProgressModel = scope.sum/scope.plFilesModel.length;
						});
					}
					else{
						scope.$apply(function(){
							scope.plProgressModel = file.percent;
						});
					}
					
					if(iAttrs.onFileProgress){
						scope.$parent.$eval(iAttrs.onFileProgress);
					}
    				

    			});

				if(iAttrs.plInstance){
					scope.plInstance = uploader;	
				}
    			
			}
		};
});

