module.exports = app => {
  const clients = require("../controllers/client.js");

  var router = require("express").Router();

  // Create a new Client
  router.post("/client/", clients.create);

  // Retrieve all clients
  router.get("/clients", clients.findAll);

  // Retrieve Clients by name
  router.get("/client/name/:name", clients.findByName);

  // Retrieve a single Client with id
  router.get("/client/:id", clients.findOne);

  // Update a Client with id
  router.put("/client/:id", clients.update);

  // Delete a Client with id
  router.delete("/client/:id", clients.delete);

  // Delete all clients
  router.delete("/clients", clients.deleteAll);

  app.use('/', router);
};