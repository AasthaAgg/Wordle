// ===== FOCUS ON FIRST INPUT BOX (BY DEFAULT) =====

document.querySelector('.input-1.first').focus();


// ===== ON EVERY INPUT, MOVE TO NEXT INPUT BOX =====

function movetoNext(nextFieldID) {
    document.querySelector(nextFieldID).focus();
}

