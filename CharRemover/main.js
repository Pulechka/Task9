var str = prompt("Введите строку:");
alert(removeDoubleCharInWord(str));



function removeDoubleCharInWord(str) {
    return removeLetters(str, getLettersToRemove(str));


    function getLettersToRemove(str) {
        var i,
            separators,
            lettersInWord,
            lettersToRemove;

        separators = [' ', '\t', '\n', ',', '.', '?', '!', ':', ';'];
        lettersInWord = [];
        lettersToRemove = [];

        for (i = 0; i < str.length; i++) {
            if (separators.indexOf(str[i]) == -1) {
                if (lettersInWord.indexOf(str[i]) >= 0) {
                    if (lettersToRemove.indexOf(str[i]) == -1) {
                        lettersToRemove.push(str[i]);
                    }
                }
                else {
                    lettersInWord.push(str[i]);
                }
            }
            else {
                lettersInWord = [];
            }
        }
        return lettersToRemove;
    }


    function removeLetters(str, lettersToRemove) {
        var i,
            j;
  
        for (i = 0; i < str.length; i++) {
            for (j = 0; j < lettersToRemove.length; j++) {
                if (str[i] == lettersToRemove[j]) {
                    str = str.replace(str[i], '');
                    i--;
                }
            }
        }
        return str;
    }
}









