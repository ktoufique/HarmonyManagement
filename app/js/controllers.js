'use strict';

var harmonyControllers = angular.module('harmonyControllers', ['ui.bootstrap']);

/* Controllers */
var idCurrentDevelopper;
var nameCurrentDevelopper; 
var idCurrentCompetence;
var idCurrentRepo;
var nameCurrentRepo;
var nameCurrentCompetence;

var devIdDelete=[]; 
var skillIdDelete=[];
var projectIdDelete=[];


var res=[];


function mainController($scope, $http, $location, $routeParams) {

  $scope.selected = [];
  $scope.alls=[];
  $scope.allInit=[]; 
  $scope.devAll=[];
  $scope.skillAll=[];
  $scope.projectAll=[];
  $scope.id=$routeParams.id;

  $scope.pageSizeSkill=5;
  $scope.pageSizeDev=5; 
  $scope.pageSizeRepo=5;  

  $scope.nbDev=0; 
  $scope.nbSkill=0; 
  $scope.nbProject=0; 

  $http.get('json/report.json').success(function(data) {
    data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);
    $scope.allsCalcul(data); 
  });

  $scope.calculInit = function(){
    $http.get('json/report.json').success(function(data) {
    $scope.allsCalcul(data); 
    });
  }

  $scope.allsCalcul = function (data) {
    var k=0;
    var n=0;
    var type_def; 

    for (var i=0; i<data.repositories.length; i++) {
     for (var j=0; j<data.repositories[i].developers.length; j++) {
      n=0;
      if($scope.alls.length > 0) {
        for(var m = 0; m < $scope.alls.length; m++){
          if($scope.alls[m].id == data.repositories[i].developers[j].id)
            n++;
        }
      }     

      if (n===0) {
        k++;
        $scope.nbDev++; 
        $scope.alls.push({'type': '=', 'name':data.repositories[i].developers[j].name, 'id':data.repositories[i].developers[j].id});  
        $scope.devAll.push({'name':data.repositories[i].developers[j].name, 'id':data.repositories[i].developers[j].id});
      }
    }
  }

  /* Get all skills names */
  k=0; 
  for (var i=0; i<data.domain_aptitudes.length; i++) {

    for (var j=0; j<data.domain_aptitudes[i].concrete_aptitudes.length; j++) {
      n=0;

      if($scope.alls.length > 0) {
        for(var m = 0; m < $scope.alls.length; m++){
          if($scope.alls[m].id == data.domain_aptitudes[i].concrete_aptitudes[j].id)
            n++;
        }
      }     

      if (n===0) {
        k++;
        $scope.nbSkill++; 
        $scope.alls.push({'type':'==','name':data.domain_aptitudes[i].concrete_aptitudes[j].name,'id':data.domain_aptitudes[i].concrete_aptitudes[j].id});
        $scope.skillAll.push({'name':data.domain_aptitudes[i].concrete_aptitudes[j].name,'id':data.domain_aptitudes[i].concrete_aptitudes[j].id});
      }
    }
  }

  /* Get all projects names */
  k=0; 
  for (var i=0; i<data.repositories.length; i++) {
    n=0;
    if($scope.alls.length > 0) {
      for(var m = 0; m < $scope.alls.length; m++){
        if($scope.alls[m].id == data.repositories[i].id )
          n++;
      }
    }     
    if (n===0) {
      k++;
      $scope.nbProject++; 
      $scope.alls.push({'type':'===','name':data.repositories[i].name ,'id':data.repositories[i].id});
      $scope.projectAll.push({'name':data.repositories[i].name ,'id':data.repositories[i].id});
    }
  }
  $scope.allInit=$scope.alls; 
  };


  res=$scope.alls;


	//perment de naviguer entre les pages
  $scope.go = function ( test, id, name ) {
    if($scope.selected.type=="=" ){
      idCurrentDevelopper=$scope.selected.id;
      nameCurrentDevelopper=$scope.selected.name; 
      $scope.idDeveloper = $scope.selected.id;
      $scope.alls=res; 
      
      if ($location.absUrl().indexOf("skill")!=-1 || $location.absUrl().indexOf("project")!=-1) {globalDev=1;}
      $location.path( '/developer');
    }

    else if($scope.selected.type=="=="){
      idCurrentCompetence= $scope.selected.id;
      nameCurrentCompetence=$scope.selected.name;
      $scope.idSkill = $scope.selected.id;      
      $scope.alls=res;
      
      if ($location.absUrl().indexOf("developer")!=-1 || $location.absUrl().indexOf("project")!=-1) globalComp=1;
      $location.path( '/skill');
    }

    else if($scope.selected.type=="==="){
      idCurrentRepo=$scope.selected.id;
      $scope.idRepo=$scope.selected.id;
      nameCurrentRepo=$scope.selected.name;
      $scope.alls=res;
      
      if ($location.absUrl().indexOf("skill")!=-1 || $location.absUrl().indexOf("developer")!=-1) globalProj=1;
      $location.path( '/project');
    }

    else if (test==1){
      idCurrentDevelopper= id;
      $scope.idDeveloper = id;
      nameCurrentDevelopper = name; 
      console.log("id"+id +"et IDscope : "+$scope.idDeveloper + $scope.nom)
      $scope.alls=res;

      $location.path( '/developer');
    }

    else if(test==2){
      idCurrentCompetence= id;
      nameCurrentCompetence= name;
      $scope.idSkill =id;      
      $scope.alls=res;

      $location.path( '/skill');
    }

    else if (test==3){
      idCurrentRepo= id;
      $scope.idRepo= id;
      nameCurrentRepo=name;
      $scope.alls=res;

      $location.path( '/project');
    }

    $scope.$broadcast('remakeData');
    $scope.$broadcast('remakeDataBis');
    $scope.$broadcast('remakeDataBisBis');

  };

  $scope.incrementLimitSkill = function() {
    $scope.pageSizeSkill += 5;
  };

  $scope.incrementLimitDev = function() {
    $scope.pageSizeDev += 5;
  };
  
  $scope.incrementLimitRepo = function() {
    $scope.pageSizeRepo += 5;
  };

  $scope.decrementLimitSkill = function() {
    $scope.pageSizeSkill -= 5;
  };

  $scope.decrementLimitDev = function() {
    $scope.pageSizeDev -= 5;
  };
  
  $scope.decrementLimitRepo = function() {
    $scope.pageSizeRepo -= 5;
  };

  $scope.pageClass = 'page-skills';
}


