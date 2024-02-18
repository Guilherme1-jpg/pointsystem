const PointRepository = require('../repository/pointRepository.js');
const Point = require('../models/pointModel.js');
const neo4j = require('../../infra/db/neo4j.js');
;

class PointService {
  async createPoint(name, entryTimestamp, exitTimestamp) {
    const session = neo4j.getSession();

    try {
      return await PointRepository.createPoint(session, name, entryTimestamp, exitTimestamp);
    } finally {
      await session.close();
    }
  }

  async getPoints() {
    const session = neo4j.getSession();
    try {
      return await PointRepository.getPoints(session);
    } finally {
      await session.close();
    }
  }

  async findPointsByName(name) {
    const session = neo4j.getSession();
    try {
      return await PointRepository.findPointsByName(session, name);
    } finally {
      await session.close();
    }
  }

  async updatePoint(elementId, name) {
    const session = neo4j.getSession();
    
    try {
      const updatedPoint = await PointRepository.updatePoint(session, elementId, name);
      
      if (updatedPoint) {
        return new Point(updatedPoint.id, updatedPoint.name, updatedPoint.timestamp);
      } else {
        throw new Error('Point not found for update');
      }
    } finally {
      await session.close();
    }
  }

  async deletePoint(name) {
    const session = neo4j.getSession();
  
    try {
      return await PointRepository.deletePoint(session, name);
    } finally {
      await session.close();
    }
  }
}

module.exports = new PointService();
