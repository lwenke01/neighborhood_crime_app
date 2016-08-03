

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
