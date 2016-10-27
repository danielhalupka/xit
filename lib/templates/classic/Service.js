var @@model_nameService = function($http) {
    this.$http = $http;
    
    this.get@@model_name = function (callback) {
        this.$http.get(appConfig.appEndpointList[appConfig.activeEndpoint]['get@@model_name']).success(function (result) {
            callback(result);
        });
    };
    
    this.set@@model_name = function (@@model_name_lowercase, callback) {
         this.$http.post(appConfig.appEndpointList[appConfig.activeEndpoint]['set@@model_name'],@@model_name_lowercase).success(function (result) {
           callback(result);
         });
    };
});

angular.module('@@module_scope.@@model_nameService', [])
            .service('@@model_nameService', ['$http',@@model_nameService]);


