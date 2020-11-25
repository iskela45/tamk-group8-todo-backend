const Validator = require('jsonschema').Validator
const validator = new Validator()

const idSchema = {
  type: 'number',
  minimum: 1,
}

const olio = {
  // Validate id through JSON schema that id is a number and over 1
  idValidator(id) {
    function asyncOp(resolve, reject) {
      const validation = validator.validate(id, idSchema)
      resolve(validation)
    }
    return new Promise(asyncOp).catch((err) => console.log(err))
  },
}

module.exports = olio
