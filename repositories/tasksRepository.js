// gets login details from gitnored config.
const pool = require('../conf.js')
const validator = require('../validator.js')
const queries = require('../queries/tasksQueries.js')
const table = 'tasks'
// MySql query

const olio = {
  // Get all contents and print them.
  findAll: (reqQuery) => {
    async function asyncOp (resolve, reject) {
      let sql

      if (Object.keys(reqQuery).length > 0) {
        const keys = Object.keys(reqQuery)

        const keysAreCorrect = queries.validateKeys(keys)

        if (!keysAreCorrect) {
          reject(new Error('Request included invalid keys.'))
        }

        const where = queries.createWhereClause(keys, reqQuery)
        const like = queries.getSearchTitle(reqQuery)
        const order = queries.createOrderClause(reqQuery)
        const pagination = queries.createPagination(reqQuery)
        const count = queries.createCount(reqQuery)
        sql = queries.createSqlQuery(where, like, order, pagination, count, table)
      } else {
        sql = `SELECT * FROM ${table};`
      }

      pool.query(sql, (err, tasks) => {
        if (err) {
          reject(err)
        } else {
          resolve(tasks)
        }
      })
    }
    return new Promise(asyncOp)
  },

  // Add an entry
  save: (data) => {
    // SQL query and escapes in case of SQL injection
    const save = `INSERT INTO ${table} (list_id, title) VALUES (
    ${pool.escape(data.listId)}, 
    ${pool.escape(data.title)})`

    async function asyncOp (resolve, reject) {
      const idStat = await validator.idValidator(data.listId)

      if (idStat.errors.length === 0) {
        pool.query(save, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      } else {
        reject(idStat)
      }
    }
    return new Promise(asyncOp)
  },

  // Delete an entry by ID
  deleteById: (id) => {
    async function asyncOp (resolve, reject) {
      const del = `DELETE FROM ${table} WHERE id = ${pool.escape(id)}`
      const idStat = await validator.idValidator(id)

      if (idStat.errors.length === 0) {
        pool.query(del, (err, response) => {
          if (err) {
            reject(err)
          } else if (response.affectedRows === 0) {
            reject(new Error(`could not find resource with id = ${id}`))
          } else {
            resolve(response)
          }
        })
      } else {
        reject(idStat)
      }
    }
    return new Promise(asyncOp)
  },

  // Find an entry by ID
  findById: (id) => {
    async function asyncOp (resolve, reject) {
      const idStat = await validator.idValidator(id)
      const find = `SELECT * FROM ${table} WHERE id = ${pool.escape(id)}`
      if (idStat.errors.length === 0) {
        pool.query(find, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      } else {
        reject(idStat)
      }
    }

    return new Promise(asyncOp)
  },

  // Update an entry
  update: (id, data) => {
    async function asyncOp (resolve, reject) {
      const idStat = await validator.idValidator(id)
      const key = Object.keys(data)[0]
      const value = data[key]
      const len = value.length

      let sql = `UPDATE ${table} SET ${pool.escape(key)} = ${pool.escape(value)}, edited = NOW() WHERE id = ${pool.escape(id)}`

      sql = sql.replace(/['"]+/g, '')

      if (typeof value !== 'boolean') {
        // The next five rows add single quotes around "value" variable because earlier replace() deletes all the quotes away that is needed to do
        const arr = sql.split('')
        const startIndex = 17 + key.length + 3
        const fValue = `'${value}'`
        arr.splice(startIndex, len)
        arr.splice(startIndex, 0, ...fValue.split(''))
        sql = arr.join('')
      }

      console.log(sql)

      if (idStat.errors.length === 0) {
        pool.query(sql, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      } else {
        reject(idStat)
      }
    }

    return new Promise(asyncOp)
  }
}

// export the module
module.exports = olio
