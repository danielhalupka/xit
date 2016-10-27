
var PeopleModel = Class.extend({
    _peopleService:{},
    _people:[],
    _selected_person:{},
    
    refreshPeople: function (callback) {
        var self = this;
        this._peopleService.getPeople(function(people){
             self._people = people; 
        });
    },
    
    setSelectedPerson:function(person){
        var self = this;
        this._peopleService.setSelectedPerson(person,function(people){
            self._selected_person = person; 
            console.log(people);
        });
    }
    
    
   

});

(function () {

    var PeopleModelProvider = Class.extend({
        instance: new PeopleModel(),
        $get: ['PeopleService',
            function (PeopleService) {
                this.instance._peopleService = PeopleService;
                this.instance.refreshPeople();
                return this.instance;
            }]
    });

    angular.module('main.PeopleModel', ['main.PeopleService'])
            .provider('PeopleModel', PeopleModelProvider);
}());