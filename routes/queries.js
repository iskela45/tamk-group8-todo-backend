const mysql = require('mysql')

function validateKeys(keys) {
  const keyIsCorrect = (key) =>
    key === "lat>" ||
    key === "lat<" ||
    key === "lon>" ||
    key === "lon<" ||
    key === "sort";

  return keys.every(keyIsCorrect);
}

function createWhereClause(keys) {
  let where = " WHERE ";

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (key === "sort") {
      continue;
    }

    if (i === keys.length - 1) {
      where += key + "=" + obj[key];
      break;
    }

    where += key + "=" + obj[key] + " AND ";
  }

  where = where.replace(/lat/g, "latitude");
  where = where.replace(/lon/g, "longitude");

  if (keys.length === 1 && keys.includes("sort")) {
    where = "";
  }

  return where;
}

function createOrderClause(keys) {
  let order = " ORDER BY ";

  const fsorts = obj.sort.split(" ").join("+");
  const sorts = fsorts.split(",");

  for (const sort of sorts) {
    if (order !== " ORDER BY ") {
      order = order + ",";
    }

    switch (sort) {
      case "+lat":
        order = order + "latitude ASC";
        break;
      case "-lat":
        order = order + "latitude DESC";
        break;
      case "+lon":
        order = order + "longitude ASC";
        break;
      case "-lon":
        order = order + "longitude DESC";
        break;
    }
  }

  if (order === " ORDER BY") {
    order = "";
  }

  if (order.substring(order.length - 1, order.length) === ",") {
    order = order.slice(0, -1);
  }

  return order;
}

function createSqlQuery(where, order, table) {
  const sql =
    `SELECT * FROM ${table}` +
    mysql.escape(where) +
    mysql.escape(order);
  sql = sql.replace(/['"]+/g, "");

  return sql;
}
