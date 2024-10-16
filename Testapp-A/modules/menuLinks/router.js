const express = require("express");
const router = express.Router();
const model = require("./func");

//CONVERT URLENCODED FORMAT (FOR GET/POST REQUESTS) TO JSON
//UrlEncoded format is query string format (e.g. parameter1=value1&parameter2=value2)
router.use(express.urlencoded({ extended: true }));
router.use(express.json()); //use JSON

//PAGE ROUTES
//if you want to use an asynchronous function in your callback function (see below), you need to also make your callback function asynchronous
router.get("/", async (request, response) => {
  let links = await model.getLinks()
  //console.log(links);
  response.render("index", { title: "Home", menu: links }); //renders /templates/layout.pug
});
router.get("/about", async (request, response) => {
  let links = await model.getLinks();
  response.render("about", { title: "About", menu: links });
})

//ADMIN PAGE PATHS
router.get("/admin/menu", async (request, response) => {
  let links = await model.getLinks();
  response.render("menu-list", { title: "Administer menu", menu: links});
})
router.get("/admin/menu/add", async (request, response) => {
  let links = await model.getLinks();
  response.render("menu-add", { title: "Add menu link", menu: links});
})
router.post("/admin/menu/add/submit", async (request, response) => {
  //get data from form (data will be in request)
  //POST form: get data from request.body
  //GET form: get data from request.query
  //console.log(request.body);
  let newLink = {
    weight: parseInt(request.body.weight),
    path: request.body.path,
    name: request.body.name
  };
  await model.addLink(newLink);
  response.redirect("/admin/menu");
})
router.get("/admin/menu/delete", async (request, response) => {
  let id = request.query.linkId;
  await model.deleteLink(id);
  response.redirect("/admin/menu");
})

module.exports = router;