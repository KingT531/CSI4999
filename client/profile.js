function logout(){
    window.localStorage.setItem('user', "");
    window.location.href = "index.html";
}