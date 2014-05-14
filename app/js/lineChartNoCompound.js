console.time("LineChartNoCompound");

    
    var obj = document.getElementById("currentDevelopper");
    //document.write("<br><br><br><br>"+idCurrentDevelopper);
    
$('#someDiv').bind("DOMSubtreeModified",function(){
  alert("aaa");
  createNoCompound();
  document.getElementById("uncompounded").checked = true;
  document.getElementById("compounded").checked = false;
});

function Repository(id,name,numberDevelopers)
{
this.id=id;
this.name=name;
this.numberDevelopers=numberDevelopers;
this.domain_aptitudes=new Array();
this.concrete_aptitudes=new Array();
this.developers=new Array();
this.indexDeveloper=new Array(); //Array containing the ids of developers
}

function Developer(id,name,email)
{
this.id=id;
this.name=name;
this.email=email;
this.repositories=new Array(); //Array of repositories the developer is working on 
this.commits=new Array(); // Array containing the number of commits by this developer  (commit[1] is the number of commits by this developer in repository[1])
this.numberCommits=new Array();
this.score_times=new Array();
this.idConcreteAptitude=new Array();
}

function Domain_aptitude(id,name,desc)
{
this.id=id;
this.name=name;
this.desc=desc;

}

function Concrete_aptitude(id,name,desc)
{
this.id=id;
this.name=name;
this.desc=desc;

}

