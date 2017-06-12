function Player (name, sprite) {
  this.name= "." + name;
  this.nameSimple = name;
  this.sprite = sprite;
  this.position = {
    row: 3,
    col: 2
  };
  this.step = 0;
  this.timeAttack = true;
  this.lifes = 2;
  this.lifeBar = 5;
  this.direction = "right";

  $('.topScene').append($('<div>')
    .addClass(this.nameSimple)
    .attr('data-player', 1)
    .css({
      "background-image": "url(" + sprite + ")",
      "bottom": this.position.row * 20,
      "left": this.position.col * 20,
        "background-position": "0px 0px",
        "position": "absolute",
        "width": "60px",
        "height":"140px",
        "z-index": "99"


    })

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
          this.direction = "right";
          //console.log(this.direction);
          $(this.name).removeClass("invert");
          $(this.name).css({"bottom" : this.position.row * 20, "left": (this.position.col + 1) * 20});
          this.actualPosition("right", 1);
        }

  };

  this.moveBack = function () {
        this.walkPlayer();

        if( this.position.col > 0 && this.timeAttack === true) {
          this.direction = "left";
          //console.log(this.direction);
          $(this.name).addClass("invert");
          $(this.name).css({"bottom" : this.position.row * 20, "left": (this.position.col - 1) * 20});
          this.actualPosition("left", 1);
        }



  };

  this.moveUp = function () {
    this.walkPlayer("up");
    if( this.position.row <= 3 && this.timeAttack === true) {

      $(this.name).css({"bottom" : (this.position.row + 1) * 20, "left": this.position.col * 20});
      this.actualPosition("up", 1);
    }

  };
  this.moveDown = function () {
    this.walkPlayer();
    if( this.position.row >= 0 && this.timeAttack === true) {
      $(this.name).css({"bottom" : (this.position.row - 1) * 20, "left": this.position.col * 20});
      this.actualPosition("down", 1);
  }
  };

  this.walkPlayer = function (direction) {
      this.step += 1;

      switch (direction) {
        case 'up' :
            if(this.step === 0 && this.timeAttack === true) {
              $(this.name).css({ "background-position": "-0px -540px" });
            }
            if(this.step === 1 && this.timeAttack === true) {
              $(this.name).css({ "background-position": "-60px -540px" });
            }
            if(this.step === 2 && this.timeAttack === true){
            $(this.name).css({ "background-position": "-130px -540px" });
            }
            if(this.step >= 3 && this.timeAttack === true){
              $(this.name).css({ "background-position": "-185px -540px" });
              this.step = 0;
            }
            break;
        default:

            if(this.step === 0 && this.timeAttack === true) {
              $(this.name).css({ "background-position": "-60px 0px" });
            }
            if(this.step === 1 && this.timeAttack === true) {
              $(this.name).css({ "background-position": "-60px 0px" });
            }
            if(this.step === 2 && this.timeAttack === true){
            $(this.name).css({ "background-position": "-120px 0px" });
            }
            if(this.step >= 3 && this.timeAttack === true){
              $(this.name).css({ "background-position": "-180px 0px" });
              this.step = 0;
            }

      }

  };

  this.attackPlayer = function () {
      var self = this;

      if(this.step % 2 != 1 && this.timeAttack === true ) {

        this.timeAttack = false;
        setTimeout(function(){
          $(self.name).css({ "background-position": "0px -135px" });
        }, 100);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-60px -135px", "width" : "85px"});
        }, 200);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-140px -135px"});
        }, 300);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-230px -135px" });
        }, 400);
        setTimeout(function(){
          $(self.name).css({ "background-position": "0px -135px", "width" : "60px" });

          self.step += 1;
          self.timeAttack = true;

        }, 500);

      }
      if(this.step % 2 == 1 && this.timeAttack === true ) {

        this.timeAttack = false;
        setTimeout(function(){
          $(self.name).css({ "background-position": "-400px -135px" });
        }, 150);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-470px -135px", "width": "90px" });
        }, 350);

        setTimeout(function(){
          $(self.name).css({ "background-position": "-570px -135px", "width": "60px" });
        }, 500);
        setTimeout(function(){
          $(self.name).css({ "background-position": "0 -135px" });
          self.step = 0;
          self.timeAttack = true;

        }, 700);


      }

  };



  this.punchToPlayer = function () {
    this.timeAttack = false;
    var self = this;
    setTimeout(function(){
      $(self.name).css({ "background-position": "-240px -540px", "width" : "60px", "height":"140px" });
    }, 300);
    setTimeout(function(){
      $(self.name).css({ "background-position": "-302px -540px" });
    }, 400);
    setTimeout(function(){
      $(self.name).css({ "background-position" : "0px -135px" });
      self.timeAttack = true;
    }, 600);

  };

  this.deadPlayer = function () {
    this.timeAttack = false;
    this.lifes -= 1;


    var self = this;
    setTimeout(function(){
      $(self.name).css({ "background-position": "-360px -530px", "width" : "100px", "height":"70px", "opacity" : "1" });
    }, 200);
    setTimeout(function(){
      $(self.name).css({ "background-position": "-360px -605px", "opacity" : "0.5" });
    }, 300);
    setTimeout(function(){
      $(self.name).css({ "opacity" : "0.7" });
    }, 400);
    setTimeout(function(){
      $(self.name).css({ "opacity" : "0" });
      self.timeAttack = true;

    }, 700);

  };

  this.revivePlayer = function () {

        this.timeAttack = false;
        this.position = {
          row: 3,
          col: 2
        };
        var self = this;
        setTimeout(function(){
          $(self.name).css({ "bottom" : self.position.row * 20 , "left": self.position.col * 20, "background-position": "0px 0px", "width" : "60px", "height":"140px", "opacity" : "0.2" });
        }, 300);
        setTimeout(function(){
          $(self.name).css({ "opacity" : "0.7" });
        }, 600);
        setTimeout(function(){
          $(self.name).css({ "opacity" : "0.2" });
        }, 900);
        setTimeout(function(){
          $(self.name).css({ "opacity" : "1" });
          self.timeAttack = true;
          self.lifeBar = 5;
        }, 1200);



  };


}
