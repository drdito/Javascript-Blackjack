$(document).ready(function() {
var cards = {
  numbers: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k", "a"],
  suits: ["clubs", "hearts", "diamonds", "spades"]
}
var deck = [];
var playerHand = [];
var dealerHand = [];
var deckCount = 0;
var playerHitCount = 2;

//Pushes 6 equal decks into the deck variable
function makeShoe() {
  for (var i = 0; i < 10000; i++) {
    var randomNum = Math.floor(Math.random() * 13);
    var randomSuit = Math.floor(Math.random() * 4);
    var currentCard = cards.numbers[randomNum] + cards.suits[randomSuit];
    if (deck.indexOf(currentCard) === -1) {
      for (var k = 0; k < 6 ; k++) {
        deck.push(currentCard);
      }
    }
  }
}
//Shuffles the resulting 312 cards in the array
function shuffle(arr) {
  var a;
  var b;
  var c;
  for (c = arr.length; c; c--) {
    a = Math.floor(Math.random() * c);
    b = arr[c - 1];
    arr[c - 1] = arr[a];
    arr[a] = b;
  }
}
//Deals first hand. Alternates between dealer and player, starting with player. 
//First dealer card comes face down.
function firstDeal() {
  playerHand.push(deck[deckCount]);
  deckCount++
  dealerHand.push(deck[deckCount]);
  deckCount++
  playerHand.push(deck[deckCount]);
  deckCount++
  dealerHand.push(deck[deckCount]);
  for (var x = 0; x < playerHand.length; x++ ){
    var newImg = $("<img class='cards'>");
    newImg.attr("src", "assets/images/cards/" + playerHand[x] + ".png");
    newImg.attr("height", "150");
    $(".playerHand").append(newImg);
  }
  for (var j = 0; j < dealerHand.length; j++ ){
    var newImg = $("<img>");
    if (j === 0) {
      newImg.attr("src", "assets/images/backs/cardback.png");
      newImg.attr("height", "150");
      $(".dealerHand").append(newImg);
    }
    else {
      newImg.attr("src", "assets/images/cards/" + dealerHand[j] + ".png");
      newImg.attr("height", "150");
      $(".dealerHand").append(newImg);
    }
  }
}
function hit () {
  deckCount++;
  playerHand.push(deck[deckCount]);
  console.log(playerHand);
  var newImg = $("<img class='cards'>");
  newImg.attr("src", "assets/images/cards/" + playerHand[playerHitCount] + ".png");
  newImg.attr("height", "150");
  $(".playerHand").append(newImg);
  playerHitCount++;
}

$(".dealButton").on("click", function (event) {
  event.preventDefault();
  $(".dealButton").css("display", "none");
  var dealerDiv = $("<div class='dealerHand'>");
  $(".jumbotron1").append(dealerDiv);
  $(".dealerHand").prepend("<h2>Dealer's Hand</h2>");
  $(".container").append("<div class='jumbotron jumbotron2 text-center'>");
  var playerDiv = $("<div class='playerHand'>");
  $(".jumbotron2").append(playerDiv);
  $(".playerHand").prepend("<h2>Your Hand</h2>");
  $(".jumbotron2").append("<br><button class='btn btn-success btn-md hit'>Hit</button>");
  $(".jumbotron2").append("<button class='btn btn-success btn-md stand'>Stand</button>");
  $(".jumbotron2").append("<button class='btn btn-success btn-md double'>Double</button>");
  $(".jumbotron2").append("<button class='btn btn-success btn-md split'>Split</button>");
  makeShoe();
  shuffle(deck);
  firstDeal();
  $(".hit").on("click", function (event) {
    event.preventDefault();
    hit();
  });
});
});
