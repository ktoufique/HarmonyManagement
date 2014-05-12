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
		devAptEvents = filterEventsData(allEvents, dev, d.id);
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
			if (d2.dev == d1.id && d2.id == aptId) developers[i].timeFull.push(d2.timeFull);
		})
	})

	developers.sort(date_sort_dec);
	
	developers.forEach(function(d,i){
		if (d.timeFull.length > 0) {
			developers[i].timeFull = (d.timeFull[0].getDay()+1)+'/'+ (d.timeFull[0].getMonth()+1) +'/'+d.timeFull[0].getFullYear();
		} else developers[i].timeFull = 'N/A';
		developers[i].id = getDevById(d.id, data);
		
	})

	return developers;
}

function makeSpecData(data, aptId, makeNamesTrue){
	var devs =[];

	var totalOne = 0;
	data.repositories.forEach(function(d1){
		d1.developers.forEach(function(d2){
			devs.push({id: d2.id, total: getScoreTimesByAptDev(data, aptId , d2.id)});				
		})

	})

	if (makeNamesTrue){
		devs.forEach(function(d, i){
			devs[i].id = getDevById(devs[i].id, data);
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

					date1 = day+"/"+month+"/"+year;
					date2 = hour+":"+minute;

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
			evs[i].domain = getDomainById(evs[i].domain, data);
			evs[i].dev = getDevById(evs[i].dev, data);
			evs[i].id = getNameById(evs[i].id, data);

			evs[i].repo = getProjectByRepo(evs[i].repo, data);

			result.push(evs[i]);
		}

		return result;
	} else return evs;
	
}

function getDevById(id, data){
	
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

function getDomainById(id, data) {
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
