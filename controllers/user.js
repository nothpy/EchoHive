const User = require("../models/userLS");
const flash = require("connect-flash");

module.exports.signUpPage = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "user was registered");
            res.redirect("/home");
        });

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Welcome to EchoHive you are logged in succesfully");
        res.redirect("/home");
    })
}

module.exports.loginPage = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginAuthenticate =  async (req, res) => {
    req.flash("success", "Welcome to EchoHive you are logged in succesfully");
    // res.redirect("/listings");
    //res.redirect(res.locals.redirectUrl); // yha per passport by default session ko reset kar deta hai jab login hota hai . to is problem se bachne ke liye hu,m req.session.redirectUrl value ko local ke under store karte hai.
    let redirectUrl = res.locals.redirectUrl || "/home";
    res.redirect(redirectUrl);

}