function createNoCompound(){
d3.select(".lineChartNoCompound").select("svg").remove();
var maVariable=12;
var node = document.getElementById('node-id');
   var repo= new Array(); //Array of repository objects
   var developers= new Array(); //Array of developer objects
   var idDevelopers= new Array();//Array of developer IDs
   var idRepos= new Array();//Array of developer IDs
   var domainAptitudes=new Array();
    var concreteAptitudes=new Array();
    var idConcreteAptitudes=new Array(); //Array containing the ids of concrete aptitudes

//var data=JSON.parse(configJSON);
//document.write(configJSON);
//document.write(configJSON);
//var data=$.getJSON( "http://flouistherese.vvv.enseirb-matmeca.fr/JSON/report.json", function( ) {});
var data = {};
    $.ajax({
      url: "http://localhost:8000/app/JSON/report.json",
      async: false,
      dataType: 'json',
      success: function(myData) {
        data = myData;
      }
    });

//maVariable=555;
   // var node = document.getElementById('node-id');
   // var repo=Array(); //Array of repository objects
   // var developers=Array(); //Array of developer objects
   // var idDevelopers=Array();//Array of developer IDs
   // var idRepos=Array();//Array of developer IDs
   var totalDevelopers=0; //Total number of developers
   // document.write("Repositories :<br>");
    for (var i=0; i<data.repositories.length; i++) { //Processing repositories and developers
    repo[i]= new Repository(data.repositories[i].id,data.repositories[i].name,data.repositories[i].developers.length); //Create new Repository object
  idRepos[i]=data.repositories[i].id;
   // document.write("Id : "+repo[i].id+"<br>" );
  // document.write("Name :"+repo[i].name+"<br>");
  // document.write("Number of developers :"+repo[i].numberDevelopers+"<br>"); 
    // document.write("Developers :<br>");
    for (var j=0; j<data.repositories[i].developers.length; j++) { //Process through every developer on this repository
      if(idDevelopers.indexOf(data.repositories[i].developers[j].id)==-1){ //If the developer is not listed yet
      idDevelopers[totalDevelopers]=data.repositories[i].developers[j].id;
      
      developers[totalDevelopers]=new Developer(data.repositories[i].developers[j].id,data.repositories[i].developers[j].name,data.repositories[i].developers[j].email); //Create a new developer
      var numberRepo=developers[parseInt(idDevelopers.indexOf(data.repositories[i].developers[j].id))].repositories.length; //Count the number of repositories in this developer
      developers[totalDevelopers].repositories[0]=data.repositories[i].id; //Add the current repository to the developer
      developers[totalDevelopers].commits[0]=data.repositories[i].developers[j].commits; //Add the number of commits in this repo by this developer
      
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo]=data.repositories[i].id; //Copy the array of repositories in the score_times
      //document.write("Repos de"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+" :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times.join(' | ')+"<br>");
      // document.write("Id : "+developers[totalDevelopers].id+"<br>" );
       //document.write("Name :"+data.repositories[i].developers[j].name+"<br>");
      // document.write("Email :"+developers[totalDevelopers].email+"</p>");
      // document.write("Commits :"+developers[totalDevelopers].commits[0]+"</p>");
      
      totalDevelopers++;
      }
      else{ //If the developer already exists
      var numberRepo=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories.length; 
      var numberCommits=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits.length;
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories[numberRepo]=data.repositories[i].id;
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo]=data.repositories[i].id;
      //document.write("Repos de"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+" :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times.join(' | ')+"<br>");
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]=data.repositories[i].developers[j].commits;
      // document.write("Id : "+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].id+"<br>" );
      // document.write("Name :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+"<br>");
      // document.write("Email :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].email+"</p>");
      // document.write("Commits :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]+"</p>");
      }
    }
    }
    
        
    var totalConcreteAptitudes=0; //Total number of concrete aptitudes
    
    for (var i=0; i<data.domain_aptitudes.length; i++) { //Processing domain aptitudes and concrete aptitudes
      domainAptitudes[i]= new Domain_aptitude(data.domain_aptitudes[i].id,data.domain_aptitudes[i].name,data.domain_aptitudes[i].desc); //Create new Domain_aptitude object
      
      // document.write("Domain Aptitudes :<br>");
   // document.write("Id : "+domainAptitudes[i].id+"<br>" );
  // document.write("Name :"+domainAptitudes[i].name+"<br>");
  // document.write("Description :"+domainAptitudes[i].desc+"<br>"); 
    // document.write("Concrete Aptitudes :<br>");
    for (var j=0; j<data.domain_aptitudes[i].concrete_aptitudes.length; j++) { //Process through every concrete aptitude per domain aptitude
      idConcreteAptitudes[totalConcreteAptitudes]=data.domain_aptitudes[i].concrete_aptitudes[j].id; //Add this id of this concrete aptitude to the array
      concreteAptitudes[totalConcreteAptitudes]=new Concrete_aptitude(data.domain_aptitudes[i].concrete_aptitudes[j].id,data.domain_aptitudes[i].concrete_aptitudes[j].name,data.domain_aptitudes[i].concrete_aptitudes[j].desc); //Create new concrete aptitude
      // document.write("Id : "+concreteAptitudes[totalConcreteAptitudes].id+"<br>" );
      // document.write("Name :"+concreteAptitudes[totalConcreteAptitudes].name+"<br>");
      // document.write("Desc :"+concreteAptitudes[totalConcreteAptitudes].desc+"</p>");
      totalConcreteAptitudes++;
    }
    }
    
    for (var i=0; i<data.aptitude_expressions.length; i++) { //Process through each expression of concrete aptitudes
    for (var j=0; j<data.aptitude_expressions[i].expressions.length; j++) { 
      for(var k=0;k<data.aptitude_expressions[i].expressions[j].concrete_expressions.length;k++){
        
        var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(data.aptitude_expressions[i].expressions[j].id_concrete_aptitude); //Find the matching concrete aptitude index 
        var matchingRepoIndex=idRepos.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the matching repository index 
        var matchingDevIndex=idDevelopers.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].dev); //Find the matching developer index 
        if (matchingDevIndex==-1) {matchingDevIndex=0;}  // DEVELOPPEURS NON LISTES = Developpeur Inconnu
        
        // document.write("Repo Associé :"+repo[parseInt(matchingRepoIndex)].id+"</p>");
        // document.write("Dev Associé :"+developers[parseInt(matchingDevIndex)].id+"</p>");
        
        // document.write("Aptitude Associée :"+concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].desc+"</p>");
        
        
        var concreteAptitudeAlreadyInRepo=repo[parseInt(matchingRepoIndex)].concrete_aptitudes.filter(function (el) { //Returns the concrete aptitudes contained in the current repo matching the id
          return el.id==concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id;
        });
        if(concreteAptitudeAlreadyInRepo.length==0){//No match for a concrete aptitude was found in this repo
        
        repo[parseInt(matchingRepoIndex)].concrete_aptitudes[repo[parseInt(matchingRepoIndex)].concrete_aptitudes.length]=jQuery.extend({},concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)]); //Copy the concrete aptitude in the curent repo

        var developerAlreadyInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        if(developerAlreadyInRepo.length==0){ //Developer is not in this concrete aptitude yet
        
          repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length]=jQuery.extend({},developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
          repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].indexDeveloper.length]=developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo

        }
        
        } 
        
        
        else{ //Concrete aptitude found in the repo
        //document.write("L'aptitude "+concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].desc+" existe<br>");
        var matchingConcreteAptitudeIndexInRepo=repo[parseInt(matchingRepoIndex)].concrete_aptitudes.indexOf(concreteAptitudeAlreadyInRepo); //Index of the already existing concrete aptitude in repo
        
        var developerAlreadyInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        if(developerAlreadyInRepo.length==0){

        repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length]=jQuery.extend({},developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
        repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].developers.length-1]=developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo
        //document.write("Ajout du developpeur "+developers[parseInt(matchingDevIndex)].name+" au repo "+repo[parseInt(matchingRepoIndex)].id+"<br>");
        
        }
        }   
        
        var developerInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) {
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        
        var myDeveloper=developerInRepo[0]; 
        
        //document.write("Dev d'id"+myDeveloper.id+" repo:"+myDeveloper.repositories.join(' | ')+"<br>");
        
        var matchingRepoIndexInDeveloper=developers[parseInt(matchingDevIndex)].repositories.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the index of the repo of current expression
        if( myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)] instanceof Array){ //Does the developer already has an array of commits for this particular concrete aptitude
        //document.write("Le repo "+parseInt(matchingRepoIndexInDeveloper)+" existe déjà dans le score times du dev" +myDeveloper.id+"<br><br><br><br>");
        }
        else {
        myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)]=new Array(); //Create an array for each repo in scores_times
        }
        
        myDeveloper.idConcreteAptitude[parseInt(matchingConcreteAptitudeIndex)]=concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id; //Add the id of the concrete aptitude to the developer array of concrete aptitudes ids
        myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)][parseInt(matchingConcreteAptitudeIndex)]=new Array(); //Create an array of commits for this particular concrete aptitude
        
        
        for(var m=0;m<data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times.length;m++){ //Process through the score times of this developer 
      
        var indexUnderscore=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].indexOf("_"); //Find the index of the "_" character
        var timeCommit=new Array();
        timeCommit[0]=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(indexUnderscore+1); //Extract the timestamp
        timeCommit[1]=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(0,indexUnderscore); //Extract the number of modifications
        myDeveloper.score_times[matchingRepoIndexInDeveloper][matchingConcreteAptitudeIndex].push(timeCommit); //Add the timestamp to the array of commits of this concrete aptitude
        var indexDevInRepo=repo[parseInt(matchingRepoIndex)].indexDeveloper.indexOf(myDeveloper.id);
        
        //document.write("Time "+timeCommit+" ajouté à repo["+matchingRepoIndex+"].developers["+indexDevInRepo+"].score_times["+matchingRepoIndexInDeveloper+"]["+matchingConcreteAptitudeIndex+"] <br>"); // Affichage de chaque commit
        
        }
        repo[parseInt(matchingRepoIndex)].developers[indexDevInRepo]=myDeveloper; //Copy the modifications of the developer to the repo.developer structure
        
}
}
}

     // for (var i=0; i<repo.length; i++) {
      // document.write("Repo : "+repo[i].id+"<br> ");
      
      // for (var j=0; j<repo[i].concrete_aptitudes.length; j++) {
      
        
        
      
      // }
      // for (var k=0; k<repo[i].developers.length; k++) {
      // if(typeof repo[i].developers[k]!="undefined"){
      // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dev : "+repo[i].developers[k].name+"<br>");
      // var matchingRepoIndex=repo[i].developers[k].repositories.indexOf(repo[i].id);
      // for (var j=0; j<repo[i].developers[k].score_times[parseInt(matchingRepoIndex)].length; j++) {

        // if(typeof repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j]!="undefined"){
        // var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(repo[i].developers[k].idConcreteAptitude[j]);
        
        // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aptitude : "+concreteAptitudes[matchingConcreteAptitudeIndex].desc+"<br>");
        // for(var m=0;m<repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j].length;m++){
        // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commits : "+repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][0]+"&nbsp; Modifications :"+repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][1]+"<br><br>");
        // }
        // }
      
        
        
      
      // }
        
      // }
      // }
    
    // } 




      
      
