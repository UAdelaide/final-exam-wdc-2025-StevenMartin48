
var doggies = {};


function getdog(){

const xhttp = new XMLHttpRequest();
xhttp.onload = function(){

    console.log(this.response.body);

doggies = this.response.body;


};
xhttp.open("get", "/getownersdogs");
xhttp.send();


}
