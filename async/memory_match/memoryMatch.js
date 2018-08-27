document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const gameTiles = Array.prototype.slice.call(document.getElementsByClassName('gameTile'));
    let clickedTiles = [];
    let tileNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
    let timeElapsed = 0;
    let gameStart = false;
    let pairs = 0;

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
      };
    };
    
    const addTimeElapsed = () => {
      timeElapsed++;
      const timeElapsedContainer = document.getElementById('timeElapsed');
      timeElapsedContainer.innerHTML = timeElapsed;
    }

    const initializeGame = () => {
      shuffleArray(tileNumbers);
    }

    const gameDuration = (event) => {
      let start;
      if (gameStart === false) {
        start = setTimeout(() => { addTimeElapsed() }, 1000);
      }

      if(event === 'click') {
        gameStart = true;
      }

      if(event === 'complete') {
        console.log('here')
        gameStart = false;
        clearInterval(start);
        window.alert(`You finished in ${timeElapsed} seconds!`);
        document.getElementById('timeElapsed').innerHTML = 0;
      }
    }

    const isMatchComplete = () => {
      if(pairs === 4) {
        gameDuration('complete');
      }
    }

    const checkForMatch = (tileOne, tileTwo) => {
      if (tileOne.firstElementChild.innerHTML === tileTwo.firstElementChild.innerHTML) {
        tileOne.firstElementChild.classList.add('gameTile--correct');
        tileTwo.firstElementChild.classList.add('gameTile--correct');

        pairs++;
        isMatchComplete();
      } else {
        setTimeout(function () {
          tileOne.classList.remove('gameTile--clicked');
          tileOne.firstElementChild.classList.remove('gameTileNumber--display');

          tileTwo.classList.remove('gameTile--clicked');
          tileTwo.firstElementChild.classList.remove('gameTileNumber--display');
        }, 500)
      }
      clickedTiles = [];
    }

    initializeGame();

    gameTiles.forEach((tile, i) => {
      const gameTileNumber = tile.firstElementChild;
      gameTileNumber.innerHTML = tileNumbers[i];

      tile.addEventListener('mouseover', () => {
        tile.classList.add('gameTile--hover');
      });

      tile.addEventListener('mouseout', () => {
        if(tile.classList.contains('gameTile--hover')){
          tile.classList.remove('gameTile--hover');
        }
      });

      tile.addEventListener('click', (e) => {
        gameDuration('click');
        tile.classList.add('gameTile--clicked');
        gameTileNumber.classList.add('gameTileNumber--display');

        if(!tile.firstElementChild.classList.contains('gameTile--correct')) {
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
