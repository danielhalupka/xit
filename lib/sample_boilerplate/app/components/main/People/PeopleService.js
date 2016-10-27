
var PeopleService = Class.extend({
    getPeople: function (callback) {
        this.$http.get(appConfig.appEndpointList[appConfig.activeEndpoint]['getPeople']).success(function (result) {
            callback(result);
        });
    },
    setSelectedPerson: function (person, callback) {
        /* Currently no POST service, since there is no webservice
         * 
         * this.$http.post(appConfig.appEndpointList[appConfig.activeEndpoint]['setSelectedPeron'],person).success(function (result) {
         *  callback(result);
         * });
         *
         */
        var result = [];
        callback(result);
    }

});

(function () {

    var PeopleServiceProvider = Class.extend({
        instance: new PeopleService(),
        $get: ['$http', function ($http) {
                this.instance.$http = $http;
                return this.instance;
            }]
    });

    angular.module('main.PeopleService', [])
            .provider('PeopleService', PeopleServiceProvider);
}());