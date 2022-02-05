export default class Striker3 {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 20;
    this.max_speed = 5;
    this.speed = { x: 0, y: 0 };
    this.position = {
      y: gameHeight - this.radius - 20,
      x: gameWidth / 2
    };
    this.score = 0;
    this.y_loc = [];
  }
  moveLeft() {
    this.speed.x = -this.max_speed;
  }
  moveRight() {
    this.speed.x = this.max_speed;
  }

  moveUp() {
    this.speed.y = -this.max_speed;
  }

  moveDown() {
    this.speed.y = this.max_speed;
  }

  stopx() {
    this.speed.x = 0;
  }

  stopy() {
    this.speed.y = 0;
  }

  draw(ctx) {
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    // ctx.rect(this.position.x, this.position.y, 5, 10);
    ctx.fillStyle = "green";
    ctx.fill();
  }

  update(dt, puck) {
    if (!dt) return;
    let diff = puck.position.x - this.position.x;
    if (diff == 0) this.speed.x = 0;
    else if (diff > 0 && puck.position.y < this.gameHeight / 2)
      this.speed.x = 3;
    else if (puck.position.y < this.gameHeight / 2) this.speed.x = -3;
    this.position.x += this.speed.x;
    if (this.position.y >= puck.position.y && Math.abs(diff) < 5)
      this.position.x = this.gameWidth / 2;
    this.position.y = 60;
    if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.speed.x = -this.speed.x;
    }
    if (this.position.x + this.radius > this.gameWidth) {
      this.position.x = this.gameWidth - this.radius;
      this.speed.x = -this.speed.x;
    }

    if (this.position.y > this.gameHeight - this.radius - 20)
      this.position.y = this.gameHeight - this.radius - 21;
  }
}
