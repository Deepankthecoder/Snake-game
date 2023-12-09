


let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// here we are making cell size i will provide H/W To per cell

let cellSize = 50;

// making 2d array to store starting points of snake ka react

let boardHeight = 600;
let boardWidth =1000;
let snakeCells = [[0,0]];
let direction ='right';
let gameOver = false;
//set interval

let foodCells = generateFood();

let score = 0;


let intervalId = setInterval(function(){
    update();
    draw();

}, 150);


document.addEventListener('keydown' , function(event){
    if(event.key === 'ArrowDown'){direction='down'}
    else if(event.key === 'ArrowUp'){direction='up'}
    else if(event.key === 'ArrowLeft'){direction='left'}
    else{direction = 'right'}
})


//draw snake

function draw(){
    if(gameOver === true){
        clearInterval(intervalId);  // it accepts an ID
        ctx.fillStyle = 'Red';
        ctx.font = '50px monospace';
        ctx.fillText('GAME OVER !!' , 350, 300);
        return;
    }


    ctx.clearRect(0,0, boardWidth, boardHeight)
    for(let cell of snakeCells){
        ctx.fillStyle = 'Green';
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }
    // drawing food
    ctx.fillStyle = 'Orange'
    ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

    // draw score
    
    ctx.font = '24px monospace'
    ctx.fillText(`Score: ${score}` ,25, 30)

}

//update snake

function update(){
    let headX =snakeCells[snakeCells.length -1] [0];
    let headY = snakeCells[snakeCells.length -1] [1];

    // let newHeadX = headX + cellSize;
    // let newHeadY = headY;
    let newHeadX;
    let newHeadY;

    if(direction === 'right'){
         newHeadX = headX + cellSize;
         newHeadY = headY;
         if(newHeadX === boardWidth || marGaya(newHeadX, newHeadY) ){
            gameOver = true;
         }
    }
    else if(direction === 'left'){
         newHeadX = headX - cellSize;
         newHeadY = headY;
         if(newHeadX < 0 || marGaya(newHeadX, newHeadY) ){gameOver = true};
    }
    else if(direction === 'up'){
         newHeadX = headX;
         newHeadY = headY - cellSize;
         if(newHeadY < 0 || marGaya(newHeadX, newHeadY) ){gameOver = true};
    }
    else{
         newHeadX = headX;
         newHeadY = headY + cellSize;
         if(newHeadY === boardHeight || marGaya(newHeadX, newHeadY) ){
            gameOver = true;
         }
    }

    snakeCells.push([newHeadX, newHeadY]);
    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = generateFood();
        score +=1;
    }
    else{
        snakeCells.shift();
 
    }
    

}

// we have to add both the functions in the setinterver 
// first we will add update then add the draw vala function....

function generateFood(){
    return [
        Math.round((Math.random()*(boardWidth - cellSize)) / cellSize) *  cellSize,
        Math.round((Math.random()*(boardHeight - cellSize)) / cellSize) *  cellSize,


     ]
}

function marGaya(newHeadX, newHeadY){
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY ){
            return true;
        }
    }
    return false;
}


