function showSignUpScreen() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('signup-screen').style.display = 'block';
}

function navigateToSignUp() {
    document.getElementById('signup-screen').style.display = 'block';
    document.getElementById('login-screen').style.display = 'none';
}

function navigateToLogin() {
    document.getElementById('signup-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

function extractLoginValues() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    sendLoginDataToBackend(username, password);
}

function extractSignupValues() {
    var newUsername = document.getElementById("new-username").value;
    var newPassword = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    if (newPassword !== confirmPassword) {
        console.log("Your passwords don't match!");
        var errorElement = document.createElement("div");
        errorElement.innerHTML = "Passwords don't match!";
        errorElement.style.color = "red";
        errorElement.style.textAlign = "center";
        document.getElementById("signup-screen").appendChild(errorElement);
        return;
    }
    sendSignupDataToBackend(newUsername, newPassword, confirmPassword);
}

function sendLoginDataToBackend(username, password) {
    // Prepare the data to be sent
    const data = {
        username: username,
        password: password
    };

    // Send a POST request to the login endpoint
    fetch('/index.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function sendSignupDataToBackend(newUsername, newPassword, confirmPassword) {
    // Prepare the data to be sent
    const data = {
        newUsername: newUsername,
        newPassword: newPassword
    };

    // Send a POST request to the signup endpoint
    fetch('/index.html', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}