'use strict';

// const angular = require('angular');







const app = angular.module('VisualApp', []);



//controllers
require(__dirname + '/components/policeCalls/policeCall_controller.js')(app);
require(__dirname + '/components/map/map_controller.js')(app);

//directives
require(__dirname + '/components/policeCalls/policeCall_directive.js')(app);
require(__dirname + '/components/map/map_directive.js')(app);
