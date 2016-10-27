var RootController = Class.extend({
    _scope:null,
    _urlParams:null,
    _location:null,
    _root:null,
    
    init:function(scope,urlParams,location,root){
        this._scope = scope;
        this._urlParams = urlParams;
        this._location = location;
        this._root = root;
    },
    
    goTo:function(path){
        this._location.path(path);
        this._location.replace();
    }
    
});

RootController.$inject = ['$scope', '$routeParams','$location', '$rootScope'];

angular.module('shared.RootController', [])
        .controller('RootController', RootController);

