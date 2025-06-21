function getdog(){

const xhttp = new XMLHttpRequest();
xhttp.onload = function(){




};
xhttp.open("get", "/getownersdogs");
xhttp.send();


}
