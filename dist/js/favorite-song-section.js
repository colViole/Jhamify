// Button Interfaces
const number = document.querySelector('.number');
const favSongIcon = document.querySelector('#fav-song-icon');

// Song Functions
const love = document.querySelector('#love-w2e');
const favSongAudio = document.querySelector('#love-by-wavetoearth');
const favSongPlayButton = document.querySelector('#fav-song-play-button');

// Music Player
const songCover = document.querySelector('#song-cover');
const songTitle = document.querySelector('#song-title');
const songArtist = document.querySelector('#song-artist');

favSongPlayButton.addEventListener('click', function () {
  favSongToggle();
  favSongPlay();
});

love.addEventListener('click', function () {
  favSongToggle();
  favSongPlay();
})

function favSongToggle() {
  if (favSongAudio.paused) {
    favSongAudio.play();
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>'
    number.innerHTML = '<i class="fa-solid fa-music text-[10px] max-sm:text-[8px]"></i>';
    songCover.src = '/assets/Love.jpeg';
    songTitle.innerHTML = 'love.';
    songArtist.innerHTML = 'wave to earth';


      love.addEventListener('mouseover', function() {
        const number = document.querySelector('.number');
        number.innerHTML = '<i class="fa-solid fa-pause text-xs max-sm:text-[8px]"></i>';
      }); 

      love.addEventListener('mouseout', function() {
        const number = document.querySelector('.number');
          number.innerHTML = '<i class="fa-solid fa-music text-[10px] -ml-1 max-sm:text-[8px]"></i>';
      });

    localStorage.setItem('favSongPlaying', 'true');
    localStorage.setItem('favSongCover', '/assets/Love.jpeg');
    localStorage.setItem('musicPlayer', 'active');
  } else {
    favSongAudio.pause()
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>'
    number.innerHTML = number.dataset.original;

      love.addEventListener('mouseover', function() {
        const number = document.querySelector('.number');
          number.innerHTML = '<i class="fa-solid fa-play text-xs max-sm:text-[8px]"></i>';
      }); 

      love.addEventListener('mouseout', function() {
        const number = document.querySelector('.number');
          number.innerHTML = '<i class="fa-solid fa-music text-[10px] -ml-1 max-sm:text-[8px]"></i>';
      });
    
    localStorage.setItem('favSongPlaying', 'false');
  }
}

function favSongPlay() {
  const icon = document.querySelector('.icon');

    number.classList.add('text-[#ff7070]');
    icon.classList.add('text-[#ff7070]');
}

love.addEventListener('mouseover', function() {
  const number = document.querySelector('.number');
  number.innerHTML = '<i class="fa-solid fa-play text-xs max-sm:text-[8px]"></i>';
}); 

love.addEventListener('mouseout', function() {
  const number = document.querySelector('.number');
    number.innerHTML = number.dataset.original;
});

document.addEventListener('DOMContentLoaded', function() {
  const isPlaying = localStorage.getItem('favSongPlaying') === 'true';
  const savedCover = localStorage.getItem('favSongCover');
  const savedMusicPlayer = localStorage.getItem('musicPlayer');

  if (isPlaying) {
    favSongAudio.play();
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    number.innerHTML = '<i class="fa-solid fa-music text-[10px] max-sm:text-[8px]"></i>';
  } else {
    favSongAudio.pause();
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    number.innerHTML = number.dataset.original;
  }

  if (savedCover) {
    songCover.src = savedCover;
  }

  if (isPlaying) {
    const icon = document.querySelector('.icon');
    number.classList.add('text-[#ff7070]');
    icon.classList.add('text-[#ff7070]');
  }

  if (savedMusicPlayer) {
    songTitle.innerHTML = 'love.';
    songArtist.innerHTML = 'wave to earth';
  }
});

