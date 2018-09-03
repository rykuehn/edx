document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const game__tiles = Array.prototype.slice.call(document.getElementsByClassName('game__tile'));
    let clickedTiles = [];
    let tileNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    let timeElapsed = 0;
    let gameStart = false;
    let pairs = 0;
    let interval;

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      };
    };
    
    const gameDuration = (event) => {
      if (gameStart === false) {
        interval = setInterval(() => {
          timeElapsed++;
          const timeElapsedContainer = document.getElementById('game__timer');
          timeElapsedContainer.innerHTML = timeElapsed;
        }, 1000);
        gameStart = true;
      }

      if(event === 'complete') {
        gameStart = false;
        clearInterval(interval);
        setTimeout(function() {
          window.alert(`You finished in ${timeElapsed} seconds!`);
        }, 200);
        document.getElementById('game__timer').innerHTML = 0;
      }
    }

    const isMatchComplete = () => {
      if(pairs === 4) {
        gameDuration('complete');
      }
    }

    const checkForMatch = (tileOne, tileTwo) => {
      if (tileOne.dataset.value === tileTwo.dataset.value) {
        tileOne.dataset.complete = true;
        tileTwo.dataset.complete = true;

        pairs++;
        isMatchComplete();
      } else {
        document.getElementById('game').dataset.incorrect = 'true';
        setTimeout(function() {
          tileOne.dataset.complete = 'false';
          tileTwo.dataset.complete = 'false';
          tileOne.dataset.clicked = 'false';
          tileTwo.dataset.clicked = 'false';
          tileOne.innerHTML = '';
          tileTwo.innerHTML = '';
          document.getElementById('game').dataset.incorrect = 'false';
        }, 250);
      }
      clickedTiles = [];
    }

    shuffleArray(tileNumbers);
    document.getElementById('game_restart').addEventListener('click', function() {
      location.reload();
    });

    document.addEventListener('keydown', function(event){
      if(event.key > 0 && event.key < 5 ){
        game__tiles.forEach(tile => {
          if(tile.dataset.value === event.key) {
            tile.click();
          }
        })
      }
    });

    game__tiles.forEach((tile, i) => {
      tile.setAttribute('data-value', tileNumbers[i]);

      tile.addEventListener('mouseover', () => {
        tile.dataset.hover = 'true';
      });

      tile.addEventListener('mouseout', () => {
        tile.dataset.hover = 'false'
      });

      tile.addEventListener('click', (e) => {
        gameDuration('click');
        tile.dataset.clicked = true;
        tile.innerHTML = tileNumbers[i];

        if(tile.dataset.complete === 'false') {
          if(clickedTiles.length === 0) {
            clickedTiles.push(tile);
          } else {
            clickedTiles.push(tile);
            checkForMatch(clickedTiles[0], clickedTiles[1]);
          }
        }
      });
    });
  }
}
