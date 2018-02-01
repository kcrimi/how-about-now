var express = require('express')
var app = express()
const rp = require('request-promise')
 
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
	rp({uri:"https://www.sonicbids.com/find-gigs/northside-festival-2018/"})
	// rp({uri:"https://www.google.com/"})
	.then(((response) => {
		// Email me
		return
	}))
	.catch ((error) => {
		if (error.statusCode == 403) {
			console.log("Ad not open as of "+new Date())
		}
	})
}, 3000)//21600000) // every 6 hours

setInterval(() => {
    rp({uri:"https://how-about-now.herokuapp.com/awake"})
}, 600000) // every 10 minutes (600000)