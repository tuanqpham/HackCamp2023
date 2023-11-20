let user = null;

// Define the User class
class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}

class Seeker extends User {
    constructor(name, password) {
        super(name, password);
    }
}

class Poster extends User {
    constructor(name, password) {
        super(name, password);
    }
}

// Define the Users class
class Users {
    constructor() {
        this.users = [];
    }

    // Add a user to the list
    addUser(user) {
        this.users.push(user);
    }

    // Get the list of users
    getUsers() {
        return this.users;
    }

    // Check if a username already exists
    matchingUsername(name) {
        for (const user of this.users) {
            if (name === user.name) {
                return false;
            }
        }
        return true;
    }

    // Check if a user is in the list
    containUser(user) {
        return this.users.some(u => u === user);
    }
}

function showSignUpScreen() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('signup-screen').style.display = 'block';
}

function navigateToSignUp() {
    document.getElementById('signup-screen').style.display = 'block';
    document.getElementById('additional-information').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
}

function navigateToLogin() {
    document.getElementById('signup-screen').style.display = 'none';
    document.getElementById('additional-information').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
}

function navigateToAdditionalInfo() {
    document.getElementById('signup-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('additional-information').style.display = "block";
}

function extractLoginValues() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const user = new User(username, password);
    if (!this.users.containUser(user)) {
        extractSignupValues();
    }
}

function extractSignupValues() {
    var newUsername = document.getElementById("new-username").value;
    var newPassword = document.getElementById("new-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    if (newPassword.length < 8) {
        var errorElement = document.createElement("div");
        errorElement.innerHTML = "Password too short!";
        errorElement.style.color = "red";
        errorElement.style.textAlign = "center";
        document.getElementById("signup-screen").appendChild(errorElement);
        return;
    } else if (newPassword !== confirmPassword) {
        var errorElement = document.createElement("div");
        errorElement.innerHTML = "Passwords don't match!";
        errorElement.style.color = "red";
        errorElement.style.textAlign = "center";
        document.getElementById("signup-screen").appendChild(errorElement);
        return;
    } 
    user = new User(newUsername, newPassword);
    navigateToAdditionalInfo();
    sendSignupDataToBackend(newUsername, newPassword);
}

function askForAdditionalInformation() {
    var pronoun = document.getElementById("pronouns").value;
    var school = document.getElementById("school").value;
    user.setPronouns(pronoun);
    user.setSchool(school);
}

// function sendLoginDataToBackend(username, password) {
//     // Prepare the data to be sent
//     const data = {
//         username: username,
//         password: password
//     };

//     // Send a POST request to the login endpoint
//     fetch('/index.html', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Handle the response from the server
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// }

function sendSignupDataToBackend(newUsername, newPassword) {
    const data = {
        newUsername: newUsername,
        newPassword: newPassword
    };

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}