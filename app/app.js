'use strict';

const app = angular.module('VisualApp', []);

app.controller('MapController',['$scope','$http',  function ($scope, $http) {
  $scope.currD = new Date();
  $scope.oldD = new Date().setDate($scope.currD.getDate()-7);
  $scope.policeData;
  var d = new Date();
  d.setDate(d.getDate()-7);
  var newD = JSON.stringify(d);
  var nd = JSON.parse(newD);
  console.log(nd);
  var n1 = nd.slice(0,13);
  var queryOpt = '?$where=event_clearance_date>%27'+ n1 + '%3A00%3A00%27%20AND%20within_box(incident_location,47.646334,-122.300654,47.591024,-122.275355)%20AND%20event_clearance_subgroup!%3D%22TRAFFIC%20RELATED%20CALLS%22%20AND%20initial_type_group!%3D%22TRAFFIC%20RELATED%20CALLS%22' + '%20AND%20event_clearance_code!%3D%22470%22%20AND%20event_clearance_code!%3D%22201%22%20AND%20event_clearance_code!%3D%22202%22%20AND%20event_clearance_code!%3D%22410%22%20AND%20event_clearance_code!%3D%22203%22%20AND%20event_clearance_code!%3D%22200%22%20AND%20event_clearance_code!%3D%22244%22';
  var jsonUrl = 'https://data.seattle.gov/resource/pu5n-trf4.json'+ queryOpt;

  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(47.635495, -122.277294),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    zoomControl: false,
    scaleControl: true
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];

  var req = {
    "app_token":'2uwLlkpGhRtfbfmFDDtXX9Tlx',
    "limit": 10
  }

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (info){
    $scope.count = $scope.markers.length;
    var formatDate = new Date(info.event_clearance_date);


    var icons1 = {
      //robbery
      '031': 'http://www.abqjournal.com/crime/public/img//markers/icons/robbery.png',
      '030': 'http://www.abqjournal.com/crime/public/img//markers/icons/robbery.png',
      //disturbance
      '242': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '243': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '244': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '245': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '246': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '249': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Group_%E2%80%93_Offices_%E2%80%93_Dark.png',
      '170': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //domestic
      '080': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '081': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '082': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '083': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '084': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '085': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '086': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '087': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '171': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //suspicious
      '280': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Jogging_%E2%80%93_Sports_%E2%80%93_Default.png',
      '281': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Sports_Car_%E2%80%93_Sports_%E2%80%93_Default.png',
      '282': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //Weapon, Person With
      '291':'http://www.abqjournal.com/crime/public/img//markers/icons/weapons.png',
      '292': 'http://www.abqjournal.com/crime/public/img//markers/icons/weapons.png',
      //assaults
      '040':'http://www.abqjournal.com/crime/public/img//markers/icons/assault.png',
      '041':'http://www.abqjournal.com/crime/public/img//markers/icons/assault.png',
      '042':'http://www.abqjournal.com/crime/public/img//markers/icons/assault.png',
      '043':'http://www.abqjournal.com/crime/public/img//markers/icons/weapons.png',
      '049':'https://upload.wikimedia.org/wikipedia/commons/c/cf/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Group_%E2%80%93_Offices_%E2%80%93_Dark.png',
      '179':'http://www.abqjournal.com/crime/public/img//markers/icons/weapons.png',
      //arson, explosions
      '090':'https://upload.wikimedia.org/wikipedia/commons/a/aa/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Bomb_%E2%80%93_Events_%E2%80%93_Default.png',
      '091':'http://www.abqjournal.com/crime/public/img//markers/icons/arson.png',
      '092':'http://www.abqjournal.com/crime/public/img//markers/icons/arson.png',
      //thefts
      '071':'https://upload.wikimedia.org/wikipedia/commons/0/08/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Car_Rental_%E2%80%93_Transportation_%E2%80%93_Classic.png',
      '072':'http://www.abqjournal.com/crime/public/img//markers/icons/theft_from_auto.png',
      '073':'http://www.abqjournal.com/crime/public/img//markers/icons/theft_from_auto.png',
      '074':'http://www.abqjournal.com/crime/public/img//markers/icons/theft_from_auto.png',
      '061':'http://www.abqjournal.com/crime/public/img//markers/icons/theft_from_auto.png',
      '062':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      '063':'http://www.abqjournal.com/crime/public/img//markers/icons/theft_from_auto.png',
      '064':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      '065':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      '371':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      '372':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      '373':'http://www.abqjournal.com/crime/public/img//markers/icons/theft.png',
      //traffic
      '450': 'http://www.abqjournal.com/crime/public/img//markers/icons/dwi.png',
      // Burglary
      '050':'http://www.abqjournal.com/crime/public/img//markers/icons/burglary.png',
      '051':'http://www.abqjournal.com/crime/public/img//markers/icons/burglary.png',
      '052':'http://www.abqjournal.com/crime/public/img//markers/icons/burglary.png',
      '053':'http://www.abqjournal.com/crime/public/img//markers/icons/burglary.png',
      //fraud
      '100': 'http://www.abqjournal.com/crime/public/img//markers/icons/fraud.png',
      '101': 'http://www.abqjournal.com/crime/public/img//markers/icons/fraud.png',
      //harbor
      '341':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '342':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '343':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '344':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '345':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '346':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '320':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '321':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '322':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '323':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      '347':'https://upload.wikimedia.org/wikipedia/commons/3/3e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Ambulance_Boat_%E2%80%93_Health_%26_Education_%E2%80%93_Default.png',
      //harzards
      '350': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //homicide
      '010':'http://www.abqjournal.com/crime/public/img//markers/icons/homicide.png',
      '330':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //mischeif
      '250': 'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //drugs & alchol
      '188':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '174':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '176':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '177':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '181':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '182':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '183':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '186':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '184':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      '185':'http://www.abqjournal.com/crime/public/img//markers/icons/drug_alcohol.png',
      //vandal
      '130':'http://www.abqjournal.com/crime/public/img//markers/icons/vandalism.png',
      '139':'https://upload.wikimedia.org/wikipedia/commons/c/cf/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Group_%E2%80%93_Offices_%E2%80%93_Dark.png',
      //prowler
      '160': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_High_grass_%E2%80%93_Nature_%E2%80%93_default.png',
      '161': 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_High_grass_%E2%80%93_Nature_%E2%80%93_default.png',
      '162': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Jogging_%E2%80%93_Sports_%E2%80%93_Default.png',
      //sexual crimes
      '020':'http://www.abqjournal.com/crime/public/img//markers/icons/sex_crimes.png',
      '021':'http://www.abqjournal.com/crime/public/img//markers/icons/sex_crimes.png',
      '141':'http://www.abqjournal.com/crime/public/img//markers/icons/sex_crimes.png',
      '142':'http://www.abqjournal.com/crime/public/img//markers/icons/sex_crimes.png',
      '143':'http://www.abqjournal.com/crime/public/img//markers/icons/sex_crimes.png',
      //child
      '110':'https://upload.wikimedia.org/wikipedia/commons/3/3c/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Abduction_%E2%80%93_Events_%E2%80%93_Default.png',
      '111':'https://upload.wikimedia.org/wikipedia/commons/3/3c/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Abduction_%E2%80%93_Events_%E2%80%93_Default.png',
      '150':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '151':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '152':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //persons
      '361':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '362':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '363':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '364':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '365':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '366':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '271':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '273':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '274':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '275':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '220':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '221':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      //other
      '260':'https://upload.wikimedia.org/wikipedia/commons/c/c8/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Zoological_Garden_%E2%80%93_Culture_%26_Entertainment_%E2%80%93_Light.png',
      '261':'https://upload.wikimedia.org/wikipedia/commons/c/c8/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Zoological_Garden_%E2%80%93_Culture_%26_Entertainment_%E2%80%93_Light.png',
      '200':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '201':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '202':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '203':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '204':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',
      '205':'http://www.abqjournal.com/crime/public/img//markers/icons/disturbance.png',

    };


    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.incident_location.coordinates[1], info.incident_location.coordinates[0]),
      title:  info.event_clearance_description ,
      icon: icons1[info.event_clearance_code]

    });

    marker.date = formatDate;
    var curr_date1 = formatDate.getDate();
    marker.month = formatDate.getMonth() + 1;
    marker.year = formatDate.getFullYear();
    marker.timeAgo = new Date() - marker.date;



    marker.description = info.event_clearance_description.toLowerCase();
    marker.location = info.hundred_block_location;
    marker.code = info.event_clearance_code;
    marker.type = info.event_clearance_group;
    marker.content = '<div class="infoWindowContent">' + info.hundred_block_location + '<br>'+ 'lat: ' +info.incident_location.coordinates[1] + ', lng: ' + info.incident_location.coordinates[0]+'<br>' + formatDate + '<br>'+ 'police_code: ' + info.event_clearance_code + '<br>'+ 'incident #: ' + info.cad_event_number + '</div>';

    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });
    $scope.markers.push(marker);
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
