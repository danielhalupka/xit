
var @@model_nameService = Class.extend({
    get@@model_name: function (callback) {
        this.$http.get(appConfig.appEndpointList[appConfig.activeEndpoint]['get@@model_name']).success(function (result) {
            callback(result);
        });
    },
    
    set@@model_name: function (@@model_name_lowercase, callback) {
         this.$http.post(appConfig.appEndpointList[appConfig.activeEndpoint]['set@@model_name'],@@model_name_lowercase).success(function (result) {
           callback(result);
         });
    }

});

(function () {

    var @@model_nameServiceProvider = Class.extend({
        instance: new @@model_nameService(),
        $get: ['$http', function ($http) {
                this.instance.$http = $http;
                return this.instance;
            }]
    });

    angular.module('@@module_scope.@@model_nameService', [])
            .provider('@@model_nameService', @@model_nameServiceProvider);
}());