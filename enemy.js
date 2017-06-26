function Enemy(name, sprite, position) {
  this.name= "." + name;
  this.nameSimple = name;
  this.sprite = sprite;

  this.position = position;
  this.step = 0;

  this.lifes = 1;
  this.lifeBar = 6;
  this.direction = "left";

  this.drawEnemy = function () {

    $('.topScene').append($('<div>')
      .addClass(this.nameSimple)
      .addClass('invert enemies')
      .attr('data-player', 3)
      .css({
        "background-image": "url(" + sprite + ")",
        "bottom": this.position.row * 20,
        "left": this.position.col * 2.56 +"%",
        "background-position": "-15px -15px",
        "position": "absolute",
        "z-index": "9",
        "width": "60px",
        "height":"160px"


      })

    );
  };



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

        if( this.position.col < 39 ) {
          this.direction = "left";
          $(this.name).addClass("invert");
          $(this.name).css({"bottom" : this.position.row * 20, "left": (this.position.col - 1) * 2.56 +"%"});
          this.actualPosition("left", 1);
        }

  };

  this.moveBack = function () {
        this.walkPlayer();

        if( this.position.col > 0) {
          this.direction = "right";
          $(this.name).removeClass("invert");
          $(this.name).css({"bottom" : this.position.row * 20, "left": (this.position.col + 1) * 2.56 +"%"});
          this.actualPosition("right", 1);
        }
  };

  this.moveUp = function () {
    this.walkPlayer("up");
    if( this.position.row <= 3) {

      $(this.name).css({"bottom" : (this.position.row + 1) * 20, "left": this.position.col * 2.56 +"%"});
      this.actualPosition("up", 1);
    }

  };

  this.moveDown = function () {
    this.walkPlayer();
    if( this.position.row >= 0) {
      $(this.name).css({"bottom" : (this.position.row - 1) * 20, "left": this.position.col * 2.56 +"%"});
      this.actualPosition("down", 1);
    }
  };

  this.walkPlayer = function (direction) {
      this.step += 1;

      switch (direction) {
        case 'up' :
            if(this.step === 0) {
              $(this.name).css({ "background-position": "-330px -15px" });
            }
            if(this.step === 1) {
              $(this.name).css({ "background-position": "-415px -15px" });
            }
            if(this.step === 2){
            $(this.name).css({ "background-position": "-495px -15px" });
            }
            if(this.step >= 3){
              $(this.name).css({ "background-position": "-575px -15px" });
              this.step = 0;
            }
            break;
        default:

            if(this.step === 0) {
              $(this.name).css({ "background-position": "-75px -15px" });
            }
            if(this.step === 1) {
              $(this.name).css({ "background-position": "-95px -15px" });
            }
            if(this.step === 2){
            $(this.name).css({ "background-position": "-175px -15px" });
            }
            if(this.step >= 3){
              $(this.name).css({ "background-position": "-255px -15px" });
              this.step = 0;
            }

      }

  };

  this.attackPlayer = function () {

      var self = this;

      if(this.step % 2 != 1) {


        setTimeout(function(){
          $(self.name).css({ "background-position": "-15px -195px", "z-index":"99" });
        }, 100);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-85px -195px", "width" : "130px", "left": (self.position.col * 2.56 +"%") - 30});
        }, 200);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-245px -195px", "width" : "60px", "left": (self.position.col * 2.56 +"%") + 30});
        }, 300);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-15px -195px", "z-index" : "9" });
          self.step += 1;

        }, 400);


      }
      if(this.step % 2 == 1) {

        setTimeout(function(){
          $(self.name).css({ "background-position": "-315px -195px", "z-index" : "99" });
        }, 150);
        setTimeout(function(){
          $(self.name).css({ "background-position": "-385px -195px", "width": "130px", "left": (self.position.col * 2.56 +"%") - 30 });
        }, 350);

        setTimeout(function(){
          $(self.name).css({ "background-position": "-530px -195px", "width": "60px", "left": (self.position.col * 2.56 +"%") + 30, "z-index" : "9"  });
          self.step = 0;

        }, 500);



      }

  };

  this.punchToPlayer = function () {

    var self = this;
    setTimeout(function(){
      $(self.name).css({ "background-position": "-15px -965px"});
    }, 300);
    setTimeout(function(){
      $(self.name).css({ "background-position": "-95px -965px" });
    }, 400);


  };

  this.deadPlayer = function () {



    var self = this;
    setTimeout(function(){
      if(self.direction === "right") {
        $(self.name).addClass("invert");
      }
      if(self.direction === "left") {
        $(self.name).removeClass("invert");
      }
      $(self.name).css({ "background-position": "-165px -965px", "width" : "140px", "opacity" : "1" });
    }, 500);
    setTimeout(function(){
      $(self.name).css({ "background-position": "-455px -965px", "opacity" : "0.5" });
    }, 900);
    setTimeout(function(){
      $(self.name).css({ "opacity" : "0.7" });
    }, 2300);
    setTimeout(function(){
      $(self.name).css({ "opacity" : "0" });
    }, 2700);

  };



}
