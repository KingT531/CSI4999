async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "" && user != null) {
        document.getElementById('navbutton').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');
    }

    playerid = window.localStorage.getItem('nhlplayerID');
    playerteam = window.localStorage.getItem('nhlplayerTeam');
    playername = window.localStorage.getItem('nhlplayerFN',);

    document.getElementById('teamname').innerHTML = playerteam
    document.getElementById('playername').innerHTML = playername


    picurl = `https://nhl.bamcontent.com/images/headshots/current/168x168/${playerid}.jpg`
    document.getElementById('playerpic').src = picurl;

}