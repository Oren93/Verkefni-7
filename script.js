
//Global fylki og index
const games = [];
var i = 0;

start();

function start() {
  let wannaplay = confirm('Do you want to play a game?');
  console.log(wannaplay);
  while (wannaplay) {
    games[i] = play();
    wannaplay = confirm('Viltu spila annan leik?');
    i++;
    console.log(games);
  }
  if (i===0) {
    alert('þú spilaðir ekki');
    return;
  }
  alert('þú spilaðir ' + games.length + ' leiki Meðalfjöldi ágiskana var ' + calculateAverage());

}

function play() {
  var guessCounter = 0;
  let clue = 'Giskaðu á tölu sem er á milli 0 og 100';
  const randomNo = randomNumber(1, 100);
  console.log(randomNo);
  var guessed;
  while (clue != 'Rétt!') {
    console.log(guessed = prompt(clue));
    if (guessed === null) {
      alert('canceled');
      /*throw 'cancel';*/
      return guessCounter; }
    if (isNaN(guessed)) {
      clue = 'Numbers Only';
      continue;
    }
    if (guessed>100 || guessed<1) {
      clue = 'Only Numbers on the range 1-100';
       console.log(++guessCounter);
       continue;
    }
    clue = getResponse(guessed, randomNo);
    console.log(++guessCounter);
  }
  alert(clue);
  return guessCounter;
}

function calculateAverage() {
  var sum = 0;
  for (var i = 0; i < games.length; i++) {
    sum += games[i];
  }
  var ave = Math.round(((sum / games.length) + Number.EPSILON) * 100) / 100;
  return ave
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

/**
 * Skilar svari sem birta á notanda sem streng, tekur inn tvær breytur
 *  - guess sem tölu, ágiskun notanda
 *  - correct sem tölu, rétt gildi
 * Ef guess er < 0 eða ekki tala skal skila strengnum "Ekki rétt"
 * Ef guess er nákvæmlega sama og correct skal skila strengnum "Rétt"
 * Ef munur er undir 5 (|correct - guess| < 5) skal skila "Mjög nálægt"
 * Ef munur er undir 10 skal skila "Nálægt"
 * Ef munur er undir 20 skal skila "Frekar langt frá"
 * Ef munur er undir 50 skal skila "Langt frá"
 * Annars skal skila "Mjög langt frá"
 * 
 * Þarf að útfæra með flæðistýringu.
 * Math.abs skilar algildi tölu: |a| = Math.abs(a)
 */
function getResponse(guess, correct) {
  var dif = Math.abs(guess - correct);
  let message;
  switch (true) {
    case (dif === 0):
      message = 'Rétt!'
      break;
    case (dif < 5):
      message = 'Mjög nálægt';
      break;
    case (dif < 10):
      message = 'Nálægt';
      break;
    case (dif < 20):
      message = 'Frekar langt frá';
      break;
    case (dif < 50):
      message = 'Langt frá';
      break;
    default: message = 'Mjög Langt frá';
  }
  return message;
}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
