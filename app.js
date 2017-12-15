const express = require('express');
const hbs = require('hbs')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine','hbs');

app.use(express.static(process.cwd() +'/public'));
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array());


app.use((req, res, next) =>{
   var now = new Date().toDateString();
   var log = `Time: ${now} Method : ${req.method} url: ${req.url}`;
   fs.appendFile('server.log',log + '\n',(err)=>{
       if (err) {
           console.log('Unable to append server.log file!');

       }
   });
    next();

});

hbs.registerPartials(process.cwd() +'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});


app.get('/',(req, res) =>{
   res.render('home.hbs', {
    pageTitle:'Home Page',
    body: 'Welcome to our first website',
});

});
app.get('/about',(req, res)=>{0
    res.render('about.hbs',{
        pageTitle:"About Page",
});
});

// sending form to client
app.get('/form', (req, res) =>{
    res.render('form.hbs');
});

app.post('/', function(req, res) {

    console.log(req.body);
    res.send("recieved your request!");
});
app.listen(port);
console.log('Server listening on port', port);