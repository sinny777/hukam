/*******************************************************************************
 *
 *  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER. 
 *  Copyright (c) 2015 GransLive
 *  All Rights Reserved. All content is proprietary and confidential.
 *
 *******************************************************************************/

function init() {
    var time = "2075-12-27T00:42:10Z";
    var normalkey = "AKIAIDNMWBSCQIADC7DA";
    var secretkey = "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"; 

    var acl = "private"; 
    var bucket = "glcontents";
    var path = "/users/";
    var filename = "${filename}";   
    var policy = Base64.encode("{'expiration':'"+time+"','conditions': [     {'bucket': '"+bucket+"'},['starts-with', '$key', '"+path+"'],{'acl': '"+acl+"'},   ['starts-with', '$Content-Type', ''],['content-length-range', 0, "+(1024*1024*100)+"] ]}");
    var signature = b64_hmac_sha1(secretkey,policy);
    document.getElementById('acl').value=acl;
        document.getElementById('key').value=path + filename;
    document.getElementById('AWSAccessKeyId').value=normalkey;
    document.getElementById('policy').value=policy;
    document.getElementById('signature').value=signature;
    }

(function () {
    'use strict';
    
    var url = 'https://glcontent.s3.amazonaws.com/users';
    
    angular.module('demo', [
        'blueimp.fileupload'
    ])
        .config([
            '$httpProvider', 'fileUploadProvider',
            function ($httpProvider, fileUploadProvider) {
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                fileUploadProvider.defaults.redirect = window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                );
            }
        ])

        .controller('DemoFileUploadController', [
            '$scope', '$http', '$filter', '$window',
            function ($scope, $http) {
            	
                /*$scope.options = {
                    url: url
                };*/
                    
            }
        ]);

}());




$(function() {
  $('#fileupload').fileupload({
    forceIframeTransport: true,    // VERY IMPORTANT.  you will get 405 Method Not Allowed if you don't add this.
    autoUpload: false,
    dataType: 'xml',
    add: function (event, data) {
      $.ajax({
        url: "http://localhost:8001/api/auth/v1/bucket/documents?key=/users/"+data.files[0].name,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function(retdata) {
         console.log(retdata.data.policy);
//          $('#fileupload').attr('action','http://glcontents.s3.amazonaws.com');
          $('#fileupload').find('input[name=key]').val(retdata.data.key);
          $('#fileupload').find('input[name=policy]').val(retdata.data.policy);
          $('#fileupload').find('input[name=signature]').val(retdata.data.signature);
          $('#fileupload').find('input[name=Content-Type]').val(data.files[0].type);
        }
        
      });
      data.submit();
    },
    send: function(e, data) {
      // show a loading spinner because now the form will be submitted to amazon, 
      // and the file will be directly uploaded there, via an iframe in the background. 
      $('#loading').show();
    },
    fail: function(e, data) {
      console.log('fail');
      console.log(data);
    },
    done: function (event, data) {
      // here you can perform an ajax call to get your documents to display on the screen.
      $('#your_documents').load("/documents?for_item=1234");
      
      // hide the loading spinner that we turned on earlier.
      $('#loading').hide();
    },
  });
});


/*$(function() {

	  $('#fileupload').each(function() {

	    var form = $(this)

	    $(this).fileupload({
	      url: form.attr('action'),
	      type: 'POST',
	      autoUpload: true,
	      dataType: 'xml', // This is really important as s3 gives us back the url of the file in a XML document
	      add: function (event, data) {
	        $.ajax({
	          url: "http://localhost:8001/api/auth/v1/bucket/documents",
	          type: 'GET',
	          dataType: 'json',
	          data: {doc: {title: data.files[0].name}}, // send the file name to the server so it can generate the key param
	          async: false,
	          success: function(data) {
	            // Now that we have our data, we update the form so it contains all
	            // the needed data to sign the request
	            form.find('input[name=key]').val(data.key)
	            form.find('input[name=policy]').val(data.policy)
	            form.find('input[name=signature]').val(data.signature)
	          }
	        })
	        data.submit();
	      },
	      send: function(e, data) {
	        $('.progress').fadeIn();
	      },
	      progress: function(e, data){
	        // This is what makes everything really cool, thanks to that callback
	        // you can now update the progress bar based on the upload progress
	        var percent = Math.round((e.loaded / e.total) * 100)
	        $('.bar').css('width', percent + '%')
	      },
	      fail: function(e, data) {
	        console.log('fail')
	      },
	      success: function(data) {
	        // Here we get the file url on s3 in an xml doc
	        var url = $(data).find('Location').text()
	        console.log(url)
//	        $('#real_file_url').val(url) // Update the real input in the other form
	      },
	      done: function (event, data) {
	        $('.progress').fadeOut(300, function() {
	          $('.bar').css('width', 0)
	        })
	      },
	    })
	  })
	});*/