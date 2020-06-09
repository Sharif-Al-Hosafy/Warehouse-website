let express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  City = require("./models/city"),
  Warehouse = require("./models/warehouse");

mongoose.connect("mongodb://localhost/warehouse");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //mention the public directory from which we are serving the static files

// City.create({
//   name: "Alexandria",
// });
// Warehouse.create(
//   {
//     name: "Al Agami",
//     price: "75000",
//     typeOfGoods: "Break Bulk Warehouses",
//     image: "https://i.ibb.co/PrK8NXm/Break-Bulk-agamy.jpg",
//     space: "4500m",
//   },
//   function (err, house) {
//     City.findOne({ name: "Alexandria" }, function (err, foundCity) {
//       if (err) console.log(err);
//       else {
//         foundCity.location.push(house);
//         foundCity.save(function (err, data) {
//           if (err) console.log(err);
//           else console.log(data);
//         });
//       }
//     });
//   }
// );

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/find", function (req, res) {
  City.find({}, function (err, city) {
    if (err) console.log(err);
    else {
      res.render("findWarehouse", { city: city });
    }
  });
});

app.get("/find/:id", function (req, res) {
  City.findById(req.params.id)
    .populate("location")
    .exec(function (err, found) {
      if (err) console.log(err);
      else {
        res.render("foundWarehouses", { found: found });
      }
    });
});

app.get("/find/:id/checkout", function (req, res) {
  Warehouse.findById(req.params.id, function (err, found) {
    if (err) console.log(err);
    else res.render("checkout", { found: found });
  });
});

app.listen(3000, function () {
  console.log("Listening !!!");
});
