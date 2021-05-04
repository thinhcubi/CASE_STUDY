



//const over = document.querySelector('.Over')
// const star = document.querySelector('.Start')
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let ah = new Image();
bird.src = "bird.png";
bg.src = "bg1 (1).jpg";
fg.src = "fg.png";
pipeNorth.src= "pipeNorth.png";
pipeSouth.src= "pipeSouth.png";
ah.src="ah (1).jpg";



let gap = 120;
function Easy(){
   gap = 110;
}
function Normal(){
    gap = 100;
}
function Hard(){
    gap = 90;
}

let constant;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;
let fly = new Audio();
let scor = new Audio();
fly.src = "sounds_fly.mp3"
scor.src = "Sounds_score.mp3"



document.addEventListener("keydown",moveUp);
function  moveUp(){
    bY -= 40;
    fly.play();

}
let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};



function draw(){
    ctx.drawImage(bg,0,0);
    for(let i=0;i < pipe.length;i++) {
           constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;

        if (pipe[i].x === 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width &&
            (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            let check = confirm("bạn có muốn chơi lại không");
            if (check === true) {
                location.reload();
                return;
            } else {
                ctx.fillText("GAME OVER", 150, 200, 100)
                return;
            }

        } if(pipe[i].x === 5){
            score++;
            scor.play();
        }
    }



        ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    ctx.fillText("CUBI " ,10,cvs.height-40);

    requestAnimationFrame(draw)

}
ctx.drawImage(ah,20,30);
function Play(){
    draw();
    document.getElementById('play').style.display ='none';
}



