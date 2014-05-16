function makePieGlobal(){
var w = 300,                            //width
    h = 300,                            //height                           //radius
    color = d3.scale.category20();     //builtin range of colors
    
    $.getJSON('json/report.json', function(dataJSON){

        dataJSON = filterDB(dataJSON, [], [], [], []);

    // Cette partie permet de construire un objet JSON adapté au format qu'attends le script. 
    //De plus, ça s'adapte automatiquement au nombre d'élements ajoutés (avec la chaine .select().data(data)) ... )

     var newData = new Array(); // This array will contain the list of couples (repo, numberOfDevelopers)
     for (var i = 0; i < dataJSON.repositories.length; i++){

        var repoName = dataJSON.repositories[i].name;
        var repoDevs = dataJSON.repositories[i].developers.length;

        newData[i] = { "label": repoName, "value": repoDevs };
    }

    var devsData = new Array();

    

    dataJSON.repositories.forEach(function(d){
        d.developers.forEach(function(d){
            devsData.push({ "label": d.name, "value": d.commits });
        })
    })
    var compsArray = new Array();

    dataJSON.domain_aptitudes.forEach(function(d){
        //console.log("Domain : " + d.name);
        d.concrete_aptitudes.forEach(function(d, i){
            //console.log("   UnderDomain : " +  d.id);
            compsArray.push(d.id);
        })
    })
    //console.log("Competences list : " + compsArray);

    var devsArray = new Array();

    dataJSON.repositories.forEach(function(d){
        //console.log("repo id : " + d.id);
        d.developers.forEach(function(d){
            //console.log("   dev id :" + d.id);
            devsArray.push(d.id);

        })
    })
    
    var compData = getCompetenceRatioNames(dataJSON);
    
    compData = adaptPieToLevel(compData, 4);
    
    makePie(compData, ".pieComps", w, h);
    makePie(newData, ".pieProjs", w, h);

    devsData = adaptPieToLevel(devsData, 4);
    makePie(devsData, ".pieDevs", w, h);

    var specProjData = getCompetenceRatioByRepo(dataJSON, idCurrentRepo);

    specProjData.forEach(function(d,i){
        specProjData[i].label = getNameById(d.label, dataJSON);
    })
    
    specProjData = adaptPieToLevel(specProjData, 4);

    makePie(specProjData, ".pieProjsSpec", w, h);

})






function makePie(data, divClass, w, h){
    d3.select(".pieProjsSpec").select("svg").remove();

    r = h/2;
    var vis = d3.select(divClass)
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius
            

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
    .outerRadius(r)
    .innerRadius(r-80);


    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

                arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc);

/*arcs
.append("svg:text")
.attr("text-anchor", "middle")
.text(arcs[0].data.label);*/



arcs
.on("mouseover", function(d, i){
    arcs
    .selectAll("text.rem")
    .transition()
    .duration(200)
    .style("opacity", .1)
    .remove();
    
    arcs.append("svg:text")
    .attr("class", "rem")
    .attr("text-anchor", "middle")
    .style("opacity", .1)
    .text(d.data.label)
    .transition()
    .duration(200)
    .style("opacity", 1);
})

arcs
.on("mouseout", function(d, i){
    arcs
    .selectAll("text.rem")
    .transition()
    .duration(200)
    .style("opacity", .1)
    .remove();
})

var total = 0;
data.forEach(function(d){
    total += data.value;
})

arcs
    .append("svg:text")                                     //add a label to each slice
    .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;

                var tmp = arc.centroid(d);
                var angle = 90 -  Math.atan2(tmp[0], tmp[1]) * (180 / Math.PI);

                if (tmp[0] < 0) angle = 180 + angle;

                return "translate(" + arc.centroid(d) +  ")" + "rotate("+ angle +")";        //this gives us a pair of coordinates like [50, 50]

            })

    .attr("text-anchor", "middle")                          
        .text(function(d, i) { return Math.floor(data[i].value/getSum(data) * 100) + " %"; });        //get the label from our original data array

    }


    function getSum(data){
        var total = 0;

        data.forEach(function(d){
            total += d.value;
        })
        return total;
    }
}