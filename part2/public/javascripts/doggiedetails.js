
var doggies = {};


function getdogs(){

const xhttp = new XMLHttpRequest();
xhttp.onload = function(){

doggies = this.response;


};
xhttp.open("get", "/getownerdogs");
xhttp.send();

}
