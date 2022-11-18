
async function searchteams() {

    //clear old values
    teamhtml = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8']
    buttonhtml = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6', 'profile7', 'profile8']
    pichtml = ['teampic1', 'teampic2', 'teampic3', 'teampic4', 'teampic5', 'teampic6', 'teampic7', 'teampic8']
    searchprofileID = [null, null, null, null, null, null, null, null]
    searchprofileTeam = [null, null, null, null, null, null, null, null]
    for (let i = 0; i < 8; i++) {
        document.getElementById(teamhtml[i]).style.visibility = "hidden";
        document.getElementById(buttonhtml[i]).style.visibility = "hidden";
        document.getElementById(pichtml[i]).style.visibility = "hidden";
    }

    //get input search box text
    const search = document.getElementById('search').value

    //Switches search type depending on sport filter
    nba = false;
    nfl = false;
    if (document.getElementById('radioNBA').checked) {
        nba = true;
    }
    else if (document.getElementById('radioNFL').checked) {
        nfl = true;
    }

    //API and logic for NBA teams
    if (nba) {
        window.localStorage.setItem('teamsearchsport', 0);
        const searchteams = {
            method: 'GET',
            url: 'https://www.balldontlie.io/api/v1/teams',
            params: { per_page: 50 },
            // headers: {
            //     'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
            //     'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            // }
        };

        axios.request(searchteams).then(function (response) {
            teamsID = []
            teamsNames = []
            index = 0
            indexMatch = 0
            while (response.data.data[index] != null && indexMatch < 8) {
                if (response.data.data[index].full_name.toLowerCase().includes(search.toLowerCase())) {
                    teamsID.push(response.data.data[index].id)
                    teamsNames.push(response.data.data[index].full_name)
                    document.getElementById(teamhtml[indexMatch]).innerHTML = response.data.data[index].full_name
                    document.getElementById(teamhtml[indexMatch]).style.visibility = "visible";
                    picurlfull = `pics/nbateam/${response.data.data[index].id}.png`
                    document.getElementById(pichtml[indexMatch]).src = picurlfull;
                    document.getElementById(pichtml[indexMatch]).style.visibility = "visible";
                    document.getElementById(buttonhtml[indexMatch]).style.visibility = "visible";
                    document.getElementById(`divt${indexMatch + 1}`).style.display = "block"
                    indexMatch = indexMatch + 1
                }
                index = index + 1
            }
        });
    }

    //API and logic for searching NFL teams
    else if (nfl) {
        window.localStorage.setItem('teamsearchsport', 1);
        const teamsearch = {
            method: 'GET',
            url: 'https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2022',
            headers: {
                'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
            }
        };

        axios.request(teamsearch).then(function (response) {
            teamsID = []
            teamsNames = []
            itotal = 0
            itoadd = 0
            while (itotal < response.data._embedded.teamWinStatsList.length && itoadd < 8) {
                if (response.data._embedded.teamWinStatsList[itotal].name.toLowerCase().includes(search.toLowerCase())) {
                    teamsNames.push(response.data._embedded.teamWinStatsList[itotal].name)
                    document.getElementById(teamhtml[itoadd]).innerHTML = response.data._embedded.teamWinStatsList[itotal].name
                    document.getElementById(teamhtml[itoadd]).style.visibility = "visible";
                    teamsID.push(itotal)
                    picurlfull = "pics/no-image.jpg"
                    document.getElementById(pichtml[itoadd]).src = picurlfull;
                    document.getElementById(pichtml[itoadd]).style.visibility = "visible";
                    document.getElementById(buttonhtml[itoadd]).style.visibility = "visible";
                    itoadd = itoadd + 1
                }
                itotal = itotal + 1
            }
        }).catch(function (error) {
            console.error(error);
        });
    }


}

async function profile1() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[0]);
        window.localStorage.setItem('nbaTeamName', teamsNames[0]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[0]);
        window.localStorage.setItem('nflTeamName', teamsNames[0]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile2() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[1]);
        window.localStorage.setItem('nbaTeamName', teamsNames[1]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[1]);
        window.localStorage.setItem('nflTeamName', teamsNames[1]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile3() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[2]);
        window.localStorage.setItem('nbaTeamName', teamsNames[2]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[2]);
        window.localStorage.setItem('nflTeamName', teamsNames[2]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile4() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[3]);
        window.localStorage.setItem('nbaTeamName', teamsNames[3]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[3]);
        window.localStorage.setItem('nflTeamName', teamsNames[3]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile5() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[4]);
        window.localStorage.setItem('nbaTeamName', teamsNames[4]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[4]);
        window.localStorage.setItem('nflTeamName', teamsNames[4]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile6() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[5]);
        window.localStorage.setItem('nbaTeamName', teamsNames[5]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[5]);
        window.localStorage.setItem('nflTeamName', teamsNames[5]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile7() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[6]);
        window.localStorage.setItem('nbaTeamName', teamsNames[6]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[6]);
        window.localStorage.setItem('nflTeamName', teamsNames[6]);
        window.location.href = "nflteamstats.html";
    }
}

async function profile8() {
    if (window.localStorage.getItem('teamsearchsport') == 0) {
        window.localStorage.setItem('nbaTeamID', teamsID[7]);
        window.localStorage.setItem('nbaTeamName', teamsNames[7]);
        window.location.href = "nbateamstats.html";
    }
    else if (window.localStorage.getItem('teamsearchsport') == 1) {
        window.localStorage.setItem('nflTeamID', teamsID[7]);
        window.localStorage.setItem('nflTeamName', teamsNames[7]);
        window.location.href = "nflteamstats.html";
    }
}

