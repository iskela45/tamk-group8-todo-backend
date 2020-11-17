const mysql = require('mysql')

function sqlAnd (sqlQuery) {
  if (sqlQuery.substr(-1) === ')') {
    sqlQuery = sqlQuery + ' AND '
  }
  return sqlQuery
}

const olio = {

  sortCords (reqQuery) {
    // If key 'sort' exists check for +lat, -lat, +lon, -lon in string.
    // Return ORDER BY string to be attached to the rest of the query.

    // replace spaces with + since + signs get replaced by spaces at some point
    const sortString = reqQuery.sort.split(' ').join('+')
    const sorters = sortString.split(',')
    console.log(sorters)

    let order = ' ORDER BY'

    for (const sorter of sorters) {
      if (order !== ' ORDER BY') {
        order = order + ','
      }

      switch (sorter) {
        case '+lat':
          order = order + ' latitude ASC'
          break
        case '-lat':
          order = order + ' latitude DESC'
          break
        case '+lon':
          order = order + ' longitude ASC'
          break
        case '-lon':
          order = order + ' longitude DESC'
          break
      }
    }

    // return empty string if no matches were found
    if (order === ' ORDER BY') {
      order = ''
    }

    // remove commas from the end of string if one or more matches failed.
    while (order.substring(order.length - 1, order.length) === ',') {
      order = order.slice(0, -1)
    }

    return order
    // Put any sort variables into array after chopping up the string.
  }
}

module.exports = olio
