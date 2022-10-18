async function keeplive(){


        //load user login information
    // user = window.localStorage.getItem('user');
    // if(user != ""){
    //     document.getElementById('status').innerHTML = "Logged In as " + user;
    //     document.getElementById("logoutbutton").style.visibility  = "visible";
    //     document.getElementById("status").style.visibility  = "visible";
    // }
    // else{
    //     document.getElementById("logoutbutton").style.visibility  = "hidden";
    //     document.getElementById("status").style.visibility  = "hidden";
    //     document.getElementById('status').innerHTML = "";
    // }


        //get localstorage data
    window.localStorage.setItem('NbaPlayerId', 237);
    playerid = [window.localStorage.getItem('NbaPlayerId')]
    window.localStorage.setItem('NbaPlayerFirst', "Kevin");
    playerfirst = [window.localStorage.getItem('NbaPlayerFirst')]
    window.localStorage.setItem('NbaPlayerLast', "Durant");
    playerlast = [window.localStorage.getItem('NbaPlayerLast')]
    playername = `${playerfirst} ${playerlast}`
    window.localStorage.setItem('NbaPlayerTeam', "placeholder team");
    playerteam = window.localStorage.getItem('NbaPlayerTeam')
    document.getElementById('teamname').innerHTML = playerteam
    document.getElementById('playername').innerHTML = playername


        //find player image
    const searchpic = {
        method: 'GET',
        url: 'http://data.nba.net/data/10s/prod/v1/2021/players.json',
    };

    axios.request(searchpic).then(function (response) {
        firstname = playerfirst
        lastname = playerlast
        picid = 0
        i = 0
        found = false
        while(!found && (response.data.league.standard[i] != null)){
            //console.log(response.data.league.standard[index].firstName)
            if(response.data.league.standard[i].firstName == firstname && response.data.league.standard[i].lastName == lastname){
                picid = response.data.league.standard[i].personId
                picurlfull = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${picid}.png`
                document.getElementById('playerpic').src = picurlfull;
                found = true
            }
            i = i + 1
        }
    }).catch(function (error) {
        console.error(error);
    });


        //find player stats
    const season = 2021
    //const searchreq = document.getElementById('searchstat').value
    const getseasonaverage = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/season_averages',
        params: {season: season, player_ids: playerid},
    };

    //array of season stats
    gp = [null]
    pts = [null]
    min = [null]
    fg = [null]
    p3 = [null]
    ft = [null]
    reb = [null]
    ast = [null]
    blk = [null]
    stl = [null]
    pf = [null]
    to = [null]

    //2d array of season stats and season year
    xyPoints = []
    xyMIN = []
    xyFG = []
    xyP3 = []
    xyFT = []
    xyReb = []
    xyAST = []
    xyBLK = []
    xySTL = []
    xyPF = []
    xyTO = []

    axios.request(getseasonaverage).then(function (response) {
    if(response.data.data.length != 0){
        //console.log(response)
        gp[0] = response.data.data[0].games_played
        pts[0] = response.data.data[0].pts
        min[0] = response.data.data[0].min
        fg[0] = response.data.data[0].fg_pct
        p3[0] = response.data.data[0].fg3_pct
        ft[0] = response.data.data[0].ft_pct
        reb[0] = response.data.data[0].reb
        ast[0] = response.data.data[0].ast
        blk[0] = response.data.data[0].blk
        stl[0] = response.data.data[0].stl
        pf[0] = response.data.data[0].pf
        to[0] = response.data.data[0].turnover

        xyPoints.push({x:season, y:pts[0]})
        xyMIN.push({x:season, y:min[0]})
        xyFG.push({x:season, y:fg[0]})
        xyP3.push({x:season, y:p3[0]})
        xyFT.push({x:season, y:ft[0]})
        xyReb.push({x:season, y:reb[0]})
        xyAST.push({x:season, y:ast[0]})
        xyBLK.push({x:season, y:blk[0]})
        xySTL.push({x:season, y:stl[0]})
        xyPF.push({x:season, y:pf[0]})
        xyTO.push({x:season, y:to[0]})

        document.getElementById('playerstatGP').innerHTML = `Games Played: ${gp[0]}`
        document.getElementById('playerstatPTS').innerHTML = `PTS: ${pts[0]}`
        document.getElementById('playerstatMIN').innerHTML = `MIN: ${min[0]}`
        document.getElementById('playerstatFG').innerHTML = `FG%: ${fg[0]}`
        document.getElementById('playerstat3P').innerHTML = `3PT%: ${p3[0]}`
        document.getElementById('playerstatFT').innerHTML = `FT: ${ft[0]}`
        document.getElementById('playerstatREB').innerHTML = `REB: ${reb[0]}`
        document.getElementById('playerstatAST').innerHTML = `AST: ${ast[0]}`
        document.getElementById('playerstatBLK').innerHTML = `BLK: ${blk[0]}`
        document.getElementById('playerstatSTL').innerHTML = `STL: ${stl[0]}`
        document.getElementById('playerstatPF').innerHTML = `PF: ${pf[0]}`
        document.getElementById('playerstatTO').innerHTML = `TO: ${to[0]}`
    }
    else{
        document.getElementById('playerstatGP').innerHTML = "Stats not available"
        document.getElementById('playerstatPTS').innerHTML = ""
        document.getElementById('playerstatMIN').innerHTML = ""
        document.getElementById('playerstatFG').innerHTML = ""
        document.getElementById('playerstat3P').innerHTML = ""
        document.getElementById('playerstatFT').innerHTML = ""
        document.getElementById('playerstatREB').innerHTML = ""
        document.getElementById('playerstatAST').innerHTML = ""
        document.getElementById('playerstatBLK').innerHTML = ""
        document.getElementById('playerstatSTL').innerHTML = ""
        document.getElementById('playerstatPF').innerHTML = ""
        document.getElementById('playerstatTO').innerHTML = ""
        
    }
    seasons = [2020,2019,2018,2017]
    index = 0
    end = 0
    while(index < 4){
        index = index + 1
        const getseasonaverage = {
            method: 'GET',
            url: 'https://www.balldontlie.io/api/v1/season_averages',
            params: {season: seasons[index-1], player_ids: playerid},
        };
        axios.request(getseasonaverage).then(function (response) {
            if(response.data.data.length != 0){

                iseason = seasons[end]
                ipoints = response.data.data[0].pts
                imin = response.data.data[0].min
                ifg = response.data.data[0].fg_pct
                ip3 = response.data.data[0].fg3_pct
                ift = response.data.data[0].ft_pct
                ireb = response.data.data[0].reb
                iast = response.data.data[0].ast
                iblk = response.data.data[0].blk
                istl = response.data.data[0].stl
                ipf = response.data.data[0].pf
                ito = response.data.data[0].turnover

                xyPoints.unshift({x:iseason, y:ipoints})
                xyMIN.unshift({x:iseason, y:imin})
                xyFG.unshift({x:iseason, y:ifg})
                xyP3.unshift({x:iseason, y:ip3})
                xyFT.unshift({x:iseason, y:ift})
                xyReb.unshift({x:iseason, y:ireb})
                xyAST.unshift({x:iseason, y:iast})
                xyBLK.unshift({x:iseason, y:iblk})
                xySTL.unshift({x:iseason, y:istl})
                xyPF.unshift({x:iseason, y:ipf})
                xyTO.unshift({x:iseason, y:ito})
            }
            seasoni = seasons[end]
            end = end + 1
            if(end == 4){
                new Chart("ChartPTS", {
                type: "scatter",
                data: {
                    datasets: [{
                    pointRadius: 4,
                    pointBackgroundColor: "rgba(0,0,255,1)",
                    data: xyPoints
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Average Points per Season'
                    }
                }
                });
                new Chart("ChartMIN", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyMIN
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average MIN per Season'
                        }
                    }
                });
                new Chart("ChartFG", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyFG
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average FG% per Season'
                        }
                    }
                });
                new Chart("Chart3P", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyP3
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average 3P% per Season'
                        }
                    }
                });
                new Chart("ChartFT", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyFT
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average FT% per Season'
                        }
                    }
                });
                new Chart("ChartREB", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyReb
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average REB per Season'
                        }
                    }
                });
                new Chart("ChartAST", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyAST
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average AST per Season'
                        }
                    }
                });
                new Chart("ChartBLK", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyBLK
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average BLK per Season'
                        }
                    }
                });
                new Chart("ChartSTL", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xySTL
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average STL per Season'
                        }
                    }
                });
                new Chart("ChartPF", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyPF
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average PF per Season'
                        }
                    }
                });
                new Chart("ChartTO", {
                    type: "scatter",
                    data: {
                        datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgba(0,0,255,1)",
                        data: xyTO
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Average TO per Season'
                        }
                    }
                });
            }
            
            }).catch(function (error) {
                console.error(error);
            });
        }
    }).catch(function (error) {
        console.error(error);
    });
}

async function favorite(){
    window.localStorage.setItem('user', 'daw');
    username = window.localStorage.getItem('user');
    fav = `1${playerid}`
    //axios.post("https://csi4999-server.herokuapp.com/api/favoriteplayer", {
    axios.post("http://localhost:3001/api/favoriteplayer", {    
        username: username,
        favorite: fav,
    }).then(function(response){
        if (response.data.favoriteRes){
            console.log("succeeded to add favorite")
        }
        else if (!response.data.favoriteRes){
            document.getElementById('favmessage').innerHTML = "Favorites List is full!"
            console.log("Failed to add favorite")
        }
        else{
            document.getElementById('favmessage').innerHTML = "Not Logged In!"
            console.log("error");
        }
    })
}