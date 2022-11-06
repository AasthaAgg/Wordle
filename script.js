var inputChars = document.querySelectorAll('.input-char');
var keyboardButtons = document.querySelectorAll('.keyboard-button');
var input="";
var inputBoxIndex = 0;
var randomWord="";
var gameStatus = "start";


// ===== FUNCTION TO GENERATE RANDOM WORD =====

function generateRandomWord(level = custom){
    randomWord = level[Math.floor(Math.random() * level.length)];
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
            setMsg("");
            if(inputBoxIndex == 29){
                checkInputWord();
                disableInput();
                generateResult();
            }
            else if(input.length == 5) checkInputWord();
            else setMsg("You must enter 5 characters!!");
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
            setMsg("");
            if(inputBoxIndex == 29){
                checkInputWord();
                disableInput();
                generateResult();
            }
            else if(input.length == 5) checkInputWord();
            else setMsg("You must enter 5 characters!!");
        }
        else if(this.value.match(/[a-z]/)){
            document.querySelector('.input-char.active').value = this.value;
            setInputChar();
        }
    });
});


// ===== SET INPUT CHARACTER =====

function setInputChar(){
    setMsg("");

    input += document.querySelector('.input-char.active').value.toUpperCase();
    
    if(input.length != 5) movetoNext();
    else inputChars[inputBoxIndex].blur();

}


// ===== REMOVE LAST CHARACTER =====

function removeLastChar(){
    setMsg("");

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


// ===== PROCESS INPUT WORD =====

function checkInputWord(){
    if(fullList.includes(input)){
        for(var i=0; i<5; i++){
            if(input.charAt(i) === randomWord.charAt(i)){
                inputChars[inputBoxIndex+i-4].classList.add('green');
            }
            else if(randomWord.includes(input.charAt(i))){
                inputChars[inputBoxIndex+i-4].classList.add('yellow');
            }
            else{
                inputChars[inputBoxIndex+i-4].classList.add('grey');
    
            }
        }
    
        if(input === randomWord){
            gameStatus = "win";
            generateResult();
        }
    
        input = "";
        if(inputBoxIndex != 29 && gameStatus != "win") movetoNext();
    }
    else{
        setMsg("Enter a valid word..");
    }

}


// ===== CREATE RESULT =====

function generateResult(){
    if(gameStatus === "win") setMsg("Yeah! You guessed it right..");
    else setMsg("Oops! The correct word is "+randomWord);
}