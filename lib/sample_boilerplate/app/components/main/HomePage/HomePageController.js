var HomePageController = Class.extend({
    hello:"Hello world from HomePageController",
    
    init:function(){
      
    }
    
});

//HomePageController.$inject = ['HomePageModel'];

angular.module('main.HomePageController', [])
        .controller('HomePageController', HomePageController);