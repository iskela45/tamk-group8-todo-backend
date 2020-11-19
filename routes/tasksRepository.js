// gets login details from gitnored config.
const mysql = require('mysql')
const pool = require('../conf.js')
const validator = require('../validator.js')
const queries = require('./queries.js')
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

        const where = queries.createWhereClause(keys)
        const order = queries.createOrderClause(keys)
        sql = queries.createSqlQuery(where, order, table)
      } else {
        sql = `SELECT * FROM ${table};`
      }
      console.log(sql)

      pool.query(sql, (err, locations) => {
        if (err) {
          reject(err)
        } else {
          resolve(locations)
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

  // delete an entry by ID
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

  // delete an entry by ID
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
  }
}

// export the module
module.exports = olio
