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

        //user favorites
        //axios.post("https://csi4999-server.herokuapp.com/api/favoriteplayer", {
        axios.post("http://localhost:3001/api/getfavorites", {
            username: user,
        }).then(function (response) {
            if (response.data[0] != null) {

                playerfavfnames = []
                playerfavlnames = []

                //put player and team favorites into array
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
                console.log(playerfavs)
                console.log(teamfavs)

                //loop through player favorites and call api
                for (let i = 0; i < 10; i++) {
                    if (playerfavs[i] != null) {
                        switch (playerfavs[i].charAt(0)) {
                            case '1':
                                nbapid = playerfavs[i].substring(1)
                                const searchplayers = {
                                    method: 'GET',
                                    url: `https://free-nba.p.rapidapi.com/players/${nbapid}`,
                                    //url: 'https://www.balldontlie.io/api/v1/players',
                                    headers: {
                                        'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                                        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                                    }
                                };
                                axios.request(searchplayers).then(function (response) {

                                    //get player name
                                    playerfavfnames.push(response.data.first_name)
                                    playerfavlnames.push(response.data.last_name)
                                    fullname = `${response.data.first_name} ${response.data.last_name}`
                                    document.getElementById(`playerfav${i + 1}name`).innerHTML = fullname

                                    //search for player pics
                                    const searchpic = {
                                        method: 'GET',
                                        url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
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
                                }).catch(function (error) {
                                    console.error(error);
                                });
                                break;
                            default:
                        }
                    }
                }

                //loop through team favorites and call api
                for (let i = 0; i < 5; i++) {
                    if (teamfavs[i] != null) {
                        switch (teamfavs[i].charAt(0)) {
                            case '1':
                                nbatid = teamfavs[i].substring(1)
                                picurlfull = `pics/nbateam/${teamfavs[i].substring(1)}.png`
                                document.getElementById(`teamfav${i + 1}pic`).src = picurlfull;
                                const searchteams = {
                                    method: 'GET',
                                    url: `https://free-nba.p.rapidapi.com/teams/${nbatid}`,
                                    headers: {
                                        'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                                        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                                    }
                                };

                                axios.request(searchteams).then(function (response) {
                                    console.log(response)
                                    document.getElementById(`teamfav${i + 1}name`).innerHTML = response.data.full_name;
                                });
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
        axios.post("http://localhost:3001/api/removefavoritep1", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav2link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep2", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav3link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep3", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav4link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep4", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav5link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep5", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav6link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep6", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav7link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep7", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav8link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep8", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav9link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep9", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeplayerfav10link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritep10", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav1link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritet1", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav2link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritet2", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav3link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritet3", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav4link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritet4", {
            username: user,
        }).then(function (response) {

        });
    }
}

function removeteamfav5link() {
    if (user != "") {
        axios.post("http://localhost:3001/api/removefavoritet5", {
            username: user,
        }).then(function (response) {

        });
    }
}

function playerfav1link() {

}

function playerfav2link() {

}

function playerfav3link() {

}

function playerfav4link() {

}

function playerfav5link() {

}

function playerfav6link() {

}

function playerfav7link() {

}

function playerfav8link() {

}

function playerfav9link() {

}

function playerfav10link() {

}

function teamfav1link() {

}

function teamfav2link() {

}

function teamfav3link() {

}

function teamfav4link() {

}

function teamfav5link() {

}