//Paramètres du JSON
var idRepo=1;  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
      var idDev=1;
      for(var i=0;i<repo.length;++i){
      if(repo[i].indexDeveloper.indexOf(idCurrentDevelopper)!=-1){
        idRepo=i;
        idDev=repo[i].indexDeveloper.indexOf(idCurrentDevelopper);
        break;

      } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ET LAAAAAAAAAAAAAAAAAAAAAAAAAAA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    }
//var echelle=0; //Semaine
var echelle=1; //Mois
//var echelle=2; //Annee    
var stringCommitNoCompound=new Array();

var matchingRepoIndex=repo[idRepo].developers[idDev].repositories.indexOf(repo[idRepo].id);
var competence=new Array();
var totalCompetence=0;
competence[totalCompetence]=0;
var first=1;
var dateEnd={value:0};
for (var j=0; j<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)].length; j++) {
        
        if(typeof repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j]!="undefined"){
        var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(repo[idRepo].developers[idDev].idConcreteAptitude[j]);
        
        if(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length!=0){
        
        for(var m=0;m<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length;m++){
        if(first==1){
        dateEnd.value=new Date(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0]*1000);
        first=0;
        //document.write("La première dateEnd.value est "+ dateEnd.value.toString()+"<br>");
        }
        else{
        var dateTemp=new Date(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0]*1000);
          if(dateTemp<dateEnd.value) dateEnd.value=dateTemp;
        
        }
        }
        }
        }
        }
        
//document.write("La première dateEnd est "+ dateEnd.toString()+"<br>");
var compteurCompetence=new Array();
var maxLigne=0;
var stringTotal="date";
var firstLine=new Array();
var competenceUsed=new Array();
var nameCompetenceUsed=new Array();
for (var j=0; j<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)].length; j++) {
        compteurCompetence[j]= new Array();
        firstLine[j]=1;
        
                var dateEndTemp=  new Date(dateEnd.value);  // "Deep Copy"
                //document.write("Vérification "+dateEnd.value+"<br>"); // Vérification de la valeur de la variable originale
        stringCommitNoCompound[j]="date,Competence\n";
        if(typeof repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j]!="undefined"){
        var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(repo[idRepo].developers[idDev].idConcreteAptitude[j]);
        
        if(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length!=0){
        
        for(var m=0;m<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length;m++){
        
        
        var fullDate=new Date(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0]*1000);
        //document.write("Full date: "+fullDate.toString()+" dateEnd: "+dateEnd.toString+"<br>");
        
        //document.write(fullDate+ " comparé à " +dateEndTemp+"<br>");
        while(fullDate>dateEndTemp){
        
        var month=dateEndTemp.getMonth()+1;
        var myDate=""+dateEndTemp.getDate()+"-"+month+"-"+dateEndTemp.getFullYear().toString().substr(2,2)+"";
        myDate=myDate.toString();
        compteurCompetence[j][compteurCompetence[j].length]=competence[totalCompetence];
        if(maxLigne < compteurCompetence[j].length) maxLigne=compteurCompetence[j].length;
        if(firstLine[j]==1) {nameCompetenceUsed[competenceUsed.length]=concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].desc;competenceUsed[competenceUsed.length]=j;stringTotal=stringTotal+",Competence"+(competenceUsed.length-1); firstLine[j]=0;}
        
        stringCommitNoCompound[j]=stringCommitNoCompound[j]+myDate+","+competence[totalCompetence]+"\n";
        //document.write(stringCommitNoCompound[j]+myDate+","+competence[totalCompetence]+"<br>");
        totalCompetence++;
        competence[totalCompetence]=0;
        if(echelle==0){
        dateEndTemp.setDate(dateEndTemp.getDate()+7);}
        else if(echelle==1){
        dateEndTemp.setMonth(dateEndTemp.getMonth()+1);
        }
        else if(echelle==2){
        dateEndTemp.setDate(dateEndTemp.getDate()+365);
        }
        
        }
        //document.write("J'augmente la caompétence <br>");
        competence[totalCompetence]=competence[totalCompetence]+1;
        
        
        //jsonData.concreteAptitude[jsonData.concreteAptitude.length-1].commits[jsonData.concreteAptitude[jsonData.concreteAptitude.length-1].commits.length] = {commit:repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0],modifications:repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][1]};
        
        
        
        }
        }
        else{
        stringCommitNoCompound[j]=stringCommitNoCompound[j]+"0,0";
        
        }
      //document.write(stringCommitNoCompound[j]+"<br><br>");
        
        
      
      }
      }
