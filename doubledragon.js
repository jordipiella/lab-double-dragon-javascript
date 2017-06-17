$(document).ready(function() {
  $(".start").on("click", function() {
    $(".container").addClass("visible");
    $(".intro").addClass("hide");

    newGame = new Game({
      player : new Player("player1", "img/DDG_BillyLee.gif", 4, 2),
      player2: null,
      map : new Map(),
      enemy : "",
      enemies : [
        {
          name : "enemy11",
          sprite : "img/Abobo.png",
          position: { row : 3, col : 38 }
        },
        {
          name : "enemy12",
          sprite : "img/Abobo-w.png",
          position: { row : 1, col : 38 }
        }
      ]
    });
  });

  $(".start2").on("click", function() {
    $(".container").addClass("visible");
    $(".intro").addClass("hide");

    newGame = new Game({
      player : new Player("player1", "img/DDG_BillyLee.gif", 4, 2),
      player2: new Player("player2", "img/Jimmy-Lee.gif", 0, 2),
      map : new Map(),
      enemy : "",
      enemies : [
        {
          name : "enemy11",
          sprite : "img/Abobo.png",
          position: { row : 3, col : 38 }

        },
        {
          name : "enemy12",
          sprite : "img/Abobo-w.png",
          position: { row : 1, col : 3 }
        }
      ]
    });
  });
});
