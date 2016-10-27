var PeopleController = Class.extend({
    _peopleModel:{},
    
    init:function(PeopleModel){
        this._peopleModel = PeopleModel;
    },
    
    refreshPeople:function(){
        this._peopleModel.refreshPeople();
    },
    
    setSelectedPerson:function(person){
        this._peopleModel.setSelectedPerson(person);
    }
    
});

PeopleController.$inject = ['PeopleModel'];

angular.module('main.PeopleController', ['main.PeopleModel'])
        .controller('PeopleController', PeopleController);
