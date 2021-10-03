'use strict'
const WALL = '<img class="wall" src="img/wall.png">';
const FOOD = '<img class="circle" src="img/circle.png">';
const EMPTY = ' '
const SUPER_FOOD = '&#127829;'
const CHERRY = '&#127826'

var gFoodQuantity
var gIntervalCherry
var gBoard;
var gGame = {
    score: 0,
    isOn: true
}

function init() {


    gGame.score = 0
    gGame.isOn = true


    gBoard = buildBoard()
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container')


    gFoodQuantity = 0
    gFoodQuantity = countFoodInBoard()
    gFoodCounter = 0


    closeModal()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) || (i === 1 && j === 8) || (i === 8 && j === 1) || (i === 8 && j === 8)) {
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

var isVictory = false

function gameOver() {
    console.log('Game Over');
    //gameover when gGame.score equals to the all the cells with food
    if (gFoodQuantity === gFoodCounter) {
        isVictory = true
    }
    console.log('isVictory', isVictory);
    changeModalHeader(isVictory)
    //OR gameover when ghost eat pacmen
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    gGame.isOn = false;
    openModal()
}

function openModal() {
    document.querySelector('.modal').classList.remove('hidden');

}

function closeModal() {
    document.querySelector('.modal').classList.add('hidden');

}




function countFoodInBoard() {
    var countFood = 0
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (gBoard[i][j] === FOOD) countFood++
        }
    }
    return countFood + 1
}

function changeModalHeader(isVictory) {
    var elModal = document.querySelector('.modal h2')
    elModal.innerText = (isVictory) ? 'Victory!' : 'You loose! Try again'
}

function addCherry() {
    console.log('cherry')
    var emptyCells = getEmptyCells()
    var place = getRandomInt(0, emptyCells.length)
    //model
    var location = emptyCells[place]
    gBoard[location.i][location.j] = CHERRY
    //DOM
    renderCell(location, CHERRY);
}


function getEmptyCells() {
    var cells = []
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (gBoard[i][j] === EMPTY) {
                cells.push({
                    i: i,
                    j: j
                })
            }
        }
    }
    console.log('cells', cells);
    return cells
}