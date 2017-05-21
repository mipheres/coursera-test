(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller("NarrowItDownController",NarrowItDownController)
.factory("MenuSearchServiceFactory",MenuSearchServiceFactory)
.directive("foundItems",FoundItems)
.constant("ApiBasePath","https://davids-restaurant.herokuapp.com/")

NarrowItDownController.$inject=["MenuSearchServiceFactory"]
function NarrowItDownController(MenuSearchServiceFactory){
  var list=this
  var service=MenuSearchServiceFactory()

  list.findItems=function (searchTerm){
    var promise=service.getMatchedMenuItems(searchTerm)
    promise.then(function(response){
      list.found=response;
    })
  }

  list.removeItem=function(index){
    list.found.splice(index,1)
  }

}

function MenuSearchService(searchTerm,$http, ApiBasePath) {
  var service=this

  service.getMatchedMenuItems=function (searchTerm){
    return $http({url: ApiBasePath + "menu_items.json"}).then(function (result) {
      var menu_items=result.data.menu_items;
      var foundItems=[]
      for (var i = 0; i < menu_items.length ; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTerm) != -1){
          foundItems.push(menu_items[i])
        }
      };

      return foundItems
    });
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchServiceFactory($http,ApiBasePath){
  var factory=function (searchTerm){
    return new MenuSearchService(searchTerm,$http,ApiBasePath);
  }
  return factory;
}

function FoundItems(){
  var ddo={
    restrict: "E",
    templateUrl: 'test.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
  };

  return ddo
}

})();