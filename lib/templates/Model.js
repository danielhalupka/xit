
var @@model_nameModel = Class.extend({
    _@@model_name_lowercaseService:{},
    _@@model_name_lowercase:[],
    
    getFromService: function (callback) {
        var self = this;
        this._@@model_name_lowercaseService.get@@model_name(function(@@model_name_lowercase){
             self._@@model_name_lowercase = @@model_name_lowercase; 
        });
    },

});

(function () {

    var @@model_nameModelProvider = Class.extend({
        instance: new @@model_nameModel(),
        $get: ['@@model_nameService',
            function (@@model_nameService) {
                this.instance._@@model_name_lowercaseService = @@model_nameService;
                return this.instance;
            }]
    });

    angular.module('@@module_scope.@@model_nameModel', ['@@module_scope.@@model_nameService'])
            .provider('@@model_nameModel', @@model_nameModelProvider);
}());