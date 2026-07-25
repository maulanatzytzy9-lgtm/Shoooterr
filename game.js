const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
  x: 180,
  y: 520,
  w: 40,
  h: 40,
  speed: 5
};

let bullets = [];
let enemies = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed * 5;
  if (e.key === "ArrowRight") player.x += player.speed * 5;
  if (e.key === " ") {
    bullets.push({
      x: player.x + 18,
      y: player.y
    });
  }
});

function spawnEnemy() {
  enemies.push({
    x: Math.random() * 360,
    y: -20,
    w: 30,
    h: 30
  });
}

setInterval(spawnEnemy, 1000);

function gameLoop() {
  ctx.clearRect(0,0,400,600);

  // Player
  ctx.fillStyle="lime";
  ctx.fillRect(player.x,player.y,player.w,player.h);

  // Bullet
  ctx.fillStyle="yellow";
  bullets.forEach((b,i)=>{
    b.y-=8;
    ctx.fillRect(b.x,b.y,5,10);
    if(b.y<0) bullets.splice(i,1);
  });

  // Enemy
  ctx.fillStyle="red";
  enemies.forEach((e,ei)=>{
    e.y+=2;
    ctx.fillRect(e.x,e.y,e.w,e.h);

    bullets.forEach((b,bi)=>{
      if(
        b.x<e.x+e.w &&
        b.x+5>e.x &&
        b.y<e.y+e.h &&
        b.y+10>e.y
      ){
        enemies.splice(ei,1);
        bullets.splice(bi,1);
      }
    });
  });

  requestAnimationFrame(gameLoop);
}

gameLoop();
