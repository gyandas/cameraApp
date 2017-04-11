var config = require('../config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.EMAIL.EMAIL_ADD, // Your email id
        pass: config.EMAIL.EMAIL_PWD // Your password
    }
});
var helper = require('sendgrid').mail;

/*if(process.env.NODE_ENV === 'production') {
	module.exports = function sendEmail(to, subject, message) {
		var from_email = new helper.Email(config.SENDGRID.SENDGRID_USERNAME, "Pedicon 2017");
		var to_email = new helper.Email(to);
		var content = new helper.Content('text/html', message);
		var mail = new helper.Mail(from_email, subject, to_email, content);
		console.log(config.SENDGRID.SENDGRID_USERNAME, subject, to, message);
	    var sg = require('sendgrid')(config.SENDGRID.SENDGRID_API_KEY);
		var request = sg.emptyRequest({
		  method: 'POST',
		  path: '/v3/mail/send',
		  body: mail.toJSON(),
		});

		sg.API(request, function(error, response) {
		  console.log(response.statusCode);
		  console.log(response.body);
		  console.log(response.headers);
		});
	};
} else {*/
	module.exports = function sendEmail(to, subject, message) {
	    const mailOptions = {
	        from: '"GSK Excellence Awards 2016" <' + config.EMAIL.EMAIL_ADD + '>', // sender address
	        to: to, // list of receivers
	        subject: subject, // Subject line
	        //text: text //, // plaintext body
	        html: message // You can choose to send an HTML body instead
	    };
	    transporter.sendMail(mailOptions, function(error, info){
	        if(error){
	            console.log(error);
	            //res.json({yo: 'error'});
	        }else{
	            console.log('Message sent: ' + info.response);
	            //res.json({yo: info.response});
	        };
	    });
	};
/*}*/