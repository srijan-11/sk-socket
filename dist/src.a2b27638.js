// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/striker1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Striker1 = /*#__PURE__*/function () {
  function Striker1(gameWidth, gameHeight, socket, num_pla) {
    _classCallCheck(this, Striker1);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 20;
    this.max_speed = 5;
    this.num_pla = num_pla;
    this.socket = socket;
    this.speed = {
      x: 0,
      y: 0
    };
    this.position = {
      y: gameHeight - this.radius - 20,
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

  _createClass(Striker1, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speed.x = -this.max_speed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed.x = this.max_speed;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.speed.y = -this.max_speed;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.speed.y = this.max_speed;
    }
  }, {
    key: "stopx",
    value: function stopx() {
      this.speed.x = 0;
    }
  }, {
    key: "stopy",
    value: function stopy() {
      this.speed.y = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false); // ctx.rect(this.position.x, this.position.y, 5, 10);

      ctx.fillStyle = "green";
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(dt) {
      if (!dt) return;
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      if (this.position.x - this.radius < 0) this.position.x = this.radius;
      if (this.position.x + this.radius > this.gameWidth) this.position.x = this.gameWidth - this.radius;
      if (this.position.y < this.gameHeight * (3 / 4) - this.radius - 10) this.position.y = this.gameHeight * (3 / 4) - this.radius - 11;
      if (this.position.y > this.gameHeight - this.radius - 20) this.position.y = this.gameHeight - this.radius - 21;
      this.add_dt += dt;

      if (this.add_dt > 200) {
        this.add_dt = 0;

        if (Math.abs(this.old_position.x - this.position.x) > 5 || Math.abs(this.old_position.y - this.position.y) > 5) {// this.socket.emit("striker", {
          //   pos_x: this.position.x,
          //   pos_y: this.position.y,
          //   player: this.num_pla
          // });
        }
      }
    }
  }]);

  return Striker1;
}();

exports.default = Striker1;
},{}],"src/striker2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Striker1 = /*#__PURE__*/function () {
  function Striker1(gameWidth, gameHeight, socket, num_pla) {
    _classCallCheck(this, Striker1);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 20;
    this.max_speed = 5;
    this.num_pla = num_pla;
    this.socket = socket;
    this.speed = {
      x: 0,
      y: 0
    };
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

  _createClass(Striker1, [{
    key: "moveLeft",
    value: function moveLeft() {
      this.speed.x = -this.max_speed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed.x = this.max_speed;
    }
  }, {
    key: "moveUp",
    value: function moveUp() {
      this.speed.y = -this.max_speed;
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.speed.y = this.max_speed;
    }
  }, {
    key: "stopx",
    value: function stopx() {
      this.speed.x = 0;
    }
  }, {
    key: "stopy",
    value: function stopy() {
      this.speed.y = 0;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false); // ctx.rect(this.position.x, this.position.y, 5, 10);

      ctx.fillStyle = "#0651c9";
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(dt) {
      if (!dt) return;
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      if (this.position.x - this.radius < 0) this.position.x = this.radius;
      if (this.position.x + this.radius > this.gameWidth) this.position.x = this.gameWidth - this.radius;
      if (this.position.y < this.radius + 20) this.position.y = this.radius + 20;
      if (this.position.y > this.gameHeight / 3 - this.radius - 10) this.position.y = this.gameHeight / 3 - this.radius - 10;
      this.add_dt += dt;

      if (this.add_dt > 200) {
        this.add_dt = 0;

        if (Math.abs(this.old_position.x - this.position.x) > 5 || Math.abs(this.old_position.y - this.position.y) > 5) {// this.socket.emit("striker", {
          //   pos_x: this.position.x,
          //   pos_y: this.position.y,
          //   player: this.num_pla
          // });
        }
      }
    }
  }]);

  return Striker1;
}();

