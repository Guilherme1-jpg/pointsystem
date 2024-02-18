const getPointsByNameQuery = `
  MATCH (p:Point {name: $name}) RETURN p
`;

const createPoint = `
CREATE (p:Point {name: $name, entryTimestamp: $entryTimestamp, exitTimestamp: $exitTimestamp}) RETURN p
`;

const getPoint = `
MATCH (p:Point) RETURN p
`

const updatePoint = `
MATCH (p:Point {name: $name}) SET p.name = $newName RETURN p, p.elementId
`

const removePoint = `
MATCH (p:Point {name: $name}) DETACH DELETE p
`

module.exports = {
  getPointsByNameQuery,
  createPoint,
  getPoint,
  updatePoint,
  removePoint
};
