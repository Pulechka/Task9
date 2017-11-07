//var leftSelectBoxes,
//    rightSelectBoxes,
//    moveRightAllButtons,
//    moveLeftAllButtons,
//    moveRightButtons,
//    moveLeftButtons;
//
//leftSelectBoxes = document.getElementsByClassName("select_box left");
//rightSelectBoxes = document.getElementsByClassName("select_box right");
//
//moveRightAllButtons = document.getElementsByClassName("move_right_all");
//moveLeftAllButtons = document.getElementsByClassName("move_left_all");
//moveRightButtons = document.getElementsByClassName("move_right");
//moveLeftButtons = document.getElementsByClassName("move_left");
//
//setEventForButtons(moveRightAllButtons, leftSelectBoxes, rightSelectBoxes, true);
//setEventForButtons(moveLeftAllButtons, rightSelectBoxes, leftSelectBoxes, true);
//setEventForButtons(moveRightButtons, leftSelectBoxes, rightSelectBoxes, false);
//setEventForButtons(moveLeftButtons, rightSelectBoxes, leftSelectBoxes, false);
//
//
//function setEventForButtons(buttons, box_source, box_destination, move_all) {
//    for (var i = 0; i < box_source.length; i++) {
//        addMoveClickHandler(buttons[i], box_source[i], box_destination[i], move_all);
//    }
//}
//
//function addMoveClickHandler(button, box_source, box_destination, move_all) {
//    button.addEventListener("click", function(e) {
//        var selectedOptions;      
//        if (move_all) {
//            selectedOptions = box_source.options;
//        }
//        else {
//            selectedOptions = box_source.selectedOptions;
//            if (selectedOptions.length == 0) {
//                alert("Не выбрано ни одного элемента!");
//                return;
//            }
//        }      
//        while (selectedOptions.length > 0) {
//            box_destination.options.add(selectedOptions[0]);
//            box_destination.options[box_destination.length-1].selected = false;
//        }
//    }, false);
//}



var selectionDivs;

selectionDivs = document.getElementsByClassName("selection");
for (var i = 0; i < selectionDivs.length; i++) {
    selectionDivs[i].addEventListener("click", onClickHandler, true);
}


function onClickHandler(e) {
    var buttonClassName = e.target.className;
    
    var leftSelectBox = e.currentTarget.getElementsByClassName("select_box left").item(0);
    var rightSelectBox = e.currentTarget.getElementsByClassName("select_box right").item(0);
    
    if (buttonClassName.includes("move_right_all")) {
        moveOptions(leftSelectBox, rightSelectBox, true);
    }
    else if (buttonClassName.includes("move_right")) {
        moveOptions(leftSelectBox, rightSelectBox, false);
    }
    else if (buttonClassName.includes("move_left_all")) {   
        moveOptions(rightSelectBox, leftSelectBox, true);
    }
    else if (buttonClassName.includes("move_left")) {
        moveOptions(rightSelectBox, leftSelectBox, false);
    }
}


function moveOptions(box_source, box_destination, move_all) {
    var selectedOptions;      
    if (move_all) {
        selectedOptions = box_source.options;
    }
    else {
        selectedOptions = box_source.selectedOptions;
        if (selectedOptions.length == 0) {
            alert("Не выбрано ни одного элемента!");
            return;
        }
    }      
    while (selectedOptions.length > 0) {
        box_destination.options.add(selectedOptions[0]);
        box_destination.options[box_destination.length-1].selected = false;
    }
}