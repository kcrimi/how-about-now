var express = require('express')
var app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/awake', (req, res) => {
	res.send('I\'m awake!')
})

setInterval(function() {
    rp({uri:"https://how-about-now.herokuapp.com/awake"})
}, 600000) // every 10 minutes (600000)