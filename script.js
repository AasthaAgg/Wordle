var help = document.querySelector(".help");
var main = document.querySelector(".main");
var inputChars = document.querySelectorAll('.input-char');
var keyboardButtons = document.querySelectorAll('.keyboard-button');
var input="";
var inputBoxIndex = 0;
var randomWord="";
var gameStatus = "start";

startGame();

// ===== START GAME =====

function startGame(){
    inputChars[inputBoxIndex].focus();
    generateRandomWord();
}

// ===== OPEN MENU =====

function openMenu(){
    document.querySelector("nav").style.width = "350px";
    document.querySelector(".openMenu").style.display = "none";
    document.querySelector(".closeMenu").style.display = "inline";
}

function closeMenu(){
    document.querySelector("nav").style.width = "0";
    document.querySelector(".openMenu").style.display = "inline";
    document.querySelector(".closeMenu").style.display = "none";
}

// ===== FUNCTION TO GENERATE RANDOM WORD =====

function generateRandomWord(level = custom){
    randomWord = level[Math.floor(Math.random() * level.length)];
}

// ===== HELP =====

function showHelp(){
    help.style.display = "block";
    main.style.filter = "blur(5px)";
}

function closeHelp(){
    help.style.display = "none";
    main.style.filter = "blur(0)";
}


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
                if(gameStatus != "incorrectInput"){
                    disableInput();
                    generateResult();
                }
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
                if(gameStatus != "incorrectInput"){
                    disableInput();
                    generateResult();
                }
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
            inputChars[inputBoxIndex].disabled = true;
            generateResult();
        }else{
            if(inputBoxIndex == 29) gameStatus = "over";
        }
    
        input = "";
        if(inputBoxIndex != 29 && gameStatus != "win") movetoNext();
    }
    else{
        setMsg("Enter a valid word..");
        gameStatus = "incorrectInput";
    }

}


// ===== CREATE RESULT =====

function generateResult(){
    if(gameStatus === "win") setMsg("Yeah! You guessed it right..");
    else setMsg("Oops! The correct word is "+randomWord);
}