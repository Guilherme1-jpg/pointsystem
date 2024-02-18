const { getPointsByNameQuery, createPoint, getPoint, updatePoint, removePoint } = require("../../infra/db/queries/neo4jqueries.js");
const Point = require("../models/pointModel.js");
const session = require("./../../infra/db/neo4j.js");

class PointRepository {
  async createPoint(session, name, entryTimestamp, exitTimestamp) {
    const result = await session.run(
      createPoint,
      { name, entryTimestamp, exitTimestamp }
    );

    return result.records[0].get("p").properties;
  }

  async getPoints(session) {
    const result = await session.run(getPoint);
    return result.records.map((record) => record.get("p").properties);
  }

  async findPointsByName(session, name) {
    const result = await session.run(getPointsByNameQuery, { name });
    return result.records.map(record => {
      const point = record.get('p').properties;
      return new Point(point.name, point.entryTimestamp, point.exitTimestamp);
    });
  }

  async updatePoint(session, name, newName) {
    const result = await session.run(
      updatePoint ,
      { name, newName }
    );

    if (result.records.length > 0) {
      const properties = result.records[0].get("p").properties;
      properties.elementId = result.records[0].get("p.elementId");
      return properties;
    } else {
      return null;
    }
  }

  async deletePoint(session, name) {
    const result = await session.run(removePoint, { name });
    return result.records.length > 0;
  }
}

module.exports = new PointRepository();
