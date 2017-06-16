function Game(options) {
  this.player = options.player;
  this.player2 = options.player2;
  this.map = options.map;
  this.enemies = options.enemies;
  this.enemy = "";
  this.iaDecision = true;
  this.timeAttack = true;
  this.stepMap = 0;
  this.baseInterval = null;
  this.playerSelected = this.player;
  this.keyEvent = 'keydown';

  this.checkLivePlayer = function (playerToCheck) {
    if(playerToCheck.lifeBar > 0 && playerToCheck.lifes > 0) {
      return true;
    }
    return false;
  };
  this.checkTwoPlayers = function () {
    if(this.player2 !== null) {
      return true;
    }
    return false;
  };
  this.drawScene = function () {
    $('body').append('<div class="container"><div class="topScene"></div></div>');


  };
  $(".container").css({ "background-position": "0px -470px" });
//this.drawScene ();
  this.assignControlsToKeys = function(){
    if(this.checkTwoPlayers()){
      this.keyEvent= 'keyup';
    }
      $('body').off();
      $('body').on(this.keyEvent, function(e) {

      switch (e.keyCode) {
        case 87: // arrow up
            if(this.checkEnemiesExist()
            && this.checkLivePlayer(this.player)
            && this.enemy.position !== null
            && (this.player.position.col === this.enemy.position.col
                && this.player.position.row === this.enemy.position.row - 1)) {
                //console.log(this.player.position, this.enemy.position);
            } else {
                  if(this.timeAttack === true && this.player.timeAttackPlayer === true){
                    this.player.moveUp();
                  }

            }


          break;
        case 83: // arrow down

          if(this.checkEnemiesExist()
          && this.checkLivePlayer(this.player)
          && this.enemy.position !== null
          && (this.player.position.col === this.enemy.position.col
              && this.player.position.row === this.enemy.position.row + 1)) {
            //console.log(this.player.position, this.enemy.position);

          } else {

              if(this.timeAttack === true && this.player.timeAttackPlayer === true){
                this.player.moveDown();
              }
          }
          break;
        case 65: // arrow left

          if(this.checkEnemiesExist() && this.checkLivePlayer(this.player)
          && this.enemy.position !== null
          && (this.player.position.col === this.enemy.position.col + 1
            && this.player.position.row === this.enemy.position.row)) {
            //console.log(this.player.position, this.enemy.position);

          } else {

            if(this.timeAttack === true && this.player.timeAttackPlayer === true){
              this.player.moveBack();
            }
          }
          break;
        case 68: // arrow right

          if(this.checkEnemiesExist()
          && this.checkLivePlayer(this.player)
          && this.enemy.position !== null
          && (this.player.position.col === this.enemy.position.col - 1
            && this.player.position.row === this.enemy.position.row)) {
              //console.log(this.player.position, this.enemy.position);

          } else {

            if(this.timeAttack === true && this.player.timeAttackPlayer === true){
              this.player.moveForward();
            }
          }
          break;
        case 67: //c


          if(this.checkEnemiesExist()
          && this.checkLivePlayer(this.player)
          && this.enemy.position !== null
          && this.timeAttack === true
          && this.player.timeAttackPlayer === true
          && (this.player.position.col === this.enemy.position.col + 1 || this.player.position.col === this.enemy.position.col - 1
            && this.player.position.row === this.enemy.position.row
            && this.timeAttack === true
            && this.player.lifeBar !== 0)) {

              this.playerAttackToEnemy(this.player);

            } else {
              if( this.timeAttack === true && this.player.timeAttackPlayer === true) {
                this.player.timeAttackPlayer = false;

                this.player.attackPlayer();
                var self = this;
                setTimeout(function(){
                  self.player.timeAttackPlayer = true;

                }, 700);

              }
            }
          break;
        case 74: //j left
        if(this.checkTwoPlayers() && this.checkEnemiesExist() && this.checkLivePlayer(this.player2)
        && this.enemy.position !== null
        && (this.player2.position.col === this.enemy.position.col + 1
          && this.player2.position.row === this.enemy.position.row)) {
          //console.log(this.player.position, this.enemy.position);

        } else {

          if(this.checkTwoPlayers() && this.timeAttack === true && this.player2.timeAttackPlayer === true){
            this.player2.moveBack();
          }
        }
          break;
        case 75: //k down
        if(this.checkTwoPlayers() && this.checkEnemiesExist()
        && this.checkLivePlayer(this.player2)
        && this.enemy.position !== null
        && (this.player2.position.col === this.enemy.position.col
            && this.player2.position.row === this.enemy.position.row + 1)) {
          //console.log(this.player.position, this.enemy.position);

        } else {

            if(this.checkTwoPlayers() && this.timeAttack === true && this.player2.timeAttackPlayer === true){
              this.player2.moveDown();
            }
        }
          break;
        case 76: //l right
        if(this.checkTwoPlayers() && this.checkEnemiesExist()
        && this.checkLivePlayer(this.player2)
        && this.enemy.position !== null
        && (this.player2.position.col === this.enemy.position.col - 1
          && this.player2.position.row === this.enemy.position.row)) {
            console.log(this.player.position, this.enemy.position);

        } else {

          if(this.checkTwoPlayers() && this.timeAttack === true && this.player2.timeAttackPlayer === true){
            this.player2.moveForward();
          }
        }
          break;
        case 73: //i up
        if(this.checkTwoPlayers() && this.checkEnemiesExist()
        && this.checkLivePlayer(this.player2)
        && this.enemy.position !== null
        && (this.player2.position.col === this.enemy.position.col
            && this.player2.position.row === this.enemy.position.row - 1)) {
            //console.log(this.player.position, this.enemy.position);
        } else {
              if(this.checkTwoPlayers() && this.timeAttack === true && this.player2.timeAttackPlayer === true){
                this.player2.moveUp();
              }

        }
          break;
        case 17: //ctrl attack
        if(this.checkTwoPlayers() && this.checkEnemiesExist()
        && this.checkLivePlayer(this.player2)
        && this.enemy.position !== null
        && this.timeAttack === true
        && this.player2.timeAttackPlayer === true
        && (this.player2.position.col === this.enemy.position.col + 1 || this.player2.position.col === this.enemy.position.col - 1
          && this.player2.position.row === this.enemy.position.row
          && this.timeAttack === true
          && this.player.lifeBar !== 0)) {

            this.playerAttackToEnemy(this.player2);

          } else {
            if(this.checkTwoPlayers() && this.timeAttack === true && this.player2.timeAttackPlayer === true) {
              this.player2.timeAttackPlayer = false;

              this.player2.attackPlayer();
              self = this;
              setTimeout(function(){
                self.player2.timeAttackPlayer = true;

              }, 700);

            }
          }
          break;
      }
    }.bind(this));
  };

  this.generateEnemies = function (timeToWait) {

    var self = this;
    setTimeout(function () {

      self.enemy = new Enemy(self.enemies[0].name, self.enemies[0].sprite, self.enemies[0].position) ;
      self.enemy.drawEnemy();
      actionIa = setInterval(function(){
      self.iaEnemy();
      }, 700);

    }, timeToWait);

  };
  this.checkEnemiesExist = function () {
    if(this.enemy !== null) {
      return true;
    }
    return false;
  };

  this.moveMap = function () {
    var self = this;
    var pxCellBoard = parseFloat($(".cell.board").css("width"));
    var returnMove = parseInt(500 / pxCellBoard);

    var animationPlayer = { "left": (self.player.position.col - returnMove) * pxCellBoard };
    var animationPlayer2;
    if(this.checkTwoPlayers()) {
      animationPlayer2 = { "left": (self.player2.position.col - returnMove) * pxCellBoard };
    }


    if (this.checkEnemiesExist() === false && this.checkTwoPlayers() === false && this.player.position.col >= 37 ||
      this.checkEnemiesExist() === false && this.checkTwoPlayers() && this.player.position.col >= 37 && this.player2.position.col >= 37
      || this.checkEnemiesExist() === false && this.checkTwoPlayers() && this.checkLivePlayer(this.player2) === false && this.player.position.col >= 37
      || this.checkEnemiesExist() === false && this.checkTwoPlayers() && this.checkLivePlayer(this.player) === false && this.player2.position.col >= 37) {
      this.player.timeAttackPlayer = false;
      if(this.checkTwoPlayers()) {
        this.player2.timeAttackPlayer = false;
      }


      if (this.stepMap === 0 ) {

          $(self.player.name).animate(animationPlayer, 950);
          if(this.checkTwoPlayers()) {
            $(self.player2.name).animate(animationPlayer2, 950);
          }

          $(".container").css({ "background-position": "-500px -470px" });
          self.generateEnemies(3000);


      }
      if (this.stepMap === 1 ) {
        $(self.player.name).animate(animationPlayer, 950);
        if(this.checkTwoPlayers()) {
          $(self.player2.name).animate(animationPlayer2, 950);
        }
        $(".container").css({ "background-position": "-1000px -470px" });
        this.generateEnemies(3000);
      }
      if (this.stepMap === 2 ) {
        $(self.player.name).animate(animationPlayer, 950);
        if(this.checkTwoPlayers()) {
          $(self.player2.name).animate(animationPlayer2, 950);
        }
        $(".container").css({ "background-position": "-1500px -470px" });
        this.generateEnemies(3000);
      }
      if (this.stepMap === 3 ) {
        $(self.player.name).animate(animationPlayer, 950);
        if(this.checkTwoPlayers()) {
          $(self.player2.name).animate(animationPlayer2, 950);
        }
        $(".container").css({ "background-position": "-2000px -470px" });
        this.generateEnemies();
      }
      if (this.stepMap === 4  ) {
        $(self.player.name).animate(animationPlayer, 950);
        if(this.checkTwoPlayers()) {
          $(self.player2.name).animate(animationPlayer2, 950);
        }
        $(".container").css({ "background-position": "-2500px -470px" });
        this.generateEnemies(3000);
        clearInterval(this.baseInterval);
      }

      /*if (this.stepMap === 5 ) {
        $(self.player.name).animate(animationPlayer, 950);
        if(this.checkTwoPlayers()) {
          $(self.player2.name).animate(animationPlayer2, 950);
        }
        $(".container").css({ "background-position": "-3000px -330px" });
        this.generateEnemies();
         clearInterval(moveMapInterval);
      }*/

      this.player.actualPosition("left", returnMove);
      if(this.checkTwoPlayers()) {
        this.player2.actualPosition("left", returnMove);
      }
      this.stepMap += 1;
      setTimeout(function() {
        this.player.timeAttackPlayer = true;

      }.bind(this), 950);
      if(this.checkTwoPlayers()) {
        setTimeout(function() {

          this.player2.timeAttackPlayer = true;
        }.bind(this), 950);
      }

    }

  };

  this.gameIntervals = function () {
    var self = this;
    this.baseInterval = setInterval(function(){
    self.moveMap();
    if(self.checkEnemiesExist() && self.checkLivePlayer(self.player) || self.checkEnemiesExist() && self.checkTwoPlayers() && self.checkLivePlayer(self.player2) ) {
      self.perspectivePlayer();
    }

    }, 100);
    this.removePlayer = function (nameEnemyOrPlayer) {
      $(nameEnemyOrPlayer).remove();

    };

  };


  this.gameOver = function() {


      //delete this.map;
      $(".gameOver").css({"height":"100vh"});
      $(".gameOver").animate({opacity: 1}, 2000);
      $(".topScene div").remove();
      $(".cell.board").remove();
      clearInterval(actionIa);
      clearInterval(this.baseInterval);
      this.removePlayer(this.enemy.name);
      this.removePlayer(this.player.name);
      this.removePlayer(this.player2.name);
      this.enemy = null;
      this.map = null;
      this.player = null;
      this.player2 = null;
      setTimeout(function() {

        $(".gameOver").animate({opacity: 0}, 2000);
        $(".gameOver").animate({height: 0}, 2000);
        $(".container").removeClass("visible");
        $(".intro").removeClass("hide");
        this.newGame = null;
      }, 4000);




  };

  this.playerAttackToEnemy = function(playerToAttack) {
      var self = this;

      playerToAttack.timeAttackPlayer = false;
      this.enemy.lifeBar -= 1;
      playerToAttack.attackPlayer();
      this.enemy.punchToPlayer();

      setTimeout(function(){
        playerToAttack.timeAttackPlayer = true;

      }, 700);

      if(this.enemy.lifeBar === 0) {
        setTimeout(function(){
          playerToAttack.timeAttackPlayer = false;

        }, 700);

        clearInterval(actionIa);
        this.enemy.deadPlayer();
        setTimeout(function(){
            self.removePlayer(self.enemy.name);
            self.enemy = null;
            playerToAttack.timeAttackPlayer = true;

        }, 2700);


      }


  };

  this.enemyAttackToPlayer = function(playerKicked) {


      playerKicked.timeAttackPlayer = false;
      playerKicked.lifeBar -= 1;
      $(this.enemy.name).css({"z-index":"99"});
      this.enemy.attackPlayer();
      playerKicked.punchToPlayer();
      this.liveBarUpdateDraw(playerKicked);

      var self = this;



      setTimeout(function(){
        $(self.enemy.name).css({"z-index":"9"});
        playerKicked.timeAttackPlayer = true;

      }, 1000);

      console.log(playerKicked.lifes);
      if(playerKicked.lifes >= 1 && playerKicked.lifeBar === 0) {
        setTimeout(function(){
          playerKicked.timeAttackPlayer = false;
        }, 1001);

          playerKicked.deadPlayer();
          this.lifesCounterUpdate(playerKicked);

          playerKicked.revivePlayer();

          if(playerKicked === this.player){
              setTimeout(function(){
                  $(".lifeBarPlayer span").addClass("lifeBarfull");
              }, 5500);
          }
          if(playerKicked === this.player2){
              setTimeout(function(){
                  $(".lifeBarPlayer2 span").addClass("lifeBarfullred");
              }, 5500);
          }
        setTimeout(function(){
          playerKicked.timeAttackPlayer = true;
        }, 7500);




      }
      if(this.checkTwoPlayers() && this.player.lifes <= 0) {
        this.player.deadPlayer();
        this.player.position = {
          row: -100,
          col : -100
        };
      }
      if(this.checkTwoPlayers() && this.player2.lifes <= 0) {
        this.player2.deadPlayer();
      }

      if(this.checkTwoPlayers() === false && this.player.lifes <= 0  || this.checkTwoPlayers() && this.player.lifes <= 0 && this.player2.lifes <= 0 ) {

        this.player.deadPlayer();
        if(this.checkTwoPlayers()){
          this.player2.deadPlayer();
        }

        setTimeout(function(){
          self.gameOver();
        }, 2000);

      }






  };
  this.randomTimeAttack = function (number) {
    this.iaDecision = false;
    var randomNumber = Math.floor((Math.random() * number) + 1);
    if(randomNumber === 1) {
      this.iaDecision = true;
    }
    //console.log(randomNumber);
  };

  this.iaEnemy = function () {

      if(this.checkEnemiesExist()) {
        this.randomTimeAttack(2);
      }

      //select player
      if(this.checkTwoPlayers() && this.enemy.position.col - this.player.position.col > this.enemy.position.col - this.player2.position.col) {
        this.playerSelected = this.player2;
      }
      if(this.checkTwoPlayers() && this.enemy.position.col - this.player.position.col < this.enemy.position.col - this.player2.position.col) {
        this.playerSelected = this.player;
      }




      if(this.checkEnemiesExist() &&
        (this.playerSelected.position.col + 1 !== this.enemy.position.col
          && this.playerSelected.position.col < this.enemy.position.col)) {
          this.enemy.moveForward();
          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
      (this.playerSelected.position.col - 1 !== this.enemy.position.col
        && this.playerSelected.position.col > this.enemy.position.col)) {
          this.enemy.moveBack();
          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
        (this.playerSelected.position.row !== this.enemy.position.row && this.playerSelected.position.row > this.enemy.position.row)) {
          this.enemy.moveUp();

          //console.log(this.player.position, this.enemy.position);
      }
      if(this.checkEnemiesExist() &&
      (this.playerSelected.position.row !== this.enemy.position.row && this.playerSelected.position.row < this.enemy.position.row)) {
          this.enemy.moveDown();
          //console.log(this.player.position, this.enemy.position);
      }

      if(this.checkEnemiesExist()
      && this.playerSelected.timeAttackPlayer === true
      && (this.playerSelected.position.col + 1 === this.enemy.position.col  || this.playerSelected.position.col - 1 == this.enemy.position.col)
      && this.playerSelected.position.row == this.enemy.position.row
      && this.playerSelected.lifeBar > 0
      && this.iaDecision === true) {

            this.enemyAttackToPlayer(this.playerSelected);

      }



  };


  this.lifesCounterDraw = function (numberPlayers) {
        if(this.checkTwoPlayers() === false) {
          $('.topScene').append($('<div>').addClass('lifesPlayer'));
          $(".lifesPlayer").html("<img src='img/headPlayer1.png'/><span></span> ");
          $(".lifesPlayer span").text(this.player.lifes);
        }

        if(this.checkTwoPlayers()) {

          $('.topScene').append($('<div>').addClass('lifesPlayer'));
          $(".lifesPlayer").html("<img src='img/headPlayer1.png'/><span></span> ");
          $(".lifesPlayer span").text(this.player.lifes);


          $('.topScene').append($('<div>').addClass('lifesPlayer2'));
          $(".lifesPlayer2").html("<img src='img/headPlayer2.png'/><span></span> ");
          $(".lifesPlayer2 span").text(this.player2.lifes);
        }




  };
  this.lifesCounterUpdate = function (playerToCount){
    if(playerToCount === this.player) {
      if($(".lifesPlayer span").html() > 0) {

        $(".lifesPlayer span").text(playerToCount.lifes);

      }
    }

    if(playerToCount === this.player2) {
      if($(".lifesPlayer2 span").html() > 0) {

        $(".lifesPlayer2 span").text(playerToCount.lifes);

      }
    }





  };
  this.liveBarDraw = function () {
    if(this.checkTwoPlayers() === false) {
      $('.topScene').append($('<div><span></span><span></span><span></span><span></span><span></span></div>').addClass('lifeBarPlayer'));
      $(".lifeBarPlayer span").addClass("lifeBarfull");
    }

    if(this.checkTwoPlayers()) {
      $('.topScene').append($('<div><span></span><span></span><span></span><span></span><span></span></div>').addClass('lifeBarPlayer'));
      $(".lifeBarPlayer span").addClass("lifeBarfull");

      $('.topScene').append($('<div><span></span><span></span><span></span><span></span><span></span></div>').addClass('lifeBarPlayer2'));
      $(".lifeBarPlayer2 span").addClass("lifeBarfullred");
    }

  };
  this.liveBarUpdateDraw = function (playerLiveBartoDraw) {
    if(playerLiveBartoDraw === this.player) {
    $(".lifeBarPlayer span:nth-child(" + (this.player.lifeBar + 1) + ")").toggleClass("lifeBarfull");
    }
    if(playerLiveBartoDraw === this.player2) {
      $(".lifeBarPlayer2 span:nth-child(" + (this.player2.lifeBar + 1) + ")").toggleClass("lifeBarfullred");
    }


  };

  this.perspectivePlayer = function () {
    if(this.checkEnemiesExist() && this.checkLivePlayer(this.player) && this.player.position.row <= this.enemy.position.row ) {
      $(this.player.name).css("z-index", "99");
    } else {
      $(this.player.name).css("z-index", "9");
    }

    if( this.checkTwoPlayers() === false && this.checkEnemiesExist() && this.checkLivePlayer(this.player) && this.enemy.position.row < this.player.position.row || this.checkTwoPlayers() && this.checkEnemiesExist() && this.checkLivePlayer(this.player2) && this.enemy.position.row < this.player2.position.row
  || this.checkTwoPlayers() && this.checkEnemiesExist() && this.checkLivePlayer(this.player2) && this.enemy.position.row < this.player2.position.row && this.enemy.position.row < this.player.position.row  ) {
      $(this.enemy.name).css("z-index", "99");
    } else {
      $(this.enemy.name).css("z-index", "9");
    }


    if(this.checkTwoPlayers() && this.checkEnemiesExist() && this.checkLivePlayer(this.player2) && this.player2.position.row <= this.enemy.position.row ) {
      $(this.player2.name).css("z-index", "99");
    } else {
      if(this.checkTwoPlayers()) {
        $(this.player2.name).css("z-index", "9");
      }

    }
    if(this.checkTwoPlayers() && this.checkLivePlayer(this.player) && this.checkLivePlayer(this.player2) && this.player.position.row <= this.player2.position.row ) {
      $(this.player.name).css("z-index", "99");
    } else {
      $(this.player.name).css("z-index", "9");
    }
  };

  this.loadGame = function () {
    this.generateEnemies(0);
    this.gameIntervals();
    this.player.drawPlayer(1 , 4, 2);
    this.liveBarDraw();
    this.lifesCounterDraw();
    if(this.checkTwoPlayers()) {
      this.player2.drawPlayer(2 , 0, 2);
    }


    this.assignControlsToKeys();
  };
  this.loadGame();



}
//var player1 = new Player("img/DDG_BillyLee.gif");
var newGame;
//console.log(newGame);
