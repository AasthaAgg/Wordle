var inputChars = document.querySelectorAll('.input-char');
var keyboardButtons = document.querySelectorAll('.keyboard-button');
var input="";
var inputBoxIndex = 0;
var randomWord="";


// ===== FUNCTION TO GENERATE RANDOM WORD =====

function generateRandomWord(level = custom){
    randomWord = level[Math.floor(Math.random() * level.length)];
    console.log(randomWord);
}

// ===== GENERATE RANDOM WORD ON PAGE LOAD =====

generateRandomWord();

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


// ===== REMOVE CHARACTER, MOVE TO PREVIOUS INPUT BOX =====

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

// ===== DISPLAY MESSAGE ON SCREEN =====

function setMsg(msg){
    document.querySelector('.msg').innerHTML = msg;
}

// ===== ADD EVENT LISTENER FOR EXTERNAL KEYBOARD INPUT =====

inputChars.forEach(inputChar=>{
       
    inputChar.addEventListener("keydown", function(event) {
        if(event.key == "Backspace") removeLastChar();
        else if(event.key == "Enter"){
            console.log("Enter");
            if(inputBoxIndex == 29){
                checkInputWord();
                disableInput();
                generateResult();
            }
            else if(input.length == 5){
                checkInputWord();
            } 
            else{
                setMsg("You must enter 5 characters!!");
                setTimeout(setMsg, 2000, "");
            }
        }
    });

    inputChar.addEventListener('input',function(){
        if(this.value.match(/[A-z]/)) setInputChar();
    });
});


// ===== ADD EVENT LISTENERS FOR EVERY ON-SCREEN KEYBOARD INPUT =====

keyboardButtons.forEach(keyboardBtn => {
    keyboardBtn.addEventListener('click',function(){
        if(this.value.match(/del/)) removeLastChar();
        else if(this.value.match(/enter/)){
            if(inputBoxIndex == 29){
                checkInputWord();
                disableInput();
                generateResult();
            }
            else if(input.length == 5) checkInputWord();
            else{
                setMsg("You must enter 5 characters!!");
                setTimeout(setMsg, 2000, "");
            }
        }
        else if(this.value.match(/[a-z]/)){
            document.querySelector('.input-char.active').value = this.value;
            setInputChar();
        }
    });
});


// ===== SET INPUT CHARACTER =====

function setInputChar(){

    if(inputBoxIndex == 0) setMsg("");

    input += document.querySelector('.input-char.active').value;
    
    if(input.length != 5) movetoNext();
    else inputChars[inputBoxIndex].blur();

    console.log(input);

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
    console.log("word input : "+ input);
    input = "";
    if(inputBoxIndex != 29) movetoNext();
}


// ===== CREATE RESULT =====

function generateResult(){
    
}