stringTotal=stringTotal+"\n";
var dateActuelle= new Date(dateEnd.value);

      for(var i=0;i<maxLigne;++i){
        
        var month=dateActuelle.getMonth()+1;
        var myDate=""+month+"/"+dateActuelle.getFullYear().toString().substr(2,2)+"";
        myDate=myDate.toString();
        //document.write(compteurCompetence[0]+"<br>");
        stringTotal=stringTotal+myDate
        //document.write("Competence Used :"+competenceUsed.length+"<br><br><br><br>");

        for(var j=0;j<competenceUsed.length;++j){
          if(typeof compteurCompetence[competenceUsed[j]][i]=="undefined"){
              compteurCompetence[competenceUsed[j]][i]=0;
          }
        stringTotal=stringTotal+","+compteurCompetence[competenceUsed[j]][i];
        }
        stringTotal=stringTotal+"\n";
        dateActuelle.setMonth(dateActuelle.getMonth()+1);



      }

      //document.write(stringTotal+"<br><br>");

var w = 960,
    h = 500,
    p = [20, 50, 30, 20],
    x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]]),
    y = d3.scale.linear().range([0, h - p[0] - p[2]]),
    y2=d3.scale.linear().range([0, h - p[0] - p[2]]),
    colorRange=["lightblue", "darkgray", "indianred","orange","orangered"];
    z = d3.scale.ordinal().range(colorRange),
    parse = d3.time.format("%m/%y").parse,
    format = d3.time.format("%b"),
    format2=d3.time.format("%m/%y");

var svg = d3.select(".lineChartNoCompound").append("svg:svg")
    .attr("width", w+400)
    .attr("height", h)
  .append("svg:g")
  //.attr("transform", "translate(0, 200)");
.attr("transform", "translate(70," + (h - p[2]) + ")");







var crimea=d3.csv.parse(stringTotal);
//d3.csv("crimea.csv", function(crimea) {

  // Transpose the data into layers by cause.
  var myArray=new Array();
  for(var i=0;i<competenceUsed.length;++i){
  myArray[i]="Competence"+i;

  var stringTranslate="translate(1000,"+(-450+30*(i+1))+")";
  var legend = svg.append("g")
  .attr("class","legend")
  .attr("transform",stringTranslate)
  .style("font-size","12px")
  .style("fill",colorRange[i])
  .call(d3.legend)
  .append("text")
  .text(nameCompetenceUsed[i])
  .attr("transform","translate(10,5)");
}
  var causes = d3.layout.stack()(myArray.map(function(cause) {
    return crimea.map(function(d) {
      return {x: parse(d.date), y: +d[cause]};
    });
  }));

  // Compute the x-domain (by date) and y-domain (by top).
  x.domain(causes[0].map(function(d) { return d.x; }));
  y.domain([0, d3.max(causes[causes.length - 1], function(d) { return d.y0 + d.y; })]);
  y2.domain([d3.max(causes[causes.length - 1], function(d) { return d.y0 + d.y; }),0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat(d3.time.format("%m/%y"))
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y2)
    .orient("left");

svg.append("g")
      .attr("class", "x axis")

      //.attr("transform", "translate(0," + h + ")")
      .call(xAxis)
      .selectAll("text")  
            .style("display", "none");
   

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + -(h - p[1]) + ")")
      .call(yAxis)  
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Commits");

  // Add a group for each cause.
  var cause = svg.selectAll("g.cause")
      .data(causes)
    .enter().append("svg:g")
      .attr("class", "cause")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    //return "Date: <span style='color:red'>" + format2(d.x) + "</span>";
    return "<span style='font: 15px sans-serif'>Date : " + format2(d.x) + "</span><br><span style='font: 15px sans-serif'>Competence : " + d.y + "</span>";
  })

  svg.call(tip);
    
  // Add a rect for each date.
  var rect = cause.selectAll("rect")
      .data(Object)
    .enter().append("svg:rect")
    .attr("class", "bar")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return -y(d.y0) - y(d.y); })
      .attr("height", function(d) { return y(d.y); })
      .attr("width", x.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

console.timeEnd("LineChartNoCompound");
}


//});

