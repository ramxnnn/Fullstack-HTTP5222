const express = require("express");
const router = express.Router();
const model = require("../menuLinks/func");

//PAGE ROUTES
//if you want to use an asynchronous function in your callback function (see below), you need to also make your callback function asynchronous
router.get("/", async (request, response) => {
    let links = await model.getLinks();
    //console.log(links);
    response.render("index", { title: "Home", menu: links }); //renders /templates/layout.pug
});
  
module.exports = router;