harmonyControllers.controller('mainController',mainController);


harmonyControllers.controller('HomeCtrl', ['$scope', '$http',
  function($scope, $http) {

    $http.get('json/report.json').success(function(data) {
      var someArray = new Array();
      
      data.repositories.forEach(function(d){
        d.developers.forEach(function(d){
          d.commits = - d.commits;
          someArray.push(d);
        })
      }) 
      $scope.phones = someArray;
    });  

    $scope.pageClass = 'page-home';
    $scope.titre = 'Home';
    $scope.indexMax = 5; 
  }]);



// competence page controller
harmonyControllers.controller('skillsController', function($scope) {
  $scope.pageClass = 'page-skills';
  $scope.titre = 'SKILLS';
});

harmonyControllers.controller('skillController', function($scope) {
  $scope.pageClass = 'page-skill';
  $scope.titre = 'SKILL';
});


// configuration page controller
harmonyControllers.controller('configurationController', function($scope, $modal, $log, $location) {
  $scope.pageClass = 'page-configuration';
  $scope.titre = 'CONFIGURATION'; 

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open1 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened1 = true;
  };

  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened2 = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'dd/MM/yyyy'];
  $scope.format = $scope.formats[1];
  


  // Developpeurs
  $scope.openDev = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContentDev.html',
      controller: ModalInstanceCtrl,
      resolve: {
        devs: function () {
          return $scope.devSaved;
        }
      }
    });

    modalInstance.result.then(function (selectedDev) {
      $scope.selected.dev=selectedDev;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  // Compétences
  $scope.openComp = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContentComp.html',
      controller: ModalInstanceCtrl,
      resolve: {
        comps: function () {
          return $scope.compSaved;
        }
      }
    });

    modalInstance.result.then(function (selectedComp) {
      $scope.selected.comp=selectedComp;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.openProj = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContentProjet.html',
      controller: ModalInstanceCtrl,
      resolve: {
        devs: function () {
          return $scope.projSaved;
        }
      }
    });

    modalInstance.result.then(function (selectedProj) {
      $scope.selected.proj=selectedProj;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.final =function (){
    var choixproposition;
    var theDate1;
    var theDate2;
    var choixprop1;
    

    theDate1=getDate1(1);
    theDate2=getDate1(2);

    //Permet de vérifier quue le manager a choisi un nombre de développeurs 
    if (form3.choix[0].checked)  
      choixproposition=document.getElementById("choix0").value;
    
    else if (form3.choix[1].checked) 
      choixproposition=document.getElementById("choix1").value; 
    
    else if (form3.choix[2].checked) 
      choixproposition=document.getElementById("choix2").value;
    
    else if (form3.choix[3].checked) 
      choixproposition=document.getElementById("choix3").value;
    
    else if (form3.choix[4].checked) 
      choixproposition=document.getElementById("choix4").value; 
    
    else if (form3.choix[5].checked) 
      choixproposition=document.getElementById("choix5").value;   
    
    else {
      alert("You didn't pick any number");
      return ;
    }
    

    // Permet de comparer les dates 
    var theDateSplit1=theDate1.split('/');
    var day1=theDateSplit1[0];
    var month1=theDateSplit1[1];
    var year1=theDateSplit1[2];

    
    var theDateSplit2=theDate2.split('/');
    var day2=theDateSplit2[0];
    var month2=theDateSplit2[1];
    var year2=theDateSplit2[2];


    if (year1==year2 || year1 >year2){
      if (month1==month2 || month1 >month2){
        if(day1==day2 || day2 < day1){
          alert("your date arn't correct");
          return ; 
        }
      }
    }

    $location.path( '/');
}; 


});

