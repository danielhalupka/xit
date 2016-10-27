
var MainApplication = function ($routeProvider, localStorageServiceProvider) {
    this._routingConfig = $routeProvider;
    this._localStorage = localStorageServiceProvider;
    
    this._routingConfig.when('/', {
        label: 'Homepage',
        templateUrl: 'view/homepage.html',
        controller: 'HomePageController',
        controllerAs: 'homeCont'
    }).when('/example2', {
        label: 'Example 2',
        templateUrl: 'view/example.html'
    }).when('/calculator', {
        label: 'Calculator',
        templateUrl: 'view/calculator.html',
        controller: 'CalculatorController',
        controllerAs: 'calcCont'
    }).when('/trigonometric_calculator', {
        label: 'Trigonometric Calculator',
        templateUrl: 'view/calculator.html',
        controller: 'TrigonometricCalculatorController',
        controllerAs: 'calcCont'
    }).when('/scientific_calculator', {
        label: 'Scientific Calculator',
        templateUrl: 'view/calculator.html',
        controller: 'ScientificCalculatorController',
        controllerAs: 'calcCont'
    }).when('/people', {
        label: 'People',
        templateUrl: 'view/people.html',
    }).otherwise({redirectTo: function () {
            return '/';
        }});

    this._localStorage.setPrefix('@@app_name');
};

MainApplication.$inject = ['$routeProvider', 'localStorageServiceProvider'];

angular.module('@@app_name',
        [
            'ngRoute',
            'LocalStorageModule',
            'shared.RootController',
            'main.HomePageController',
            'shared.FunctionFilter',
            'main.CalculatorController',
            'main.TrigonometricCalculatorController',
            'main.ScientificCalculatorController',
            'main.PeopleDirective'])
        .config(MainApplication);