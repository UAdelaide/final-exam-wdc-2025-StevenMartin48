







function login(){
    const login = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    const xhttp = new XMLHttpRequest();

    xhttp.onload() function() {
        if (this.response.code == 200) {

        }
    }

    xhttp.open("post", "/login")
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(login))

}