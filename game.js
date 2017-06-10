function Game(options) {
  this.player = options.player;
  this.map = options.map;
  this.enemy = options.enemy;
  this.stepMap = 0;

  this.assignControlsToKeys = function(){
      $('body').on('keydown', function(e) {

      switch (e.keyCode) {
        case 87: // arrow up
            if(this.player.position.col === this.enemy.position.col && this.player.position.row === this.enemy.position.row-0) {

                //console.log(this.player.position, this.enemy.position);
              } else {
                this.player.moveUp();

              }

          break;
        case 83: // arrow down

          if(this.player.position.col === this.enemy.position.col && this.player.position.row === this.enemy.position.row +1) {

            //console.log(this.player.position, this.enemy.position);

          } else {
            this.player.moveDown();
          }
          break;
        case 65: // arrow left

          if(this.player.position.col === this.enemy.position.col + 1 && this.player.position.row === this.enemy.position.row) {

            //console.log(this.player.position, this.enemy.position);

          } else {
            this.player.moveBack();
          }
          break;
        case 68: // arrow right

          if(this.player.position.col === this.enemy.position.col - 1 && this.player.position.row === this.enemy.position.row) {



            //console.log(this.player.position, this.enemy.position);


          } else {
            this.player.moveForward();
          }
          break;
        case 80: //p

          this.player.attackPlayer();
          if(this.player.position.col === this.enemy.position.col + 1 && this.player.position.row === this.enemy.position.row || this.player.position.col === this.enemy.position.col - 1 && this.player.position.row === this.enemy.position.row) {
              this.playerAttackToEnemy();
              this.enemy.punchToPlayer();
            }
          break;
        case 79: //o

          break;
        case 73: //i
          break;
      }
    }.bind(this));
  };

  this.moveMap = function () {


    if (this.player.position.col >= 37) {
      this.player.timeAttack = false;
      var returnMove = 25;
      if (this.stepMap === 0 ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-500px -330px" });
      }
      if (this.stepMap === 1 ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-1000px -330px" });
      }
      if (this.stepMap === 2 ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-1500px -330px" });
      }
      if (this.stepMap === 3 ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-2000px -330px" });
      }
      if (this.stepMap === 4  ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-2500px -330px" });
      }

      if (this.stepMap === 5 ) {
        $(".player").animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-3000px -330px" });
         clearInterval(moveMapInterval);
      }

      this.player.actualPosition("left", returnMove);
      this.stepMap += 1;
      setTimeout(function() {this.player.timeAttack = true;}.bind(this), 950);

    }

  };
  var self = this;
  var moveMapInterval = setInterval(function(){
  self.moveMap();

  }, 100);


  this.gameOver = function() {


      console.log("Game Over");


  };
  /*this.notSamePosition = function(actionFunction) {
    if(this.player.position.col != this.enemy.position.col && this.player.position.row != this.enemy.position.row) {
      return actionFunction;
    }
  };*/
  this.playerAttackToEnemy = function() {
      this.enemy.lifeBar -= 1;
      //console.log(this.enemy.lifeBar);
      if(this.enemy.lifeBar <= 0) {
        this.enemy.deadPlayer();

        this.enemy.position = {
          row: -1,
          col: -1
        };
      }
  };

  this.enemyAttackToPlayer = function() {
      this.player.lifeBar -= 1;
      this.liveBarUpdateDraw();
      var self = this;
      console.log("lives",this.player.lifes);
      console.log("liveBar",this.player.lifeBar);
      if(this.player.lifeBar <= 0 && this.player.lifes > 0) {

        this.player.deadPlayer();
        this.lifesCounterUpdate();
        setTimeout(function(){
          self.player.revivePlayer();
          $(".lifeBarPlayer span").addClass("lifeBarfull");
        }, 2000);

      }
      if(this.player.lifes === 0 ) {
        this.player.deadPlayer();

        setTimeout(function(){
          self.gameOver();
        }, 2000);

      }

  };
  this.iaEnemy = function () {
    var self = this;

      if(self.player.position.col + 1 !== self.enemy.position.col && self.player.position.col < self.enemy.position.col ) {
          self.enemy.moveForward();
          //console.log(this.player.position, this.enemy.position);
      }
      if(self.player.position.col - 1 !== self.enemy.position.col && self.player.position.col > self.enemy.position.col) {
          self.enemy.moveBack();
          //console.log(this.player.position, this.enemy.position);
      }
      if(self.player.position.row !== self.enemy.position.row && self.player.position.row > self.enemy.position.row) {
          self.enemy.moveUp();

          //console.log(this.player.position, this.enemy.position);
      }
      if(self.player.position.row !== self.enemy.position.row && self.player.position.row < self.enemy.position.row) {
          self.enemy.moveDown();
          //console.log(this.player.position, this.enemy.position);
      }
      if(self.player.position.col + 1 === self.enemy.position.col && self.player.position.row == self.enemy.position.row && this.player.lifeBar > 0 || self.player.position.col - 1 == self.enemy.position.col && self.player.position.row == self.enemy.position.row && this.player.lifeBar > 0) {

            this.enemy.attackPlayer();
            this.enemyAttackToPlayer();
            this.player.punchToPlayer();

      }



  };
  var actionIa = setInterval(function(){
  self.iaEnemy();
  }, 700);

  this.lifesCounterDraw = function () {

    $('.topScene').append($('<div>').addClass('lifesPlayer'));
    $(".lifesPlayer").html("<img src='img/headPlayer1.png'/><span></span> ");
    $(".lifesPlayer span").text(this.player.lifes);
  };
  this.lifesCounterUpdate = function (){

    if($(".lifesPlayer span").html() > 0) {

      $(".lifesPlayer span").text(this.player.lifes);

    }

  };
  this.liveBarDraw = function () {
    $('.topScene').append($('<div><span></span><span></span><span></span><span></span><span></span></div>').addClass('lifeBarPlayer'));
    $(".lifeBarPlayer span").addClass("lifeBarfull");
  };
  this.liveBarUpdateDraw = function () {
    $(".lifeBarPlayer span:nth-child(" + (this.player.lifeBar + 1) + ")").toggleClass("lifeBarfull");
  };

  this.liveBarDraw();
  this.lifesCounterDraw();
  this.assignControlsToKeys();


}
//var player1 = new Player("img/DDG_BillyLee.gif");
var newGame = new Game({
  player : new Player("img/DDG_BillyLee.gif"),
  map : new Map(),
  enemy : new Enemy("img/Abobo.png")
});
//console.log(newGame);
