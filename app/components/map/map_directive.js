'use strict';

module.exports = function(app){
  app.directive('customMap', function(){
    return {
      retrict: 'E',
      templateUrl: 'map_view.html'
    };
  });
};
