var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto=required ('crypto');

var app = express();
app.use(morgan('combined'));


var articleOne={
 title:'Article One | Delsy Nila',
 heading:'Article One',
 date:'sep 5,2017',
 content:` 
 <p>
            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>
        <p>
            This is the content for my first article. This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>
        <p>
            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>`
};

function crateTemplate (data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;

    var htmlTemplate=`
    <html>
      <head>
        <title>
           ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        <link href="/ui/style.css" rel="stylesheet" />
      </head>
      <body>
        <div class="container">
           <div>
             <a href="/">Home</a>
           </div>
           <hr/>
           <h3>
              ${heading}
           </h3>
           <div>
              ${date}
           </div>
           <div>
              ${content}
           </div>
        </div>
      </body>   
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //how do we create a hash?
    var hashed=crypto.pbkdf2Sync (input,salt,10000,512,'Sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req,res){
    var hashString =hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});


app.get('/article-one',function (req,res){
  res.send(createTemplate(articleOne));   
});

app.get('/article-two',function (req,res){
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));    
});

app.get('/article-three',function (req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));     
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
