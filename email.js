const Sendgrid = require("sendgrid")(process.env.SENDGRID_API_KEY);

const sendEmail = (data) => {
	const toEmail = data.toEmail || process.env.ALERT_EMAIL
	const fromEmail = data.fromEmail || "alert@HowAboutNow.com"
	const fromName = data.fromName || "How About Now"
	const subject = data.subject || "Alert!"
	const content = data.content || "Bodyless Email"
	const request = Sendgrid.emptyRequest({
	  method: 'POST',
	  path: '/v3/mail/send',
	  body: {
	    personalizations: [
	      {
	        to: [
	          {
	            email: toEmail,
	          },
	        ],
	        subject: subject,
	      },
	    ],
	    from: {
	      email: fromEmail,
	      name: fromName,
	    },
	    content: [
	      {
	        type: 'text/html',
	        value: content,
	      },
	    ],
	  },
	})

	//With promise
	return Sendgrid.API(request)
}

module.exports = {sendEmail}
