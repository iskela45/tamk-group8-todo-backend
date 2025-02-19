/* eslint-disable no-unused-vars */
const mysql = require('mysql')
const olio = {
  validateKeys (keys) {
    const keyIsCorrect = (key) =>
      key === 'created' ||
      key === 'search_name' ||
      key === 'sort' ||
      key === 'apikey'

    return keys.every(keyIsCorrect)
  },

  createWhereClause (keys, reqQuery) {
    let where = ' WHERE '

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (key === 'sort' || key === 'apikey') {
        continue
      }

      if (i === keys.length - 1) {
        if (reqQuery[key] !== 'notNull') {
          where += key + '=' + reqQuery[key]
        } else {
          where += key + ' IS NOT NULL'
        }
        break
      }

      where += key + '=' + reqQuery[key] + ' AND '
    }

    if (((keys.length === 2 && keys.includes('sort')) &&
        (keys.length === 2 && keys.includes('apikey'))) ||
        (keys.length === 1 && keys.includes('apikey'))) {
      where = ''
    }

    if (where.substring(where.length - 5, where.length) === ' AND ') {
      where = where.slice(0, -5)
    }

    return where
  },

  createOrderClause (reqQuery) {
    let order = ' ORDER BY '

    if ('sort' in reqQuery) {
      const fsorts = reqQuery.sort.toString().split(' ').join('+')
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

      if (order.substring(order.length - 1, order.length) === ',') {
        order = order.slice(0, -1)
      }
    }

    if (order === ' ORDER BY ') {
      order = ''
    }

    return order
  },

  createSqlQuery (where, order, table) {
    let sql =
      `SELECT * FROM ${table}` + mysql.escape(where) + mysql.escape(order)
    sql = sql.replace(/['"]+/g, '')

    return sql
  }
}

module.exports = olio
