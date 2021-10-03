//**********************RENDER******************************** */
function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}



// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = 'cell-' + location.i + '-' + location.j;
  return cellClass;
}







//***********************RANDOM NUM/COLOR********************************** */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}




//****************************MAT****************************** */
//create empty mat
function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

//copy mat
function copyMat(mat) {
  var newMat = [];
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = [];
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j];
    }
  }
  return newMat;
}




//*********************DRAW RAND NUM FROM ARRAY**************************************** */
function drawNum() {
  return gNums.pop()
}

function shuffle(items) {
  var randIdx, keep, i;
  for (i = items.length - 1; i > 0; i--) {
    randIdx = getRandomInt(0, items.length - 1);

    keep = items[i];
    items[i] = items[randIdx];
    items[randIdx] = keep;
  }
  return items;
}




//******************PLAY SOUND*********************************** */
//play sound
function playSound() {
  var sound = new Audio("sounds/1.wav")
  sound.play()
}