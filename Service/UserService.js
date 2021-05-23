
var fs = require('fs');
const development = require('../knexfile').development;
const knex = require("knex")(development);
const TABLE_NAME = "passport_users";

var usersFile = './database/users.json'

class UserService {
    constructor() {
        this.users = {};
        this.init();
    }
    init() {
        this.read().then((data) => {
            //console.log(data.length)
            if (data.length) {
                data = JSON.parse(data.toString());
                this.users = data.users;
                //console.log('init user', this.users);
            } else {
                //console.log('file is empty')
            }
        }).catch((err) => {
            console.log(err);
        })
        
    }
    read() {
        return new Promise((resolve, rejects) => {
            fs.readFile(usersFile, function (err, data) {
                if (err) {
                    rejects(err);
                } else {
                    //console.log('read user file',data)
                    resolve(data);
                }
            })
        })
    }
    write() {
        return new Promise((resolve, rejects) => {
            let data = JSON.stringify({ users: this.users });
            fs.writeFile(usersFile, data, function (err) {
                if (err) {
                    rejects(err);
                } else {
                    //console.log('write file done')
                    resolve('done')
                }
            })
        })
    }
    newUser(username, password) {
        return new Promise((resolve, rejects) => {
            //console.log('inside add user promise')
            this.users[username]= password;
            resolve('done')
        }).then(this.write())
        
        
    }
    list() {
        return this.read().then((data) => {
            //console.log('list', data.length);
            if (data.length==0) {
                return {};
            } else {
                let users = JSON.parse(data.toString()).users;
            return users;
            }
            
        })
    }
    
}

module.exports = UserService;