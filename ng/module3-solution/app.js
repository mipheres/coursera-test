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

  list.findItems=function (){
    var foundArray=service.getMatchedMenuItems(list.searchTerm)
    //foundArray=[1,2,3,4,5,6]
    list.found=foundArray;
    list.testarray=list.found
  }

}

function MenuSearchService(searchTerm,$http, ApiBasePath) {
  var service=this;

  service.getMatchedMenuItems=function (searchTerm){
    return $http({url: ApiBasePath + "menu_items.json"}).then(function (result) {
      var menu_items=result.data.menu_items;
      var foundItems=[]
      for (var i = 0; i < menu_items.length ; i++) {
        if (menu_items[i].description.toLowerCase().indexOf(searchTerm) != -1){
          foundItems.push(menu_items[i])
        }
      };

      return foundItems//Array
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
  // console.log("Directive FoundItems")
  var ddo={
    templateUrl: 'test.html',
    scope: {
      myFoundItems: '=localDirectiveScope'
    }
  };

  return ddo
}

})();