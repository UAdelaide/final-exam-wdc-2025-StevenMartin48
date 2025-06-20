const e = require("express");








function login(){
    const loginDetails = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if (this.status === 200) {
            console.log(this.responseText);
            // if (this.responseText === 'owner') { // redirect owners to owner page
            //     window.location.href = '/owner-dashboard.html';
            // } else {
            //     window.location.href = '/walker-dashboard.html';
            // }

        }
        else {
           alert('this broke lol');
        }
    };

    xhttp.open("post", "/login");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(loginDetails));

}