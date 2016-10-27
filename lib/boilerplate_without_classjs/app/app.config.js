var MainApplication = function ($routeProvider) {
    this._routingConfig = $routeProvider;

    this._routingConfig.when('/', {
        label: 'Homepage',
        templateUrl: 'view/homepage.html',
    }).otherwise({redirectTo: function () {
            return '/';
        }});

};

angular.module('@@app_name',
        [
            'ngRoute'
        ]).config(['$routeProvider', MainApplication]);