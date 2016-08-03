

'use strict';




const app = angular.module('VisualApp', []);

app.controller('MapController',['$scope','$http',  function ($scope, $http) {
  var jsonUrl = 'https://data.seattle.gov/resource/pu5n-trf4.json?$limit=100&zone_beat=C2';
  // var jsonUrl1 = 'https://data.seattle.gov/resource/pu5n-trf4.json?$limit=100&zone_beat=C3';
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






    var infoWindow = new google.maps.InfoWindow();

    // var icons = {
    //   TRESPASS: {
    //     icon: 'https://cdn1.iconfinder.com/data/icons/miscellaneous-4/32/fence-20.png'
    //   },
    //   THEFT: {
    //     icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Farm-Fresh_fire.png'
    //   }
    //   // THEFT: {
    //   //   icon: iconBase + 'info-i_maps.png'
    //   // }
    // };
    var createMarker = function (info){
      var formatDate = new Date(info.event_clearance_date);

      var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.incident_location.coordinates[1], info.incident_location.coordinates[0]),
            title:  info.event_clearance_description ,
            icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Farm-Fresh_fire.png'



        });

        // console.log(tres);
        marker.date = formatDate;
        // var d = new Date();
        var curr_date1 = formatDate.getDate();
         marker.month = formatDate.getMonth() + 1;
        marker.year = formatDate.getFullYear();
        // var todayNew1 = curr_month1 + '-' + curr_date1 + '-' + curr_year1;
        // var curr_date = d.getDate();
        // var curr_month = d.getMonth() + 1;
        // var curr_year = d.getFullYear();
        // var todayNew = curr_month + '-' + curr_date + '-' + curr_year;
        // marker.today = todayNew;
        // marker.year = curr_year;
        // marker.month = curr_month;
        // marker.today1 = todayNew1;
        // marker.year1 = curr_year1;
        // marker.month1 = curr_month1;


          // console.log(marker.year1);
        // console.log(marker.today);
        marker.location = info.hundred_block_location;
        marker.code = info.event_clearance_code;
        marker.type = info.event_clearance_group;
        marker.content = '<div class="infoWindowContent">' + info.census_tract + '<br>'+ info.event_clearance_group +'<br> '+ info.hundred_block_location + '<br>' + formatDate +  '</div>';

        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });


        $scope.markers.push(marker);
        console.log($scope.markers[0]);
}

    $http.get(jsonUrl, req)
      .then(function(result){
        var resData = result.data;
        var f = new Date(resData.event_clearance_date);
        if(f.getFullYear() > 2016 ){
          return;
        }
        for (var i = 0; i < resData.length; i++){
          createMarker(resData[i]);
        }
        $scope.policeData = resData;


    })


    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

}]);
app.filter('mydate', function() {
  return function(input) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = mm + '/' + dd;
    return (input == today)
  }
});
