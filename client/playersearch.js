async function searchplayers() {

    //clear old values
    playerhtml = ['playername1', 'playername2', 'playername3', 'playername4', 'playername5', 'playername6', 'playername7', 'playername8']
    teamhtml = ['team1', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7', 'team8']
    buttonhtml = ['profile1', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6', 'profile7', 'profile8']
    pichtml = ['playerpic1', 'playerpic2', 'playerpic3', 'playerpic4', 'playerpic5', 'playerpic6', 'playerpic7', 'playerpic8']
    stat1html = ['1stat1', '2stat1', '3stat1', '4stat1', '5stat1', '6stat1', '7stat1', '8stat1']
    stat2html = ['1stat2', '2stat2', '3stat2', '4stat2', '5stat2', '6stat2', '7stat2', '8stat2']
    stat3html = ['1stat3', '2stat3', '3stat3', '4stat3', '5stat3', '6stat3', '7stat3', '8stat3']
    stat4html = ['1stat4', '2stat4', '3stat4', '4stat4', '5stat4', '6stat4', '7stat4', '8stat4']
    searchprofileID = [null, null, null, null, null, null, null, null]
    searchprofileFN = [null, null, null, null, null, null, null, null]
    searchprofileLN = [null, null, null, null, null, null, null, null]
    searchprofileTeam = [null, null, null, null, null, null, null, null]
    document.getElementById('searchresult').innerHTML = ""
    for (let i = 0; i < 8; i++) {
        document.getElementById(playerhtml[i]).style.visibility = "hidden";
        document.getElementById(teamhtml[i]).style.visibility = "hidden";
        document.getElementById(buttonhtml[i]).style.visibility = "hidden";
        document.getElementById(pichtml[i]).style.visibility = "hidden";
        document.getElementById(stat1html[i]).style.visibility = "hidden";
        document.getElementById(stat2html[i]).style.visibility = "hidden";
        document.getElementById(stat3html[i]).style.visibility = "hidden";
        document.getElementById(stat4html[i]).style.visibility = "hidden";
        document.getElementById(`divp${i + 1}`).style.display = "none";
    }

    //get input search box text
    const searchreq = document.getElementById('search').value


    //API and logic for nba player search
    nba = false;
    nfl = false;
    nhl = false
    if (document.getElementById('radioNBA').checked) {
        nba = true;
    }
    else if (document.getElementById('radioNFL').checked) {
        nfl = true;
    }
    else if (document.getElementById('radioNHL').checked) {
        nhl = true;
    }

    if (nba) {
        window.localStorage.setItem('playersearchsport', 0);
        //search for players using input name
        const searchplayers = {
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/players',
            //url: 'https://www.balldontlie.io/api/v1/players',
            params: { search: searchreq, per_page: 100 },
            headers: {
                'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        };

        axios.request(searchplayers).then(function (response) {

            //get list of players id's using input search
            index = 0
            allPlayersID = []
            allPlayersFN = []
            allPlayersLN = []
            allPlayersTeam = []
            while (response.data.data[index] != null) {
                allPlayersID.push(response.data.data[index].id)
                allPlayersFN.push(response.data.data[index].first_name)
                allPlayersLN.push(response.data.data[index].last_name)
                allPlayersTeam.push(response.data.data[index].team.full_name)
                index = index + 1
            }
            //get 2022 data from all players in allPlayersID
            const searchcurrentplayers = {
                method: 'GET',
                url: 'https://www.balldontlie.io/api/v1/season_averages',
                params: { player_ids: allPlayersID, season: 2022, per_page: 100 },
            };

            //get ID's of players who have 2022 season data and combine with previous results
            axios.request(searchcurrentplayers).then(function (response) {
                index = 0
                playersID = []
                //avg pts
                stat1 = []
                //reb
                stat2 = []
                //assists
                stat3 = []
                //3pts
                stat4 = []
                playersFullname = [null, null, null, null, null, null, null, null]
                playersTeams = [null, null, null, null, null, null, null, null]
                playersFirstName = [null, null, null, null, null, null, null, null]
                playersLastName = [null, null, null, null, null, null, null, null]
                while (index < 8 && response.data.data[index] != null) {
                    playersID.push(response.data.data[index].player_id)
                    stat1.push(response.data.data[index].pts)
                    stat2.push(response.data.data[index].reb)
                    stat3.push(response.data.data[index].ast)
                    stat4.push((response.data.data[index].fg3_pct * 100).toFixed(2))
                    index = index + 1
                }
                //fill html with player data
                if (playersID.length == 0) {
                    document.getElementById('searchresult').innerHTML = "No Search Results Found"
                }
                for (let i = 0; i < playersID.length; i++) {
                    found = false
                    index = 0
                    while (!found) {
                        if (playersID[i] == allPlayersID[index]) {
                            playersFirstName[i] = allPlayersFN[index]
                            playersLastName[i] = allPlayersLN[index]
                            playersFullname[i] = `${playersFirstName[i]} ${playersLastName[i]}`
                            playersTeams[i] = allPlayersTeam[index]
                            document.getElementById(playerhtml[i]).innerHTML = playersFullname[i]
                            document.getElementById(playerhtml[i]).style.visibility = "visible";
                            document.getElementById(teamhtml[i]).innerHTML = playersTeams[i]
                            document.getElementById(teamhtml[i]).style.visibility = "visible";
                            document.getElementById(buttonhtml[i]).style.visibility = "visible";
                            document.getElementById(pichtml[i]).style.visibility = "visible";
                            document.getElementById(stat1html[i]).innerHTML = stat1[i]
                            document.getElementById(stat1html[i]).style.visibility = "visible";
                            document.getElementById(stat2html[i]).innerHTML = stat2[i]
                            document.getElementById(stat2html[i]).style.visibility = "visible";
                            document.getElementById(stat3html[i]).innerHTML = stat3[i]
                            document.getElementById(stat3html[i]).style.visibility = "visible";
                            document.getElementById(stat4html[i]).innerHTML = stat4[i]
                            document.getElementById(stat4html[i]).style.visibility = "visible";
                            searchprofileID[i] = playersID[i]
                            searchprofileFN[i] = playersFirstName[i]
                            searchprofileLN[i] = playersLastName[i]
                            searchprofileTeam[i] = playersTeams[i]
                            found = true
                            document.getElementById(`divp${i + 1}`).style.display = "block"
                        }
                        index = index + 1
                    }
                }

                //search for player id from nba endpoint
                // const searchpic = {
                //     method: 'GET',
                //     url: 'http://data.nba.net/data/10s/prod/v1/2022/players.json',
                // };

                //search for player id from local endpoint
                const searchpic = {
                    method: 'GET',
                    url: 'JSON/nbaplayers.json',
                };

                axios.request(searchpic).then(function (response) {
                    for (let i = 0; i < playersID.length; i++) {
                        firstname = playersFirstName[i]
                        lastname = playersLastName[i]
                        picid = 0
                        index2 = 0
                        found = false
                        while (!found && (response.data.league.standard[index2] != null)) {
                            //console.log(response.data.league.standard[index].firstName)
                            if (response.data.league.standard[index2].firstName == firstname && response.data.league.standard[index2].lastName == lastname) {
                                picid = response.data.league.standard[index2].personId
                                picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                                document.getElementById(`playerpic${i + 1}`).src = picurlfull;
                                found = true
                            }
                            index2 = index2 + 1
                        }
                    }
                }).catch(function (error) {
                    console.error(error);
                });
            });
        }).catch(function (error) {
            console.error(error);
        });
    }

    //API and logic for NHL data
    else if (nhl) {
        window.localStorage.setItem('playersearchsport', 2);
        //find team names and id
        nhlteamnames = []
        for (let i = 0; i < 56; i++) {
            nhlteamnames.push(null)
        }
        const nhlteams = {
            method: 'GET',
            url: 'JSON/nhlteams.json',
        };
        axios.request(nhlteams).then(function (response) {
            i = 0
            nhlteamid = 1
            while (i < 32) {
                if (nhlteamid == 11) {
                    nhlteamid = 12
                }
                else if (nhlteamid == 27) {
                    nhlteamid = 28
                }
                else if (nhlteamid == 31) {
                    nhlteamid = 52
                }
                nhlteamnames[nhlteamid] = response.data.teams[i].name
                i = i + 1
                nhlteamid = nhlteamid + 1
            }

            //search for players
            iteamid = 1
            playercount = 0
            while (iteamid < 56 && playercount < 8) {
                if (iteamid == 11) {
                    iteamid = 12
                }
                else if (iteamid == 27) {
                    iteamid = 28
                }
                else if (iteamid == 31) {
                    iteamid = 52
                }
                currentid = iteamid
                const playersearch = {
                    method: 'GET',
                    url: `https://statsapi.web.nhl.com/api/v1/teams/${currentid}/roster`,
                };
                axios.request(playersearch).then(function (response) {
                    iteamplayer = 0
                    while (iteamplayer < response.data.roster.length && playercount < 8) {
                        if (response.data.roster[iteamplayer].person.fullName.toLowerCase().includes(searchreq.toLowerCase())) {
                            teamid = response.data.link.substring(14, 16);
                            if (teamid.charAt(1) == '/') {
                                teamid = teamid.substring(0, 1);
                            }
                            document.getElementById(playerhtml[playercount]).innerHTML = response.data.roster[iteamplayer].person.fullName
                            document.getElementById(playerhtml[playercount]).style.visibility = "visible";
                            document.getElementById(teamhtml[playercount]).innerHTML = nhlteamnames[teamid]
                            document.getElementById(teamhtml[playercount]).style.visibility = "visible";
                            document.getElementById(buttonhtml[playercount]).style.visibility = "visible";
                            document.getElementById(pichtml[playercount]).style.visibility = "visible";
                            document.getElementById(stat1html[playercount]).innerHTML = "placeholder"
                            document.getElementById(stat1html[playercount]).style.visibility = "visible";
                            document.getElementById(stat2html[playercount]).innerHTML = "placeholder"
                            document.getElementById(stat2html[playercount]).style.visibility = "visible";
                            document.getElementById(stat3html[playercount]).innerHTML = "placeholder"
                            document.getElementById(stat3html[playercount]).style.visibility = "visible";
                            document.getElementById(stat4html[playercount]).innerHTML = "placeholder"
                            document.getElementById(stat4html[playercount]).style.visibility = "visible";
                            searchprofileID[playercount] = response.data.roster[iteamplayer].person.id
                            searchprofileFN[playercount] = response.data.roster[iteamplayer].person.fullName
                            searchprofileTeam[playercount] = nhlteamnames[teamid]
                            document.getElementById(`divp${playercount + 1}`).style.display = "block"
                            playercount = playercount + 1

                        }
                        iteamplayer = iteamplayer + 1
                    }
                }).catch(function (error) {
                    console.error(error);
                });
                iteamid = iteamid + 1
            }
        }).catch(function (error) {
            console.error(error);
        });

    }

    //API and logic for NFL data
    else if (nfl) {
        //on hold
    }

}

async function profile1() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[0]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[0]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[0]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[0]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[0]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[0]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[0]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile2() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[1]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[1]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[1]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[1]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[1]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[1]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[1]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile3() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[2]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[2]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[2]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[2]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[2]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[2]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[2]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile4() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[3]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[3]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[3]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[3]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[3]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[3]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[3]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile5() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[4]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[4]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[4]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[4]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[4]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[4]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[4]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile6() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[5]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[5]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[5]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[5]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[5]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[5]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[5]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile7() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[6]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[6]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[6]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[6]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[6]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[6]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[6]);
        window.location.href = "nhlplayerstats.html";
    }
}

async function profile8() {
    if (window.localStorage.getItem('playersearchsport') == 0) {
        window.localStorage.setItem('nbaplayerID', searchprofileID[7]);
        window.localStorage.setItem('nbaplayerFN', searchprofileFN[7]);
        window.localStorage.setItem('nbaplayerLN', searchprofileLN[7]);
        window.localStorage.setItem('nbaplayerTeam', searchprofileTeam[7]);
        window.location.href = "nbaplayerstats.html";
    }
    else if (window.localStorage.getItem('playersearchsport') == 2) {
        window.localStorage.setItem('nhlplayerID', searchprofileID[7]);
        window.localStorage.setItem('nhlplayerTeam', searchprofileTeam[7]);
        window.localStorage.setItem('nhlplayerFN', searchprofileFN[7]);
        window.location.href = "nhlplayerstats.html";
    }
}