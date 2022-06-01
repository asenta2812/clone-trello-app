const express = require('express');
const authRoute = require('./auth.route');
const boardRoute = require('./board.route');
const columnRoute = require('./column.route');
const taskRoute = require('./task.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: ''
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/boards',
    route: boardRoute,
  },
  {
    path: '/columns',
    route: columnRoute,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  if (path === '/') {
    router.get(path, (req, res) => res.end('Welcome to my land!'))
  } else {
    router.use(path, route);
  }
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
