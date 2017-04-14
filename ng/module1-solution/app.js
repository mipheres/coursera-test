(function () {
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.check_if_too_much = function(){
      var array_of_items=$scope.lunch_menu.split(',');
      if(array_of_items.length<4){
        $scope.lunch_menu_result="Enjoy!";
      }else{
        $scope.lunch_menu_result="Too much!";
      }
    }
  }
})();
