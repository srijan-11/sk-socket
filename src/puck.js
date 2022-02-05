export default class Puck {
  constructor(gameWidth, gameHeight, socket, num_pla) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.socket = socket;
    this.num_pla = num_pla;
    this.radius = 10;
    this.max_speed = 5;
    this.speed = { x: 3.5, y: 3.5 };
    this.position = {
      y: gameHeight / 2,
      x: gameWidth / 2
    };
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
    ctx.fillStyle = "red";
    ctx.fill();
  }

  dist(a, b) {
    return Math.sqrt(
      Math.pow(a.position.x - b.position.x, 2) +
        Math.pow(a.position.y - b.position.y, 2)
    );
  }

  atan(a, b) {
    return Math.atan(
      (a.position.y - b.position.y) / (a.position.x - b.position.x)
    );
  }

  update(dt, striker1, striker2) {
    if (!dt) return;

    this.position.x += this.speed.x; // change postion according to speed
    this.position.y += this.speed.y;

    if (this.dist(striker1, this) <= striker1.radius + this.radius + 5) {
      // collision whth player1
      this.max_speed =
        (Math.abs(striker1.position.y - striker1.y_loc[0]) / 50 + 1) * 5; // changing max speed according to the speed of striker
      let ang = this.atan(striker1, this); // detecting andle of collision
      if (this.position.x <= striker1.position.x) {
        // givinf new direction and magnitude of speed
        this.speed.x = -Math.cos(ang) * this.max_speed;
        this.speed.y = -Math.sin(ang) * this.max_speed;
      } else {
        this.speed.x = Math.cos(ang) * this.max_speed;
        this.speed.y = Math.sin(ang) * this.max_speed;
      }
      // this.socket.emit("collision", {
      //   pos_x: this.position.x,
      //   pos_y: this.position.y,
      //   speed_x: this.speed.x,
      //   speed_y: this.speed.y,
      //   player: this.num_pla
      // });
    }
    if (this.dist(striker2, this) <= striker2.radius + this.radius + 5) {
      // colision whth player2

      let ang = this.atan(striker2, this);
      this.max_speed =
        (Math.abs(striker2.position.y - striker2.y_loc[0]) / 50 + 1) * 5;
      console.log("max speed", this.max_speed);
      if (this.position.x <= striker2.position.x) {
        this.speed.x = -Math.cos(ang) * this.max_speed;
        this.speed.y = -Math.sin(ang) * this.max_speed;
      } else {
        this.speed.x = Math.cos(ang) * this.max_speed;
        this.speed.y = Math.sin(ang) * this.max_speed;
      }

      // this.socket.emit("collision", {
      //   pos_x: this.position.x,
      //   pos_y: this.position.y,
      //   speed_x: this.speed.x,
      //   speed_y: this.speed.y,
      //   player: this.num_pla
      // });
    }
    if (this.position.x - this.radius < 0) {
      // left wall
      this.speed.x = -this.speed.x;
      this.position.x = this.radius;
    }

    if (this.position.x + this.radius > this.gameWidth) {
      // right wall
      this.speed.x = -this.speed.x;
      this.position.x = this.gameWidth - this.radius;
    }
    if (this.position.y < this.radius + 5) {
      // top wall
      this.position.y = this.radius + 5;
      this.speed.y = -this.speed.y;
    }
    if (this.position.y > this.gameHeight - this.radius) {
      // bottom wall
      this.position.y = this.gameHeight - this.radius;
      this.speed.y = -this.speed.y;
    }

    if (
      // goal condition for 2
      this.position.y > this.gameHeight - this.radius - 10 &&
      this.position.x > this.gameWidth / 2 - 100 &&
      this.position.x < this.gameWidth / 2 + 100
    ) {
      striker2.score += 1; // incrementing score
      this.position = {
        // setting new position of the puck
        y: this.gameHeight / 2,
        x: this.gameWidth / 2
      };
      this.max_speed = 5; // setting new max_speed of the ball
      this.speed.y = -5; // setting new speed of the ball
      this.speed.x = 0;

      // this.socket.emit("goal", {
      //   pos_x: this.position.x,
      //   pos_y: this.position.y,
      //   speed_x: this.speed.x,
      //   speed_y: this.speed.y,
      //   player: this.num_pla,
      //   score1: striker1.score,
      //   score2: striker2.score
      // });
    }

    if (
      // goal condition for 1
      this.position.y < this.radius + 10 &&
      this.position.x > this.gameWidth / 2 - 100 &&
      this.position.x < this.gameWidth / 2 + 100
    ) {
      striker1.score += 1;

      this.position = {
        y: this.gameHeight / 2,
        x: this.gameWidth / 2
      };
      this.max_speed = 5;
      this.speed.y = 5;
      this.speed.x = 0;

      // this.socket.emit("goal", {
      //   pos_x: this.position.x,
      //   pos_y: this.position.y,
      //   speed_x: this.speed.x,
      //   speed_y: this.speed.y,
      //   player: this.num_pla,
      //   score1: striker1.score,
      //   score2: striker2.score
      // });
    }
  }
}