var ModalInstanceCtrl= function ($scope, $modalInstance) {

  /* DEVELOPPEURS */
  $scope.devs=[];
  $scope.comps=[];
  $scope.projs=[];
  //res=$scope.allInit; 
  $scope.selected = {};


  angular.forEach(res, function(item) {
    if (item.type==="=") {
      $scope.devs.push({text:item.name, id:item.id, done:true});
    }
    else if (item.type==="==") {
      $scope.comps.push({text:item.name, id:item.id, done:true});
    }
    else if (item.type==="===") {
      $scope.projs.push({text:item.name, id:item.id, done:true});
    };
  });

  $scope.remaining = function(val) {
    if (val===0){
      var count = 0;
      angular.forEach($scope.devs, function(dev) {
        count += dev.done ? 1 : 0;
      });
    }
    else if (val===1){
      var count = 0;
      angular.forEach($scope.comps, function(comp) {
        count += comp.done ? 1 : 0;
      });
    }
    else if (val===2){
      var count = 0;
      angular.forEach($scope.projs, function(proj) {
        count += proj.done ? 1 : 0;
      }); 
    }
    return count;
  };

  $scope.selectAllItem = function(val) {
    if(val===0){
      angular.forEach($scope.devs, function(dev) {
        if (!dev.done) dev.done = true;
      });
    }
    else if (val===1){
     angular.forEach($scope.comps, function(comp) {
      if (!comp.done) comp.done = true;
    }); 
   } 
   else if(val ===2){
    angular.forEach($scope.projs, function(proj) {
      if (!proj.done) proj.done = true;
    }); 
  }
};

$scope.selectNoneItem = function(val) {
  if (val===0){
    angular.forEach($scope.devs, function(dev) {
      if (dev.done) dev.done = false;
    });
  } 
  if (val===1){
    angular.forEach($scope.comps, function(comp) {
      if (comp.done) comp.done = false;
    });
  }
  if (val ===2){
    angular.forEach($scope.projs, function(proj) {
      if (proj.done) proj.done = false;
    }); 
  }
};

$scope.okItem0 = function () {
  var oldDevs = $scope.devs;
  angular.forEach(oldDevs, function(dev) {
    if (!dev.done)  {
      devIdDelete.push(dev.id);
      $scope.alls=[]; 
    };
  });  
  $modalInstance.close(devIdDelete);
 };

 $scope.okItem1 = function () {
  var oldComps = $scope.comps;
  angular.forEach(oldComps, function(comp) {
    if (!comp.done)  {
      skillIdDelete.push(comp.id);
    };
  });
  $modalInstance.close(skillIdDelete);
 };

 $scope.okItem2 = function () {
  var oldProjs = $scope.projs;
  angular.forEach(oldProjs, function(proj) {
    if (!proj.done)  {
      projectIdDelete.push(proj.id);
    };
  });
  $modalInstance.close(projectIdDelete);
 };

 $scope.cancel = function () {
  $modalInstance.dismiss('cancel');
};



};

