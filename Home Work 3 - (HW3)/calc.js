var equationLeft = NaN;
var equationRight = NaN;
var operand = null;
var display = '';
var justPressed = 0;
var displayOut = $('#display');


function doMath(equationLeft, equationRight, operand) {
    if (operand == "addButton") {
        display = parseInt(equationLeft) + parseInt(equationRight);
    }
    if (operand == "subtractButton") { 
        display = parseInt(equationLeft) - parseInt(equationRight);
    }
    if (operand == "multiplyButton") { 
        display = parseInt(equationLeft) * parseInt(equationRight);
    }
    if (operand == "divideButton") { 
        display = parseInt(equationLeft) / parseInt(equationRight);
    }
    return display;
}


$("[id^=button]").click(function(){ //Equivalent of a wild card here. Saying any Ids starting with 'button' text.
    thisValue = $(this).val(); // Quick reference to value of clicked element.
    if (justPressed > 0) { // If equals was just pressed, then a number button, it will act as a clear button press.
        equationLeft = NaN;
        operand = null;
        equationRight = NaN;
        justPressed = 0;
    }
    if (!isNaN(equationRight) && !isNaN(equationLeft) && operand != null) {  //Indicates 2nd operand already set - Splicing values for 2nd operand.
        equationRight = equationRight + thisValue;
        display = equationRight;
    }        
    else if (!isNaN(equationLeft) && operand != null) { // Indicates operand set but not 2nd operand. - Pushing 2nd operand here
        equationRight = thisValue;
        display = equationRight;
    }
    else if (!isNaN(equationLeft) && operand == null) { //Indicates already set - Splicing here
        equationLeft = equationLeft + thisValue;
        display = equationLeft;
    } 
    else if (isNaN(equationLeft)) { //Indicates first button press for operand - Pushing here
        equationLeft = thisValue;
        display = equationLeft;
         
    }
    displayOut.val(display);
    return false;

})

$("#addButton, #subtractButton, #multiplyButton, #divideButton").click(function(){ //Catch for all operand buttons. Universal function here using Ids and doMath function.
    if (justPressed > 0) { // If its an operand after equals then we will clear the right value and set operand.
        justPressed = 0;
        equationRight = NaN;
        operand = this.id;
    }
    if (!isNaN(equationLeft) && !isNaN(equationRight) && operand != null) { //If both left and right are numbers and operand is already set to something. 
        display = doMath(equationLeft, equationRight, operand);
        equationLeft = display;
        operand = this.id;
        equationRight = NaN;
        displayOut.val(display); 
    }
    else if (!isNaN(equationLeft)) { //Only check if left and right are not already set. Then make sure left is set.  
        operand = this.id;
    }
    return false; //Ending button click operation with return false;
});


$("#clearButton").click(function(){ //Setting action variables to clear status.
    equationLeft = NaN;
    equationRight = NaN;
    operand = null;
    display = '';
    justPressed = 0;
    displayOut.val(display);
});

$("#equalsButton").click(function(){  //Equals will act only when left, right, and operand are set. Will allow multiple clicks due to justPressed check with alternate buttons.
    if (!isNaN(equationRight) && !isNaN(equationLeft) && operand != null) {
        display = doMath(equationLeft, equationRight, operand);
        justPressed += 1;
        equationLeft = display;
        displayOut.val(display);
    }
    return false;
});