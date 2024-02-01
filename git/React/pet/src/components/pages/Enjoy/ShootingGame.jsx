import React, { useEffect } from 'react';

const ShootingGame=()=>{
    //캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=500;

document.body.appendChild(canvas);

let backgraoundImage,dogImage,poopImage,boneImage,gameOverImage;
let gameOver=false //true이면 게임이 끝, false이면 게임이 안끝남
let score=0;

//강아지 좌표
let dogX = canvas.width/2-32;
let dogY = canvas.height-64;

let boneList= [] //뼈들을 저장하는 리스트
function Bone(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x = dogX+24;
        this.y = dogY;
        this.alive=true //true이면 살아있는 뼈 false면 죽은 뼈
        boneList.push(this)
    }
    this.update = function(){
        this.y-=7
    }
    this.checkHit = function() {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.alive && this.y <= enemyList[i].y + 64 && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 64) {
                // 뼈가 poop에게 맞았을 때
                score++;
                this.alive = false; // 뼈 제거
                enemyList.splice(i, 1); // poop 제거
            }
        }
    
        if (this.y < 0) {
            this.alive = false; // 뼈가 화면 밖으로 나갔을 때
        }
    }
    

}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList=[]

function Enemy(){
    this.x=0;
    this.y=0;
    this.init = function(){
        this.y=0;
        this.x=generateRandomValue(0,canvas.width-64)
        enemyList.push(this)
    }
    this.update=function(){
        this.y+=3.5;

        if(this.y >= canvas.height-64){
            gameOver=true;
            console.log("gameover")
        }
    }
}

function loadImage(){
    backgraoundImage = new Image();
    backgraoundImage.src="../../gameimg/background.png";

    dogImage = new Image();
    dogImage.src="../../gameimg/dog.png";

    poopImage = new Image();
    poopImage.src="../../gameimg/poop.png";

    boneImage = new Image();
    boneImage.src="../../gameimg/bone.png";

    gameOverImage = new Image();
    gameOverImage.src="../../gameimg/gameover.png";
}

let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode]=true
        //console.log("키다운 객체에 들어간 값은?", keysDown)
    })
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]

        if(event.keyCode == 32){
            createBone() //뼈 생성
        }
        //console.log("버튼클릭후:",keysDown)
    })
}

function createBone(){
   console.log("뼈 생성") 
   let b = new Bone();
   b.init();
   console.log("새로운 뼈 리스트:",boneList) 
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy()
        e.init()
    },1000)
}
function update(){
    if(39 in keysDown){// right
        dogX +=3.5; //개의 속도
    } 
    if(37 in keysDown){// left
        dogX -=3.5; //개의 속도
    } 

    //범위 설정(캔버스 안에서만 움직이기)
    if(dogX<=0){
        dogX=0
    }
    if(dogX>=canvas.width-64){
        dogX=canvas.width-64;
    }

    //뼈의 y좌표 업데이트하는 함수 호출
    for(let i=0; i<boneList.length; i++){
        if(boneList[i].alive){
            boneList[i].update()
            boneList[i].checkHit()
        }
       
    }

    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(backgraoundImage,0,0,canvas.width, canvas.height);
    ctx.drawImage(dogImage,dogX,dogY,32,32);
    ctx.fillText(`Score: ${score}`, 20, 20);
    ctx.fillStyle="white"
    ctx.font="20px Arial"
    for(let i=0; i<boneList.length; i++){
        if(boneList[i].alive){
            ctx.drawImage(boneImage, boneList[i].x, boneList[i].y,16,16)
        }
       
    }

    for(let i=0; i<enemyList.length; i++){
        ctx.drawImage(poopImage,enemyList[i].x,enemyList[i].y,32,32);
    }
}

function main(){
    if(!gameOver){
        update(); //좌표값을 없데이트하고
        render(); //그려주고
        requestAnimationFrame(main);
    }
    else{
        ctx.drawImage(gameOverImage,50,100,300,300);
    }
  
}



useEffect(()=>{
    loadImage();
    setupKeyboardListener();
    createEnemy();
    main();

},[])
    return(
        <>

        </>
    )
}
export default ShootingGame;