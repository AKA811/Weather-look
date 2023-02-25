const express=require("express");
const app=express();
const http=require("http");
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
const query=req.body.cityName;
const apiKey="67f9d968f1f54e963ef33f24afa7b6af";
const url="http://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
http.get(url,function(response)
{
console.log(response);
response.on("data",function(data)//provides outpt after searching for data
{
const WeatherData=JSON.parse(data);
const temp=WeatherData.main.temp;
const desc=WeatherData.weather[0].description;
const icon=WeatherData.weather[0].icon;
const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
res.write("<p> The Weather is currently"+desc+"</p>");
res.write("<h1>The Temperature in "+query+"is"+temp + " degree celsius</h1>");
res.write("<img src="+imageURL+">")
res.send()
});
});
});

app.listen(3000,function()
{
console.log("Server is running on port 3000");
})
