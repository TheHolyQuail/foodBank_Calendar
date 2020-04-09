"use strict"

//import the User object
var User = require('../models/user.js').model;
var Calen = require('../models/calendarSch.js').model;

module.exports = function(app) {
    
    //routes go in here!
    //handles page movement

  /////////////////////////////////////////////////////////////
 /////////////Get/////////////////////////////////////////////
/////////////////////////////////////////////////////////////
    app.get('/home', function(req, res) {
        let loged = req.cookies.signedIn;
        String(loged);
        if(loged == "true"){
            //if there is a user logged in
            console.log('logged in');
            res.render("home.ejs", {signedIn: true});
        } else {
            //default state
            res.render("home.ejs", {signedIn: false});
        }
    });

    app.get('/calendar', function(req, res) {
        res.render("calendar.ejs");
    });

    app.get('/calendarData', function(req, res) {
        Calen.find({}, function(err,events) {
            console.log(events);
            // res.render("calendar.ejs",{eventCallResults:events})
            res.send(events);
        })
    });

    app.get('/about', function(req, res) {
        let loged = req.cookies.signedIn;
        if(loged){
            //if there is a user logged in
            res.render("about.ejs", {signedIn: true});
        }
        //default state
        res.render("about.ejs", {signedIn: false});
    });

    app.get('/contact', function(req, res) {
        res.render("contact.ejs");
    });

    app.get('/new', function(req, res) {
        res.render("new.ejs", {error: ""});
    });

    app.get('/editAvalibility', function(req, res) {
        res.render("editAvalibility.ejs", {error: ""});
    });

    app.get('/newEvent', function(req, res) {
        res.render("newEvent.ejs", {error: ""});
    });

    app.get('/login', function(req, res){
        res.render("login.ejs", {error: ""});
    });

    app.get('/account', function(req, res) {
        let adm = req.cookies.admin;
        let username = req.cookies.currentUser;
        String(adm);
        console.log(adm);
        if(adm == "true"){
            console.log("admin account");
            res.render("adminAccount.ejs", {name: username});
        } else {
            res.render("volunteerAccount.ejs", {name: username});
        }
    });

    app.get('/editAccount', function(req, res) {
        //declare variables
        let username = req.cookies.currentUser;
        let password = req.cookies.pass;

        res.render("editAccount.ejs", {error: "", errorColor: "green", user: username, pass: password});
    });

    //a get at the root.  this is run when you go to localhost:3000
    app.get('/', function(req, res) {
        res.render('home.ejs', {signedIn: false});
    });

    app.get('/logout', function(req, res) {
        //clear cookies
        res.cookie("currentUser", "");
        res.cookie("admin", false);
        res.cookie("signedIn", false);

        //render home
        res.render("home.ejs", {signedIn: false});
    });


  //////////////////////////////////////////////////////////////
 /////////////Post/////////////////////////////////////////////
//////////////////////////////////////////////////////////////

//a post, this handles anything sent TO the url at localhost:3000/post
    app.post('/post', function(req, res) {
        console.log(req.body.name); 
        res.send("you posted:" + req.body.name);
    });

     ////////////
    ///log in///
   ////////////
    app.post('/login', function(req, res) {
        let username = req.body.username;
        let pass = req.body.password;
        let success = false;

        let error = "";

        console.log("log in request:" + username + "/" + pass);

        // get a user with the given username if it exists        
        User.findOne({ name:username }, function(err,user){
            //found one!
            if(user) {
                //console.log("Found a user")
                if(user.password == pass){
                    success = true;
                } else {
                    success = false;
                    error = "your username or password is incorect";
                }
            } else {
                //console.log("no user found")
                success = false;
                error = "your username or password is incorect";
            }

            if(success){
                //make sure error is cleared
                error = "";
                
                //set cookie
                res.cookie("currentUser", username);
                res.cookie("admin", user.admin);
                console.log("admin: " + req.cookies.admin);
                res.cookie("signedIn", true);

                //successfull login
                console.log("success");

                //redirect to game
                res.render("home.ejs", {signedIn: true, admin: user.admin});   
            } else {
                //failed login
                console.log("failed login")
                res.render("login.ejs", {error: error, errorColor: "red"});
            }
        });
    });

     /////////////////
    ///new account///
   /////////////////
    app.post('/new', async function(req, res) {
        let user = req.body.username;
        let pass1 = req.body.password1;
        let pass2 = req.body.password2;
        let email = req.body.email;
        let phone = req.body.phone;
        let admin = req.body.admin;
        let success = false;

        let error = "";
        console.log(user + "/" + pass1 + "/" + pass2);

        //check if username is available
        let find = await ( User.findOne({ username:user }) )
        if(find) {
            //console.log("user already exists")
            success = false;
            error = "That username is unavailable.";
        } else {
            success = true;
        }
        
        if(pass1 != pass2 && success){
            success = false;
            error = "Your passwords don't match.";
        }
        if(pass1 == "" || pass2 == "" || user == "" || email == ""){
            success = false;
            error = "You forgot to enter something...";
        }

        if(success){
            //account creation
            console.log("account created: " + user + "/" + pass1);
            if(admin == "admin"){
                var u = new User({name:user, password:pass1, phone:phone, email:email, admin:true})
            }else{
                var u = new User({name:user, password:pass1, phone:phone, email:email, admin:false})
            }
            u.save(function(err,user) {
                console.log("Made a user:" + user + " with the password: " + pass1)  
            })

            //redirect to logIn
            res.render("login.ejs", {error: "new account created. please sign in.", errorColor: "green"});   
        } else {
            //failed login
            res.render("new.ejs", {error: error});
        }
    });

     //////////////////
    ///edit account///
   //////////////////
    app.post("/editAccount", async function(req,res) {
        console.log("edit request.");
        //get username using cookies
        let username = req.cookies.currentUser

        //declare variables of inputs from form
        let newName = req.body.newName;
        let pass1 = req.body.newPassword1;
        let pass2 = req.body.newPassword2;
        let color = req.body.newScheme;

        //booleans
        let newNameOK = await ( User.findOne({ name:newName }));
        let success = false;

        let error = "";
        

        //check inputs and update account
        User.findOne({username:username}, function(err,user) {
            console.log("user: " + user);
            //check username change
            if(newNameOK) {
                //error message and succes boolean update
                console.log("new username is already a user")
                success = false;
                error = "That username is unavailable.";
                //make it impossible to change anything by deleting user input
                newName = "";
                pass1 = "";
                pass2 = "";
                color = "";
            } else {
                success = true;
            }

            //check password change
            if(pass1.length > 0 || pass2.length > 0){
                if(pass1.length < 3 || pass2.length < 3){
                    //error message and succes boolean update
                    console.log("password is too short")
                    success = false;
                    error = "your password must be at least 3 characters long";
                    //make it impossible to change anything by deleting user input
                    newName = "";
                    pass1 = "";
                    pass2 = "";
                    color = "";
                } else {
                    if(pass1 != pass2){
                        //error message and succes boolean update
                        console.log("pass1 != pass2")
                        success = false;
                        error = "your passwords must match";
                        //make it impossible to change anything by deleting user input
                        newName = "";
                        pass1 = "";
                        pass2 = "";
                        color = "";
                    }
                }   
            } else {
                //no password change
            }

            //check the color change input
            if(color.length > 0){
                if(color != "dark" && color != "light"){
                    //error message and succes boolean update
                    console.log("color is not dark or light")
                    success = false;
                    error = "your passwords must match";
                    //make it impossible to change anything by deleting user input
                    newName = "";
                    pass1 = "";
                    pass2 = "";
                    color = "";
                }   
            }
            
            
            if(success){
                console.log("updateing:" + user);
                console.log("new name: " + newName + "| new password: " + pass1 + "| new color: " + color);
                if(newName.length > 0){
                   user.name = newName; 
                }
                
                if(pass1.length > 0 || pass2.length > 0){
                   user.password = pass1; 
                }

                //save changes and return to game screen
                let username = req.cookies.currentUser;
                let backG = req.cookies.backgroundColor;
                let text = req.cookies.textColor;
                user.save(function(err,newUser){res.render('game.ejs',{username:username, background: backG, text: text})})
            } else {
                //reload the edit account page with the error message
                res.render('editAccount.ejs',{error:error})
            }
        })        
        
    })

     ///////////////
    ///new event///
   ///////////////
   app.post('/newEvent', async function(req, res) {
    let eventLabel = req.body.eventLabel;
    let timeSlot = req.body.timeSlot;
    let success = false;

    let error = "";
    console.log("name: " + eventLabel + "/date: " + timeSlot);
    
    //account creation
    var d = new Calen({name: eventLabel, time: timeSlot, statusColor: "orange", available: [], scheduled: []})
        
    d.save(function(err,eventLabel) {
        console.log("Scheduled an event: " + eventLabel + " at: " + timeSlot)
        success = true;
        res.render("newEvent.ejs", {error: "The event was sucessfully scheduled!"});
    })

    // if (success) {
    //     //redirect to same page with sucess
    //     res.render("newEvent.ejs", {error: "The event was sucessfully scheduled!"});   
    // } else {
    //     //failed creation
    //     res.render("newEvent.ejs", {error: "Failed to create event."});
    // }
});

     /////////////
    ///log out///
   /////////////
   app.post("/logout", async function(req,res) {
        res.cookie("currentUser", "");
        res.cookie("admin", false);
        res.cookie("signedIn", false);
   })

}
