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
