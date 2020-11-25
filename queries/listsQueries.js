/* eslint-disable no-unused-vars */
const mysql = require('mysql')
const olio = {
  validateKeys(keys) {
    const keyIsCorrect = (key) =>
      key === 'created' || key === 'search_name' || key === 'sort'

    return keys.every(keyIsCorrect)
  },

  createWhereClause(keys, reqQuery) {
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

    if (keys.length === 1 && keys.includes('sort')) {
      where = ''
    }

    return where
  },

  createOrderClause(reqQuery) {
    let order = ' ORDER BY '

    console.log(reqQuery)
    console.log(reqQuery.sort)
    console.log(typeof reqQuery)
    const fsorts = reqQuery.sort.split(' ').join('+')
    const sorts = fsorts.split(',')

    for (const sort of sorts) {
      if (order !== ' ORDER BY ') {
        order = order + ','
      }

      switch (sort) {
        // Is done
        case '+name':
          order = order + 'name ASC'
          break
        case '-name':
          order = order + 'name DESC'
          break
        // Created
        case '+created':
          order = order + 'created ASC'
          break
        case '-created':
          order = order + 'created DESC'
          break
        // Edited
        case '+edited':
          order = order + 'edited ASC'
          break
        case '-edited':
          order = order + 'edited DESC'
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
  },

  createSqlQuery(where, order, table) {
    let sql =
      `SELECT * FROM ${table}` + mysql.escape(where) + mysql.escape(order)
    sql = sql.replace(/['"]+/g, '')

    return sql
  },
}

module.exports = olio
