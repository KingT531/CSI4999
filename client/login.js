function keeplive(){
    user = window.localStorage.getItem('user');
    if(user != ""){
        document.getElementById('status').innerHTML = "Logged In as " + user;
        document.getElementById("logoutbutton").style.visibility  = "visible";
        document.getElementById("status").style.visibility  = "visible";
    }
    else{
        document.getElementById("logoutbutton").style.visibility  = "hidden";
        document.getElementById("status").style.visibility  = "hidden";
        document.getElementById('status').innerHTML = "";
    }
}

function logout(){
    empty = "";
    window.localStorage.setItem('user', empty);
    document.getElementById('status').innerHTML = "";
    document.getElementById("logoutbutton").style.visibility  = "hidden";
}

function login() {
    const formuser = document.getElementById('Uname').value;
    const formpass = document.getElementById('Pw').value;
    if(formuser.length === 0 || formpass.length === 0){
        console.log("Empty Field");
    }
    else{
        axios.post("http://localhost:3001/api/login", {    
            username: formuser, 
            password: formpass,
        }).then(function(response){
            if (response.data.loggedIn){
                console.log("Logged In")
                window.localStorage.setItem('user', formuser);
                document.getElementById('status').innerHTML = "Logged In as " + formuser;
                window.location.href = "login.html";
            }
            else if (!response.data.loggedIn){
                console.log("Failed to Log In")
            }
            else{
                console.log("error");
            }
        })
    }
}