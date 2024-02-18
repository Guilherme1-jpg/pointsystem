const assert = require('assert');
const { describe, it, beforeEach } = require('mocha');
const PointController = require('../domain/controllers/pointController');

let req;
let res;
let next;

describe('PointController', () => {
  beforeEach(() => {
    req = {};
    res = {
      status: 200,
      send: function (data) {
        this.data = data;
      },
    };
    next = function () {};
  });

  
  it('must create a point successfully', async () => {
    req.body = {
      name: 'TestPoint',
      entryTimestamp: '2022-02-17T08:00:00',
      exitTimestamp: '2022-02-17T17:00:00',
    };
  
    const response = {};
    response.send = (statusCode, data) => {
      response.statusCode = statusCode;
      response.data = data;
    };
  
    await PointController.createPoint(req, response, next);
  
    assert.strictEqual(response.statusCode, 201);
  });
  
  
  it('must find points by name', async () => {
    req.params = { name: 'User1' };
  
    const response = {};
    response.send = (statusCode, data) => {
      response.statusCode = statusCode;
      response.data = data;
    };
  
    await PointController.findByName(req, response, next);
  
    assert.strictEqual(response.statusCode, 200);
    assert.ok(response.data);
  });
  

  it('must get points successfully', async () => {
    await PointController.getPoints(req, res, next);

    assert.strictEqual(res.status, 200);
  });

  it('must update a point successfully', async () => {

    req.body = {
      name: 'PontoParaAtualizar',
      entryTimestamp: '2022-02-17T08:00:00',
      exitTimestamp: '2022-02-17T17:00:00',
    };
    await PointController.createPoint(req, res, next);
  
    req.params = { id: res.data.id };
    req.body = { name: 'NovoNome' };
  
    await PointController.updatePoint(req, res, next);
  
    assert.strictEqual(res.status, 200);
  });

  it('must delete a point successfully', async () => {
    req.params = { name: 'DeleteTest' };

    await PointController.deletePoint(req, res, next);

    assert.strictEqual(res.status, 200);
  });

});
