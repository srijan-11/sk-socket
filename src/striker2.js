export default class Striker1 {
  constructor(gameWidth, gameHeight, socket, num_pla) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 20;
    this.max_speed = 5;
    this.num_pla = num_pla;
    this.socket = socket;
    this.speed = { x: 0, y: 0 };
    this.position = {
      y: this.radius + 10,
      x: gameWidth / 2
    };
    this.score = 0;
    this.y_loc = [];
    this.old_position = {
      y: gameHeight - this.radius - 20,
      x: gameWidth / 2
    };
    this.add_dt = 0;
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
    ctx.fillStyle = "#0651c9";
    ctx.fill();
  }

  update(dt) {
    if (!dt) return;
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    if (this.position.x - this.radius < 0) this.position.x = this.radius;
    if (this.position.x + this.radius > this.gameWidth)
      this.position.x = this.gameWidth - this.radius;
    if (this.position.y < this.radius + 20) this.position.y = this.radius + 20;

    if (this.position.y > this.gameHeight / 3 - this.radius - 10)
      this.position.y = this.gameHeight / 3 - this.radius - 10;
    this.add_dt += dt;
    if (this.add_dt > 200) {
      this.add_dt = 0;
      if (
        Math.abs(this.old_position.x - this.position.x) > 5 ||
        Math.abs(this.old_position.y - this.position.y) > 5
      ) {
        // this.socket.emit("striker", {
        //   pos_x: this.position.x,
        //   pos_y: this.position.y,
        //   player: this.num_pla
        // });
      }
    }
  }
}
