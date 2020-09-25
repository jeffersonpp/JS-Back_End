const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Client
    const client = {
      name: req.body.name,
      address: req.body.address
    };
  
    // Save Client in the database
    Client.create(client)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while filing the Client."
        });
      });
  };
  
   exports.findAll = (req, res) => {

    Client.findAll()
      .then(data => {
        console.log(JSON.stringify(data));
        res.send(JSON.stringify(data));
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Clients."
        });
      });
  };
  
  
  exports.findByName = (req, res) => {
       const find_name = req.params.name;
       var condition = { name: { [Op.like]: `%${find_name}%` } };
    
      Client.findAll({where: condition})
        .then(data => {
          console.log(JSON.stringify(data));
          res.send(JSON.stringify(data));
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Clients."
          });
        });
    };
    
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Client.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Client with id=" + id
        });
      });
  };
  
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Client.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Client with id=${id}. Maybe Client was not found or is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Client with id=" + id
        });
      });
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Client.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Client with id=" + id
        });
      });
  };
  
  exports.deleteAll = (req, res) => {
    Client.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Clients were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Clients."
        });
      });
  };