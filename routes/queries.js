/* eslint-disable no-unused-vars */
const mysql = require('mysql')

function validateKeys (keys) {
  const keyIsCorrect = (key) =>
    key === 'is_done' ||
    key === 'priority' ||
    key === 'deadline' ||
    key === 'list_id' ||
    key === 'sort'

  return keys.every(keyIsCorrect)
}

function createWhereClause (keys, reqQuery) {
  let where = ' WHERE '

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (key === 'sort') {
      continue
    }

    if (i === keys.length - 1) {
      where += key + '=' + reqQuery[key]
      break
    }

    where += key + '=' + reqQuery[key] + ' AND '
  }

  where = where.replace(/lat/g, 'latitude')
  where = where.replace(/lon/g, 'longitude')

  if (keys.length === 1 && keys.includes('sort')) {
    where = ''
  }

  return where
}

function createOrderClause (reqQuery) {
  let order = ' ORDER BY '

  const fsorts = reqQuery.sort.split(' ').join('+')
  const sorts = fsorts.split(',')

  for (const sort of sorts) {
    if (order !== ' ORDER BY ') {
      order = order + ','
    }

    switch (sort) {
      case '+is_done':
        order = order + 'is_done ASC'
        break
      case '-is_done':
        order = order + 'is_done DESC'
        break
      case '+list_id':
        order = order + 'list_id ASC'
        break
      case '-list_id':
        order = order + 'list_id DESC'
        break
      case '+priority':
        order = order + 'priority ASC'
        break
      case '-priority':
        order = order + 'priority DESC'
        break
      case '+deadline':
        order = order + 'deadline ASC'
        break
      case '-deadline':
        order = order + 'deadline DESC'
        break
    }
  }

  if (order === ' ORDER BY ') {
    order = ''
  }

  if (order.substring(order.length - 1, order.length) === ',') {
    order = order.slice(0, -1)
  }

  return order
}

function createSqlQuery (where, order, table) {
  let sql =
    `SELECT * FROM ${table}` +
    mysql.escape(where) +
    mysql.escape(order)
  sql = sql.replace(/['"]+/g, '')

  return sql
}
