var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
canvas.width=512;
canvas.height=480;
document.body.appendChild(canvas);

//Background image
var bgReady=false;
var bgImage=new Image();
bgImage.onload=function(){
    bgReady=true;
};
bgImage.src="images/background.png";

//Hero image
var heroReady=false;
var heroImage=new Image();
heroImage.onload=function(){
    heroReady=true;
};
heroImage.src="images/hero.png";

//Monsteer image
var monsterReady=false;
var monsterImage=new Image();
monsterImage.onload=function(){
    monsterReady=true;
};
monsterImage.src="images/monster.png";

//游戏对象
var hero={
    speed:256//movement in pixels per second
};
var monster={};
var monstersCaught=0;//存储怪物被捉住的次数

//处理用户的输入
var keysDown={};

addEventListener("keydown",function(e){
    keysDown[e.keyCode]=true;

},false);

addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
},false);

//reset函数开启新一轮游戏Reset the game when the player catches a monster
var reset=function(){
    hero.x=canvas.width/2;
    hero.y=canvas.height/2;

//Throw the monster somewhere on the screen randomly
   monster.x=32+(Math.random()*(canvas.width-64));
   monster.y=32+(Math.random()*(canvas.height-64));
};


//更新游戏的对象
//modifier是基于1开始并随时间变化的一个因子
var update=function(modifier){
    if(38 in keysDown){
        //Player holding up
        hero.y-=hero.speed*modifier;
    }
    if(40 in keysDown){
        //Player holding down
        hero.y+=hero.speed*modifier;
    }
    if(37 in keysDown){
        //Player holding left
        hero.x-=hero.speed*modifier;
    }
    if(39 in keysDown){
        //Player holding right
        hero.x+=hero.speed*modifier;
    }

    //are they touching?
    if(
        hero.x<=(monster.x+32)
        &&monster.x<=(hero.x+32)
        &&hero.y<=(monster.y+32)
        &&monster.y<=(hero.y+32)
    ){
        ++monstersCaught;
        reset();

    }
};

//渲染物体Draw everything
var render=function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(heroReady){
        ctx.drawImage(heroImage,hero.x,hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage,monster.x,monster.y);
    }

    //score
    ctx.fillStyle="rgb(250,250,250)";
    ctx.font="24px Helvetica";
    ctx.textAlign="left";
    ctx.textBaseline="top";
    ctx.fillText("Goblins caught:"+monstersCaught,32,32);
};

//主循环函数
var main=function(){
    var now=Date.now();

    var delta=now-then;
    //console.log(delta);
    update(delta/1000);
    render();

    then=now;

    //Request to do this again ASAP
    requestAnimationFrame(main);
};

var w=window;
requestAnimationFrame=w.requestAnimationFrame||w.webkitCancelAnimationFrame||w.msRequestAnimationFrame||w.mozRequestAnimationFrame;


//启动游戏
var then=Date.now();
reset();
main();

