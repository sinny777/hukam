
var bluemix = require('../../common/config/bluemix');

module.exports = function() {
    
var methods = {};

	methods.sendWorkerHealthStatusEmail = function(sensorData, manager, worker, cb){
		console.log('IN emailHandler.sendWorkerHealthStatusEmail: >> ', sensorData);
		 var emailConfig = bluemix.getConfig().email; 
	   	 var helper = require('sendgrid').mail;
	   	 var mail = new helper.Mail();
	   	 mail.setTemplateId(emailConfig.workerHealthStatus.templateId);
	     mail.setFrom(new helper.Email(emailConfig.fromEmail));
	     mail.setSubject(emailConfig.workerHealthStatus.subject);
	   	 
	   	 var personalization = new helper.Personalization();
	     personalization.addTo(new helper.Email(manager.emailId));
	     if(emailConfig.workerHealthStatus.cc && manager.emailId != emailConfig.workerHealthStatus.cc){
	    	 personalization.addCc(new helper.Email(emailConfig.workerHealthStatus.cc));
	     }
	     personalization.setSubject(emailConfig.workerHealthStatus.subject);
	     personalization.addSubstitution(new helper.Substitution("%toName%", manager.firstName));
	     personalization.addSubstitution(new helper.Substitution("%workerUniqueId%", worker.uniqueId));
	     personalization.addSubstitution(new helper.Substitution("%firstName%", worker.firstName));
	     personalization.addSubstitution(new helper.Substitution("%lastName%", worker.lastName));
	     personalization.addSubstitution(new helper.Substitution("%workerEmailId%", worker.emailId));
	     personalization.addSubstitution(new helper.Substitution("%workerContactNo%", worker.contactNumber));
	     personalization.addSubstitution(new helper.Substitution("%adminEmail%", emailConfig.adminEmail));
	     
	     personalization.addSubstitution(new helper.Substitution("%envTemp%", ' '+sensorData.d.temp));
	     personalization.addSubstitution(new helper.Substitution("%envHum%", ' '+sensorData.d.hum));
	     personalization.addSubstitution(new helper.Substitution("%bTemp%", ' '+sensorData.d.btemp));
	     personalization.addSubstitution(new helper.Substitution("%hb%", ' '+sensorData.d.hb));
	     personalization.addSubstitution(new helper.Substitution("%latitude%", ' '+sensorData.d.lat));
	     personalization.addSubstitution(new helper.Substitution("%longitude%", ' '+sensorData.d.lon));
	     personalization.addSubstitution(new helper.Substitution("%altitude%", ' '+sensorData.d.alt));
	     
	     mail.addPersonalization(personalization);
	     
	     methods.sendEmailThroughSendGrid(mail, cb);
	};
	
	methods.sendEmailThroughSendGrid = function(mail, cb){
		var sg = require('sendgrid').SendGrid(bluemix.getConfig().email.sendGridApiKey),
        requestBody = mail.toJSON(),
        request = sg.emptyRequest();
        request.method = 'POST';
        request.path = '/v3/mail/send';
        request.body = requestBody;
        sg.API(request, function (response) {
        	console.log(response);
            cb(null, {statusCode: response.statusCode, message: "Email sent Successfully"});
        });
	};
      
    return methods;
    
}