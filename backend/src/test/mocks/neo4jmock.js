const neo4j = require('neo4j-driver');
require('dotenv').config

class Neo4jMock {
  constructor() {
    this.driver = neo4j.driver(process.env.DB_PORT, neo4j.auth.basic(process.env.USERNAME_PASSPORT, process.env.PASSWORD_PASSPORT));
    this.session = this.driver.session({ defaultAccessMode: neo4j.session.READ });
  }

  async reset() {
    await this.session.run('MATCH (n) DETACH DELETE n');
  }

  async createNode(label, properties) {
    const result = await this.session.run(
      `CREATE (node:${label} $properties) RETURN node`,
      { properties }
    );

    return result.records[0].get('node').properties;
  }

  async findNodesByLabel(label) {
    const result = await this.session.run(`MATCH (node:${label}) RETURN node`);

    return result.records.map(record => record.get('node').properties);
  }

  async close() {
    await this.session.close();
    await this.driver.close();
  }
}

module.exports = Neo4jMock;