// developers page controller
harmonyControllers.controller('developersController', function($scope) {
  $scope.pageClass = 'page-developers';
  $scope.titre = 'DEVELOPERS';

});


// developer page controller
harmonyControllers.controller('developerController', function($scope) {
  $scope.pageClass = 'page-developer';
  $scope.titre = 'DEVELOPER';
});


// projects page controller
harmonyControllers.controller('projectsController', function($scope) {
  $scope.pageClass = 'page-projects';
  $scope.titre = 'PROJECTS';
});

// project page controller
harmonyControllers.controller('projectController', function($scope) {
  $scope.pageClass = 'page-project';
  $scope.titre = 'PROJECT';
});


harmonyControllers.controller('AptsListControllers', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/report.json').success(function(data) {
      data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);


      $scope.defaultDeveloper = idCurrentDevelopper;
      $scope.devName = nameCurrentDevelopper;
      $scope.orderDev = "-apt.total";

      var aptitudes = makeAptStat(data, idCurrentDevelopper);
      aptitudes = addFirstLast(aptitudes, data, idCurrentDevelopper); 

      $scope.apts= aptitudes;
      $scope.projs = data.repositories; 

      console.log($scope.apts)

      $scope.$on('remakeData', function(){
        data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);
        $scope.devName = nameCurrentDevelopper;
        $scope.apts = makeAptStat(data, idCurrentDevelopper);
        $scope.apts = addFirstLast($scope.apts, data, idCurrentDevelopper)
      })

      $scope.devCountSkill =0;
      $scope.devCountProj =0;
      $scope.maxCount=0; 
      $scope.minCount=0; 
      $scope.maxNameSkill=""; 
      $scope.minNameSkill="";   
      $scope.tab=[];
      var i=0; 

      angular.forEach($scope.projs, function(proj) {
        $scope.tab.push(0); 
      });        

      angular.forEach($scope.apts, function(apt) {
        if (apt.total!=0)  {
          $scope.devCountSkill++;
          if (apt.total>$scope.maxCount){
            $scope.maxCount=apt.total; 
            $scope.maxNameSkill=apt.name; 
          } 
        };
        for (var k=0; k<apt.ratio.length ; k++){
          if (apt.ratio[k]!=0){
            $scope.devCountProj++; 
          }
        }
        
        angular.forEach(apt.ratio, function(rat) { 
          if (rat!=0){
            $scope.tab[i]+=rat; 
          }
          i++; 
        });   
      });

      i=0; 
      angular.forEach($scope.tab, function(tab){
        if (tab==0){
          $scope.projs.splice(i, 1);

          angular.forEach($scope.apts, function(apt) {
            apt.ratio.splice(i,1); 
          });  
        }
        else 
          i++; 
      }); 
        
    });
  }]);

