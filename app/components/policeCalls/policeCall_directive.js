'use strict';

module.exports = function(app){
  app.directive('customPolice', function(){
    return {
      retrict: 'E',
      templateUrl: 'policeCall_view.html'
    };
  });
};
