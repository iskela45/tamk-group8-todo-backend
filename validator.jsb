const Validator = require('jsonschema').Validator
const validator = new Validator()

const idSchema = {
  type: 'number',
  minimum: 1
}

// Check that the given variable is an object
// that holds keys latitude and longitude
// with numbers between given ranges.
const cordSchema = {
  required: ['latitude', 'longitude'],
  type: 'object',
  properties: {
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180
    }
  }
}

const olio = {

  idValidator (id) {
    function asyncOp (resolve, reject) {
      const validation = validator.validate(id, idSchema)
      resolve(validation)
    }
    return new Promise(asyncOp).catch(err => console.log(err))
  },

  cordValidator (cords) {
    function asyncOp (resolve, reject) {
      const validation = validator.validate(cords, cordSchema)
      resolve(validation)
    }
    return new Promise(asyncOp).catch(err => console.log(err))
  }
}

module.exports = olio