function createCompound(){
  d3.select(".lineChartNoCompound").select("svg").remove();
var maVariable=12;
var node = document.getElementById('node-id');
   var repo= new Array(); //Array of repository objects
   var developers= new Array(); //Array of developer objects
   var idDevelopers= new Array();//Array of developer IDs
   var idRepos= new Array();//Array of developer IDs
   var domainAptitudes=new Array();
    var concreteAptitudes=new Array();
    var idConcreteAptitudes=new Array(); //Array containing the ids of concrete aptitudes

//var data=JSON.parse(configJSON);
//document.write(configJSON);
//document.write(configJSON);
//var data=$.getJSON( "http://flouistherese.vvv.enseirb-matmeca.fr/JSON/report.json", function( ) {});
var data = {};
    $.ajax({
      url: "http://localhost:8000/app/JSON/report.json",
      async: false,
      dataType: 'json',
      success: function(myData) {
        data = myData;
      }
    });

//maVariable=555;
   // var node = document.getElementById('node-id');
   // var repo=Array(); //Array of repository objects
   // var developers=Array(); //Array of developer objects
   // var idDevelopers=Array();//Array of developer IDs
   // var idRepos=Array();//Array of developer IDs
   var totalDevelopers=0; //Total number of developers
   // document.write("Repositories :<br>");
    for (var i=0; i<data.repositories.length; i++) { //Processing repositories and developers
    repo[i]= new Repository(data.repositories[i].id,data.repositories[i].name,data.repositories[i].developers.length); //Create new Repository object
  idRepos[i]=data.repositories[i].id;
   // document.write("Id : "+repo[i].id+"<br>" );
  // document.write("Name :"+repo[i].name+"<br>");
  // document.write("Number of developers :"+repo[i].numberDevelopers+"<br>"); 
    // document.write("Developers :<br>");
    for (var j=0; j<data.repositories[i].developers.length; j++) { //Process through every developer on this repository
      if(idDevelopers.indexOf(data.repositories[i].developers[j].id)==-1){ //If the developer is not listed yet
      idDevelopers[totalDevelopers]=data.repositories[i].developers[j].id;
      
      developers[totalDevelopers]=new Developer(data.repositories[i].developers[j].id,data.repositories[i].developers[j].name,data.repositories[i].developers[j].email); //Create a new developer
      var numberRepo=developers[parseInt(idDevelopers.indexOf(data.repositories[i].developers[j].id))].repositories.length; //Count the number of repositories in this developer
      developers[totalDevelopers].repositories[0]=data.repositories[i].id; //Add the current repository to the developer
      developers[totalDevelopers].commits[0]=data.repositories[i].developers[j].commits; //Add the number of commits in this repo by this developer
      
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo]=data.repositories[i].id; //Copy the array of repositories in the score_times
      //document.write("Repos de"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+" :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times.join(' | ')+"<br>");
      // document.write("Id : "+developers[totalDevelopers].id+"<br>" );
       //document.write("Name :"+data.repositories[i].developers[j].name+"<br>");
      // document.write("Email :"+developers[totalDevelopers].email+"</p>");
      // document.write("Commits :"+developers[totalDevelopers].commits[0]+"</p>");
      
      totalDevelopers++;
      }
      else{ //If the developer already exists
      var numberRepo=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories.length; 
      var numberCommits=developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits.length;
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories[numberRepo]=data.repositories[i].id;
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo]=data.repositories[i].id;
      //document.write("Repos de"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+" :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times.join(' | ')+"<br>");
      developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]=data.repositories[i].developers[j].commits;
      // document.write("Id : "+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].id+"<br>" );
      // document.write("Name :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].name+"<br>");
      // document.write("Email :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].email+"</p>");
      // document.write("Commits :"+developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits]+"</p>");
      }
    }
    }
    
        
    var totalConcreteAptitudes=0; //Total number of concrete aptitudes
    
    for (var i=0; i<data.domain_aptitudes.length; i++) { //Processing domain aptitudes and concrete aptitudes
      domainAptitudes[i]= new Domain_aptitude(data.domain_aptitudes[i].id,data.domain_aptitudes[i].name,data.domain_aptitudes[i].desc); //Create new Domain_aptitude object
      
      // document.write("Domain Aptitudes :<br>");
   // document.write("Id : "+domainAptitudes[i].id+"<br>" );
  // document.write("Name :"+domainAptitudes[i].name+"<br>");
  // document.write("Description :"+domainAptitudes[i].desc+"<br>"); 
    // document.write("Concrete Aptitudes :<br>");
    for (var j=0; j<data.domain_aptitudes[i].concrete_aptitudes.length; j++) { //Process through every concrete aptitude per domain aptitude
      idConcreteAptitudes[totalConcreteAptitudes]=data.domain_aptitudes[i].concrete_aptitudes[j].id; //Add this id of this concrete aptitude to the array
      concreteAptitudes[totalConcreteAptitudes]=new Concrete_aptitude(data.domain_aptitudes[i].concrete_aptitudes[j].id,data.domain_aptitudes[i].concrete_aptitudes[j].name,data.domain_aptitudes[i].concrete_aptitudes[j].desc); //Create new concrete aptitude
      // document.write("Id : "+concreteAptitudes[totalConcreteAptitudes].id+"<br>" );
      // document.write("Name :"+concreteAptitudes[totalConcreteAptitudes].name+"<br>");
      // document.write("Desc :"+concreteAptitudes[totalConcreteAptitudes].desc+"</p>");
      totalConcreteAptitudes++;
    }
    }
    
    for (var i=0; i<data.aptitude_expressions.length; i++) { //Process through each expression of concrete aptitudes
    for (var j=0; j<data.aptitude_expressions[i].expressions.length; j++) { 
      for(var k=0;k<data.aptitude_expressions[i].expressions[j].concrete_expressions.length;k++){
        
        var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(data.aptitude_expressions[i].expressions[j].id_concrete_aptitude); //Find the matching concrete aptitude index 
        var matchingRepoIndex=idRepos.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the matching repository index 
        var matchingDevIndex=idDevelopers.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].dev); //Find the matching developer index 
        if (matchingDevIndex==-1) {matchingDevIndex=0;}  // DEVELOPPEURS NON LISTES = Developpeur Inconnu
        
        // document.write("Repo Associé :"+repo[parseInt(matchingRepoIndex)].id+"</p>");
        // document.write("Dev Associé :"+developers[parseInt(matchingDevIndex)].id+"</p>");
        
        // document.write("Aptitude Associée :"+concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].desc+"</p>");
        
        
        var concreteAptitudeAlreadyInRepo=repo[parseInt(matchingRepoIndex)].concrete_aptitudes.filter(function (el) { //Returns the concrete aptitudes contained in the current repo matching the id
          return el.id==concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id;
        });
        if(concreteAptitudeAlreadyInRepo.length==0){//No match for a concrete aptitude was found in this repo
        
        repo[parseInt(matchingRepoIndex)].concrete_aptitudes[repo[parseInt(matchingRepoIndex)].concrete_aptitudes.length]=jQuery.extend({},concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)]); //Copy the concrete aptitude in the curent repo

        var developerAlreadyInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        if(developerAlreadyInRepo.length==0){ //Developer is not in this concrete aptitude yet
        
          repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length]=jQuery.extend({},developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
          repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].indexDeveloper.length]=developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo

        }
        
        } 
        
        
        else{ //Concrete aptitude found in the repo
        //document.write("L'aptitude "+concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].desc+" existe<br>");
        var matchingConcreteAptitudeIndexInRepo=repo[parseInt(matchingRepoIndex)].concrete_aptitudes.indexOf(concreteAptitudeAlreadyInRepo); //Index of the already existing concrete aptitude in repo
        
        var developerAlreadyInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        if(developerAlreadyInRepo.length==0){

        repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length]=jQuery.extend({},developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
        repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].developers.length-1]=developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo
        //document.write("Ajout du developpeur "+developers[parseInt(matchingDevIndex)].name+" au repo "+repo[parseInt(matchingRepoIndex)].id+"<br>");
        
        }
        }   
        
        var developerInRepo=repo[parseInt(matchingRepoIndex)].developers.filter(function (el) {
          return el.id==developers[parseInt(matchingDevIndex)].id;
        });
        
        var myDeveloper=developerInRepo[0]; 
        
        //document.write("Dev d'id"+myDeveloper.id+" repo:"+myDeveloper.repositories.join(' | ')+"<br>");
        
        var matchingRepoIndexInDeveloper=developers[parseInt(matchingDevIndex)].repositories.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the index of the repo of current expression
        if( myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)] instanceof Array){ //Does the developer already has an array of commits for this particular concrete aptitude
        //document.write("Le repo "+parseInt(matchingRepoIndexInDeveloper)+" existe déjà dans le score times du dev" +myDeveloper.id+"<br><br><br><br>");
        }
        else {
        myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)]=new Array(); //Create an array for each repo in scores_times
        }
        
        myDeveloper.idConcreteAptitude[parseInt(matchingConcreteAptitudeIndex)]=concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id; //Add the id of the concrete aptitude to the developer array of concrete aptitudes ids
        myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)][parseInt(matchingConcreteAptitudeIndex)]=new Array(); //Create an array of commits for this particular concrete aptitude
        
        
        for(var m=0;m<data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times.length;m++){ //Process through the score times of this developer 
      
        var indexUnderscore=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].indexOf("_"); //Find the index of the "_" character
        var timeCommit=new Array();
        timeCommit[0]=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(indexUnderscore+1); //Extract the timestamp
        timeCommit[1]=data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(0,indexUnderscore); //Extract the number of modifications
        myDeveloper.score_times[matchingRepoIndexInDeveloper][matchingConcreteAptitudeIndex].push(timeCommit); //Add the timestamp to the array of commits of this concrete aptitude
        var indexDevInRepo=repo[parseInt(matchingRepoIndex)].indexDeveloper.indexOf(myDeveloper.id);
        
        //document.write("Time "+timeCommit+" ajouté à repo["+matchingRepoIndex+"].developers["+indexDevInRepo+"].score_times["+matchingRepoIndexInDeveloper+"]["+matchingConcreteAptitudeIndex+"] <br>"); // Affichage de chaque commit
        
        }
        repo[parseInt(matchingRepoIndex)].developers[indexDevInRepo]=myDeveloper; //Copy the modifications of the developer to the repo.developer structure
        
}
}
}


     // for (var i=0; i<repo.length; i++) {
      // document.write("Repo : "+repo[i].id+"<br> ");
      
      // for (var j=0; j<repo[i].concrete_aptitudes.length; j++) {
      
        
        
      
      // }
      // for (var k=0; k<repo[i].developers.length; k++) {
      // if(typeof repo[i].developers[k]!="undefined"){
      // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dev : "+repo[i].developers[k].name+"<br>");
      // var matchingRepoIndex=repo[i].developers[k].repositories.indexOf(repo[i].id);
      // for (var j=0; j<repo[i].developers[k].score_times[parseInt(matchingRepoIndex)].length; j++) {

        // if(typeof repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j]!="undefined"){
        // var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(repo[i].developers[k].idConcreteAptitude[j]);
        
        // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aptitude : "+concreteAptitudes[matchingConcreteAptitudeIndex].desc+"<br>");
        // for(var m=0;m<repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j].length;m++){
        // document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Commits : "+repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][0]+"&nbsp; Modifications :"+repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][1]+"<br><br>");
        // }
        // }
      
        
        
      
      // }
        
      // }
      // }
    
    // } 




      
      
      //document.write("<br><br><br><br>"+obj.value);
      var idRepo=1;  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
      var idDev=1;
      for(var i=0;i<repo.length;++i){
      if(repo[i].indexDeveloper.indexOf(idCurrentDevelopper)!=-1){
        idRepo=i;
        idDev=repo[i].indexDeveloper.indexOf(idCurrentDevelopper);
        break;

      } //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ET LAAAAAAAAAAAAAAAAAAAAAAAAAAA>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    }
      //alert(idDev);
   
    
var stringCommitCompound=new Array();
//var stringCommitCompound="date,Durchschn,Anz,Gesamt\n05:00,0,0,0\n05:01,0,0,0\n05:02,0,0,0\n05:03,0,0,0\n05:04,0,0,0\n05:05,0,0,0\n05:06,0,0,0\n05:23,11,110,1286\n05:24,78,126,9857\n05:25,29,113,3341\n05:26,7,231,1771\n05:27,7,133,964";
var matchingRepoIndex=repo[idRepo].developers[idDev].repositories.indexOf(repo[idRepo].id);
var competence=new Array();



for (var j=0; j<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)].length; j++) {
        stringCommitCompound[j]="date,Competence,Name\n";
        competence[j]=0;
        if(typeof repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j]!="undefined"){
        var matchingConcreteAptitudeIndex=idConcreteAptitudes.indexOf(repo[idRepo].developers[idDev].idConcreteAptitude[j]);
        
        if(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length!=0){
        for(var m=0;m<repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j].length;m++){
        competence[j]=competence[j]+1;
        var fullDate=new Date(repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0]*1000);
        var month=fullDate.getMonth()+1;
        var myDate=""+fullDate.getDate()+"-"+month+"-"+fullDate.getFullYear().toString().substr(2,2)+"";
        myDate=myDate.toString();
        stringCommitCompound[j]=stringCommitCompound[j]+myDate+","+competence[j]+"";
        if(m==0){
          
          stringCommitCompound[j]=stringCommitCompound[j]+","+concreteAptitudes[matchingConcreteAptitudeIndex].desc;
        
        }
        stringCommitCompound[j]=stringCommitCompound[j]+"\n";
        //jsonData.concreteAptitude[jsonData.concreteAptitude.length-1].commits[jsonData.concreteAptitude[jsonData.concreteAptitude.length-1].commits.length] = {commit:repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][0],modifications:repo[idRepo].developers[idDev].score_times[parseInt(matchingRepoIndex)][j][m][1]};
        
        }
        
        }
        }
        else{
        stringCommitCompound[j]=stringCommitCompound[j]+"0,0";
        
        }
      
        
        //document.write(stringCommitCompound[j]+"<br><br>");
      
      }
      
      
    
      


