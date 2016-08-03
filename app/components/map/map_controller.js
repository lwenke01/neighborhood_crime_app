

'use strict';




const app = angular.module('VisualApp', []);

app.controller('MapController',['$scope','$http',  function ($scope, $http) {
  var jsonUrl = 'https://data.seattle.gov/resource/pu5n-trf4.json?zone_beat=C2';
  $scope.policeData;
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(47.635495, -122.277294),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    // $scope.policeData = [];

    var req = {
      "app_token":'2uwLlkpGhRtfbfmFDDtXX9Tlx',
      "limit": 10
    }



// var getData = function (){
//
//
//     $http.get(jsonUrl, req)
//       .then(function(result){
//         $scope.policeData = result.data;
//         // $scope.policeData = result.data;
//         console.log($scope.policeData);
//
// })
// }
// getData();




    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info){
      // console.log('info',info);

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.incident_location.coordinates[1], info.incident_location.coordinates[0]),
            title: info.event_clearance_group

        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }
    $http.get(jsonUrl, req)
      .then(function(result){
        var resData = result.data;
        for (var i = 0; i < resData.length; i++){
          createMarker(resData[i]);
        }
        $scope.policeData = resData;
        // $scope.policeData = result.data;
        console.log($scope.policeData);

    })


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

}]);
