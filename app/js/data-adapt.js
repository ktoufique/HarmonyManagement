// Okay, here is what I need : I need to be able to select a Developper, and get his total score by concrete aptitude.
    // The attributes are : Dev id, concrete aptitude expressed, total score

    $.getJSON('json/report.json', function(response){

       dataJSON = response;



       var k = getScoreTimes(2044, 98850, dataJSON);
////console.log("Size of return value : " + k.length);
// This is tested and is working.

var unix_timestamp = k[0][1];
var date = new Date(unix_timestamp*1000);
var day = date.getDay();
var month = date.getMonth();
var year = date.getFullYear();
// TODO : get the date in the right format

function getTotalScores(result){
    var len = result.length;
    var total = 0;

    for (var i = 0; i < len; i++){
        total += parseInt(result[i][0]);
    }
    return total;
}

var totalScores = getTotalScores(k);
//console.log("Total Scores : " + totalScores);
// Tested and working

// Now I want to get a list of all (dev, id, repo)

for (var i = 0; i < dataJSON.repositories.length; i++){
    //console.log("repo : " + dataJSON.repositories[i].id);
    for (var j = 0; j < dataJSON.repositories[i].developers.length; j++) {
        //console.log("dev : " + dataJSON.repositories[i].developers[j].id);
    }
}

// Now I want to get a list of all concrete_aptitudes
for (var i = 0; i < dataJSON.domain_aptitudes.length; i++) {
    //console.log("Domain : " + dataJSON.domain_aptitudes[i].id);
    for (var j = 0; j < dataJSON.domain_aptitudes[i].concrete_aptitudes.length; j++) {
        //console.log("underDomain : " +dataJSON.domain_aptitudes[i].concrete_aptitudes[j].id);
    }
}


/* What do I have up till now : 
1- function : Array getScoreTimes(developper, concrete_aptitude)
For a given developper and a given conrete_aptitude, is returns all the scores in this format :
RETURN VALUE : 
Array : [[number1, time1], [number2, time2], ..., [numberN, timeN]] 
2 - Then I'm going to be able to loop over all developpers and all concrete_aptitudes and get the into to plot
NOTE : I still need to get the info in the correct format */



});

function getCompetenceRatioNames(data){



    var rslt = getCompetenceRatio(data);


    rslt.forEach(function(d, i){
        var name = getNameById(d.label, data);
        rslt[i].label = name;
    });

    return rslt;
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

function getDomainById(id) {
    var domain;

    JSON.domain_aptitudes.forEach(function(d){
        if (d.id == id) {
            domain = d.name;
        }
    })

    return domain;
}


function getScoreTimes(dev, apt, dataJSON){

    var tokenArray = new Array();

    for (var i = 0; i < dataJSON.aptitude_expressions.length; i++){ 
        for (var j = 0; j < dataJSON.aptitude_expressions[i].expressions.length; j++){
            for (var k = 0; k < dataJSON.aptitude_expressions[i].expressions[j].concrete_expressions.length; k++){

                for (var l = 0; l < dataJSON.repositories.length; l++){

                    if (dataJSON.aptitude_expressions[i].expressions[j].concrete_expressions[k].repo == dataJSON.repositories[l].id){

                        // all you need to do is to select a developper and create and array with date and score times !
                        if (dataJSON.aptitude_expressions[i].expressions[j].concrete_expressions[k].dev == dev
                            &&   dataJSON.aptitude_expressions[i].expressions[j].id_concrete_aptitude == apt) {


                        // first let's get the tokens : 
                    tokenArray = dataJSON.aptitude_expressions[i].expressions[j].concrete_expressions[k].scores_times;

                }
            }

        }

    }
}
}
return tokenArray;
}// dev = 2044 et apt = 98850

function getCompetenceRatio(data) {

    //console.log("Hello");

    var aptitudes = new Array();
    var result = new Array();
    var scoreTimes = 0, totalPerComp = 0, number = 0;

    data.aptitude_expressions.forEach(function(d1, i){
        d1.expressions.forEach(function(d2){

            scoreTimes = 0;
            totalPerComp = 0;
            aptitudes.push(d2.id_concrete_aptitude);
            d2.concrete_expressions.forEach(function(d4){
                scoreTimes += d4.scores_times.length;
                d4.scores_times.forEach(function(d5){
                    //console.log(d5);
                    number = parseInt(d5.split("_")[0]);
                })
                totalPerComp += number;
            })
            //console.log(totalPerComp);
            result.push({"label": d2.id_concrete_aptitude, "value": totalPerComp});
        })
        
    })
    
    
    return result;
}

function getCompetenceRatioByRepo(data, repo) {

    //console.log("Hello");

    var aptitudes = new Array();
    var result = new Array();
    var scoreTimes = 0, totalPerComp = 0, number = 0;

    data.aptitude_expressions.forEach(function(d1, i){
        d1.expressions.forEach(function(d2){

            scoreTimes = 0;
            totalPerComp = 0;
            aptitudes.push(d2.id_concrete_aptitude);
            d2.concrete_expressions.forEach(function(d4){
                if (d4.repo == repo){
                    scoreTimes += d4.scores_times.length;
                    d4.scores_times.forEach(function(d5){
                    //console.log(d5);
                    number = parseInt(d5.split("_")[0]);
                })
                    totalPerComp += number;
                }
            })
            //console.log(totalPerComp);
            result.push({"label": d2.id_concrete_aptitude, "value": totalPerComp});
        })
        
    })
    
    
    return result;
}

function adaptPieToLevel(data, level){
    var tt = new Array();
    var sum = 0;

    data.forEach(function(d){

        tt.push(d.value);
        sum += d.value;        
    })
    
    //console.log(sum);

    tt.forEach(function(d, i){
        tt[i] = d/sum*100;
    })
    //console.log(tt);

    var indexsToDelete = new Array();
    tt.forEach(function(d, i){
        //console.log(d);
        if (d < level) indexsToDelete.push(i);
    })

    //console.log(indexsToDelete.length);

    var sum2 = 0;
    indexsToDelete.forEach(function(d, i){
        sum2 += data[d].value;
    })
    
    indexsToDelete.reverse();

    indexsToDelete.forEach(function(d, i){
        data.splice(d, 1);
    })
    
    data.push({"label": "Autres", "value" : sum2});
    
    
    return data;

}