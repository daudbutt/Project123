var latitud;
var longitud;
var city;
var country;
function getGeolocation(){
    navigator.geolocation.getCurrentPosition(geoCallback, onError);
}
function geoCallback(position) {
     latitud = position.coords.latitude;
     longitud= position.coords.longitude;
    console.log(longitud);
 

}
function onError(message){console.log(message)}


function Location(){
   
var http = new XMLHttpRequest();
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitud.toString()+','+longitud.toString()+'&key=AIzaSyDH_qoUxgx0Fgd4TQ-hYnXoTJx4eTg-CaY';
http.open('GET', url);
http.send();
http.onreadystatechange = (e) => {
var response = http.responseText;
var responseJSON = JSON.parse(response);
console.log(responseJSON);
var result = responseJSON.results["0"].address_components[4].short_name;
var result2 = responseJSON.results["0"].address_components[5].long_name;


console.log (result);
document.getElementById("click").innerHTML = " Your current City is: " + result + " <br> and Country is: " + result2 ;

console.log(arguments.callee.isCrazy);    
}
}

function weather(){

    var http = new XMLHttpRequest();
    const url ='http://api.openweathermap.org/data/2.5/weather?lat='+latitud.toString()+'&lon='+longitud.toString()+'&appid=8e09cf0d9180f677f8fdd9c6d5607d4d&units=metric';
    
    http.open("GET", url);
    http.send();
    http.onreadystatechange = (e) => {
        var response = http.responseText;
        var responseJSON = JSON.parse(response);
        console.log(responseJSON);
        console.log(responseJSON.weather["0"].description);
        console.log(responseJSON.main.temp);
        document.getElementById("weatherr").innerHTML = "Current weather: "  + responseJSON.main.temp + " °C";
        document.getElementById("weatherrr").innerHTML = "Expected weather:  " + responseJSON.weather["0"].description;
        document.getElementById("weatherrrr").innerHTML = "Feels like: " + responseJSON.main.feels_like + " °C";
}

}
function Currency1(){
    
    var input = document.getElementById("input1").value;
    console.log(input);
    var http = new XMLHttpRequest();
    const url = 'https://api.exchangeratesapi.io/latest?base=USD';
http.open('GET', url);
http.send();
http.onreadystatechange = (e) => {
		var response = http.responseText;
        var responseJSON = JSON.parse(response); 
        var output = responseJSON.rates.EUR;
        console.log(output);
        var converted = input*output;

        document.getElementById('result1').innerHTML =input +" Dollars = "+ converted + " Euros";


}
}

function Currency2()
{
    var input = document.getElementById("input2").value;
    console.log(input);

    var http = new XMLHttpRequest();
    const url = 'https://api.exchangeratesapi.io/latest?base=EUR';
http.open('GET', url);
http.send();
http.onreadystatechange = (e) => {
		var response = http.responseText;
        var responseJSON = JSON.parse(response); 
        var output = responseJSON.rates.USD;
        console.log(output);
        var converted = input*output;
       
        document.getElementById('result2').innerHTML =input +" Euros = "+converted + " Dollars";

}
}

function save(){
 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemCallback, onError);
   
}  

function fileSystemCallback(fs){
 
    // Name of the file I want to create
    var fileToCreate = "newPersistentFile.txt";
 
    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}
 
var fileSystemOptionals = { create: true, exclusive: false };
 
function getFileCallback(fileEntry){
    
    var dataObj = new Blob(['Hello'], { type: 'text/plain' });
    
    writeFile(fileEntry, dataObj);

    readFile(fileEntry);
}

function writeFile(fileEntry, dataObj) {
 
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {
 
      
        alert("Saving In Progress");
        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }
 
        fileWriter.write(dataObj);
 
        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };
 
        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };
 
    });
}
 
// Let's read some files
function readFile(fileEntry) {
 
    // Get the file from the file entry
    fileEntry.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);
 
        reader.onloadend = function() {
 
            console.log("Successful file read: " + this.result);
            console.log("file path: " + fileEntry.fullPath);
 document.getElementById("content").innerHTML=this.result;
        };
 
    }, onError);
}

function onError(msg){
    console.log(msg);
}  




