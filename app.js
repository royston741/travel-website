////////// IMPORT MODULES //////////////
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const flights = require("./views/data/flights");
const trains = require("./views/data/trains");
const busses = require("./views/data/busses");
const hotels = require("./views/data/hotels");
const holidays = require("./views/data/holidays");

const getDate = require("./function/function");

const app = express();

///////////STATIC FILE LINKE CSS ,JS,IMG//////
app.use(express.static("public"));

/////////// FOR TAKING VALUES FROM POST METHOD /////////
app.use(bodyParser.urlencoded({ extended: true }));

////////// SET ENGINE FOR EJS //////////
app.set("view engine", "ejs");

//////////// CONSTANT/////////////
let loggedIn = false;
let userProfileName;

////////// DATABSE ///////////////////

//Connect to data base
mongoose.connect("mongodb://localhost:27017/travelDB");

// Schema for user name
const user = new mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  bookings: Array,
});

const User = mongoose.model("User", user);

// collection for complain
const Complain = mongoose.model("Complain", {
  fullName: String,
  LastName: String,
  phone: String,
  Email: String,
  message: String,
});

////////// RENDERING PAGES ////////////
app.get("/", (req, res) => {
  res.render("home", {
    home: "link_in_use",
    bookings: "a",
    about: "b",
    contact: "c",
    isLogged: loggedIn,
    userProfileName: userProfileName,
  });
});

app.get("/bookings/:travelOption", function (req, res) {
  const requestedOption = req.params;

  if (requestedOption.travelOption === "flights") {
    res.render("flights", {
      bookings: "link_in_use",
      home: "a",
      about: "b",
      contact: "c",
      flightActive: "booking-type-link-active",
      trainsActive: "t",
      busActive: "b",
      cabsActive: "c",
      hotelsActive: "h",
      holidaysActive: "h",
      title: "Flights",
      type: ["Economy", "Prime Economy", "Business"],
      link: "/bookings/flights",
      results: "",
      isLogged: loggedIn,
      userProfileName: userProfileName,
    });
  } else if (requestedOption.travelOption === "bus") {
    res.render("bus", {
      isLogged: loggedIn,
      userProfileName: userProfileName,
      bookings: "link_in_use",
      home: "a",
      about: "b",
      contact: "c",
      busActive: "booking-type-link-active",
      flightActive: "f",
      trainsActive: "t",
      cabsActive: "c",
      hotelsActive: "h",
      holidaysActive: "h",
      title: "Busses",
      type: ["First class", "Second class"],
      link: "/bookings/bus",
      results: "",
    });
  } else if (requestedOption.travelOption === "holidays") {
    res.render("holidays", {
      isLogged: loggedIn,
      userProfileName: userProfileName,
      bookings: "link_in_use",
      home: "a",
      about: "b",
      contact: "c",
      holidaysActive: "booking-type-link-active",
      flightActive: "f",
      trainsActive: "t",
      busActive: "c",
      hotelsActive: "h",
      cabsActive: "h",
      link: "/bookings/holidays",
      title: "Holidays",
      type: [],
      results: "",
    });
  } else if (requestedOption.travelOption === "hotels") {
    res.render("hotels", {
      isLogged: loggedIn,
      userProfileName: userProfileName,
      bookings: "link_in_use",
      home: "a",
      about: "b",
      contact: "c",
      hotelsActive: "booking-type-link-active",
      flightActive: "f",
      trainsActive: "t",
      busActive: "c",
      holidaysActive: "h",
      cabsActive: "h",
      title: "Hotels",
      type: [],
      results: "",
      link: "/bookings/hotels",
    });
  } else if (requestedOption.travelOption === "trains") {
    res.render("trains", {
      isLogged: loggedIn,
      userProfileName: userProfileName,
      bookings: "link_in_use",
      home: "a",
      about: "b",
      contact: "c",
      trainsActive: "booking-type-link-active",
      flightActive: "t",
      busActive: "b",
      cabsActive: "c",
      hotelsActive: "h",
      holidaysActive: "h",
      title: "Trains",
      type: ["First class", "Second class", "General"],
      link: "/bookings/trains",
      results: "",
    });
  } else {
    res.send("404 filee not found");
  }
});

