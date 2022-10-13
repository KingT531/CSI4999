
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
    const formpass2 = document.getElementById('PwConfirm').value;
    const formemail = document.getElementById('Email').value;
    const fname = document.getElementById('Fname').value;
    const lname = document.getElementById('Lname').value;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat=  /^[A-Za-z0-9]\w{2,15}$/;
    var userformat=  /^[A-Za-z0-9]\w{1,15}$/;
    var nameformat=  /^[A-Za-z]\w{0,15}$/;

    if(formuser.length === 0 || formpass.length === 0 || formpass2.length === 0 || formemail.length === 0 || fname.length === 0 || lname.length === 0){
        console.log("A Field is Empty");
    }
    else if(formpass != formpass2){
        console.log("Passwords don't match")
    }
    else if(!formemail.match(mailformat)){
        console.log("Invalid Email format")
    }
    else if(!formuser.match(userformat)){
        console.log("Invalid Username format")
    }
    else if(!formpass.match(passformat)){
        console.log("Invalid Password format")
    }
    else if(!fname.match(nameformat) || !lname.match(nameformat)){
        console.log("Invalid first or last name format")
    }
    else{
        //axios.post("https://csi4999-server.herokuapp.com/api/register", {
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