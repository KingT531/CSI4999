
async function searchteams(){

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

        //search for players using input name
    const searchteams = {
        method: 'GET',
        url: 'https://www.balldontlie.io/api/v1/teams',
        params: {per_page: 50},
        // headers: {
        //     'X-RapidAPI-Key': '9c4416de73msha577cfcfd547904p12fe47jsn52713b65c4ce',
        //     'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        // }
    };

    axios.request(searchteams).then(function (response) {
        i = 0
        while(response.data.data[i] != null){
            console.log(`${response.data.data[i].full_name}: ${response.data.data[i].id}`)
            i = i + 1
        }
        teamsID = []
        teamsNames = []
        index = 0
        indexMatch = 0
        while(response.data.data[index] != null && indexMatch < 8){
            if(response.data.data[index].full_name.toLowerCase().includes(search.toLowerCase())){
                teamsID.push(response.data.data[index].id)
                teamsNames.push(response.data.data[index].full_name)
                document.getElementById(teamhtml[indexMatch]).innerHTML = response.data.data[index].full_name
                document.getElementById(teamhtml[indexMatch]).style.visibility = "visible";
                picurlfull = ""
                document.getElementById(pichtml[indexMatch]).src = picurlfull;
                document.getElementById(pichtml[indexMatch]).style.visibility = "visible";
                document.getElementById(buttonhtml[indexMatch]).style.visibility = "visible";
                indexMatch = indexMatch + 1
            }
            index = index + 1
        }
    });

}

async function profile1(){
    window.localStorage.setItem('nbaTeamID', teamsID[0]);
    window.localStorage.setItem('nbaTeamName', teamsNames[0]);
    window.location.href = "nbateamstats.html";
}

async function profile2(){
    window.localStorage.setItem('nbaTeamID', teamsID[1]);
    window.localStorage.setItem('nbaTeamName', teamsNames[1]);
    window.location.href = "nbateamstats.html";
}

async function profile3(){
    window.localStorage.setItem('nbaTeamID', teamsID[2]);
    window.localStorage.setItem('nbaTeamName', teamsNames[2]);
    window.location.href = "nbateamstats.html";
}

async function profile4(){
    window.localStorage.setItem('nbaTeamID', teamsID[3]);
    window.localStorage.setItem('nbaTeamName', teamsNames[3]);
    window.location.href = "nbateamstats.html";
}

async function profile5(){
    window.localStorage.setItem('nbaTeamID', teamsID[4]);
    window.localStorage.setItem('nbaTeamName', teamsNames[4]);
    window.location.href = "nbateamstats.html";
}

async function profile6(){
    window.localStorage.setItem('nbaTeamID', teamsID[5]);
    window.localStorage.setItem('nbaTeamName', teamsNames[5]);
    window.location.href = "nbateamstats.html";
}

async function profile7(){
    window.localStorage.setItem('nbaTeamID', teamsID[6]);
    window.localStorage.setItem('nbaTeamName', teamsNames[6]);
    window.location.href = "nbateamstats.html";
}

async function profile8(){
    window.localStorage.setItem('nbaTeamID', teamsID[7]);
    window.localStorage.setItem('nbaTeamName', teamsNames[7]);
    window.location.href = "nbateamstats.html";
}