exports.default = Striker1;
},{}],"src/puck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Puck = /*#__PURE__*/function () {
  function Puck(gameWidth, gameHeight, socket, num_pla) {
    _classCallCheck(this, Puck);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.socket = socket;
    this.num_pla = num_pla;
    this.radius = 10;
    this.max_speed = 5;
    this.speed = {
      x: 3.5,
      y: 3.5
    };
    this.position = {
      y: gameHeight / 2,
      x: gameWidth / 2
    };
  }

  _createClass(Puck, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false); // ctx.rect(this.position.x, this.position.y, 5, 10);

      ctx.fillStyle = "red";
      ctx.fill();
    }
  }, {
    key: "dist",
    value: function dist(a, b) {
      return Math.sqrt(Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2));
    }
  }, {
    key: "atan",
    value: function atan(a, b) {
      return Math.atan((a.position.y - b.position.y) / (a.position.x - b.position.x));
    }
  }, {
    key: "update",
    value: function update(dt, striker1, striker2) {
      if (!dt) return;
      this.position.x += this.speed.x; // change postion according to speed

      this.position.y += this.speed.y;

      if (this.dist(striker1, this) <= striker1.radius + this.radius + 5) {
        // collision whth player1
        this.max_speed = (Math.abs(striker1.position.y - striker1.y_loc[0]) / 50 + 1) * 5; // changing max speed according to the speed of striker

        var ang = this.atan(striker1, this); // detecting andle of collision

        if (this.position.x <= striker1.position.x) {
          // givinf new direction and magnitude of speed
          this.speed.x = -Math.cos(ang) * this.max_speed;
          this.speed.y = -Math.sin(ang) * this.max_speed;
        } else {
          this.speed.x = Math.cos(ang) * this.max_speed;
          this.speed.y = Math.sin(ang) * this.max_speed;
        } // this.socket.emit("collision", {
        //   pos_x: this.position.x,
        //   pos_y: this.position.y,
        //   speed_x: this.speed.x,
        //   speed_y: this.speed.y,
        //   player: this.num_pla
        // });

      }

      if (this.dist(striker2, this) <= striker2.radius + this.radius + 5) {
        // colision whth player2
        var _ang = this.atan(striker2, this);

        this.max_speed = (Math.abs(striker2.position.y - striker2.y_loc[0]) / 50 + 1) * 5;
        console.log("max speed", this.max_speed);

        if (this.position.x <= striker2.position.x) {
          this.speed.x = -Math.cos(_ang) * this.max_speed;
          this.speed.y = -Math.sin(_ang) * this.max_speed;
        } else {
          this.speed.x = Math.cos(_ang) * this.max_speed;
          this.speed.y = Math.sin(_ang) * this.max_speed;
        } // this.socket.emit("collision", {
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

      if ( // goal condition for 2
      this.position.y > this.gameHeight - this.radius - 10 && this.position.x > this.gameWidth / 2 - 100 && this.position.x < this.gameWidth / 2 + 100) {
        striker2.score += 1; // incrementing score

        this.position = {
          // setting new position of the puck
          y: this.gameHeight / 2,
          x: this.gameWidth / 2
        };
        this.max_speed = 5; // setting new max_speed of the ball

        this.speed.y = -5; // setting new speed of the ball

        this.speed.x = 0; // this.socket.emit("goal", {
        //   pos_x: this.position.x,
        //   pos_y: this.position.y,
        //   speed_x: this.speed.x,
        //   speed_y: this.speed.y,
        //   player: this.num_pla,
        //   score1: striker1.score,
        //   score2: striker2.score
        // });
      }

      if ( // goal condition for 1
      this.position.y < this.radius + 10 && this.position.x > this.gameWidth / 2 - 100 && this.position.x < this.gameWidth / 2 + 100) {
        striker1.score += 1;
        this.position = {
          y: this.gameHeight / 2,
          x: this.gameWidth / 2
        };
        this.max_speed = 5;
        this.speed.y = 5;
        this.speed.x = 0; // this.socket.emit("goal", {
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
  }]);

  return Puck;
}();

exports.default = Puck;
},{}],"src/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var inputHandler = /*#__PURE__*/_createClass(function inputHandler(striker1, striker2) {
  _classCallCheck(this, inputHandler);

  document.addEventListener("keydown", function (event) {
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
  document.addEventListener("keyup", function (event) {
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
});

exports.default = inputHandler;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _striker = _interopRequireDefault(require("./striker1"));

var _striker2 = _interopRequireDefault(require("./striker2"));

var _puck = _interopRequireDefault(require("./puck"));

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Striker3 from "./comp_striker";
// import io from "socket.io";
// const url = "https://4wtyp.sse.codesandbox.io/";
// let socket = io.connect(url);
var socket = null;
var num_pla = prompt("press 1 for  player1 \n press2 for  player2", "1");
var canvas = document.getElementById("game_screen");
var ctx = canvas.getContext("2d");
var GAME_WIDTH = 401;
var GAME_HEIGHT = 600;
var striker1 = new _striker.default(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);
var striker2 = new _striker2.default(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);
var puck = new _puck.default(GAME_WIDTH, GAME_HEIGHT, socket, num_pla);
new _input.default(striker1, striker2);
var lastTime = 0;
var add_dt = 0;

function gameLoop(timestamp) {
  var dt = timestamp - lastTime; // add_dt += dt;
  // console.log("add dt", add_dt, dt);
  // if (add_dt > 100) {
  // update list for speed
  // add_dt = 0;

  if (striker1.y_loc.length > 10) striker1.y_loc.shift();
  striker1.y_loc.push(striker1.position.y);
  if (striker2.y_loc.length > 10) striker2.y_loc.shift();
  striker2.y_loc.push(striker2.position.y); // }
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
  var score = document.getElementById("score");
  score.innerHTML = "Player1 :" + striker1.score + " ||Player2 :" + striker2.score;
  requestAnimationFrame(gameLoop);
}

gameLoop();
},{"./striker1":"src/striker1.js","./striker2":"src/striker2.js","./puck":"src/puck.js","./input":"src/input.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46471" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map