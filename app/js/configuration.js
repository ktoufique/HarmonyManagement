function choixprop(form3) { 
    var choixproposition;
    if (form3.choix[0].checked) { //alert("Vous avez choisi la proposition " + form3.choix[0].value); 
	choixproposition=document.getElementById("choix0").value;
    }
    if (form3.choix[1].checked) { //alert("Vous avez choisi la proposition " + form3.choix[1].value); 
	choixproposition=document.getElementById("choix1").value;	
    }
    if (form3.choix[2].checked) { //alert("Vous avez choisi la proposition " + form3.choix[2].value);
	choixproposition=document.getElementById("choix2").value;
    }
    if (form3.choix[3].checked) { //alert("Vous avez choisi la proposition " + form3.choix[3].value);
	choixproposition=document.getElementById("choix3").value;
    }
    if (form3.choix[4].checked) { //alert("Vous avez choisi la proposition " + form3.choix[4].value);
	choixproposition=document.getElementById("choix4").value;	
    }
    if (form3.choix[5].checked) { //alert("Vous avez choisi la proposition " + form3.choix[5].value);
	choixproposition=document.getElementById("choix5").value;		
    }
    else {
	alert("Veuillez choisir le nombre de développeurs que vous désirez afficher.");
	return 1;
    }
    return choixproposition;
} 





