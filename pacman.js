'use strict'
var PACMAN = '<img class="pacman" src="img/pacman.png">';


var gPacman;
var deadGhosts = [];
var gFoodCounter = 0

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,

    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev, elBtn) {

    if (!gGame.isOn) return;

    var directionStr = createDirectionStr(ev, elBtn)
    // console.log(directionStr);
    var nextLocation = getNextLocation(directionStr)

    if (gGame.score === 1) gIntervalCherry = setInterval(addCherry, 15000)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === FOOD) {
        playSound()
        gFoodCounter++
        // console.log('gFoodCounter', gFoodCounter);
        updateScore(1);
        if (gFoodQuantity === gFoodCounter) gameOver()
    }
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            // console.log('GHOST', GHOST);
            killGhost(nextLocation)
            setTimeout(() => {
                renderCell(gPacman.location, FOOD)
                bringToLife()
            }, 2000);
        }

    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return

        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
        }, 5000);
    }


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

}



function createDirectionStr(ev, elBtn) {
    if (ev.type === 'keyup') {
        // console.log(ev.code);
        return ev.code
    } else {
        // console.log(elBtn.id);
        switch (elBtn.id) {
            case 'up':
                return 'ArrowUp';

            case 'down':
                return 'ArrowDown';

            case 'left':
                return 'ArrowLeft';

            case 'right':
                return 'ArrowRight';
        }
    }

}




function bringToLife() {
    for (var i = 0; i < deadGhosts.length; i++) {
        gGhosts.push(deadGhosts[i])
    }
    deadGhosts = []
    console.log('deadGhosts', deadGhosts);
    console.log('gGhosts', gGhosts);
}


function killGhost(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
            // console.log('gGhosts[i].location.i', gGhosts[i].location.i);
            // console.log('gGhosts[i].location.j', gGhosts[i].location.j);

            deadGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
        }
    }
    console.log('deadGhosts', deadGhosts);
    console.log('gGhosts', gGhosts);
}

function getNextLocation(directionStr) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (directionStr) {
        case 'ArrowUp':
            PACMAN = '<img class="pacman" src="img/FaceTop.png">';
            nextLocation.i--;
            break;
        case 'ArrowDown':
            PACMAN = '<img class="pacman" src="img/FaceDown.png">';
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            PACMAN = '<img class="pacman" src="img/FaceLeft.png">';
            nextLocation.j--;
            break;
        case 'ArrowRight':
            PACMAN = '<img class="pacman" src="img/pacman.png">';
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}



function getPacmanHTML(degrees) {
    return `<span style="tranform: rotate(${degrees})">${PACMAN}</span>`
}