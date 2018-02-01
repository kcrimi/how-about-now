require('dotenv').config()
var express = require('express')
var app = express()
const rp = require('request-promise')
const Emailer = require('./email.js')
const NORTHSIDE_LINK = "https://www.sonicbids.com/find-gigs/northside-festival-2018/"
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/awake', (req, res) => {
	res.send('I\'m awake!')
})

// Check if Northside Festival submission page is up
setInterval(() => {
	rp({uri:NORTHSIDE_LINK})
	.then(((response) => {
		console.log("Ad was opened at "+new Date())
		return Emailer.sendEmail({
			subject: "Northside submissions are open!",
			content: `You can now submit at the following link:<br/><a href=${NORTHSIDE_LINK}>Northside SonicBids Ad</a>`
		}).then(() => {
			console.log("Email sent")
		})
	}))
	.catch ((error) => {
		if (error.statusCode == 403) {
			console.log("Ad not open as of "+new Date())
		}
	})
}, 21600000) // every 6 hours

setInterval(() => {
    rp({uri:"https://how-about-now.herokuapp.com/awake"})
}, 600000) // every 10 minutes (600000)