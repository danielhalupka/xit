var @@model_nameModel = function(@@model_nameService) {
    this._@@model_name_lowercase = [];
    this._@@model_name_lowercaseService = @@model_nameService;
     
    this.getFromService = function (callback) {
        var self = this;
        this._@@model_name_lowercaseService.get@@model_name(function(@@model_name_lowercase){
             self._@@model_name_lowercase = @@model_name_lowercase; 
        });
    };
});

angular.module('@@module_scope.@@model_nameModel', ['@@module_scope.@@model_nameService'])
            .service('@@model_nameModel', ['@@model_nameService',@@model_nameModel]);


