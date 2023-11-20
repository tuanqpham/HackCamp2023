// Define the User class
export class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}

export class Seeker extends User {
    constructor(name, password) {
        super(name, password);
    }
}

export class Poster extends User {
    constructor(name, password) {
        super(name, password);
    }
}

// Define the Users class
export class Users {
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

module.exports = {
    User
}