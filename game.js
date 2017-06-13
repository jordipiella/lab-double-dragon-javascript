function Game(options) {
  this.player = options.player;
  this.map = options.map;
  this.enemies = options.enemies;
  this.enemy = new Enemy(this.enemies[0], this.enemies[1]);

  this.stepMap = 0;
  this.drawScene = function () {
    $('body').append('<div class="container"><div class="topScene"></div></div>');


  };
  $(".container").css({ "background-position": "0px -330px" });
//this.drawScene ();
  this.assignControlsToKeys = function(){
      $('body').on('keydown', function(e) {

      switch (e.keyCode) {
        case 87: // arrow up
            if(this.checkEnemiesExist() && this.checkLivePlayer() &&
              this.enemy.position !== null &&
              (this.player.position.col === this.enemy.position.col
                && this.player.position.row === this.enemy.position.row - 1)) {
                //console.log(this.player.position, this.enemy.position);
              } else {
                this.player.moveUp();

              }

          break;
        case 83: // arrow down

          if(this.checkEnemiesExist() && this.checkLivePlayer() &&
          this.enemy.position !== null &&
            (this.player.position.col === this.enemy.position.col
              && this.player.position.row === this.enemy.position.row + 1)) {
            //console.log(this.player.position, this.enemy.position);

          } else {
            this.player.moveDown();
          }
          break;
        case 65: // arrow left

          if(this.checkEnemiesExist() && this.checkLivePlayer() &&
          this.enemy.position !== null &&
          (this.player.position.col === this.enemy.position.col + 1
            && this.player.position.row === this.enemy.position.row)) {
            //console.log(this.player.position, this.enemy.position);

          } else {
            this.player.moveBack();
          }
          break;
        case 68: // arrow right

          if(this.checkEnemiesExist() && this.checkLivePlayer() &&
          this.enemy.position !== null &&
          (this.player.position.col === this.enemy.position.col - 1
            && this.player.position.row === this.enemy.position.row)) {
              //console.log(this.player.position, this.enemy.position);

          } else {
            this.player.moveForward();
          }
          break;
        case 80: //p


          if(this.checkEnemiesExist() && this.checkLivePlayer() &&
          this.enemy.position !== null &&
            (this.player.position.col === this.enemy.position.col + 1 || this.player.position.col === this.enemy.position.col - 1
            && this.player.position.row === this.enemy.position.row
            && this.player.timeAttack === true
            && this.enemy.timeAttack === true
            && this.player.lifeBar !== 0)) {
              this.player.attackPlayer();
              this.playerAttackToEnemy();

            } else {
              this.player.attackPlayer();
            }
          break;
        case 79: //o

          break;
        case 73: //i
          break;
      }
    }.bind(this));
  };

  this.generateEnemies = function () {

    var self = this;
    setTimeout(function () {

      self.enemy = new Enemy(self.enemies[2],self.enemies[3]) ;
      self.enemy.drawEnemy();
      actionIa = setInterval(function(){
      self.iaEnemy();
      }, 700);

    }, 3000);

  };
  this.checkEnemiesExist = function () {
    if(this.enemy !== null) {
      return true;
    }
    return false;
  };
  this.checkLivePlayer = function () {
    if(this.player.lifeBar > 0 && this.player.lifes > 0) {
      return true;
    }
    return false;
  };
  this.moveMap = function () {


    if (this.player.position.col >= 37 && this.checkEnemiesExist() === false) {
      this.player.timeAttack = false;
      var returnMove = 25;
      if (this.stepMap === 0 ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-500px -330px" });
        this.generateEnemies();
      }
      if (this.stepMap === 1 ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-1000px -330px" });
        this.generateEnemies();
      }
      if (this.stepMap === 2 ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-1500px -330px" });
        this.generateEnemies();
      }
      if (this.stepMap === 3 ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-2000px -330px" });
        this.generateEnemies();
      }
      if (this.stepMap === 4  ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-2500px -330px" });
        this.generateEnemies();
      }

      if (this.stepMap === 5 ) {
        $(this.player.name).animate({ "left": (this.player.position.col-returnMove) * 20 }, 950);
        $(".container").css({ "background-position": "-3000px -330px" });
        this.generateEnemies();
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


      //delete this.map;
      $(".gameOver").css({"height":"100vh"});
      $(".gameOver").animate({opacity: 1}, 2000);
      $(".topScene div").remove();
      clearInterval(actionIa);
      clearInterval(moveMapInterval);
      this.enemy.removePlayer();
      this.enemy = null;
      this.map = null;
      setTimeout(function() {

        $(".gameOver").animate({opacity: 0}, 2000);
        $(".gameOver").animate({height: 0}, 2000);
        $(".container").removeClass("visible");
        $(".intro").removeClass("hide");

      }, 4000);




  };

  this.playerAttackToEnemy = function() {
      this.enemy.timeAttack = false;
      this.player.timeAttack = false;
      this.enemy.lifeBar -= 1;
      this.enemy.punchToPlayer();
      //console.log(this.enemy.lifeBar);
      if(this.enemy.lifeBar === 0) {
        clearInterval(actionIa);
        this.enemy.deadPlayer();
        this.enemy.removePlayer();
        this.enemy.timeAttack = true;
        this.player.timeAttack = true;
        this.enemy = null;


      }
  };

  this.enemyAttackToPlayer = function() {
      this.enemy.timeAttack = false;
      this.player.timeAttack = false;
      this.player.lifeBar -= 1;
      this.enemy.attackPlayer();
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
          this.enemy.timeAttack = true;
          this.player.timeAttack = true;
        }, 2500);

      }
      if(this.player.lifes === 0 ) {
        this.player.deadPlayer();
        this.enemy.timeAttack = true;
        this.player.timeAttack = true;
        setTimeout(function(){
          self.gameOver();

        }, 2000);

      }

  };
  this.randomTimeAttack = function (number) {
    this.enemy.timeAttack = false;
    var randomNumber = Math.floor((Math.random() * number) + 1);
    if(randomNumber === 1) {
      this.enemy.timeAttack = true;
    }
    //console.log(randomNumber);
  };

  this.iaEnemy = function () {
    var self = this;
      if(this.checkEnemiesExist()) {
        this.randomTimeAttack(2);
      }

      if(this.checkEnemiesExist() &&
        (self.player.position.col + 1 !== self.enemy.position.col
          && self.player.position.col < self.enemy.position.col)) {
          self.enemy.moveForward();
          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
      (self.player.position.col - 1 !== self.enemy.position.col
        && self.player.position.col > self.enemy.position.col)) {
          self.enemy.moveBack();
          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
        (self.player.position.row !== self.enemy.position.row && self.player.position.row > self.enemy.position.row)) {
          self.enemy.moveUp();

          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
      (self.player.position.row !== self.enemy.position.row && self.player.position.row < self.enemy.position.row)) {
          self.enemy.moveDown();
          //console.log(this.player.position, this.enemy.position);
      }

      if(this.checkEnemiesExist() &&
      (self.player.position.col + 1 === self.enemy.position.col  || self.player.position.col - 1 == self.enemy.position.col)
      && self.player.position.row == self.enemy.position.row
      && this.player.lifeBar > 0
      && this.enemy.timeAttack === true) {

            this.enemyAttackToPlayer();
            this.player.punchToPlayer();
      }



  };


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

  this.loadGame = function () {
    this.generateEnemies();
    this.liveBarDraw();
    this.lifesCounterDraw();
    this.assignControlsToKeys();
  };
  this.loadGame();



}
//var player1 = new Player("img/DDG_BillyLee.gif");
var newGame;
//console.log(newGame);
