$(document).ready(function() {
  $(".start").on("click", function() {
    $(".container").addClass("visible");
    $(".intro").addClass("hide");

    newGame = new Game({
      player : new Player("player1", "img/DDG_BillyLee.gif"),
      map : new Map(),
      enemy : "",
      enemies : ["enemy11", "img/Abobo.png", "enemy12", "img/Abobo.png", "enemy13", "img/Abobo.png"]
    });
  });
});
