







function login(){
    const loginDetails = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        if (this.status === 200) {

            if

        }
        else {
           alert('this broke lol');
        }
    };

    xhttp.open("post", "/login");
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(loginDetails));

}