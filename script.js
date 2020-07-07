/**
 * Wirtschaftssimulationsprogramm
 *
 * @Autor: Janina Schroeder
 */
var initial_year = 1;
var initial_money = 6000;
var initial_people = 100;
var initial_working_people = 0;
var initial_field = 400;
var initial_seeded_fields = 0;
var maxYears = 20;
var foodPerPerson = 20;
var createNewPerson = 40;
var notFeeded;
var formSubPossible;
var submits = 0;
var maxPeople = 0;
var workFactor = 10;
var seedChargePerField = 2;
var chargePerField;
var cropPerYear;
var totalCrop;
var tradeActivated = false;
//nutrition of population with corn
function nourishPeople(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	submits++;	
	//save user input
	var keepPeople = document.getElementById("nourish").value;
	var newPeople = 0;
	//validate user inpu
	if(keepPeople <= initial_people){
		if(submits == 1){
			maxPeople = initial_people;	
			newPeople = parseInt(keepPeople);
		}
		if(submits >= 2){
			newPeople = parseInt(keepPeople) + parseInt(initial_people);
		}
		if(newPeople <= maxPeople){	
			//output
			document.getElementById("people").innerHTML = " "+newPeople;
			initial_people = newPeople;
			notFeeded = false;
			formSubPossible = true;	
			//calculate money
			ifNourishing();
		}else{
			//error message
			document.getElementById("userAlert").style.color = 'red';
			document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Menschen vorhanden!";
			document.getElementById("nourish").value="";
		}	
	}else{
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Menschen vorhanden!";
		document.getElementById("nourish").value="";
	}
	//present sending of data to server
	return false;
}
//charge for nutrition of population
function ifNourishing(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var keepPeople = document.getElementById("nourish").value;
	//nutrition demand of population per year
	var eat = parseInt(keepPeople) * parseInt(foodPerPerson);
	if(eat > initial_money){
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenig Essen vorhanden!";
		document.getElementById("nourish").value="";
	}else{
		//deficiency of corn
		var newMoney = parseInt(initial_money) - parseInt(eat);
		//output
		document.getElementById("money").innerHTML = " "+newMoney;
		initial_money = newMoney;
		//delete input
		document.getElementById("keepPeople").reset();
	}	
}
//growth of population
function createPeople(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var peopleToCreate = document.getElementById("growPeople").value;
	//nutrition demand of children per year
	if(initial_people < 1 || eat > initial_money){
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Menschen oder Geld vorhanden!";
		document.getElementById("growPeople").value="";
	}else{
		//increase number of citizens
		var newPeople = parseInt(peopleToCreate) + parseInt(initial_people);
		//output
		document.getElementById("people").innerHTML = " "+newPeople;
		initial_people = newPeople;
		//calculate money
		ifGrowingPeople(eat);
	}
	return false;
}
//calculate charge for children
function ifGrowingPeople(foodForChildren){
	//consumption of corn
	var newMoney = parseInt(initial_money) - parseInt(foodForChildren);
	document.getElementById("money").innerHTML = " "+newMoney;
	initial_money = newMoney;
	document.getElementById("peopleToCreate").reset();
}
//cultivate fields
function seedField(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var inputSeed = document.getElementById("seed").value;
	var seedCharge = parseInt(inputSeed) * parseInt(seedChargePerField);
	if(inputSeed > initial_field || seedCharge > initial_money){
		//Fehlermeldung
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Felder oder Geld vorhanden!";
		document.getElementById("seed").value="";
	}else{
		//calculate seeded fields
		var newSeededFields = parseInt(inputSeed) + parseInt(initial_seeded_fields);
		document.getElementById("seededField").innerHTML = " "+newSeededFields;
		initial_seeded_fields = newSeededFields;	
		ifSeeding(seedCharge);
		//display working citizens
		work(newSeededFields);
	}
	return false;
}
//working citizens
function work(forSeeding){
	var floatPeoplePerField = parseInt(forSeeding) / parseInt(workFactor);
	var peoplePerField = Math.floor(floatPeoplePerField);
	if(parseInt(forSeeding) % parseInt(workFactor) != 0){
		peoplePerField = peoplePerField + 1;
	}
	if(peoplePerField <= initial_people){
		document.getElementById("workingPeople").innerHTML = " "+peoplePerField;
		initial_working_people = peoplePerField;
	}else{
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Menschen vorhanden!";
		document.getElementById("seed").value="";
	}
}
//calculate price of seed
function ifSeeding(priceForSeeding){
	//financial deficit of seed
	var newMoney = parseInt(initial_money) - parseInt(priceForSeeding);
	document.getElementById("money").innerHTML = " "+newMoney;
	initial_money = newMoney;
	document.getElementById("inputSeed").reset();
}
//annualy crop
function calcCropPerYear(){
	cropPerYear = Math.round((Math.random() * 9)+ 1);
	document.getElementById("crop").innerHTML = " "+cropPerYear;
}
//annualy crop of all fields
function calcTotalCrop(){
	//annualy crop of seeded fields
	totalCrop = parseInt(initial_seeded_field) * parseInt(cropPerYear);
	//output
	document.getElementById("totalCrop").innerHTML = " "+totalCrop;
	ifCrop();
}
function ifCrop(){
	var newMoney = parseInt(totalCrop) + parseInt(initial_money);
	document.getElementById("money").innerHTML = " "+newMoney;
	initial_money = newMoney;
}
function calcFieldChargePerYear(){
	chargePerField = Math.round((Math.random() * 9)+ 1);
	//output
	document.getElementById("charge").innerHTML = " "+chargePerField;
}
function activateTrade(){
	//disable first 3 input fields
	document.getElementById("nourish").disabled = true;
	document.getElementById("growPeople").disabled = true;
	document.getElementById("seed").disabled = true;
	document.getElementById("trade").disabled = true;
	//enable last 2 input fields
	document.getElementById("buy").disabled = false;
	document.getElementById("sell").disabled = false;
}
//purchase of fields
function buyField(){
	var inputBuy = document.getElementById("buy").value;
	var newField = parseInt(inputBuy) + parseInt(initial_field);	
	document.getElementById("field").innerHTML = " "+newField;
    initial_field = newField;
	ifBuying();
	return false;
}
function ifBuying(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var inputBuy = document.getElementById("buy").value;
	//calculate total charge
	var totalCharge = parseInt(inputBuy) * parseInt(chargePerField);
	if(totalCharge>initial_money){
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenig Geld vorhanden!";
		document.getElementById("buy").value="";
	}else{
		var newMoney = parseInt(initial_money) - parseInt(totalCharge);
		document.getElementById("money").innerHTML = " "+newMoney;
		initial_money = newMoney;
		document.getElementById("inputBuy").reset();
	}
	
}
//sale of fields
function sellField(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var inputSell = document.getElementById("sell").value;
	if(inputSell<=initial_field){
		var newField = parseInt(initial_field) - parseInt(inputSell);
		document.getElementById("field").innerHTML = " "+newField;
		initial_field = newField;
		ifSelling();
	}else{
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenige Felder vorhanden!";
		document.getElementById("sell").value="";
	}	
	return false;
}
function ifSelling(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	var inputSell = document.getElementById("sell").value;
	//calculate income
	var totalCharge = parseInt(inputSell) * parseInt(chargePerField);
	if(totalCharge > initial_money){
		document.getElementById("userAlert").style.color = 'red';
		document.getElementById("userAlert").innerHTML = "Benutzeraufforderung: "+"Zu wenig Geld vorhanden!";
		document.getElementById("sell").value="";
	}else{
		var newMoney = parseInt(initial_money) + parseInt(totalCharge);
		document.getElementById("money").innerHTML = " "+newMoney;
		initial_money = newMoney;
		document.getElementById("inputSell").reset();
	}
}
function gameRoundActions(){
	calcFieldChargePerYear();
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
}
function inTheYear(){
	if(initial_year <= maxYears){
		gameRoundActions();		
		document.getElementById("thisYear").innerHTML = " "+initial_year;
		document.getElementById("seededField").innerHTML = " "+initial_seeded_field;
		notFeeded = true;
		formSubPossible = true;	
		if(initial_money < 1 || initial_field < 1 || initial_people < 1){
			gameOver();	
		}
	}else{
		gameOver();
	}
}
//start of game
function beginGame(){
	initial_year = 1;
	initial_money = 6000;
	initial_field = 400;
	initial_people = 100;
	initial_seeded_field = 0;
	initial_working_people = 0;
	maxYears = 4;
	//display game status
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	document.getElementById("game").innerHTML = "Spiel läuft";
	document.getElementById("thisYear").innerHTML = " "+initial_year;
	document.getElementById("money").innerHTML = " "+initial_money;
	document.getElementById("people").innerHTML = " "+initial_people;
	document.getElementById("workingPeople").innerHTML = " "+initial_working_people;
	document.getElementById("field").innerHTML = " "+initial_field;
	document.getElementById("seededField").innerHTML = " "+initial_seeded_field;
	document.getElementById("thisYear").innerHTML = " "+initial_year;
	//delete values of input fields
	document.getElementById("crop").innerHTML = "";
	document.getElementById("totalCrop").innerHTML = "";
	document.getElementById("charge").innerHTML = "";
	document.getElementById("nourish").value= "";
	document.getElementById("growPeople").value= "";
	document.getElementById("seed").value= "";
	document.getElementById("buy").value= "";
	document.getElementById("sell").value= "";
	//enable input fields and buttons
	document.getElementById("nourish").disabled = false;
	document.getElementById("growPeople").disabled = false;
	document.getElementById("seed").disabled = false;
	document.getElementById("trade").disabled = false;
	document.getElementById("next").disabled = false;
	gameRoundActions();
	//one turn
	inTheYear();
}
//test if there was input
function formValidation(){
	var userInput = document.forms["foodInputForm"]["foodInput"].value;
	if(userInput == ""){
		formSubPossible = false;
		return false;	
	}
}
//go to next year
function turnOfTheYear(){
	if(initial_seeded_field > 0){
		calcCropPerYear();
		calcTotalCrop();
	}
	formValidation();	
	if(notFeeded == true && formSubPossible == false){
		initial_people = 0;
		document.getElementById("people").innerHTML = " "+initial_people;
	}
	initial_year++;
	submits = 0;
	maxPeople = 0;
	initial_seeded_field = 0;
	document.getElementById("nourish").disabled = false;
	document.getElementById("growPeople").disabled = false;
	document.getElementById("seed").disabled = false;
	document.getElementById("trade").disabled = false;
	document.getElementById("buy").disabled = true;
	document.getElementById("sell").disabled = true;
	//one year
	inTheYear();
}
//game over
function gameOver(){
	document.getElementById("userAlert").style.color = 'black';
	document.getElementById("userAlert").innerHTML = "Benutzeraufforderung:";
	document.getElementById("nourish").disabled = true;
	document.getElementById("growPeople").disabled = true;
	document.getElementById("seed").disabled = true;
	document.getElementById("buy").disabled = true;
	document.getElementById("sell").disabled = true;
	document.getElementById("trade").disabled = true;
	document.getElementById("next").disabled = true;
	document.getElementById("game").innerHTML = "Game Over";
}
