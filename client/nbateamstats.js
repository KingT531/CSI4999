async function keeplive(){

     //load user login information
     user = window.localStorage.getItem('user');
     var userelement = document.getElementById('loginstatus');
     if(user != ""){
         document.getElementById('loginstatus').innerHTML = user;
         userelement.setAttribute('href', 'profile.html');
     }
     else{
     }

const teamsearch = {
    method: 'GET',
    url: 'https://www.balldontlie.io/api/v1/teams',
};

axios.request(teamsearch).then(function (response) {
    teamname = "team placeholder"
    document.getElementById('teamname').innerHTML = teamname
    console.log(response)


}).catch(function (error) {
    console.error(error);
});

const gamessearch = {
    method: 'GET',
    url: 'https://www.balldontlie.io/api/v1/games',
    params: {seasons: [2021], team_ids: [1], per_page: 100},
};

axios.request(gamessearch).then(function (response) {

    console.log(response)
    games = 0
    win = 0
    lost = 0
    index = 0
    while(index < response.data.data.length){
        if(response.data.data[index].home_team_score > response.data.data[index].visitor_team_score){
            win = win + 1
        }
        else{
            lost = lost + 1
        }
        index = index + 1
    }
    games = win + lost
    document.getElementById('gamesplayed').innerHTML = `Games Played: ${games}`
    document.getElementById('gameswon').innerHTML = `Won: ${win}`
    document.getElementById('gameslost').innerHTML = `Lost: ${lost}`
    winrate = ((win*1.0) / lost+win).toFixed(2)
    document.getElementById('winrate').innerHTML = `Winrate: ${winrate}%`

}).catch(function (error) {
    console.error(error);
});



}