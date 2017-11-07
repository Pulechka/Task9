const lastIndex = 3;
const timeIntervalInMs = 1000 * 5;

var timeToNextPageInMs = timeIntervalInMs,  
    countdownTimer,
    countdownDiv,
    previousPageBtn,
    pauseBtn, 
    restartBtn, 
    isPaused;

isPaused = false;

createCountDownElement();
createPreviousPageElement();
createPauseElement();
createRestartElement();

countdownTimer = setInterval(doCountdown, 1000);


function doCountdown() {
    if (!isPaused) {       
        timeToNextPageInMs -= 1000;        
        countdownDiv.innerHTML = getCountdownString(timeToNextPageInMs);
        if (timeToNextPageInMs == 0) {
            goToNextPage();
        }
    }
}


function createCountDownElement() {
    countdownDiv = document.createElement("div");
    countdownDiv.className = "countdown";
    document.body.appendChild(countdownDiv);
    countdownDiv.style.position = "absolute";
    countdownDiv.style.bottom = "0";
    countdownDiv.style.right = "0";
    countdownDiv.style.padding = "10px";
    countdownDiv.style.border = "3px solid #AAA";
    countdownDiv.style.font = "normal 16px Arial";
    countdownDiv.style.background = "#333333";
    countdownDiv.style.color = "#FFF";
    countdownDiv.innerHTML = getCountdownString(timeToNextPageInMs);
}

function createPreviousPageElement() {
    previousPageBtn = document.createElement("div");
    previousPageBtn.className = "back_button";
    document.body.appendChild(previousPageBtn);
    previousPageBtn.style.background = "url(../Images/arrow_left.ico) no-repeat top left";
    previousPageBtn.style.right = "90px";
    setStyleForButton(previousPageBtn);
    setEventHandlerForButton(previousPageBtn);
}


function createPauseElement() {
    pauseBtn = document.createElement("div");
    pauseBtn.className = "pause_button";
    document.body.appendChild(pauseBtn);
    pauseBtn.style.background = "url(../Images/pause.png) no-repeat top left";
    pauseBtn.style.right = "137px";
    setStyleForButton(pauseBtn);
    setEventHandlerForButton(pauseBtn);
}

function createRestartElement() {
    restartBtn = document.createElement("div");
    restartBtn.className = "restart_button";
    document.body.appendChild(restartBtn);
    restartBtn.style.background = "url(../Images/restart.png) no-repeat top left";
    restartBtn.style.right = "184px";
    setStyleForButton(restartBtn);
    setEventHandlerForButton(restartBtn);
}


function setStyleForButton(button) {
    button.style.width = "45px";
    button.style.height = "45px";
    button.style.backgroundSize = "43px";
    button.style.backgroundPosition = "-2px -2px";
    button.style.position = "absolute";
    button.style.bottom = "0";
    button.style.border = "3px solid #AAA";
    button.style.borderRadius = "45px 45px 45px 45px";
    button.style.boxSizing = "border-box";
}


function setEventHandlerForButton(button) {
    button.onmouseover = function (e) {
        button.style.backgroundColor = "black";
        button.style.borderColor = "black";
    };

    button.onmouseout = function (e) {
        button.style.backgroundColor = "#FFF";
        button.style.borderColor = "#AAA";
    }

    button.onmousedown = function (e) {
        button.style.backgroundColor = "#A61723";
        button.style.borderColor = "#A61723";
    }
    
    if (button.className == "back_button") {
        button.onmouseup = function (e) {
            button.style.backgroundColor = "black";
            button.style.borderColor = "black";
            goToPreviousPage();
        }
    }
    else if (button.className == "pause_button") {
        pauseBtn.onmouseup = function (e) {
            pauseBtn.style.backgroundColor = "black";
            pauseBtn.style.borderColor = "black";    
            isPaused = !isPaused;
        }
    }
    else if (button.className == "restart_button") {
        restartBtn.onmouseup = function (e) {
            restartBtn.style.backgroundColor = "black";
            restartBtn.style.borderColor = "black";    
            timeToNextPageInMs = timeIntervalInMs + 1000;
            isPaused = false;
        }
    }
}


function getCountdownString(remainTime) {
    var remainTime, 
        hours,
        minutes,
        seconds;

    remainTime = new Date(timeToNextPageInMs);
    remainTime.setHours(0); //because time offset
    
    hours = addFirstZero(remainTime.getHours().toString());
    minutes = addFirstZero(remainTime.getMinutes().toString());
    seconds = addFirstZero(remainTime.getSeconds().toString());

    return hours + ":" + minutes + ":" + seconds;

    function addFirstZero(str) {
        if (str.length == 1) {
            str = "0" + str;
        }
        return str;
    }
}

function goToNextPage() {
    var nextPage,
        currentPage;

    currentPage = getCurrentPageName();

    if (currentPage == "index") {
        nextPage = "page1.html";
    }
    else {
        currentPage = currentPage.substring(4, currentPage.length);
        if (+currentPage == lastIndex) {
            if (confirm("Повторить пролистывание?")) {
                nextPage = "index.html";
            }
            else {
                window.close();
                return;
            }
        }
        else {
            currentPage++;
            nextPage = "page" + currentPage + ".html";
        }
    }
    changePage(nextPage);
}

function goToPreviousPage() {
    var previousPage,
        currentPage;

    currentPage = getCurrentPageName();

    if (currentPage == "index") {
        window.close();
        return;
    }
    else {
        currentPage = currentPage.substring(4, currentPage.length);
        if (+currentPage == 1) {
            previousPage = "index.html";
        }
        else {
            currentPage--;
            previousPage = "page" + currentPage + ".html";
        }
    }
    changePage(previousPage);
}


function changePage(newPage) {
    if (!window.closed) {
        window.open(newPage);
        window.close();
    }
}

function getCurrentPageName() {
    var currentPage,
        currentPath;

    currentPath = window.location.pathname;
    currentPage = currentPath.split("/").pop();
    currentPage = currentPage.substring(0, currentPage.length - 5);

    return currentPage;
}