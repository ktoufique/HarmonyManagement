'use strict';

var harmonyServices = angular.module('harmonyServices', []);

/* Services */

 
/*harmonyServices.factory('AllItems', ['$ressource', 
  ] function($ressource) { 
    return $ressource('doc.json');
});
*/

harmonyServices.factory('JsonFactory', function($http) { 
  var alls;
  return {
      qdata : function(callback) {
          
       //   if (!alls) {
            alls=new Array(); 
          
            var k=0; 
            var n=0;
            $http.get('json/report.json').success(function(data) {
      
              /* Get all developpers names */
              for (var i=0; i<data.repositories.length; i++) {
                type_def="="; 
                k=2;
                 for (var j=0; j<data.repositories[i].developers.length; j++) {
                    n=0;

                    if(alls.length > 0) {
                      for(var m = 0; m < alls.length; m++){
                        if(alls[m].id == data.repositories[i].developers[j].id)
                          n++;
                      }
                    }     

                    if (n===0) {
                      k++;
                      alls.push({'type':'=', 'name':data.repositories[i].developers[j].name, 'id':data.repositories[i].developers[j].id});
                      
                    }
                  }
                }
            }); 
        //}
          callback(alls);
      }
    };
  });
