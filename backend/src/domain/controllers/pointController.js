const restify = require("restify");
const pointService = require("../services/pointService.js");

class PointController {
  async createPoint(req, res, next) {
    try {
      const { name, entryTimestamp, exitTimestamp } = req.body;
      const point = await pointService.createPoint(
        name,
        entryTimestamp,
        exitTimestamp
      );
      res.send(201, point);
    } catch (error) {
      console.error("Erro ao criar ponto:", error);
      res.send(500, { error: "Internal Server Error" });
    }
    if (typeof next === 'function') {
      return next();
    }
  }

  async findByName(req, res, next) {
    try {
      const { name } = req.params;
      const points = await pointService.findPointsByName(name);
      res.send(200, points);
    } catch (error) {
      console.error('Error finding points by name:', error);
      res.send(500, { error: 'Internal Server Error' });
    }
    if (typeof next === 'function') {
      return next();
    }
  }

  async getPoints(req, res, next) {
    try {
      const points = await pointService.getPoints();
      res.send(200, points);
    } catch (error) {
      console.error("Erro ao obter pontos:", error);
      res.send(500, { error: "Internal Server Error" });
    }
    if (typeof next === 'function') {
      return next();
    }
  }

  async updatePoint(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedPoint = await pointService.updatePoint(id, name);

      if (updatedPoint) {
        res.send(200, updatedPoint);
      } else {
        res.send(404, { error: "Point not found" });
      }
    } catch (error) {
      console.error("Error updating point:", error);
      res.send(500, { error: "Internal Server Error" });
    }
    if (typeof next === 'function') {
      return next();
    }
  }

  async deletePoint(req, res, next) {
    try {
      const { name } = req.params;
      const success = await pointService.deletePoint(name);
      if (!success) {
        res.send(204);
      } else {
        res.send(404, { error: 'Point not found' });
      }
    } catch (error) {
      console.error('Error deleting point:', error);
      res.send(500, { error: 'Internal Server Error' });
    }
    if (typeof next === 'function') {
      return next();
    }
  }
}

module.exports = new PointController();
