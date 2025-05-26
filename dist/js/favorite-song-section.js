// Button Interfaces
const number = document.querySelector('.number');
const favSongIcon = document.querySelector('#fav-song-icon');
    const icon = document.querySelector('.icon');

// Song Elements
const love = document.querySelector('#love-w2e');
const favSongAudio = document.querySelector('#love-by-wavetoearth');
const favSongPlayButton = document.querySelector('#fav-song-play-button');

// Music Player Elements
const songCover = document.querySelector('#song-cover');
const songTitle = document.querySelector('#song-title');
const songArtist = document.querySelector('#song-artist');
const progressBar = document.querySelector('#progress-bar');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration'); 
const musicPlay = document.querySelector('#music-play');
const volumeControl = document.querySelector('#volume');

// Function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateProgress() {
  const { currentTime, duration } = favSongAudio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(currentTime);
  if (duration) {
    durationEl.textContent = formatTime(duration);
  }
}

function favSongToggle() {
  if (favSongAudio.paused) {
    favSongAudio.play();
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    musicPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
    number.innerHTML = '<i class="fa-solid fa-music text-[10px] max-sm:text-[8px]"></i>';
    songCover.src = '/assets/Love.jpeg';
    songTitle.textContent = 'love.';
    songArtist.textContent = 'wave to earth';
    number.classList.add('text-[#ff7070]');
    icon.classList.add('text-[#ff7070]');

    love.addEventListener('mouseover', function() {
      number.innerHTML = '<i class="fa-solid fa-pause text-xs max-sm:text-[8px]"></i>';
    }); 

    love.addEventListener('mouseout', function() {
      number.innerHTML = '<i class="fa-solid fa-music text-[10px] -ml-1 max-sm:text-[8px]"></i>';
    });

    localStorage.setItem('favSongAudio', 'true');
    localStorage.setItem('favSongCover', '/assets/Love.jpeg');
    localStorage.setItem('musicPlayer', 'active');
  } else {
    favSongAudio.pause();
    favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    musicPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
    number.innerHTML = number.dataset.original;

    love.addEventListener('mouseover', function() {
      number.innerHTML = '<i class="fa-solid fa-play text-xs max-sm:text-[8px]"></i>';
    }); 

    love.addEventListener('mouseout', function() {
      number.innerHTML = number.dataset.original;
    });
    
    localStorage.setItem('favSongAudio', 'false');
  }
}

function favSongPlay() {
  const icon = document.querySelector('.icon');
  number.classList.add('text-[#ff7070]');
  icon.classList.add('text-[#ff7070]');
}

// Add Event Listeners
favSongPlayButton.addEventListener('click', favSongToggle);
love.addEventListener('click', favSongToggle);
musicPlay.addEventListener('click', favSongToggle);

love.addEventListener('mouseover', function() {
  const icon = favSongAudio.paused ? 'play' : 'pause';
  number.innerHTML = `<i class="fa-solid fa-${icon} text-xs max-sm:text-[8px]"></i>`;
}); 

love.addEventListener('mouseout', function() {
  number.innerHTML = favSongAudio.paused 
    ? number.dataset.original 
    : '<i class="fa-solid fa-music text-[10px] -ml-1 max-sm:text-[8px]"></i>';
});

// Audio event listeners
favSongAudio.addEventListener('loadedmetadata', function() {
  durationEl.textContent = formatTime(favSongAudio.duration);
});

favSongAudio.addEventListener('timeupdate', updateProgress);

favSongAudio.addEventListener('ended', function() {
  favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
  number.innerHTML = number.dataset.original;
  progressBar.style.width = '0%';
  currentTimeEl.textContent = '0:00';
});

window.addEventListener('beforeunload', function() {
  localStorage.setItem('audioCurrentTime', favSongAudio.currentTime);
});

document.addEventListener('DOMContentLoaded', function() {
  const isPlaying = localStorage.getItem('favSongAudio') === 'true';
  const savedCover = localStorage.getItem('favSongCover');
  const savedMusicPlayer = localStorage.getItem('musicPlayer');
  const savedTime = parseFloat(localStorage.getItem('audioCurrentTime')) || 0;

  if (savedCover) {
    songCover.src = savedCover;
  }

  if (savedMusicPlayer === 'active') {
    songTitle.textContent = 'love.';
    songArtist.textContent = 'wave to earth';
  }

  const seekTime = Math.min(savedTime, favSongAudio.duration - 0.5);
    favSongAudio.currentTime = seekTime;
    
    if (isPlaying) {
      favSongAudio.play().catch(e => {
        console.log("Autoplay prevented:", e);
        favSongPlayButton.innerHTML = '<i class="fa-solid fa-play"></i>';
      });
      favSongPlayButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
      number.innerHTML = '<i class="fa-solid fa-music text-[10px] max-sm:text-[8px]"></i>';
      
      const icon = document.querySelector('.icon');
      number.classList.add('text-[#ff7070]');
      icon.classList.add('text-[#ff7070]');
    }
  
  if (favSongAudio.readyState > 0) {
    durationEl.textContent = formatTime(favSongAudio.duration);
    const seekTime = Math.min(savedTime, favSongAudio.duration - 0.5);
    favSongAudio.currentTime = seekTime;
  }
});

favSongAudio.addEventListener('timeupdate', function() {
  if (Math.floor(favSongAudio.currentTime) % 5 === 0) {
    localStorage.setItem('audioCurrentTime', favSongAudio.currentTime);
  }
  updateProgress(); 
});