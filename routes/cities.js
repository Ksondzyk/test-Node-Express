const { Router } = require("express");
const Cities = require("../models/citiesClass");

const router = Router();

router.get("/", async (req, res) => {
  const cities = await Cities.getAll();
  res.render("cities", {
    title: "cities",
    isCities: true,
    cities,
  });
});

router.get("/:id", async (req, res) => {
  const city = await Cities.getById(req.params.id);
  res.render("city", {
    layout: "empti",
    title: "title",
    city,
  });
});

router.post("/edit", async (req, res) => {
  await Cities.update(req.body);
  res.redirect("/cities");
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const city = await Cities.getById(req.params.id);
  res.render("city-edit", {
    title: `upadate title`,
    city,
  });
});

// router.delete("/cites/:id", async (req, res) => {
//   debugger;
//   const city = await Cities.getById(req.params.id);
//   res.render("/city", {
//     layout: "empti",
//     title: "title",
//     city,
//   });
// });

router.delete("/:id", async (req, res) => {
  debugger;
  await Cities.delete(req.body);
  res.redirect("/cities");
});
// router.get("/:id", async (req, res) => {
//   debugger;
//   const cities = await Cities.delete(req.params.id);
//   console.log("cities", cities);
//   res.render("cities", {
//     title: `de title`,
//     cities,
//   });
// });

module.exports = router;
