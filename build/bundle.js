/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(6);
	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(2);
	__webpack_require__(4);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// const angular = require('angular');







	const app = angular.module('VisualApp', []);



	//controllers
	__webpack_require__(2)(app);
	__webpack_require__(3)(app);

	//directives
	__webpack_require__(4)(app);
	__webpack_require__(5)(app);


/***/ },
/* 2 */
/***/ function(module, exports) {

	

	'use strict';

	module.exports = function(app){


	  app.controller('PoliceController', ['$scope','$http',  function($scope, $http){
	    // const policeData = 'http://www.celebritybucks.com/developers/export/JSON';
	    // const celebJson = 'http://localhost:3000/celeblists';
	    // const celebNews = 'http://www.usmagazine.com/celebrity-news/rss';
	$scope.policeCalls;
	    let req = {
	      method: 'GET',
	      url: 'https://data.seattle.gov/resource/pu5n-trf4.json?zone_beat=C2',
	      data: {
	        'limit': 5000,
	        'app_token': '2uwLlkpGhRtfbfmFDDtXX9Tlx'
	      }

	    };

	    $http(req)
	    .then(function(result){
	      $scope.policeCalls = result;
	      // $scope.celebs = result.data.celebs;
	      console.log(result);
	    });




	  }]);




	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	

	'use strict';

	module.exports = function(app){




	app.service('Map', function($q) {

	    this.init = function() {
	        var options = {
	            center: new google.maps.LatLng(40.7127837, -74.00594130000002),
	            zoom: 13,
	            disableDefaultUI: true
	        }
	        this.map = new google.maps.Map(
	            document.getElementById("map"), options
	        );
	        this.places = new google.maps.places.PlacesService(this.map);
	    }

	    this.search = function(str) {
	        var d = $q.defer();
	        this.places.textSearch({query: str}, function(results, status) {
	            if (status == 'OK') {
	                d.resolve(results[0]);
	            }
	            else d.reject(status);
	        });
	        return d.promise;
	    }

	    this.addMarker = function(res) {
	        if(this.marker) this.marker.setMap(null);
	        this.marker = new google.maps.Marker({
	            map: this.map,
	            position: res.geometry.location,
	            animation: google.maps.Animation.DROP
	        });
	        this.map.setCenter(res.geometry.location);
	    }

	});

	app.controller('MapController', function($scope, Map) {

	    $scope.place = {};

	    $scope.search = function() {
	        $scope.apiError = false;
	        Map.search($scope.searchPlace)
	        .then(
	            function(res) { // success
	                Map.addMarker(res);
	                $scope.place.name = res.name;
	                $scope.place.lat = res.geometry.location.lat();
	                $scope.place.lng = res.geometry.location.lng();
	            },
	            function(status) { // error
	                $scope.apiError = true;
	                $scope.apiStatus = status;
	            }
	        );
	    }

	    $scope.send = function() {
	        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);
	    }

	    Map.init();
	});
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(app){
	  app.directive('customPolice', function(){
	    return {
	      retrict: 'E',
	      templateUrl: 'policeCall_view.html'
	    };
	  });
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(app){
	  app.directive('customMap', function(){
	    return {
	      retrict: 'E',
	      templateUrl: 'map_view.html'
	    };
	  });
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(app){
	  app.directive('customHome', function(){
	    return {
	      retrict: 'E',
	      templateUrl: 'home_view.html',
	      controller: 'HomeController'
	    };
	  });
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(app){
	  app.directive('customSidebar', function(){
	    return {
	      retrict: 'E',
	      templateUrl: 'sideBar_view.html',
	      controller: 'SidebarController'
	    };
	  });
	};


/***/ }
/******/ ]);