app.post("/bookings/flights", (req, res) => {
  // booking
  if ("tplane" in req.body) {
    if (!userProfileName) {
      return res.redirect("/login");
    } else {
      User.updateOne(
        { userName: userProfileName },
        { $push: { bookings: [req.body] } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        }
      );
      return res.redirect("/userProfile");
    }
  }
  /////////
  const results = [];

  const rDate = req.body.returnDate ? getDate(req.body.returnDate) : "";

  flights.forEach((flight) => {
    const result = {
      fprice: flight.flightPrice,
      flightImg: flight.flightImg,
      flightName: flight.flightName,
      flightClass: req.body.travelClass,
      flightPlane: flight.flightPlane,
      flightFrom: req.body.deportFrom,
      flightTo: req.body.goingTo,
      from: flight.from,
      to: flight.to,
      timeGap: flight.timeGap,
      departureDate: getDate(req.body.departureDate),
      returnDate: rDate,
      stops: flight.stops,
    };

    results.push(result);
  });

  res.render("flights", {
    isLogged: loggedIn,
    userProfileName: userProfileName,
    bookings: "link_in_use",
    home: "a",
    about: "b",
    contact: "c",
    flightActive: "booking-type-link-active",
    trainsActive: "t",
    busActive: "b",
    cabsActive: "c",
    hotelsActive: "h",
    holidaysActive: "h",
    title: "Flights",
    type: ["Economy", "Prime Economy", "Business"],
    link: "/bookings/flights",
    results: results,
  });
});

app.post("/bookings/trains", (req, res) => {
  // booking
  if ("travelname" in req.body) {
    if (!userProfileName) {
      return res.redirect("/login");
    } else {
      User.updateOne(
        { userName: userProfileName },
        { $push: { bookings: [req.body] } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        }
      );
      return res.redirect("/userProfile");
    }
  }

  const results = [];

  const rDate = req.body.returnDate ? getDate(req.body.returnDate) : "";

  trains.forEach((train) => {
    const result = {
      tprice: train.trainPrice,
      trainName: train.trainName,
      travelClass: req.body.travelClass,
      trainFrom: req.body.deportFrom,
      trainTo: req.body.goingTo,
      from: train.from,
      to: train.to,
      trainClass: req.body.travelClass,
      departureDate: getDate(req.body.departureDate),
      returnDate: rDate,
    };

    results.push(result);
  });

  res.render("trains", {
    isLogged: loggedIn,
    userProfileName: userProfileName,
    bookings: "link_in_use",
    home: "a",
    about: "b",
    contact: "c",
    trainsActive: "booking-type-link-active",
    flightActive: "t",
    busActive: "b",
    cabsActive: "c",
    hotelsActive: "h",
    holidaysActive: "h",
    title: "Trains",
    type: ["First class", "Second class", "General"],
    link: "/bookings/trains",
    results: results,
  });
});

app.post("/bookings/bus", (req, res) => {
  // booking
  if ("travelname" in req.body) {
    if (!userProfileName) {
      return res.redirect("/login");
    } else {
      User.updateOne(
        { userName: userProfileName },
        { $push: { bookings: [req.body] } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        }
      );
      return res.redirect("/userProfile");
    }
  }

  const results = [];

  const rDate = req.body.returnDate ? getDate(req.body.returnDate) : "";

  busses.forEach((bus) => {
    const result = {
      tprice: bus.busPrice,
      busName: bus.busName,
      travelClass: req.body.travelClass,
      busFrom: req.body.deportFrom,
      busTo: req.body.goingTo,
      from: bus.from,
      to: bus.to,
      busClass: req.body.travelClass,
      departureDate: getDate(req.body.departureDate),
      returnDate: rDate,
    };

    results.push(result);
  });

  res.render("bus", {
    isLogged: loggedIn,
    userProfileName: userProfileName,
    bookings: "link_in_use",
    home: "a",
    about: "b",
    contact: "c",
    busActive: "booking-type-link-active",
    flightActive: "f",
    trainsActive: "t",
    cabsActive: "c",
    hotelsActive: "h",
    holidaysActive: "h",
    title: "Busses",
    type: ["First class", "Second class"],
    link: "/bookings/bus",
    results: results,
  });
});