//<!-- Fonction qui rend la date du jour -->
function todayDate(){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    
    if(dd<10) {
	dd='0'+dd
    } 
    
    if(mm<10) {
	mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy;
    document.write(today);
} 





// fonction qui permet de retourner la date qui se trouve dans les inputs  
function getDate1(k){
    
    var huk;
    if (k==1){
	huk=document.getElementById("hu1").value;
	//<!--alert(huk); -->
    }
    if (k==2){
	huk=document.getElementById("hu2").value;
	//<!-- alert(huk); -->
    }
    return huk;
}


//<!-- Permet de récapituler les dates choisies par le manager -->
function confirmation(){
    var  theDate1 = getDate1(1);
    var theDate2 = getDate1(2);
    document.writeln("Vous avez choisi les dates suivantes: "+theDate1);
    document.write("et "+theDate2);
}


//<!-- Permet de comparer les deux dates -->
function comparaisonDates(){
    var theDate1;
    var theDate2;
    theDate1=getDate1(1);
    theDate2=getDate1(2);
    var theDateSplit1=theDate1.split('/');
    day1=theDateSplit1[0];
    month1=theDateSplit1[1];
    year1=theDateSplit1[2];
    document.writeln(day1);
    document.writeln(month1);
    document.writeln(year1);
    
    var theDateSplit2=theDate2.split('/');
    day2=theDateSplit2[0];
    month2=theDateSplit2[1];
    year2=theDateSplit2[2];
    document.writeln(day2);
    document.writeln(month2);
    document.writeln(year2);
    
    if (year1<year2){
	alert("ok pour l'année");
    }
    else if (year1==year2){
	if (month1<month2){
	    alert("ok pour le mois");
	}
	else if (month1==month2){
	    if(day1<day2){
		alert("ok pour le jour");
	    }
	    else if(day1==day2){
		alert("l'affichage ne s'effectuera que pour un seul jour");
	    }
	    else{
		alert("Il faut changer les dates pour le jour");
	    }
	}
	else{
	    alert("Il faut changer les dates pour le mois");
	}
    }
    else{
	
	alert("il faut changer les dates pour l'année");
	
    }
}


// Fonction récapitulative
function recap(){
    var theDate1;
    var theDate2;
    var choixprop1;
    choixprop1=choixprop(form3);
    theDate1=getDate1(1);
    theDate2=getDate1(2);


    if (choixprop1==-1){
	choixprop1=' tous les';
    }
    
    

    document.write("Vous avez choisi les dates suivantes: " +theDate1);
    //alert(""+theDate1);
    document.write(" et "+theDate2);
    document.writeln(".");
    document.write("Vous avez décidé d'afficher "+choixprop1);
    document.write(" développeurs.");
    
}



/*function final(){
  var choixproposition;
  var theDate1;
  var theDate2;
  var choixprop1;
  
  theDate1=getDate1(1);
  theDate2=getDate1(2);


  var theDateSplit1=theDate1.split('/');
  day1=theDateSplit1[0];
  month1=theDateSplit1[1];
  year1=theDateSplit1[2];
  //document.writeln(day1);
  //document.writeln(month1);
  //document.writeln(year1);
  
  var theDateSplit2=theDate2.split('/');
  day2=theDateSplit2[0];
  month2=theDateSplit2[1];
  year2=theDateSplit2[2];
  //document.writeln(day2);
  //document.writeln(month2);
  //document.writeln(year2);

  // Permet de vérifier quue le manager a choisi un nombre de développeurs 
  if (form3.choix[0].checked) { //alert("Vous avez choisi la proposition " + form3.choix[0].value); 
  choixproposition=document.getElementById("choix0").value;
  }
  else if (form3.choix[1].checked) { //alert("Vous avez choisi la proposition " + form3.choix[1].value); 
  choixproposition=document.getElementById("choix1").value;	
  }
  else if (form3.choix[2].checked) { //alert("Vous avez choisi la proposition " + form3.choix[2].value);
  choixproposition=document.getElementById("choix2").value;
  }
  else if (form3.choix[3].checked) { //alert("Vous avez choisi la proposition " + form3.choix[3].value);
  choixproposition=document.getElementById("choix3").value;
  }
  else if (form3.choix[4].checked) { //alert("Vous avez choisi la proposition " + form3.choix[4].value);
  choixproposition=document.getElementById("choix4").value;	
  }
  else if (form3.choix[5].checked) { //alert("Vous avez choisi la proposition " + form3.choix[5].value);
  choixproposition=document.getElementById("choix5").value;		
  }
  else {
  alert("Veuillez choisir le nombre de développeurs que vous désirez afficher.");
  return ;
  }
  







  // permet de vérifier que  date1 < date2 
  if (year1<year2){
  alert("ok pour l'année");
  }
  else if (year1==year2){
  if (month1<month2){
  alert("ok pour le mois");
  }
  else if (month1==month2){
  if(day1<day2){
  alert("ok pour le jour");
  }
  else if(day1==day2){
  alert("l'affichage ne s'effectuera que pour un seul jour");
  }
  else{
  alert("Il faut changer les dates pour le jour");
  }
  }
  else{
  alert("Il faut changer les dates pour le mois");
  }
  }
  else{
  
  alert("il faut changer les dates pour l'année");
  
  }







  
  if (choixproposition==-1){
  choixproposition=' tous les ';
  }
  
  


  document.write("Vous avez choisi les dates suivantes: " +theDate1);
  //alert(""+theDate1);
  document.write(" et "+theDate2);
  document.writeln(".");
  document.write("Vous avez décidé d'afficher "+choixproposition);
  document.write(" développeurs.");

  }*/

function final(){
    var choixproposition;
    var theDate1;
    var theDate2;
    var choixprop1;
    
    

	<!-- Permet de vérifier quue le manager a choisi un nombre de développeurs -->
	if (form3.choix[0].checked) { 
		<!--//alert("Vous avez choisi la proposition " + form3.choix[0].value); -->
	    choixproposition=document.getElementById("choix0").value;
	}
    else if (form3.choix[1].checked) { 
	    //alert("Vous avez choisi la proposition " + form3.choix[1].value); 
	choixproposition=document.getElementById("choix1").value;	
    }
    else if (form3.choix[2].checked) {
	    //alert("Vous avez choisi la proposition " + form3.choix[2].value);
	choixproposition=document.getElementById("choix2").value;
    }
    else if (form3.choix[3].checked) { 
	    //alert("Vous avez choisi la proposition " + form3.choix[3].value);
	choixproposition=document.getElementById("choix3").value;
    }
    else if (form3.choix[4].checked) { 
	    //alert("Vous avez choisi la proposition " + form3.choix[4].value);
	choixproposition=document.getElementById("choix4").value;	
    }
    else if (form3.choix[5].checked) { 
	    //alert("Vous avez choisi la proposition " + form3.choix[5].value);
	choixproposition=document.getElementById("choix5").value;		
    }
    else {
	alert("Veuillez choisir le nombre de développeurs que vous désirez afficher.");
	return ;
    }
    
    
    if (choixproposition==1){
	document.write("You decided to display one developer.");
    }
    else if (choixproposition==-1){
	document.write("You decided to display all the developers.");
    }
    else {
	document.write("You decided to display "+choixproposition);
	document.write(" developers.");
    }
}
