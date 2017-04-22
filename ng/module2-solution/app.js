(function (){
	angular.module("ShoppingListCheckOff",[])
	.controller("ToBuyController",ToBuyController)
	.controller("AlreadyBoughtController",AlreadyBoughtController)
	.service("ShoppingListCheckOffService",ShoppingListCheckOffService)

	ToBuyController.$inject = ["ShoppingListCheckOffService"]
	function ToBuyController(ShoppingListCheckOffService){ /*function constructor*/
		var controller=this;/*readability*/

		controller.items=ShoppingListCheckOffService.getToBuyItems();
		controller.removeItem=function(ix){
			ShoppingListCheckOffService.removeItemFromToBuy(ix);
		}
	}

	AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var controller=this;/*readability*/

		controller.items=ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService(){ /*function constructor*/
		var service = this;/*function constructor: can use this.singleton*/

		service.ToBuy=[
			{
				name:"Leffe",
				quantity:"6 pack"
			},
			{
				name:"Westmalle",
				quantity:"6 pack"
			},
			{
				name:"Dubbel",
				quantity:"6 pack"
			},
			{
				name:"Heineken",
				quantity:"6 pack"
			},
			{
				name:"Blue Moon",
				quantity:"6 pack"
			},
			{
				name:"Tuborg",
				quantity:"6 pack"
			},
		];
		service.Bought=[];

		service.getToBuyItems=function(){
			return service.ToBuy;
		}
		service.getBoughtItems=function(){
			return service.Bought;
		}

		service.removeItemFromToBuy = function(ix){
			service.Bought.push(service.ToBuy[ix]);
			service.ToBuy.splice(ix,1);
		}

	}
})();