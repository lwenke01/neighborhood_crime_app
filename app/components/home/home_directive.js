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
