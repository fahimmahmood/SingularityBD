const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb");
const dotenv = require('dotenv');
const app = express();

const connectionString = 'mongodb+srv://root:root@cluster0.2xh1f.mongodb.net/<dbname>?retryWrites=true&w=majority'


MongoClient.connect(connectionString,
    {useUnifiedTopology: true})
    .then(client=>{
        console.log('Connected to database');
        const db = client.db('singular_db');
        const dbcollection = db.collection('mycollection');

        app.set('view engine','ejs');
        // app.use(express.static(path.join(__dirname, 'public')));

        app.use(bodyParser.urlencoded({extended : true}));

        app.get('/',(req,res)=>{
            db.collection('mycollection').find().toArray()
                .then(result =>{
                    res.render('index.ejs',{mycollection : result});
                })
                .catch(error =>console.error(error))
        })
        app.get('/input_form',(req,res)=>{
            res.render('input_form.ejs',{})
        })
        app.get('/certificate',(req,res)=>{
            db.collection('mycollection').find().toArray()
                .then(result =>{
                    console.log(result);
                    res.render('certificate.ejs',{mycollection: result});
                })
                .catch(error => console.error(error))
        })
        app.post('/todb',(req,res)=>{
            dbcollection.insertOne(req.body).then(result=>{
                console.log(result);
                res.redirect('/');
            })
            .catch(error=>console.error(error));
        })
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT,function(){
            console.log('Listening to port PORT..');
        })
    })
    .catch(error=>console.error(error));
    
