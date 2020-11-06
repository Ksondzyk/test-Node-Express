const { Router } = require("express");
const Cities = require("../models/citiesClass");

const router = Router();

router.get("/", (req, res) => {
  res.render("addcity", {
    title: "add city",
    isAddCity: true,
  });
});

router.post("/", async (req, res) => {
  const course = new Cities(
    req.body.title,
    req.body.location,
    req.body.numberOfResidents,
    req.body.square,
    req.body.yearOfFoundation,
    req.body.image
  );

  await course.save();

  res.redirect("/addcity");
});
module.exports = router;
