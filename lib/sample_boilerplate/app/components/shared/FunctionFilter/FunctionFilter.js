angular.module('shared.FunctionFilter',[]).filter('isFunction', function () {
    return function (objects) {
        var output = {};
        for(var k in objects){
            if(typeof(objects[k]) == typeof Function && k != "getProto" && k != "constructor"){
                output[k]=objects[k];
            }
        }
        return output;
    }
});