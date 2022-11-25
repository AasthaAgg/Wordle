const help = document.querySelector(".help");
const level = document.querySelector(".level");
const result = document.querySelector(".result");
const main = document.querySelector(".main");
const inputChars = document.querySelectorAll('.input-char');
const keyboardButtons = document.querySelectorAll('.keyboard-button');
const scoreRules = document.querySelector(".scoreRules");
let input="";
let inputBoxIndex = 0;
let randomWord="";
let gameStatus = "start";
let score = 0;
let countCorrect = 0;
let totalCorrect = 0;
let countPartialCorrect = 0;
let totalPartialCorrect = 0;
let highestScore = 0;
let difficultyLevel = custom;

startGame();
generateRandomWord();

// ===== START GAME =====

function startGame(){
    inputChars[inputBoxIndex].focus();
}

// ===== OPEN MENU =====

function openMenu(){
    document.querySelector("nav").style.width = "250px";
    document.querySelector(".openMenu").style.display = "none";
    document.querySelector(".closeMenu").style.display = "inline";
    main.style.filter = "blur(3px)";

    document.addEventListener("click", clickOutsideMenu);
}

// ===== CLICK OUTSIDE MENU TO CLOSE MENU =====

function clickOutsideMenu(event){
    if(!event.target.closest(".navMenu") && !event.target.closest(".openMenu")){
        closeMenu();
    }
}

// ===== CLOSE MENU =====

function closeMenu(){
    document.removeEventListener("click", clickOutsideMenu);

    document.querySelector("nav").style.width = "0";
    document.querySelector(".openMenu").style.display = "inline";
    document.querySelector(".closeMenu").style.display = "none";
    main.style.filter = "blur(0px)";
}

// ===== FUNCTION TO GENERATE RANDOM WORD =====

function generateRandomWord(level = difficultyLevel){
    randomWord = level[Math.floor(Math.random() * level.length)];
    difficultyLevel = level;
}

// ===== SHOW BLOCK =====

function show(block){
    block.classList.add('active');
    block.style.display = "block";
    main.style.filter = "blur(3px)";
    
    document.addEventListener("click", clickAnywhere);
}


// ===== CLICK ANYWHERE TO CLOSE OPENED POP-UP BOX ====

function clickAnywhere(event){
    if(((event.target.closest(".main")) && !(event.target.closest(".giveUp")) && !(event.target.closest(".pop-up.active")))) closeIt();
    else if(event.target.closest(".menuBtn")){
        closeIt();
        main.style.filter = "blur(3px)";
    }
}


// ===== CLOSE BLOCK =====

function closeIt(){
    document.removeEventListener("click", clickAnywhere);

    const block = document.querySelector(".pop-up.active");
    
    block.classList.remove('active');
    block.style.display = "none";
    main.style.filter = "blur(0)";

    if(block.classList.contains('result')){
        resetGame();
        generateRandomWord();
    }

    startGame();
}


function showLevels(){

    if(document.querySelector('.showLevels').style.display === "block"){
        document.querySelector('.showLevels').style.display = "none";
        document.querySelector('.fa-caret-down').style.transform = "rotate(360deg)";
    }else{
        document.querySelector('.showLevels').style.display = "block";
        document.querySelector('.fa-caret-down').style.transform = "rotate(180deg)";
    }
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
        for(let i=0; i<5; i++){
            if(input.charAt(i) === randomWord.charAt(i)){
                inputChars[inputBoxIndex+i-4].classList.add('green');
                countCorrect += 1;
            }
            else if(randomWord.includes(input.charAt(i))){
                inputChars[inputBoxIndex+i-4].classList.add('yellow');
                countPartialCorrect += 1;
            }
            else{
                inputChars[inputBoxIndex+i-4].classList.add('grey');
                score -= 3;
            }
        }

        if(countCorrect > totalCorrect){
            score += (countCorrect - totalCorrect)*10;
            totalCorrect = countCorrect;
            countCorrect = 0;
        }

        if(countPartialCorrect > totalPartialCorrect){
            score += (countPartialCorrect - totalPartialCorrect)*5;
            totalPartialCorrect = countPartialCorrect;
            countPartialCorrect = 0;
        }

        setScore();
    
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

// ===== SET SCORE =====

function setScore(){
    document.querySelector(".score").innerHTML = score;
}

// ===== CREATE RESULT =====

function generateResult(){
    if(gameStatus === "win"){
        if(highestScore < score){
            highestScore = score;
            document.querySelector(".resultMsg").innerHTML = "Congratulations!! You score the highest..";
            document.querySelector(".resultImg").src = "images/highestScore.png";
        }
        else{
            document.querySelector(".resultMsg").innerHTML = "Yeah! You guessed it right..";
            document.querySelector(".resultImg").src = "images/win.png";
        }
    }
    else{
        document.querySelector(".resultMsg").innerHTML = "Oops! The correct word is "+randomWord;
        document.querySelector(".resultImg").src = "images/lose.png";
    }

    document.querySelector(".resultScore").innerHTML = "Score : "+score;
    document.querySelector(".highestScore").innerHTML = "Highest Score : "+highestScore;

    show(result);
}


// ==== GIVE UP =====

function giveUp(){
    gameStatus = "giveUp";
    score -= 20;
    generateResult();
}

// ===== RESET GAME =====

function resetGame(){
    // RESET INPUT FIELD

    inputChars[inputBoxIndex].disabled = true;

    inputChars.forEach(inputChar => {
        inputChar.value = "";
        inputChar.classList = "input-char";
    });

    inputChars[0].classList.add("active");
    inputChars[0].disabled = false;

    
    // RESET VARIABLES

    input="";
    inputBoxIndex = 0;
    randomWord="";
    gameStatus = "start";
    score = 0;
    countCorrect = 0;
    totalCorrect = 0;

    setMsg("Start guessing!");
    setScore();
    startGame();
}