var main_margin = {top: 20, right: 80, bottom: 100, left: 40},
    mini_margin = {top: 430, right: 80, bottom: 20, left: 40},
    main_width = 960 - main_margin.left - main_margin.right,
    main_height = 500 - main_margin.top - main_margin.bottom,
    mini_height = 500 - mini_margin.top - mini_margin.bottom;

var formatDate = d3.time.format("%d-%-m-%y"),
    parseDate = formatDate.parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left,
    formatOutput0 = function(d) { return formatDate(d.date) + " - " + d.Competence+ " ms"; },
    formatOutput1 = function(d) { return formatDate(d.date) + " - " + d.Competence; };

var main_x = d3.time.scale()
    .range([0, main_width]),
    mini_x = d3.time.scale()
    .range([0, main_width]);

var main_y=new Array(); 
var mini_y=new Array(); 

var main_xAxis = d3.svg.axis()
    .scale(main_x)
    .tickFormat(d3.time.format("%d-%-m-%y"))
    .orient("bottom"),
    mini_xAxis = d3.svg.axis()
    .scale(mini_x)
    .tickFormat(d3.time.format("%d-%-m-%y"))
    .orient("bottom");



var brush = d3.svg.brush()
    .x(mini_x)
    .on("brush", brush);

var main_line=new Array();  
var mini_line=new Array();  


