var flatten = require('lodash-node/modern/arrays/flatten')

var format = require('./format')

module.exports = function (app, options) {
  return function (req, res, next) {
    var routesMap = app._router.map
    var methods = Object.keys(routesMap)
    var routes = flatten(methods.map(function (method) {
      return routesMap[method].map(function (route) {
        return format.method(method) + route.path
      })
    }))

    req.routes = routes
    next()
  }
}