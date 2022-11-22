async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }

    teamid = window.localStorage.getItem('nhlTeamID');
    teamname = window.localStorage.getItem('nhlTeamName');

    document.getElementById('teamname').innerHTML = teamname
}