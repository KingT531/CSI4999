function logout() {
    window.localStorage.setItem('user', "");
    window.location.href = "index.html";
}

async function keeplive() {

    //load user login information
    user = window.localStorage.getItem('user');
    var userelement = document.getElementById('loginstatus');
    if (user != "") {

        //user information
        document.getElementById('loginstatus').innerHTML = user;
        document.getElementById('username').innerHTML = `${user}'s profile`;
        userelement.setAttribute('href', 'profile.html');

        //get user favorites from backend
        //axios.post("https://csi4999-server.herokuapp.com/api/getfavorites", {
        axios.post("http://localhost:3001/api/getfavorites", {
            username: user,
        }).then(function (response) {
            if (response.data[0] != null) {

                //put player and team favorites response from backend into array values
                playerfavs = []
                teamfavs = []
                playerfavs.push(response.data[0].playerfav1)
                playerfavs.push(response.data[0].playerfav2)
                playerfavs.push(response.data[0].playerfav3)
                playerfavs.push(response.data[0].playerfav4)
                playerfavs.push(response.data[0].playerfav5)
                playerfavs.push(response.data[0].playerfav6)
                playerfavs.push(response.data[0].playerfav7)
                playerfavs.push(response.data[0].playerfav8)
                playerfavs.push(response.data[0].playerfav9)
                playerfavs.push(response.data[0].playerfav10)
                teamfavs.push(response.data[0].teamfav1)
                teamfavs.push(response.data[0].teamfav2)
                teamfavs.push(response.data[0].teamfav3)
                teamfavs.push(response.data[0].teamfav4)
                teamfavs.push(response.data[0].teamfav5)
                teamfavs.push(response.data[0].teamfav6)
                teamfavs.push(response.data[0].teamfav7)
                teamfavs.push(response.data[0].teamfav8)
                teamfavs.push(response.data[0].teamfav9)
                teamfavs.push(response.data[0].teamfav10)
                console.log(playerfavs)
                console.log(teamfavs)

                playerfavsports = [null, null, null, null, null, null, null, null, null, null]
                playerfavids = [null, null, null, null, null, null, null, null, null, null]
                playerfavfnames = [null, null, null, null, null, null, null, null, null, null]
                playerfavlnames = [null, null, null, null, null, null, null, null, null, null]
                playerfavteamnames = [null, null, null, null, null, null, null, null, null, null]

                teamfavsports = [null, null, null, null, null, null, null, null, null, null]
                teamfavids = [null, null, null, null, null, null, null, null, null, null]
                teamfavnames = [null, null, null, null, null, null, null, null, null, null]

                //display player favorites
                for (let i = 0; i < 10; i++) {
                    if (playerfavs[i] != null) {
                        switch (playerfavs[i].charAt(0)) {
                            case '1':
                                favcode = playerfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                divider2 = null
                                divider3 = null

                                while (index < favcode.length && count < 3) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    else if (count == 1 && favcode[index] == '#') {
                                        divider2 = index
                                        count = count + 1
                                    }
                                    else if (count == 2 && favcode[index] == '#') {
                                        divider3 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }

                                playerfavid = favcode.substring(1, divider1)
                                playerfavfname = favcode.substring(divider1 + 1, divider2)
                                playerfavlname = favcode.substring(divider2 + 1, divider3)
                                playerfavteam = favcode.substring(divider3 + 1)
                                fullname = `${playerfavfname} ${playerfavlname}`
                                document.getElementById(`playerfav${i + 1}name`).innerHTML = fullname
                                document.getElementById(`playerfav${i + 1}team`).innerHTML = playerfavteam

                                playerfavids[i] = playerfavid
                                playerfavfnames[i] = playerfavfname
                                playerfavlnames[i] = playerfavlname
                                playerfavteamnames[i] = playerfavteam
                                playerfavsports[i] = 1


                                //get player picture

                                //search nba endpoint for id
                                // const searchpic = {
                                //     method: 'GET',
                                //     url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
                                // };

                                //search local json for id
                                const searchpic = {
                                    method: 'GET',
                                    url: 'JSON/nbaplayers.json',
                                };

                                axios.request(searchpic).then(function (response) {
                                    picid = 0
                                    index2 = 0
                                    found = false
                                    while (!found && (response.data.league.standard[index2] != null)) {
                                        if (response.data.league.standard[index2].firstName == playerfavfnames[i] && response.data.league.standard[index2].lastName == playerfavlnames[i]) {
                                            picid = response.data.league.standard[index2].personId
                                            picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                                            document.getElementById(`playerfav${i + 1}pic`).src = picurlfull;
                                            found = true
                                        }
                                        index2 = index2 + 1
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                });
                                break;
                            default:
                        }
                    }
                }

                //display team favorites
                for (let i = 0; i < 10; i++) {
                    if (teamfavs[i] != null) {
                        switch (teamfavs[i].charAt(0)) {
                            case '1':
                                favcode = teamfavs[i]
                                count = 0
                                index = 0
                                divider1 = null
                                while (index < favcode.length && count < 1) {
                                    if (count == 0 && favcode[index] == '#') {
                                        divider1 = index
                                        count = count + 1
                                    }
                                    index = index + 1
                                }
                                teamid = favcode.substring(1, divider1)
                                teamname = favcode.substring(divider1 + 1)
                                document.getElementById(`teamfav${i + 1}name`).innerHTML = teamname
                                picurlfull = `pics/nbateam/${teamid}.png`
                                document.getElementById(`teamfav${i + 1}pic`).src = picurlfull;
                                teamfavsports[i] = 1
                                teamfavids[i] = teamid
                                teamfavnames[i] = teamname
                                break;
                            default:
                        }
                    }
                }
            }
            else {
                console.log("failed to get favorites");
            }
        })

    }
    else {
    }
}

function removeplayerfav1link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep1", {
        axios.post("http://localhost:3001/api/removefavoritep1", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav2link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep2", {
        axios.post("http://localhost:3001/api/removefavoritep2", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav3link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep3", {
        axios.post("http://localhost:3001/api/removefavoritep3", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav4link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep4", {
        axios.post("http://localhost:3001/api/removefavoritep4", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav5link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep5", {
        axios.post("http://localhost:3001/api/removefavoritep5", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav6link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep6", {
        axios.post("http://localhost:3001/api/removefavoritep6", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav7link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep7", {
        axios.post("http://localhost:3001/api/removefavoritep7", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav8link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep8", {
        axios.post("http://localhost:3001/api/removefavoritep8", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav9link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep9", {
        axios.post("http://localhost:3001/api/removefavoritep9", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav10link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritep10", {
        axios.post("http://localhost:3001/api/removefavoritep10", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav1link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet1", {
        axios.post("http://localhost:3001/api/removefavoritet1", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav2link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet2", {
        axios.post("http://localhost:3001/api/removefavoritet2", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav3link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet3", {
        axios.post("http://localhost:3001/api/removefavoritet3", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav4link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet4", {
        axios.post("http://localhost:3001/api/removefavoritet4", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav5link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet5", {
        axios.post("http://localhost:3001/api/removefavoritet5", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav6link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet6", {
        axios.post("http://localhost:3001/api/removefavoritet6", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav7link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet7", {
        axios.post("http://localhost:3001/api/removefavoritet7", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav8link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet8", {
        axios.post("http://localhost:3001/api/removefavoritet8", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav9link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet9", {
        axios.post("http://localhost:3001/api/removefavoritet9", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav10link() {
    if (user != "") {
        //axios.post("https://csi4999-server.herokuapp.com/api/removefavoritet10", {
        axios.post("http://localhost:3001/api/removefavoritet10", {
            username: user,
        }).then(function (response) {

        });
    }
}

function playerfav1link() {
    switch (playerfavsports[0]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[0]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[0]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[0]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[0]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav2link() {
    switch (playerfavsports[1]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[1]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[1]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[1]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[1]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav3link() {
    switch (playerfavsports[2]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[2]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[2]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[2]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[2]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav4link() {
    switch (playerfavsports[3]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[3]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[3]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[3]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[3]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav5link() {
    switch (playerfavsports[4]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[4]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[4]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[4]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[4]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav6link() {
    switch (playerfavsports[5]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[5]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[5]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[5]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[5]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav7link() {
    switch (playerfavsports[6]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[6]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[6]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[6]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[6]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav8link() {
    switch (playerfavsports[7]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[7]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[7]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[7]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[7]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav9link() {
    switch (playerfavsports[8]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[8]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[8]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[8]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[8]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function playerfav10link() {
    switch (playerfavsports[9]) {
        case 1:
            window.localStorage.setItem('nbaplayerID', playerfavids[9]);
            window.localStorage.setItem('nbaplayerFN', playerfavfnames[9]);
            window.localStorage.setItem('nbaplayerLN', playerfavlnames[9]);
            window.localStorage.setItem('nbaplayerTeam', playerfavteamnames[9]);
            window.location.href = "nbaplayerstats.html";
            break;
        default:
    }
}

function teamfav1link() {
    switch (teamfavsports[0]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[0]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[0]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav2link() {
    switch (teamfavsports[1]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[1]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[1]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav3link() {
    switch (teamfavsports[2]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[2]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[2]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav4link() {
    switch (teamfavsports[3]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[3]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[3]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav5link() {
    switch (teamfavsports[4]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[4]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[4]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav6link() {
    switch (teamfavsports[5]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[5]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[5]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav7link() {
    switch (teamfavsports[6]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[6]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[6]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav8link() {
    switch (teamfavsports[7]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[7]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[7]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav9link() {
    switch (teamfavsports[8]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[8]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[8]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

function teamfav10link() {
    switch (teamfavsports[9]) {
        case 1:
            window.localStorage.setItem('nbaTeamID', teamfavids[9]);
            window.localStorage.setItem('nbaTeamName', teamfavnames[9]);
            window.location.href = "nbateamstats.html";
            break;
        default:
    }
}

