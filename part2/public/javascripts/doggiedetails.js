
var doggies = {};


function getdog(){

const xhttp = new XMLHttpRequest();
xhttp.onload = function(){

doggies = this.response;


};
xhttp.open("get", "/getownersdogs");
xhttp.send();


}
