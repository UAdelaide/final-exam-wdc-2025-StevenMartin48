







function login(){
    const login = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    const xhttp = new XMLHttpRequest();
    xhttp.onload(){
    }
    xhttp.open("post", "/login")
    xhttp.setRequestHeader('Content-Type', 'application/json')

}