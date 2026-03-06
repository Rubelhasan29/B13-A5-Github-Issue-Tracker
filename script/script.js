document.getElementById("SignInBtn").addEventListener('click', function(){
    // get the username input val
    const usernameInput = document.getElementById("UsernameInput")
    const username = usernameInput.value;
    
    // get the password input val
    const passwordInput = document.getElementById("passInput")
    const password = passwordInput.value;

    //  match them with actual value
    if(username == "admin" && password == 'admin123'){
        window.location.assign("/home.html")
    }else{
        alert("Wrong Information");
        return;
    }

});