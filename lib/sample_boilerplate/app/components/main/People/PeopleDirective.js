angular.module('main.PeopleDirective',['main.PeopleController'])
    .directive('peopleTable', [function(){
        return {
            controller: 'PeopleController',
            controllerAs: 'peopleCont',
            templateUrl:'partials/main/People/people.directive.partial.html'
        };
    }]);