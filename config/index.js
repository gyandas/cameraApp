'use strict';

if(process.env.NODE_ENV === 'production') {
	module.exports = {
		MONGO_URI: process.env.MONGO_URI,
		EMAIL: {
			EMAIL_ADD: process.env.EMAIL_ADD,
			EMAIL_PWD: process.env.EMAIL_PWD
		},
		SENDGRID: {
			SENDGRID_USERNAME: process.env.SENDGRID_USERNAME,
			SENDGRID_PASSWORD: process.env.SENDGRID_PASSWORD,
			SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
		}
	}
} else {
	module.exports = require('./development.json');
}