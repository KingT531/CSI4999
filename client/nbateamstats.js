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

    const teamid = window.localStorage.getItem('nbaTeamID');
    const teamname = window.localStorage.getItem('nbaTeamName');
    document.getElementById('teamname').innerHTML = teamname

        //date format YYYY-MM-DD'
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd;

    const gamessearch = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {seasons: [2022], team_ids: [teamid], end_date: today, per_page: 100},
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
        winrate = (((win*1.0) / games*1.0)*100).toFixed(2)
        document.getElementById('winrate').innerHTML = `Winrate: ${winrate}%`

    }).catch(function (error) {
        console.error(error);
    });

}