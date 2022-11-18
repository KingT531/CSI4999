
//navigation header logged in/logged out status display
async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('loginstatus').innerHTML = user;
        userelement.setAttribute('href', 'profile.html');
    }
    else {
    }

}