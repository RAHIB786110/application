var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

const { ClientSession } = require("mongodb");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/getdetails",(req,res)=>{
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("Application");
        database.collection("data").find({}).toArray()
        .then(document=>{
            res.send(document);
            res.end();
        })
    })
});
app.get("/getdetails/:Rollno",(req,res)=>{
    var Rollno = parseInt(req.params.Rollno);
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("Application");
        database.collection("data").find({Rollno:Rollno}).toArray()
        .then(document=>{
            res.send(document);
            res.end();
        })
    })
});
app.post("/adddetails",(req,res)=>{
    var details = {
        "Name":req.body.Name,
        "Phone":parseInt(req.body.Phone),
        "School":req.body.School,
        "Class":parseInt(req.body.Class),
         "Rollno":parseInt(req.body.Rollno),
         "Address":req.body.Address
    }
    mongoClient.connect(connectionString)
    .then(clientObject=>{
        var database = clientObject.db("Application");
        database.collection("data").insertOne(details)
        .then((result)=>{
            console.log("Record Inserted");
            res.redirect("/data");
        })
    })
});


app.listen(7777);
console.log(`Server Started : http://127.0.0.1:7777`)