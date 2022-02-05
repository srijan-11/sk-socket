export default class inputHandler {
  constructor(striker1, striker2) {
    document.addEventListener("keydown", event => {
      // alert(event.keyCode);

      switch (event.keyCode) {
        case 37:
          striker1.moveLeft();
          break;
        case 39:
          striker1.moveRight();
          break;
        case 38:
          striker1.moveUp();
          break;
        case 40:
          striker1.moveDown();
          break;
        case 65:
          striker2.moveLeft();
          break;
        case 68:
          striker2.moveRight();
          break;
        case 87:
          striker2.moveUp();
          break;
        case 83:
          striker2.moveDown();
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", event => {
      // alert(event.keyCode);

      switch (event.keyCode) {
        case 37:
          if (striker1.speed.x < 0) striker1.stopx();
          break;
        case 39:
          if (striker1.speed.x >= 0) striker1.stopx();
          break;
        case 65:
          if (striker2.speed.x < 0) striker2.stopx();
          break;
        case 68:
          if (striker2.speed.x >= 0) striker2.stopx();
          break;
        case 38:
          striker1.stopy();
          break;
        case 40:
          striker1.stopy();
          break;
        case 87:
          striker2.stopy();
          break;
        case 83:
          striker2.stopy();
          break;
        default:
          break;
      }
    });
  }
}