harmonyControllers.controller('allProjsController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/report.json').success(function(data) {
      data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);

      $scope.defaultProject = idCurrentRepo;
      
      $scope.nameRepo=nameCurrentRepo; 
      $scope.projs = makeProjectData(data, idCurrentRepo);
      $scope.projs = makeTooltipText($scope.projs);
      $scope.compsLabels = $scope.projs[0].commitsDetailed;

      $scope.$on('remakeDataBis', function(){
        data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);
        $scope.nameRepo=nameCurrentRepo;
        $scope.projs = makeProjectData(data, idCurrentRepo);
        $scope.projs = makeTooltipText($scope.projs);
        $scope.compsLabels = $scope.projs[0].commitsDetailed;
      }); 

      console.log($scope.projs)

      $scope.repoCountSkill =0;
      $scope.repoCountDev =0;
      $scope.maxCount=0; 
      $scope.maxNameDev="";

      var comp=0; 
      $scope.tab=[]; 
      $scope.tab2=[]; 
      var i=0; 
      
      angular.forEach($scope.projs, function(proj) {
        $scope.tab2.push(0); 
      });

      angular.forEach($scope.projs, function(proj) { 
        comp=0; 
        angular.forEach(proj.commitsDetailed, function(cmp){
          comp+=cmp.score;
        }); 
    
        if (comp!=0){
          $scope.repoCountDev ++;
          if (comp>$scope.maxCount){
            $scope.maxNameDev=proj.name; 
            $scope.maxCount=comp; 
          }
        }

        $scope.tab2[i]=comp; 
        i++; 
      });

      i=0; 

      angular.forEach($scope.tab2, function(val){
        if (val==0)
          $scope.projs.splice(i,1);
        else i++; 
      })

      angular.forEach($scope.projs[0].commitsDetailed, function(proj) {
        $scope.tab.push(0); 
      });

      for (var k =0; k < $scope.projs[0].commitsDetailed.length; k++) {
        comp=0; 
        for (i=1 ; i<$scope.projs.length ; i++)
          comp+=$scope.projs[i].commitsDetailed[k].score; 
        
        $scope.tab[k]=comp; 

        if (comp!=0)
          $scope.repoCountSkill ++; 
      };
      
      i=0; 

      angular.forEach($scope.tab, function (value) {
        if (value==0){
          angular.forEach($scope.projs, function(proj){
            proj.commitsDetailed.splice(i,1); 
          }); 
        }
        else
          i++; 
      }); 

      $scope.compsLabels = $scope.projs[0].commitsDetailed;

    });  
  }]);


harmonyControllers.controller('LatestComsController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/report.json').success(function(data) {
      data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);

      $scope.evs = makeEventsData(data, true);
    });  

  }]);



harmonyControllers.controller('allSkillsController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/report.json').success(function(data) {    
      data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);

      $scope.defaultCompetence = idCurrentCompetence;
      $scope.orderProp = "-total";  
      $scope.nameSkill=nameCurrentCompetence; 

      $scope.devs = getLastCommit(data, idCurrentCompetence);

      $scope.$on('remakeDataBisBis', function(){
        data = filterDB(data, devIdDelete, skillIdDelete, projectIdDelete, []);
        $scope.nameSkill=nameCurrentCompetence; 
        $scope.devs = getLastCommit(data, idCurrentCompetence);
      }); 

      $scope.skillCountDev=0; 
      $scope.skillCountRepo=0;
      $scope.countMaxDev=0; 
      $scope.skillMaxDev=""; 
      $scope.repos=[]; 

      var count=0; 

      angular.forEach($scope.devs, function(dev) {
        if (dev.total!=0)
          $scope.skillCountDev ++;
          
        if (dev.total>$scope.countMaxDev){
            $scope.countMaxDev=dev.total; 
            $scope.skillMaxDev=dev.id; 
        }
      
        // defines how many repositories the skill is used in
        if ($scope.repos.length==0){
          $scope.skillCountRepo ++; 
          $scope.repos.push(dev.repo) ;
        }
        else{
          count=0; 
          angular.forEach($scope.repos, function(repo) {
            if (repo!=dev.repo)
              count++;  
          });
          if (count==$scope.repos.length){
            $scope.skillCountRepo ++;
            $scope.repos.push(dev.repo) ;
          }  
        }      
      });
    });  
  }]);



