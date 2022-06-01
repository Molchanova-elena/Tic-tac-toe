"use strict";

let currentUser = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameStatus = document.querySelector('.game--status');
const cellList = document.querySelectorAll('.cell');
const button = document.querySelector('.game--restart');

const drawMessage = 'Game ended in a draw!';
const winningMessage = () => `Player ${currentUser} has won!`;
const currentPlayerTurn = () => `It's ${currentUser}'s turn`;



// функция клика по клетке
function cellСlick(event) {
    let indexCell = event.target.dataset.cellIndex; //индекс элемента, по которому был совершен клик.

    if (!!gameActive) {  // проверяем активность игры
        checkGameState(indexCell); //функция проверяет занята ли клетка, если нет записывает значение в массив
        validationResultGame(); //функция проверки результатов игры
    } else return; //выходим если игра не активна

};


//функция проверки результатов игры
function validationResultGame() {
    for (let i = 0; i <= winningLines.length - 1; i++) {

        const winCondition = winningLines[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            // выводим победное сообщение + меняем активность игры
            handlePlayerChange();
            gameStatus.textContent = winningMessage();
            gameActive = false;
            break;
        }
    }

    if (gameActive == true && !checkStandoff(gameState)) {
        gameStatus.textContent = drawMessage;
        gameActive = false;
    }
}

// функция проверки ничьей
function checkStandoff(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            return true;
        }
    }
    return false;
}


// функция записи в клетку
function writeValue(indexCell) {
    let divActive = document.querySelector('div [data-cell-index = "' + indexCell + '"]'); //находим клетку с нужным индексом
    divActive.textContent = currentUser; // записываем вклетку х или 0
    handlePlayerChange(); // меняем игрока
}

// функция очистки клеток
function clearCell() {
    cellList.forEach(function (item) {
        item.textContent = '';
    });
}

// функция проверяет занята ли клетка, если нет записывает значение в массив
function checkGameState(indexCell) {
    if (gameState[indexCell] === "") {
        gameState[indexCell] = currentUser;
        writeValue(indexCell);
    };
};

// функция смены игрока   
function handlePlayerChange() {
    currentUser = (currentUser === 'X') ? '0' : 'X';
    gameStatus.textContent = currentPlayerTurn();
};


// функция действия после нажатия кнопки Restart
// по нажатию опустошать массив и очищать клетки
function buttonClick() {

    currentUser = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = currentPlayerTurn();
    clearCell();
};




button.addEventListener('click', buttonClick); // событие клика по кнопке

cellList.forEach(function (item) { //событие клика по клетке
    item.addEventListener('click', cellСlick);

});