app.post("/bookings/hotels", (req, res) => {
  if ("hotelName" in req.body) {
    if (!userProfileName) {
      return res.redirect("/login");
    } else {
      User.updateOne(
        { userName: userProfileName },
        { $push: { bookings: [req.body] } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        }
      );
      return res.redirect("/userProfile");
    }
  }

  const city=req.body.Select_city
  console.log(city)
  results = [];

  hotels.forEach((hotel) => {
    const result = {
      hotelImg: hotel.hotelImg,
      hotelName: hotel.hotelName,
      hotelRating: hotel.hotelRating,
      hotelPrice: hotel.hotelPrice,
      hotelLocation:city
    };
    results.push(result);
  });


  res.render("hotels", {
    isLogged: loggedIn,
    userProfileName: userProfileName,
    bookings: "link_in_use",
    home: "a",
    about: "b",
    contact: "c",
    hotelsActive: "booking-type-link-active",
    flightActive: "f",
    trainsActive: "t",
    busActive: "c",
    holidaysActive: "h",
    cabsActive: "h",
    title: "Hotels",
    type: [],
    results: results,
    link: "/bookings/hotels",
  });
});

app.post("/bookings/holidays", (req, res) => {
  if ("holidayName" in req.body) {
    if (!userProfileName) {
      return res.redirect("/login");
    } else {
      User.updateOne(
        { userName: userProfileName },
        { $push: { bookings: [req.body] } },
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("done");
          }
        }
      );
      return res.redirect("/userProfile");
    }
  }

  results = [];

  holidays.forEach((holiday) => {
    const result = {
      holidayImg: holiday.holidayImg,
      holidayName: holiday.holidayName,
      holidayTime: holiday.holidayTime,
      holidayPrice: holiday.holidayPrice,
      holidayFrom: req.body.deportFrom,
      holidayTo: req.body.goingTo,
    };

    results.push(result);
  });

  res.render("holidays", {
    isLogged: loggedIn,
    userProfileName: userProfileName,
    bookings: "link_in_use",
    home: "a",
    about: "b",
    contact: "c",
    holidaysActive: "booking-type-link-active",
    flightActive: "f",
    trainsActive: "t",
    busActive: "c",
    hotelsActive: "h",
    cabsActive: "h",
    link: "/bookings/holidays",
    title: "Holidays",
    type: [],
    results: results,
  });
});

app.get("/userProfile", (req, res) => {
  User.findOne({ userName: userProfileName }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render("userProfile", {
        userName: data.userName,
        email: data.email,
        bookings: data.bookings,
      });
      // res.redirect('/userProfile')

    }
  });
});

app.post("/userProfile", (req, res) => {
  userProfileName = 0;
  loggedIn = false;

  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login", { error: false });
});

app.post("/login", (req, res) => {
  const userName = req.body.Username;
  const password = req.body.Password;
  User.find({ userName: userName, password: password }, function (err, users) {
    if (err) {
      // return console.log(err);
    } else
      users.forEach((user) => {
        if (user.userName === userName && user.password === password) {
          loggedIn = true;
          userProfileName = userName;
          console.log('done')
        }
      });
      return res.redirect("/");
  });
});


app.get("/signin", (req, res) => {
  res.render("SignUp");
});

app.post("/signin", (req, res) => {
  const newUser = new User({
    email: req.body.Email,
    userName: req.body.Username,
    password: req.body.Password,
    bookings: [],
  });

  newUser.save().then(() => console.log("sign up success"));

  res.redirect("/login");
});

app.get("/about", (req, res) => {
  res.render("about", {
    about: "link_in_use",
    bookings: "a",
    home: "b",
    contact: "c",
    isLogged: loggedIn,
    userProfileName: userProfileName,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contact: "link_in_use",
    bookings: "a",
    about: "b",
    home: "c",
    isLogged: loggedIn,
    userProfileName: userProfileName,
  });
});

app.post("/contact", (req, res) => {
  const newComplain = new Complain({
    fullName: req.body.fullName,
    LastName: req.body.LastName,
    phone: req.body.phone,
    Email: req.body.Email,
    message: req.body.message,
  });
  newComplain.save().then(() => console.log(" complain registered"));
});

////////// LISTEN TO PORT 3000 ////////
const port = 3000;
app.listen(port, () => {
  console.log("Server is running at port " + port + " ....");
});
