/*phonecatControllers.service('MyService', function($http){

    this.init = function() {
  
    var alls=[];
    var k=0; 
    var n=0;

    $http.get('JSON/report.json').success(function(data) {
      
      /* Get all developpers names 
      for (var i=0; i<data.repositories.length; i++) {
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

      /* Get all skills names 
      k=0; 
      for (var i=0; i<data.domain_aptitudes.length; i++) {
        n=0;

        if(alls.length > 0) {
          for(var m = 0; m < alls.length; m++){
            if(alls[m].text == data.domain_aptitudes[i].name)
              n++;
          }
        }     

        if (n===0) {
          k++;
          alls.push({'type':'==','name':data.domain_aptitudes[i].name,'id':data.domain_aptitudes[i].id});
        }

      }

      /* Get all projects names 
      k=0; 
      for (var i=0; i<data.repositories.length; i++) {
        n=0;
        if(alls.length > 0) {
          for(var m = 0; m < alls.length; m++){
            if(alls[m].text == data.repositories[i].name )
              n++;
          }
        }     
        if (n===0) {
          k++;
          alls.push({'type':'===','name':data.repositories[i].name ,'id':data.repositories[i].id});
        }
      }
});
return alls; 
}
});

*/





/*$scope.devJson = function () {
    var k=0; 
    
    $.getJSON( "doc.json", function( data ) {
      var n=0;

      for (var i=0; i<data.repositories.length; i++) {
        for (var j=0; j<data.repositories[i].developers.length; j++) {
          n=0;

          if($scope.devs.length > 0) {
            for(var m = 0; m < $scope.devs.length; m++){
              if($scope.devs[m].id == data.repositories[i].developers[j].id)
                n++;
            }
          }     

          if (n===0) {
            k++;
            $scope.devs.push({text:data.repositories[i].developers[j].name, id:data.repositories[i].developers[j].id, done:true});
          }
        }
      }
    }); 

  }; */