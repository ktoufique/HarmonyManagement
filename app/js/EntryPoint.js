/**
 * 
 */

function Repository (id, name, numberDevelopers){
	this.id = id;
	this.name = name;
	this.numberDevelopers = numberDevelopers;
	this.domain_aptitudes = new Array();
	this.concrete_aptitudes = new Array();
	this.developers = new Array();
	this.indexDeveloper = new Array(); //Array containing the ids of developers
}

function Developer (id, name, email) {
	this.id = id;
	this.name = name;
	this.email = email;
	this.repositories = new Array(); //Array of repositories the developer is working on 
	this.commits = new Array(); // Array containing the number of commits by this developer  (commit[1] is the number of commits by this developer in repository[1])
	this.numberCommits = new Array();
	this.score_times = new Array();
	this.idConcreteAptitude = new Array();
}

function Domain_aptitude(id, name, desc) {
	this.id = id;
	this.name = name;
	this.desc = desc;
}

function Concrete_aptitude(id, name, desc) {
	this.id = id;
	this.name = name;
	this.desc = desc;
}


function maFonction(){

	$.getJSON( "JSON/report.json", function( data ) {
		var node = document.getElementById('node-id');
		var repo = Array(); //Array of repository objects
		var developers = Array(); //Array of developer objects
		var idDevelopers = Array();//Array of developer IDs
		var idRepos = Array();//Array of developer IDs
		var totalDevelopers = 0; //Total number of developers

		for (var i = 0; i<data.repositories.length; i++) { //Processing repositories and developers
			repo[i]=  new Repository(data.repositories[i].id, data.repositories[i].name, data.repositories[i].developers.length); //Create new Repository object
			idRepos[i] = data.repositories[i].id;

			for (var j = 0; j<data.repositories[i].developers.length; j++) { //Process through every developer on this repository
				if(idDevelopers.indexOf(data.repositories[i].developers[j].id) == -1){ //If the developer is not listed yet
					idDevelopers[totalDevelopers] = data.repositories[i].developers[j].id;

					developers[totalDevelopers] = new Developer(data.repositories[i].developers[j].id, data.repositories[i].developers[j].name, data.repositories[i].developers[j].email); //Create a new developer
					var numberRepo = developers[parseInt(idDevelopers.indexOf(data.repositories[i].developers[j].id))].repositories.length; //Count the number of repositories in this developer
					developers[totalDevelopers].repositories[0] = data.repositories[i].id; //Add the current repository to the developer
					developers[totalDevelopers].commits[0] = data.repositories[i].developers[j].commits; //Add the number of commits in this repo by this developer

					developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo] = data.repositories[i].id; //Copy the array of repositories in the score_times			
					totalDevelopers++;
				}
				else{ //If the developer already exists
					var numberRepo = developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories.length; 
					var numberCommits = developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits.length;
					developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].repositories[numberRepo] = data.repositories[i].id;
					developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].score_times[numberRepo] = data.repositories[i].id;			
					developers[idDevelopers.indexOf(data.repositories[i].developers[j].id)].commits[numberCommits] = data.repositories[i].developers[j].commits;

				}
			}
		}


		var totalConcreteAptitudes = 0; //Total number of concrete aptitudes
		var domainAptitudes = new Array();
		var concreteAptitudes = new Array();
		var idConcreteAptitudes = new Array(); //Array containing the ids of concrete aptitudes

		for (var i = 0; i<data.domain_aptitudes.length; i++) { //Processing domain aptitudes and concrete aptitudes
			domainAptitudes[i] =  new Domain_aptitude(data.domain_aptitudes[i].id, data.domain_aptitudes[i].name, data.domain_aptitudes[i].desc); //Create new Domain_aptitude object

			for (var j = 0; j<data.domain_aptitudes[i].concrete_aptitudes.length; j++) { //Process through every concrete aptitude per domain aptitude
				idConcreteAptitudes[totalConcreteAptitudes] = data.domain_aptitudes[i].concrete_aptitudes[j].id; //Add this id of this concrete aptitude to the array
				concreteAptitudes[totalConcreteAptitudes] = new Concrete_aptitude(data.domain_aptitudes[i].concrete_aptitudes[j].id, data.domain_aptitudes[i].concrete_aptitudes[j].name, data.domain_aptitudes[i].concrete_aptitudes[j].desc); //Create new concrete aptitude

				totalConcreteAptitudes++;
			}
		}

		for (var i = 0; i<data.aptitude_expressions.length; i++) { //Process through each expression of concrete aptitudes
			for (var j = 0; j<data.aptitude_expressions[i].expressions.length; j++) { 
				for(var k = 0;k<data.aptitude_expressions[i].expressions[j].concrete_expressions.length;k++){

					var matchingConcreteAptitudeIndex = idConcreteAptitudes.indexOf(data.aptitude_expressions[i].expressions[j].id_concrete_aptitude); //Find the matching concrete aptitude index 
					var matchingRepoIndex = idRepos.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the matching repository index 
					var matchingDevIndex = idDevelopers.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].dev); //Find the matching developer index 
					if (matchingDevIndex == -1) {matchingDevIndex = 0;}  // DEVELOPPEURS NON LISTES = Developpeur Inconnu




					var concreteAptitudeAlreadyInRepo = repo[parseInt(matchingRepoIndex)].concrete_aptitudes.filter(function (el) { //Returns the concrete aptitudes contained in the current repo matching the id
						return el.id == concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id;
					});
					if(concreteAptitudeAlreadyInRepo.length == 0){//No match for a concrete aptitude was found in this repo

						repo[parseInt(matchingRepoIndex)].concrete_aptitudes[repo[parseInt(matchingRepoIndex)].concrete_aptitudes.length] = jQuery.extend({}, concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)]); //Copy the concrete aptitude in the curent repo

						var developerAlreadyInRepo = repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
							return el.id == developers[parseInt(matchingDevIndex)].id;
						});
						if(developerAlreadyInRepo.length == 0){ //Developer is not in this concrete aptitude yet

							repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length] = jQuery.extend({}, developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
							repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].indexDeveloper.length] = developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo

						}

					} 


					else{ //Concrete aptitude found in the repo
						var matchingConcreteAptitudeIndexInRepo = repo[parseInt(matchingRepoIndex)].concrete_aptitudes.indexOf(concreteAptitudeAlreadyInRepo); //Index of the already existing concrete aptitude in repo

						var developerAlreadyInRepo = repo[parseInt(matchingRepoIndex)].developers.filter(function (el) { //Returns the developers contained in the current repo matching the id
							return el.id == developers[parseInt(matchingDevIndex)].id;
						});
						if(developerAlreadyInRepo.length == 0){

							repo[parseInt(matchingRepoIndex)].developers[repo[parseInt(matchingRepoIndex)].developers.length] = jQuery.extend({}, developers[parseInt(matchingDevIndex)]); //Copy the developer in the repository
							repo[parseInt(matchingRepoIndex)].indexDeveloper[repo[parseInt(matchingRepoIndex)].developers.length-1] = developers[parseInt(matchingDevIndex)].id; //Add the id of the developer in the array belonging to the repo

						}
					}		

					var developerInRepo = repo[parseInt(matchingRepoIndex)].developers.filter(function (el) {
						return el.id == developers[parseInt(matchingDevIndex)].id;
					});

					var myDeveloper = developerInRepo[0]; 


					var matchingRepoIndexInDeveloper = developers[parseInt(matchingDevIndex)].repositories.indexOf(data.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo); //Find the index of the repo of current expression
					if( myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)] instanceof Array){ //Does the developer already has an array of commits for this particular concrete aptitude
					}
					else {
						myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)] = new Array(); //Create an array for each repo in scores_times
					}

					myDeveloper.idConcreteAptitude[parseInt(matchingConcreteAptitudeIndex)] = concreteAptitudes[parseInt(matchingConcreteAptitudeIndex)].id; //Add the id of the concrete aptitude to the developer array of concrete aptitudes ids
					myDeveloper.score_times[parseInt(matchingRepoIndexInDeveloper)][parseInt(matchingConcreteAptitudeIndex)] = new Array(); //Create an array of commits for this particular concrete aptitude


					for(var m = 0;m<data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times.length;m++){ //Process through the score times of this developer 

						var indexUnderscore = data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].indexOf("_"); //Find the index of the "_" character
						var timeCommit = new Array();
						timeCommit[0] = data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(indexUnderscore+1); //Extract the timestamp
						timeCommit[1] = data.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times[m].substring(0, indexUnderscore); //Extract the number of modifications
						myDeveloper.score_times[matchingRepoIndexInDeveloper][matchingConcreteAptitudeIndex].push(timeCommit); //Add the timestamp to the array of commits of this concrete aptitude
						var indexDevInRepo = repo[parseInt(matchingRepoIndex)].indexDeveloper.indexOf(myDeveloper.id);


					}
					repo[parseInt(matchingRepoIndex)].developers[indexDevInRepo] = myDeveloper; //Copy the modifications of the developer to the repo.developer structure

				}
			}
		}


		for (var i = 0; i<repo.length; i++) {
			document.write("Repo : "+repo[i].id+"<br> ");

			for (var j = 0; j<repo[i].concrete_aptitudes.length; j++) {

			}
			for (var k = 0; k<repo[i].developers.length; k++) {

				document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dev : "+repo[i].developers[k].name+"<br>");
				
				var matchingRepoIndex = repo[i].developers[k].repositories.indexOf(repo[i].id);

				for (var j = 0; j < repo[i].developers[k].score_times[parseInt(matchingRepoIndex)].length; j++) {

					if(typeof repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j] != "undefined"){
						var matchingConcreteAptitudeIndex = idConcreteAptitudes.indexOf(repo[i].developers[k].idConcreteAptitude[j]);

						document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Aptitude : " + concreteAptitudes[matchingConcreteAptitudeIndex].desc+"<br>"); 



						for(var m = 0; m< repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j].length; m++){
							
							var unix_timestamp = repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][0];
							var date = new Date(unix_timestamp*1000);
							var day = date.getDay();
							var month = date.getMonth();
							var year = date.getFullYear();

							var modificationsNumber = repo[i].developers[k].score_times[parseInt(matchingRepoIndex)][j][m][1];


							document.write("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
									"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
									" Commit Day : " + day +"/"+ month +"/"+ year +           
									"&nbsp; Modifications :" + modificationsNumber +
							"<br><br>");
						}
					}




				}

			}

		}



	});

}



