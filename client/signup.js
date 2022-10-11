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

function register() {
    const formuser = document.getElementById('Uname').value;
    const formpass = document.getElementById('Pw').value;
    const formpass2 = document.getElementById('Pw').value;
    const formemail = document.getElementById('Pw').value;
    const fname = document.getElementById('Pw').value;
    const lname = document.getElementById('Pw').value;
    if(formuser.length === 0 || formpass.length === 0 || formpass2.length === 0 || formemail.length === 0 || fname.length === 0 || lname.length === 0){
        console.log("A Field is Empty");
    }
    else if(formpass != formpass2){
        console.log("Passwords don't match")
    }
    else{
        axios.post("http://localhost:3001/api/register", {   
            username: formuser, 
            password: formpass,
            email: formemail,
            first: fname,
            last: lname,
        }).then(function(response){
            if (response.data.newaccount){
                console.log("Account Created")
                window.location.href = "login.html";
                //document.getElementById('logstatus').innerHTML = "account created: " + userval;
            }
            else if (!response.data.newaccount){
                console.log("User already exists")
                //document.getElementById('logstatus').innerHTML = "User already exists";
            }
            else{
                console.log("error");
            }
        })
    }
}