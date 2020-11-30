const express = require('express');
const http = require('http');
const compression = require('compression');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator(256, UIDGenerator.BASE62);

const mourl = 'mongodb://localhost:27017/db';
console.log(mourl);
app.use(compression(({ level: 9 })));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * Test DB Connection
 */
MongoClient.connect(mourl, function (err, db) {
  if (err) throw err;
  console.log("Database usable!");
});

/**
 * Get User Details Endpoint
 */
app.get('/api/loginUser', function (request, response) {
  var querys = url.parse(request.url, true);
  var email = querys.query.email;
  var pass = querys.query.pass;

  MongoClient.connect(mourl, function (err, db) {
    var search = JSON.parse(`{"email": "${email}", "password": "${pass}"}`);
    db.collection("users").find(search).toArray(function (err, result) {
      if (err) {
        console.error(err); response.send("Error " + err); throw err;
      }
      else {
        response.send(result);
      }
    });
  });
});

/**
 * Check Existing User Endpoint
 */

app.get('/api/getUserDetails', function (request, response) {
  var querys = url.parse(request.url, true);
  var email = querys.query.email;

  MongoClient.connect(mourl, function (err, db) {
    var search = JSON.parse(`{"email": "${email}"}`);
    db.collection("users").find(search).toArray(function (err, result) {
      if (err) {
        console.error(err); response.send("Error " + err); throw err;
      }
      else {
        response.send(result);
      }
    });
  });
});


 //* Register User Endpoint
 
app.post('/api/signup', function (req, response) {
  var querys = url.parse(req.url, true);
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password1;
  var tracking_data = {};
  var uid = uidgen.generateSync();
  console.log(uid);
  var seedData = {
    "uname": `${name}`,
    "email": `${email}`,
    "password": `${pass}`,
    "token": uid,
    "reactions_data": tracking_data,
    "bookmark_data": tracking_data,
    "clicked_data": tracking_data,
    "cluster": ``,
    "genre_ranking": ``
  };
  MongoClient.connect(mourl, function (err, db) {
    var search = JSON.parse(`{"email": "${email}"}`);
    console.log(search);
    db.collection("users").find(search).toArray(function (err, result) {
      if (err) { console.error(err); response.send("Error " + err); throw err; }
      if (result.length == 0) {
        console.log("NO user")
        db.collection("users").insertOne(seedData, function (err, res) {
          if (err) throw err;
          console.log("1 user inserted");
          response.send(res);
        });
      }
      else { response.send(result); }

      db.close();
    });
  });
});

app.post('/api/delete', function (req, response) {
  var querys = url.parse(req.url, true);
  console.log(req.body);
  var email = req.body.email;
  MongoClient.connect(mourl, function (err, db) {
    var search = JSON.parse(`{"email": "${email}"}`);
    console.log('search',search);
   try {
     db.collection("users").deleteOne({"email":`${email}`},function (err, res) {
          if (err) throw err;
          response.send(res);
        } ); 
    } catch(e) {
      console.log(e);
    }
    db.close();  
  });
    
  });

app.put('/api/sendReactionData', function (req, res) {
  var user_id = req.body.user_id;
  var tracking_data = {};
  tracking_data = JSON.parse(req.body.JSON_String);
  var bcd = tracking_data;
  var search = JSON.parse(`{"email": "${user_id}"}`);
  var query_object, abc, query, params;

  try {
    MongoClient.connect(mourl, function (err, db) {
      for (var movie_id in tracking_data) {
        kcd = JSON.stringify(bcd[movie_id]);
        abc = "\"reactions_data." + movie_id + "\"";
        if (params === undefined) {
          params = abc + ': ' + kcd;
        }
        else {
          params = params + ',' + abc + ': ' + kcd;
        }
        query = '{$set: {' + params + '}}';
        var jsonValidString = JSON.stringify(eval("(" + query + ")"));
        var query_object = JSON.parse(jsonValidString);
      }
      // Send to DB
      db.collection("users").update(search, query_object, { upsert: true }, function (err, result) {
        if (err) {
          console.error(err);
          res.send("Error " + err); throw err;
        }
        else {
          res.send(result);
        }
      });
    });
  }
  catch (e) {
    console.log(e);
  }
});

/**
 * Clicks Data Endpoint
 */
app.put('/api/sendClicksData', function (req, res) {

  var user_id = req.body.user_id;
  var additional_data = {};
  additional_data = JSON.parse(req.body.JSON_String);
  var bcd = additional_data;
  var search = JSON.parse(`{"email": "${user_id}"}`);
  var query_object, abc, query, params;

  try {
    MongoClient.connect(mourl, function (err, db) {
      for (var movie_id in additional_data) {
        kcd = JSON.stringify(bcd[movie_id]);
        abc = "\"clicked_data." + movie_id + "\"";
        if (params === undefined) {
          params = abc + ': ' + kcd;
        }
        else {
          params = params + ',' + abc + ': ' + kcd;
        }
        query = '{$set: {' + params + '}}';
        var jsonValidString = JSON.stringify(eval("(" + query + ")"));
        var query_object = JSON.parse(jsonValidString);
      }
      db.collection("users").update(search, query_object, { upsert: true }, function (err, result) {
        if (err) {
          console.error(err);
          res.send("Error " + err); throw err;
        }
        else {
          res.send(result);
        }
      });
    });
  }
  catch (e) {
    console.log(e);
  }
});

/**
 * Bookmark Data Endpoint
 */

app.put('/api/sendBookmarkData', function (req, res) {

  var user_id = req.body.user_id;
  var additional_data = {};
  additional_data = JSON.parse(req.body.JSON_String);
  var bcd = additional_data;
  var search = JSON.parse(`{"email": "${user_id}"}`);
  var query_object, abc, query, params;

  try {
    MongoClient.connect(mourl, function (err, db) {
      for (var movie_id in additional_data) {
        kcd = JSON.stringify(bcd[movie_id]);
        abc = "\"bookmark_data." + movie_id + "\"";
        if (params === undefined) {
          params = abc + ': ' + kcd;
        }
        else {
          params = params + ',' + abc + ': ' + kcd;
        }
        query = '{$set: {' + params + '}}';
        var jsonValidString = JSON.stringify(eval("(" + query + ")"));
        var query_object = JSON.parse(jsonValidString);
      }
      // Send to DB
      db.collection("users").update(search, query_object, { upsert: true }, function (err, result) {
        if (err) {
          console.error(err);
          res.send("Error " + err); throw err;
        }
        else {
          res.send(result);
        }
      });

    });
  }
  catch (e) {
    console.log(e);
  }
});

/**
 * For using Angular generated templates with Node.js
 * Keep it in the end of the requests
 */
app.use(express.static(path.join(__dirname, 'src/'), { maxAge: '5d' }));
app.get('*', function (req, res) {
  const index = path.join(__dirname, 'src/', 'index.html');
  res.sendFile(index);
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on ${port}`));