/*Start here <------------------------------------------------->*/
function makeTooltipText(details){
  details.forEach(function(d,i){
    details[i].tooltipText = "";
    details[i].total = 0;
    d.commitsDetailed.forEach(function(d2){
      if(d2.score > 0) {
        //details[i].tooltipText += d2.comp + ' : ' + d2.score + ' ';
        details[i].total += d2.score;
      }
    });
    d.commitsDetailed.forEach(function(d2){
      if(d2.score > 0) {
        //console.log(d2.score +' '+ d.total)
        details[i].tooltipText += d2.comp + ' : ' + Math.floor((d2.score*100)/d.total) + '% ';
        //details[i].total += d2.score;
      }
    });
  })
  //console.log(details);
  return details;
}

function makeProjectData(data, repo){
  var projects = [];
  data.repositories.forEach(function(d){
    if (d.id == repo){
      projects = d.developers;
    }
  })

  projects.forEach(function(d, i){
    projects[i].commitsDetailed = [];
    //console.log(d)
    data.aptitude_expressions.forEach(function(d1){
      d1.expressions.forEach(function(d2){
        //console.log(d2.id_concrete_aptitude);
        //var tmp = getNameById(d2.id_concrete_aptitude, data);
        projects[i].commitsDetailed.push({comp : getNameById(d2.id_concrete_aptitude, data), score: 0});
        d2.concrete_expressions.forEach(function(dThree){
          if (d.id == dThree.dev && dThree.repo == repo){
            //console.log(dThree);
            projects[i].commitsDetailed[projects[i].commitsDetailed.length-1].score = dThree.scores_times.length;
            //console.log(projects[i].commitsDetailed[projects[i].commitsDetailed.length-1]);
          }
        })
      })
    })
  })
  return projects;      
}


function addFirstLast(aptitudes, data, dev){
  var allEvents = makeEventsData(data, false);

  aptitudes.forEach(function(d, i){
    var devAptEvents = filterEventsData(allEvents, dev, d.id);
    if (devAptEvents.length > 1){
      aptitudes[i].firstTime = devAptEvents[devAptEvents.length-1].timeFull;
      aptitudes[i].lastTime = devAptEvents[0].timeFull;
    } else if (devAptEvents.length == 1){
      aptitudes[i].firstTime = devAptEvents[0].timeFull;
      aptitudes[i].lastTime = devAptEvents[0].timeFull;
    } else if (devAptEvents.length == 0){
      aptitudes[i].firstTime = 'N/A';
      aptitudes[i].lastTime = 'N/A';
    }
  })

  aptitudes.forEach(function(d,i){
    if (d.firstTime != 'N/A'){
      aptitudes[i].firstTime = d.firstTime.getDay() +'/'+ d.firstTime.getMonth() +'/'+ d.firstTime.getFullYear();
      aptitudes[i].lastTime = d.lastTime.getDay() +'/'+ d.lastTime.getMonth() +'/'+ d.lastTime.getFullYear();
    }
  })


  return aptitudes;
}

function filterEventsData(data, dev, aptId){
  var result = [];
  data.forEach(function(d1){
    if (d1.dev == dev && d1.id == aptId) result.push(d1);
  })  
  return result;
  
}


function getLastCommit(data, aptId){
  var result = [];
  var developers = makeSpecData(data, aptId, false);
  var allEvents = makeEventsData(data, false);

  developers.forEach(function(d1, i){
    developers[i].timeFull = [];
    allEvents.forEach(function(d2){
      if (d2.dev == d1.id && d2.id == aptId) {
        developers[i].timeFull.push(d2.timeFull);
      }
    })
  })

  developers.sort(date_sort_dec);
  
  developers.forEach(function(d,i){
    if (d.timeFull.length > 0) {
      developers[i].timeFull = (d.timeFull[0].getDay()+1)+'/'+ (d.timeFull[0].getMonth()+1) +'/'+d.timeFull[0].getFullYear();
    } else developers[i].timeFull = 'N/A';
    developers[i].id = getDevByIdBis(d.id, data);
    
  })

  return developers;
}

