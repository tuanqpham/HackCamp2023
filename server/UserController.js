const readline = require('readline-sync'); // For reading input synchronously
const { Users } = require('./model'); // Assuming you have a Users class in a 'model' module
const { JsonWriter } = require('./persistence'); // Assuming you have a JsonWriter class in a 'persistence' module

class UserController {
    constructor() {
        this.users = new Users();
        this.run();
    }

    run() {
        this.logIn();
    }

    logIn() {
        console.log("Welcome back!");
        const name = readline.question("Enter your username: ");
        let password = readline.question("Enter your password: ");
        
        while (password.length < 8) {
            console.log("Password too short. Try again: ");
            password = readline.question("Enter your password: ");
        }

        const user = new User(name, password);
        if (!this.users.containUser(user)) {
            console.log("We cannot find you, please sign up");
            this.signUp();
        }
        // this.postOrSeek();
    }

    signUp() {
        let notMatch;
        let name = readline.question("Create new username: ");
        notMatch = this.users.matchingUsername(name);
        
        while (!notMatch) {
            console.log("This user name has been used. Try again: ");
            name = readline.question("Create new username: ");
            notMatch = this.users.matchingUsername(name);
        }

        let password = readline.question("Enter a new password: ");
        while (password.length < 8) {
            console.log("Password too short. Try again: ");
            password = readline.question("Enter a new password: ");
        }

        let confirmPassword = readline.question("Confirm password: ");
        while (confirmPassword !== password) {
            console.log("Password not match. Try again: ");
            confirmPassword = readline.question("Confirm password: ");
        }

        const pronoun = readline.question("What are your pronouns? ");
        const school = readline.question("Please enter your school: ");

        const user = new User(name, password);
        user.setPronouns(pronoun);
        user.setSchool(school);
        this.users.addUser(user);

        const jsonWriter = new JsonWriter("./data/Users.json");
        jsonWriter.write(this.users);
    }
}