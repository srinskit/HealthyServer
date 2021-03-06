const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/patient", function (req, res, next) {
    req.logout();
    req.checkBody("username", "Invalid username").notEmpty().trim();
    req.checkBody("password", "Invalid password").notEmpty().trim();
    const errors = req.validationErrors();
    if (errors) {
        let error_msgs = errors.map(function (err) {
            return err.msg;
        });
        res.json({success: false, error: error_msgs});
        return;
    }
    passport.authenticate("PatientAuth", (err, doc) => {
        if (err != null || doc === false) {
            res.json({success: false, error: "invalid username/password"});
            return;
        }
        req.logIn(doc, function (err) {
            if (err) {
                res.json({success: false, error: "login error"});
            } else {
                res.json({success: true, patient: Object.assign(doc, {_id: undefined}),});
            }
        });
    })(req, res, next);
});

router.post("/doctor", function (req, res, next) {
    req.logout();
    req.checkBody("username", "Invalid username").notEmpty().trim();
    req.checkBody("password", "Invalid password").notEmpty().trim();
    const errors = req.validationErrors();
    if (errors) {
        let error_msgs = errors.map(function (err) {
            return err.msg;
        });
        res.json({success: false, error: error_msgs});
        return;
    }
    passport.authenticate("DoctorAuth", (err, doc) => {
        if (err != null || doc === false) {
            res.json({success: false, error: "invalid username/password"});
            return;
        }
        req.logIn(doc, function (err) {
            if (err) {
                res.json({success: false, error: "login error"});
            } else {
                res.json({success: true, doctor: Object.assign(doc, {_id: undefined}),});
            }
        });
    })(req, res, next);
});

router.post("/state", function (req, res) {
    res.json({auth: req.isAuthenticated()});
});

router.post("/logout", function (req, res) {
    req.logout();
    res.json({success: true});
});

module.exports = router;
