var MainApplication = function ($routeProvider) {
    this._routingConfig = $routeProvider;

    this._routingConfig.when('/', {
        label: 'Homepage',
        templateUrl: 'view/homepage.html',
    }).otherwise({redirectTo: function () {
            return '/';
        }});

};

MainApplication.$inject = ['$routeProvider'];

angular.module('@@app_name',
        [
            'ngRoute'
        ]).config(MainApplication);