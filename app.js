//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();

let items =["Buy Food","Cook Food","Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs'); //to use view engine as ejs codes

//to send one response res.send otherwise res.write
app.get("/",function(req,res){

  let day = date.getDate();

  res.render("list",{listTitle: day, newListItems:items});

});

app.post("/",function(req,res){
  console.log(req.body);
  let item = req.body.newItem;

  if(req.body.list === 'Work') {
    workItems.push(item);
    res.redirect("/work");
  }
  else
  {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
  res.render("list",{listTitle: "Work List", newListItems: workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});


app.listen(3000, function(){
  console.log("Server running on port 3000");
});

// var currentDay = today.getDay();
// var day = "";
//
// if (currentDay === 0)
// {
//   day="Sunday";
//   //res.sendFile(__dirname+"/weekend.html");
//   //res.send("<h1>Yay it's the weekend!</h1>");
// }
// else if(currentDay === 1)
// {
//   day="Monday";
//   //res.send("<h1>It's not the weekend!</h1>");
//   //res.sendFile(__dirname+"/weekday.html");
// }
// else if(currentDay === 2)
// {
//   day="Tuesday";
// }
// else if(currentDay === 3)
// {
//   day="Wednesday";
// }
// else if(currentDay === 4)
// {
//   day="Thursday";
// }
// else if(currentDay === 5)
// {
//   day="Friday";
// }
// else if(currentDay === 6)
// {
//   day="Saturday";
// }
// else{
//   console.log("Error: current day is equal to:"+currentDay);
// }
//   res.render("list",{kindOfDay: day}); //pass in a javascript object
