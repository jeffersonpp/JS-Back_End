module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "api_express",
  dialect: "mysql",
  pool: {
    max: 25,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};