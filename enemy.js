function Enemy(sprite) {
  this.sprite = sprite;
  this.position = {
    row: 3,
    col: 30
  };
  this.step = 0;
  this.timeAttack = true;
  this.lifes = 1;
  this.lifeBar = 3;
  this.direction = "left";

  $('.topScene').append($('<div>')
    .addClass('enemy')
    .addClass('invert')
    .attr('data-player', 3)
    .css({"background-image": "url(" + sprite + ")", "bottom": this.position.row * 20, "left": this.position.col * 20})

  );


  this.actualPosition = function (direction, number) {
      switch(direction) {
        case 'right':
          this.position = {
            row: this.position.row,
            col: this.position.col + number
          };
          break;
        case 'left':
          this.position = {
            row: this.position.row,
            col: this.position.col - number
          };
          break;
          case 'up':
            this.position = {
              row: this.position.row + number,
              col: this.position.col
            };
            break;
            case 'down':
              this.position = {
                row: this.position.row - number,
                col: this.position.col
              };
            break;
      }

  };

  this.moveForward = function () {
        this.walkPlayer();

        if( this.position.col < 39 && this.timeAttack === true ) {
          this.direction = "left";
          $(".enemy").addClass("invert");
          $(".enemy").css({"bottom" : this.position.row * 20, "left": (this.position.col - 1) * 20});
          this.actualPosition("left", 1);
        }

  };

  this.moveBack = function () {
        this.walkPlayer();

        if( this.position.col > 0 && this.timeAttack === true) {
          this.direction = "right";
          $(".enemy").removeClass("invert");
          $(".enemy").css({"bottom" : this.position.row * 20, "left": (this.position.col + 1) * 20});
          this.actualPosition("right", 1);
        }
  };

  this.moveUp = function () {
    this.walkPlayer("up");
    if( this.position.row <= 3 && this.timeAttack === true) {

      $(".enemy").css({"bottom" : (this.position.row + 1) * 20, "left": this.position.col * 20});
      this.actualPosition("up", 1);
    }

  };

  this.moveDown = function () {
    this.walkPlayer();
    if( this.position.row >= 0 && this.timeAttack === true) {
      $(".enemy").css({"bottom" : (this.position.row - 1) * 20, "left": this.position.col * 20});
      this.actualPosition("down", 1);
    }
  };

  this.walkPlayer = function (direction) {
      this.step += 1;

      switch (direction) {
        case 'up' :
            if(this.step === 0 && this.timeAttack === true) {
              $(".enemy").css({ "background-position": "-330px -15px" });
            }
            if(this.step === 1 && this.timeAttack === true) {
              $(".enemy").css({ "background-position": "-415px -15px" });
            }
            if(this.step === 2 && this.timeAttack === true){
            $(".enemy").css({ "background-position": "-495px -15px" });
            }
            if(this.step >= 3 && this.timeAttack === true){
              $(".enemy").css({ "background-position": "-575px -15px" });
              this.step = 0;
            }
            break;
        default:

            if(this.step === 0 && this.timeAttack === true) {
              $(".enemy").css({ "background-position": "-75px -15px" });
            }
            if(this.step === 1 && this.timeAttack === true) {
              $(".enemy").css({ "background-position": "-95px -15px" });
            }
            if(this.step === 2 && this.timeAttack === true){
            $(".enemy").css({ "background-position": "-175px -15px" });
            }
            if(this.step >= 3 && this.timeAttack === true){
              $(".enemy").css({ "background-position": "-255px -15px" });
              this.step = 0;
            }

      }

  };

  this.attackPlayer = function () {

      var self = this;

      if(this.step % 2 != 1 && this.timeAttack === true ) {

        self.timeAttack = false;
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-15px -195px" });
        }, 100);
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-85px -195px", "width" : "130px", "left": (self.position.col * 20) - 30});
        }, 200);
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-245px -195px", "width" : "60px", "left": (self.position.col * 20) + 30});
        }, 300);
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-15px -195px" });
          self.step += 1;
          self.timeAttack = true;
        }, 400);


      }
      if(this.step % 2 == 1 && this.timeAttack === true ) {
          //console.log(this.position.col);
        self.timeAttack = false;
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-315px -195px" });
        }, 150);
        setTimeout(function(){
          $(".enemy").css({ "background-position": "-385px -195px", "width": "130px", "left": (self.position.col * 20) - 30 });
        }, 350);

        setTimeout(function(){
          $(".enemy").css({ "background-position": "-530px -195px", "width": "60px", "left": (self.position.col * 20) + 30 });
          self.step = 0;
          self.timeAttack = true;
        }, 500);



      }

  };

  this.punchToPlayer = function () {
    this.timeAttack = false;
    var self = this;
    setTimeout(function(){
      $(".enemy").css({ "background-position": "-15px -965px"});
    }, 300);
    setTimeout(function(){
      $(".enemy").css({ "background-position": "-95px -965px" });
      self.timeAttack = true;
    }, 400);


  };
  this.removePlayer = function () {
    $(".enemy").remove();
  };
  this.deadPlayer = function () {

    this.timeAttack = false;

    var self = this;
    setTimeout(function(){
      $(".enemy").css({ "background-position": "-165px -965px", "width" : "140px", "opacity" : "1" });
    }, 300);
    setTimeout(function(){
      $(".enemy").css({ "background-position": "-455px -965px", "opacity" : "0.5" });
    }, 500);
    setTimeout(function(){
      $(".enemy").css({ "opacity" : "0.7" });
    }, 800);
    setTimeout(function(){
      $(".enemy").css({ "opacity" : "0" });
      self.timeAttack = true;

      //self.removePlayer();
    }, 1000);

  };



}