function makeSpecData(data, aptId, makeNamesTrue){
  var devs =[];

  var totalOne = 0;
  data.repositories.forEach(function(d1){
    d1.developers.forEach(function(d2){
      devs.push({id: d2.id, total: getScoreTimesByAptDev(data, aptId , d2.id), repo : d1.name});        
    })

  })

  if (makeNamesTrue){
    devs.forEach(function(d, i){
      devs[i].id = getDevByIdBis(devs[i].id, data);
    })
  }


  return devs;
}

function makeDays(date){

  var dateIn = new Date(parseInt(date)*1000);

  var day = dateIn.getDay();
  var month = dateIn.getMonth();
  var year = dateIn.getFullYear();
  var hour = dateIn.getHours();
  var minute = dateIn.getMinutes();
  days = day+"/"+month+"/"+year;
  return days;

}

function makeEventsData(data, isFiveLastOnly){
  var evs =[];
  var date;

  data.aptitude_expressions.forEach(function(d1){
    d1.expressions.forEach(function(d2){
      d2.concrete_expressions.forEach(function(dThree){
        dThree.scores_times.forEach(function(d4){

          var dateIn = new Date(parseInt(d4.split("_")[1])*1000);
          
          var day = dateIn.getDay() +1;
          var month = dateIn.getMonth() + 1;
          var year = dateIn.getFullYear();
          var hour = dateIn.getHours();
          var minute = dateIn.getMinutes();

          var date1 = day+"/"+month+"/"+year;
          var date2 = hour+":"+minute;

          date = { timeFull : dateIn, time1 : date1, time2: date2 , id: d2.id_concrete_aptitude, 
            dev: dThree.dev, repo: dThree.repo, domain: d1.id_domain_aptitude, score: parseInt(d4.split("_")[0])};
            evs.push(date);
          })
      })
    })
  })

  evs.sort(date_sort_dec);

  if(isFiveLastOnly){
    var result = [];

    for (var i =0; i<5; i++){
      evs[i].domain = getDomaineByIdBis(evs[i].domain, data);
      evs[i].dev = getDevByIdBis(evs[i].dev, data);
      evs[i].id = getNameById(evs[i].id, data);

      evs[i].repo = getProjectByRepo(evs[i].repo, data);

      result.push(evs[i]);
    }

    return result;
  } else return evs;
  
}

function getDevByIdBis(id, data){
  var result;
  data.repositories.forEach(function(d1){
    d1.developers.forEach(function(d2){
      if (d2.id == id) result = d2.name;
    })
  })
  return result;
}

var date_sort_dec = function (date1, date2) {
  if (date1.timeFull > date2.timeFull) return -1;
  if (date1.timeFull < date2.timeFull) return 1;
  return 0;
};

function getProjectByRepo(id, data){
  var result;

  data.repositories.forEach(function(d1){
    if (d1.id == id){
      result = d1.name;
    }
  })

  return result;
}



function getNameById(id, data){
  var result;
  data.domain_aptitudes.forEach(function(d1){
    d1.concrete_aptitudes.forEach(function(d2){
      if (d2.id == id) result = d2.name;
    })
  })

  return result;
}

function getDomaineByIdBis(id, data) {
  var domain;

  data.domain_aptitudes.forEach(function(d){
    if (d.id == id) {
      domain = d.name;
    }
  })

  return domain;
}

function makeAptStat(data, devId){
  var aptitudes = [];


  /* Get the list of aptitudes*/
  data.domain_aptitudes.forEach(function(d1){
    d1.concrete_aptitudes.forEach(function(d2){
      aptitudes.push({name: d2.name, id: d2.id});
    })
  })


  /* Get the scores of each aptitude*/
  aptitudes.forEach(function(d, i){
    aptitudes[i].total = getScoreTimesByAptDev(data, d.id, devId);  
    aptitudes[i].ratio = new Array();
  })

  data.repositories.forEach(function(d1, i){
    aptitudes.forEach(function(d2, j){
      if (aptitudes[j].total !=0){
        aptitudes[j].ratio[i] = Math.floor((getScoreTimesByAptRepoDev(data, d2.id, d1.id, devId)/ sumArr(aptitudes)) * 100) ;
      } else aptitudes[j].ratio[i] = 0 ;
    })
  })
  
  return aptitudes;
}

