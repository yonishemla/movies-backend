
const express = require('express');
const router = express.Router();

const mysql = require('mysql');

//mysql connection
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'yoni1343',
    database : 'movies'
  });




/////////////////////////////////////////////////////////////////////

const request = require('request');

let url = "http://api.androidhive.info/json/movies.json";

let options = {json: true};


request(url, options, (error, res, body) => {
    
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // console.log(body)
    };
});

/////////////////////////////////////////////////////////////////////


router.post('/', (req,res,next)=>{

    const list = {
        title: req.body.title, 
        image: req.body.image,
        rating: req.body.rating, 
        releaseYear: req.body.releaseYear, 
        genre: req.body.genre 
    }; 


    res.status(201).json({
        message: 'Handeling POST requests to /list',
        foundPeople: list
    });


    var sql = "INSERT INTO list (title,image,rating,releaseYear,genre) VALUES ('"+req.body.title+"','"+req.body.image+"',"+req.body.rating+","+req.body.releaseYear+",'"+req.body.genre+"')";

    console.log(sql);
    connection.query(sql, function (error, results) {
        if (error) throw error;
        // res.send(results)
        console.log("1 record inserted");
      });

});



router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: list
    });
});



module.exports = router;
