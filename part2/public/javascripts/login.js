function login(){
    const loginDetails = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if (this.status === 200) {
            if (this.responseText === 'owner') { // redirect owners to owner page
                window.location.href = '/owner-dashboard.html';
            } else {
                window.location.href = '/walker-dashboard.html';
            }
        }
    };
    xhttp.open("post", "/login");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(loginDetails));
}

function logout(){

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function(){
        if (this.status === 200) {

            window.location.href = '/';

        }
    };

    xhttp.open("get", "logout");





}
