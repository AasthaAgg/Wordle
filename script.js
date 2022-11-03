var inputChars = document.querySelectorAll('.input-char');
var keyboardButtons = document.querySelectorAll('.keyboard-button');
var input="";
var inputBoxIndex = 0;


// ===== FOCUS ON FIRST INPUT BOX (BY DEFAULT) =====

inputChars[inputBoxIndex].focus();


// ===== ON EVERY INPUT, MOVE TO NEXT INPUT BOX =====

function movetoNext(){
    inputChars[inputBoxIndex].classList.remove('active');
    inputChars[inputBoxIndex].disabled = true;
    inputChars[++inputBoxIndex].classList.add('active');
    inputChars[inputBoxIndex].disabled = false;
    inputChars[inputBoxIndex].focus();
}


// ===== ON EVERY INPUT, MOVE TO PREVIOUS INPUT BOX =====

function movetoPrevious(){
    inputChars[inputBoxIndex].classList.remove('active');
    inputChars[inputBoxIndex].disabled = true;
    inputChars[--inputBoxIndex].classList.add('active');
    inputChars[inputBoxIndex].disabled = false;
    inputChars[inputBoxIndex].value="";
    inputChars[inputBoxIndex].focus();
}

function disableInput(){
    inputChars[inputBoxIndex].disabled = true;
}


// ===== ADD EVENT LISTENER FOR EXTERNAL KEYBOARD INPUT =====

inputChars.forEach(inputChar=>{
    inputChar.addEventListener('input',function(){
        if(this.value.match(/[A-z]/)) setInputChar();
    });
});


// ===== ADD EVENT LISTENERS FOR EVERY ON-SCREEN KEYBOARD INPUT =====

keyboardButtons.forEach(keyboardBtn => {
    keyboardBtn.addEventListener('click',function(){
        if(this.value.match(/del/)) removeLastChar();
        else if(this.value.match(/enter/)){
            if(input.length == 5) checkInputWord();
            else document.querySelector('.msg').innerHTML = "You must enter 5 characters!!";
        }
        else if(this.value.match(/[a-z]/)){
            document.querySelector('.input-char.active').value = this.value;
            setInputChar();
        }
    });
});


// ===== SET INPUT CHARACTER =====

function setInputChar(){
    input += document.querySelector('.input-char.active').value;
    
    if(inputBoxIndex == 29){
        disableInput();
        checkInputWord();
        generateResult();
    }
    else if(input.length != 5) movetoNext();
    else inputChars[inputBoxIndex].blur();
}


// ===== REMOVE LAST CHARACTER =====

function removeLastChar(){

    if(input.length==5){
        input = input.substring(0,input.length-1);
        inputChars[inputBoxIndex].value="";
        inputChars[inputBoxIndex].focus();

    }
    else if(input.length != 0){
        input = input.substring(0,input.length-1);
        movetoPrevious();
    }
    else{
        inputChars[inputBoxIndex].focus();
    }
}


// ===== PROCESS INPUT VALUE =====

function checkInputWord(){
    
    input = "";
    movetoNext();
}


// ===== CREATE RESULT =====

function generateResult(){
    
}