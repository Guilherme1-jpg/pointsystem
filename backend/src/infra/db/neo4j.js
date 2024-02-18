const neo4j = require('neo4j-driver');
require ('dotenv').config();

const neo4jUri = process.env.DB_PORT;
const neo4jUser = process.env.USERNAME_PASSPORT;
const neo4jPassword = process.env.PASSWORD_PASSPORT;

const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));

function getSession() {
  return driver.session();
}

module.exports = {
  getSession,
  close: () => driver.close()
};
