const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine','hbs');

console.log("Directory name :" +process.cwd());
app.use(express.static(process.cwd() +'/public'));
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

app.listen(5000);
console.log('Server listening on port 5000');