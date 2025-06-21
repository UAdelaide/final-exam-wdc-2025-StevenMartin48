
var doggies = {};


function getdog(){

const xhttp = new XMLHttpRequest();
xhttp.onload = function(){

    console.log(this.response);

doggies = this.response;


};
xhttp.open("get", "/getownersdogs");
xhttp.send();


}