function sumArr(arr){
  var result = 0;
  arr.forEach(function(d){
    result += d.total;
  })
  return result;
}


function getScoreTimesByAptDev(data, apt, dev){
  var score = 0;

  data.aptitude_expressions.forEach(function(d1){
    d1.expressions.forEach(function(d2){
      if (d2.id_concrete_aptitude == apt){
        d2.concrete_expressions.forEach(function(dThree){         
          if (dThree.dev == dev){
            score += getTotalScores(dThree.scores_times);
          }
        })
      }
    })
  })
  
  return score;
}

function getScoreTimesByAptRepoDev(data, apt, repo, devId){
  var score = 0;

  data.aptitude_expressions.forEach(function(d1){
    d1.expressions.forEach(function(d2){
      if (d2.id_concrete_aptitude == apt){
        d2.concrete_expressions.forEach(function(dThree){
          if (dThree.repo == repo && dThree.dev == devId){
            score += getTotalScores(dThree.scores_times);
          }
        })
      }
    })
  })
  
  return score;
}




function getTotalScores(rslt){
  var total = 0;
  rslt.forEach(function(d, i){
    total += parseInt(rslt[i][0]);
  })
  return total;
}

function filterDB(data, devs, comps, projs, dates){

  /*var comps = [843576936, 110999];
  var devs = [24, 1121]; 
  var projs = [3];  
  var dates =[1051293060, 1390923599];*/

  /* Removes project from repositories */
  projs.forEach(function(d1, j){
    data.repositories.forEach(function(d2, i){
      if (d2.id == d1) {
        data.repositories.splice(i, 1);
      }
    })
  })

  /* Removes developer from repositories */
  
  devs.forEach(function(d1, i){
    data.repositories.forEach(function(d2,j){
      d2.developers.forEach(function(d4, k){
        if (d4.id == d1){
          data.repositories[j].developers.splice(k, 1);
        }
      })
    })
  }) 

  /* Removes concrete aptitude from domain aptitudes */
  
  comps.forEach(function(d0, i){
    data.domain_aptitudes.forEach(function(d1, j){
      d1.concrete_aptitudes.forEach(function(d2, k){
        if (d2.id == d0){
          data.domain_aptitudes[j].concrete_aptitudes.splice(k, 1);
        }
      })
    })
  });

  /* Removing expressions corresponding to competence, repository and developer */
  comps.forEach(function(d1, i){
    devs.forEach(function(d2, j){
      projs.forEach(function(d4, k){
        data.aptitude_expressions.forEach(function(d5, l){
          d5.expressions.forEach(function(d6, m){
            if (d6.id_concrete_aptitude == d1){
              data.aptitude_expressions[l].expressions[m].concrete_expressions.splice(0, d6.concrete_expressions.length);
            }
            if (d6.id_concrete_aptitude != d1){
              d6.concrete_expressions.forEach(function(d7, n){
                if (d7.dev == d2 || d7.repo == d4){
                  data.aptitude_expressions[l].expressions[m].concrete_expressions[n].scores_times.splice(0, d7.scores_times.length);
                }
              })
            }
          })
        })
      })
    })
  })

  data.aptitude_expressions.forEach(function(d0, i){
    d0.expressions.forEach(function(d1, j){
      d1.concrete_expressions.forEach(function(d2, k){
        d2.scores_times.forEach(function(d4, l){
          var splited = parseInt(d4.split('_')[1]);
          if (splited >= dates[0] || splited <= dates[1]){
            data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times.splice(l, 1)            
          }
        })
      })
    })
  })
  return data;
}

