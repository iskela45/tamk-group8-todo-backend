/* eslint-disable no-unused-vars */
const mysql = require('mysql')
const olio = {
  validateKeys (keys) {
    const keyIsCorrect = (key) =>
      key === 'is_done' ||
      key === 'priority' ||
      key === 'deadline' ||
      key === 'list_id' ||
      key === 'search_title' ||
      key === 'sort' ||
      key === 'apikey' ||
      key === 'limit' ||
      key === 'offset' ||
      key === 'count'

    return keys.every(keyIsCorrect)
  },

  createWhereClause (keys, reqQuery) {
    let where = ' WHERE '
    console.log(reqQuery)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (key === 'sort' || key === 'apikey' || key === 'limit' || key === 'offset' || key === 'count') {
        continue
      }

      if (i === keys.length - 1) {
        if (reqQuery[key] === 'notNull') {
          where += key + ' IS NOT NULL'
        } else if (reqQuery[key] === 'null') {
          where += key + ' IS NULL'
        } else {
          where += key + '=' + reqQuery[key]
        }
        break
      }

      if (reqQuery[key] === 'notNull') {
        where += key + ' IS NOT NULL' + ' AND '
      } else if (reqQuery[key] === 'null') {
        where += key + ' IS NULL' + ' AND '
      } else {
        where += key + '=' + reqQuery[key] + ' AND '
      }
    }

    if (((keys.length === 2 && keys.includes('sort')) &&
        (keys.length === 2 && keys.includes('apikey'))) ||
        (keys.length === 1 && keys.includes('apikey'))) {
      where = ''
    }

    if (where.substring(where.length - 5, where.length) === ' AND ') {
      where = where.slice(0, -5)
    }

    if (where === ' WHERE ') {
      where = ''
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
          case '+is_done':
            order = order + 'is_done ASC'
            break
          case '-is_done':
            order = order + 'is_done DESC'
            break
          // List ID
          case '+list_id':
            order = order + 'list_id ASC'
            break
          case '-list_id':
            order = order + 'list_id DESC'
            break
          // Priority
          case '+priority':
            order = order + 'priority ASC'
            break
          case '-priority':
            order = order + 'priority DESC'
            break
          // Deadline
          case '+deadline':
            order = order + 'deadline ASC'
            break
          case '-deadline':
            order = order + 'deadline DESC'
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
          default:
            console.log('Wrong value')
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

  createSqlQuery (where, order, pagination, count, table) {
    let sql =
      `SELECT ${count} FROM ${table}` +
                      mysql.escape(where) +
                      mysql.escape(order) +
                      mysql.escape(pagination)
    sql = sql.replace(/['"]+/g, '')

    return sql
  },

  createPagination (reqQuery) {
    let sql = ''
    if ('limit' in reqQuery) {
      sql = sql + ` LIMIT ${reqQuery.limit}`
    }
    if ('offset' in reqQuery) {
      sql = sql + ` OFFSET ${reqQuery.offset}`
    }

    return sql
  },

  createCount (reqQuery) {
    let sql = ''
    if ('count' in reqQuery) {
      if (reqQuery.count === true) {
        sql = 'COUNT(id)'
      } else {
        sql = '*'
      }
    } else {
      sql = '*'
    }

    return sql
  }
}

module.exports = olio
