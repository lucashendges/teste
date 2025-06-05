const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 50,
  y: 300,
  width: 40,
  height: 40,
  color: "brown",
  dy: 0,
  jumping: false,
  gravity: 1,
  jumpStrength: -15,
};

const ground = 350;
const keys = {};
const food = [
  { x: 300, y: 310 },
  { x: 500, y: 310 },
  { x: 700, y: 310 }
];

let score = 0;

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

function update() {
  // Movimento
  if (keys["ArrowRight"]) player.x += 5;
  if (keys["ArrowLeft"]) player.x -= 5;
  if (keys["Space"] && !player.jumping) {
    player.dy = player.jumpStrength;
    player.jumping = true;
  }

  // Gravidade
  player.y += player.dy;
  player.dy += player.gravity;

  // Chão
  if (player.y >= ground) {
    player.y = ground;
    player.dy = 0;
    player.jumping = false;
  }

  // Coletar comida
  for (let i = food.length - 1; i >= 0; i--) {
    const f = food[i];
    if (
      player.x < f.x + 20 &&
      player.x + player.width > f.x &&
      player.y < f.y + 20 &&
      player.y + player.height > f.y
    ) {
      food.splice(i, 1);
      score++;
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawFood() {
  ctx.fillStyle = "yellow";
  for (const f of food) {
    ctx.fillRect(f.x, f.y, 20, 20);
  }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Alimentos entregues: " + score, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  drawFood();
  drawScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();
