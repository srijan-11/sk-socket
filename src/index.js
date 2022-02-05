import Striker1 from "./striker1";
import Striker2 from "./striker2";
// import Striker3 from "./comp_striker";
import Puck from "./puck";
import inputHandler from "./input";
// import io from "socket.io";

// const url = "https://4wtyp.sse.codesandbox.io/";
// let socket = io.connect(url);
let socket = null;

let num_pla = prompt("press 1 for  player1 \n press2 for  player2", "1");

let canvas = document.getElementById("game_screen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 401;
const GAME_HEIGHT = 600;

let striker1 = new Striker1(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);
var striker2 = new Striker2(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);
let puck = new Puck(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);

new inputHandler(striker1, striker2);

let lastTime = 0;
function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  // add_dt += dt;
  // console.log("add dt", add_dt, dt);

  // if (add_dt > 100) {
  // update list for speed
  // add_dt = 0;
  if (striker1.y_loc.length > 10) striker1.y_loc.shift();
  striker1.y_loc.push(striker1.position.y);
  if (striker2.y_loc.length > 10) striker2.y_loc.shift();
  striker2.y_loc.push(striker2.position.y);
  // }

  // socket.on("goal", function (data) {
  //   if (!clients.hasOwnProperty(data.id)) {
  //     pointers[data.id] = pointerContainer.appendChild(pointer.cloneNode());
  //   }

  //   pointers[data.id].style.left = data.x + "px";
  //   pointers[data.id].style.top = data.y + "px";

  //   if (data.drawing && clients[data.id]) {
  //     drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
  //   }

  //   clients[data.id] = data;
  //   clients[data.id].updated = now();
  // });

  ctx.clearRect(0, 0, 400, 600);
  ctx.beginPath();
  striker1.update(dt);
  striker1.draw(ctx);
  ctx.beginPath();
  striker2.update(dt, puck);
  striker2.draw(ctx);
  ctx.beginPath();
  puck.update(dt, striker1, striker2);
  puck.draw(ctx);
  ctx.beginPath();
  ctx.rect(100, 0, 200, 20);
  ctx.fillStyle = "lightgrey";
  ctx.fill();
  ctx.beginPath();
  ctx.rect(100, 600 - 20, 200, 20);
  ctx.fillStyle = "lightgrey";
  ctx.fill();

  let score = document.getElementById("score");
  score.innerHTML =
    "Player1 :" + striker1.score + " ||Player2 :" + striker2.score;
  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

gameLoop();