/*var main_line1 = d3.svg.line()
    .interpolate("step-afer")
    .x(function(d) { return main_x(d.date); })
    .y(function(d) { return main_y1(d.Competence); });*/



/*var mini_line1 = d3.svg.line()
    .x(function(d) { return mini_x(d.date); })
    .y(function(d) { return mini_y1(d.Competence); });*/

var svg = d3.select(".lineChartNoCompound").append("svg:svg")
    .attr("width", main_width + main_margin.left + main_margin.right)
    .attr("height", main_height + main_margin.top + main_margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", main_width)
    .attr("height", main_height);
//
var main = svg.append("g")
    .attr("transform", "translate(" + main_margin.left + "," + main_margin.top + ")");

var mini = svg.append("g")
    .attr("transform", "translate(" + mini_margin.left + "," + mini_margin.top + ")");

var data=new Array();
var nameCompetence=new Array();
var nbData=0;
var dateMini; var dateMaxi; var valueMaxi;
for(var i=0;i<stringCommitCompound.length;++i){

var parseInter=d3.csv.parse(stringCommitCompound[i]);
if(parseInter[0].date!="0"){

data[nbData]=parseInter;
//document.write("Data["+nbData+"] créé <br>");
  data[nbData].forEach(function(d) {

    d.date = parseDate(d.date);
    d.Competence = +d.Competence;
  //document.write(d.Competence+" -aaaa "+d.date+"<br>");
  
  });
  nameCompetence[nbData]=data[nbData][0].Name;
  //document.write("<br><br><br><br>"+nameCompetence[i]);
  if(nbData==0) {dateMini=data[nbData][0].date; dateMaxi=data[nbData][data[nbData].length - 1].date; valueMaxi=d3.max(data[0], function(d) { return d.Competence; })}
  else { 
  if(data[nbData][0].date<dateMini) dateMini=data[nbData][0].date;
  if(data[nbData][data[nbData].length - 1].date>dateMaxi) dateMaxi=data[nbData][data[nbData].length - 1].date;
  if(d3.max(data[nbData], function(d) { return d.Competence; })>valueMaxi) valueMaxi=d3.max(data[nbData], function(d) { return d.Competence; });
  }
  //document.write("<br><br><br><br><br>");
  
  main_y[nbData] = d3.scale.linear()
    .range([main_height, 0]),
  mini_y[nbData] = d3.scale.linear()
    .range([mini_height, 0]);
  
  var test =mini_y[nbData];
  
 mini_line[nbData] = d3.svg.line()
    .x(function(d) { return mini_x(d.date); })
    .y(function(d) { return 0.1*test(d.Competence)+10; });  

  test=main_y[nbData];
 main_line[nbData] = d3.svg.line()
    .interpolate("step-afer")
    .x(function(d) { return main_x(d.date); })
    .y(function(d) { return test(d.Competence); }); 


 
 
 ++nbData;

  }
  }
  

  
main_x.domain([dateMini, dateMaxi]);
mini_x.domain(main_x.domain());

  //main_x.domain([data[0][0].date, data[0][data[0].length - 1].date]);

  //main_y0.domain(d3.extent(data[0], function(d) { return d.Competence; }));
  
  //main_y1.domain(d3.extent(data[0], function(d) { return d.Competence; }));
  //main_y1.domain([1,valueMaxi]);
 
  
  //mini_y1.domain(main_y1.domain());

  

  /*main.append("path")
      .datum(data[1])
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line1")
      .attr("d", main_line1);*/

  main.append("g")
      .attr("class", "x2 axis")
      .attr("transform", "translate(0," + main_height + ")")
      .call(main_xAxis);
  


  mini.append("g")
      .attr("class", "x2 axis")
      .attr("transform", "translate(0," + mini_height + ")")
      .call(main_xAxis);
//aa
for(i=nbData-1;i>=0;--i){

var legend = svg.selectAll('.city')
    .data(data[i])
    .enter().append('g')
    .attr('class', 'legend');
  //
main_y[i].domain([1,valueMaxi]);
mini_y[i].domain(main_y[i].domain());

mini.append("path")
      .datum(data[i])
      .attr("class", "line")
      .attr("d", mini_line[i]);
    
main.append("path")
      .datum(data[i])
      .attr("clip-path", "url(#clip)")
      .attr("class", "line line"+i)
    .attr("data-legend",function(d) { return d.Competence})
      .attr("d", main_line[i]);
    
    var stringTranslate="translate(1000,"+30*(i+1)+")";
var legend = svg.append("g")
  .attr("class","legend")
  .attr("transform",stringTranslate)
  .style("font-size","12px")
  .style("fill",$(".line.line"+i).css("stroke"))
  .call(d3.legend)
  .append("text")
  .text(nameCompetence[i])
  .attr("transform","translate(10,5)");
}   

  var main_yAxisLeft = d3.svg.axis()
    .scale(main_y[0])
    .orient("left");
  main.append("g")
      .attr("class", "y axis axisLeft")
      .call(main_yAxisLeft)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
    .text("Commits");


  /*mini.append("path")
      .datum(data[1])
      .attr("class", "line")
      .attr("d", mini_line1);*/

  mini.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", mini_height + 7);

  var focus = main.append("g")
      .attr("class", "focus")
      .style("display", "none");
    
    
  
for(i=0;i<nbData;++i){
 focus.append("line")
      .attr("class", "y"+i)
      .attr("x1", main_width - 6) // nach links
      .attr("x2", main_width + 6); // nach rechts
    
    focus.append("circle")
      .attr("class", "y"+i)
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y"+i)
      .attr("dy", "-1em");

}   
  // Competence1eige auf der Zeitleiste
  focus.append("line")
      .attr("class", "x")
      .attr("y1", main_y[0](0) - 6)
      .attr("y2", main_y[0](0) + 6)

  // Competence1eige auf der linken Leiste
 

  // Competence1eige auf der rechten Leiste
  /*focus.append("line")
      .attr("class", "y1")
      .attr("x1", main_width - 6)
      .attr("x2", main_width + 6);*/

  
//aaa
  /*focus.append("circle")
      .attr("class", "y1")
      .attr("r", 4);

  focus.append("text")
      .attr("class", "y1")
      .attr("dy", "-1em");*/

  main.append("rect")
      .attr("class", "overlay")
      .attr("width", main_width)
      .attr("height", main_height)
      .on("mouseover", function() { focus.style("display", null); })
      .on("mouseout", function() { focus.style("display", "none"); })
      .on("mousemove", mousemove);

  function mousemove() {
  /*for(var j=0;j<nbData;++j){
  document.write("Data "+j+" <br><br><br>");
  for(var i=0;i<data[j].length;++i){
  document.write(i+" existe<br>");
  
  }
  
  
  }*/
  var x0 = main_x.invert(d3.mouse(this)[0]);
  for(var j=0;j<nbData;++j){
  
    var d;
        var i = bisectDate(data[j], x0, 1);
    if(i>=data[j].length){
    d=data[j][data[j].length-1];
    
    }
    else{
        var d0 = data[j][i - 1],
        d1 = data[j][i];
    
    //document.write("ICI i="+i+" j="+j+" x0="+x0+"");
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    }
    var test=main_y[j];
    var test2=main_x;
    focus.select("circle.y"+j).attr("transform", "translate(" + test2(d.date) + "," + test(d.Competence) + ")");
    focus.select("text.y"+j).attr("transform", "translate(" + test2(d.date) + "," + test(d.Competence) + ")").text(d.Competence);
    focus.select(".x").attr("transform", "translate(" + test2(d.date) + ",0)");
    focus.select(".y"+j).attr("transform", "translate(" + main_width * -1 + ", " + test(d.Competence) + ")").attr("x2", main_width + test2(d.date));
    //focus.select(".y"+j).attr("transform", "translate(0, " + test(d.Competence) + ")").attr("x1", main_x(d.date));
  }
  }
    console.timeEnd("LineChart");

function brush() {

  main_x.domain(brush.empty() ? mini_x.domain() : brush.extent());
  for(i=0;i<nbData;++i){
  main.select(".line"+i).attr("d", main_line[i]);
  }
  main.select(".x.axis").call(main_xAxis);
}



}

