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
const volumeSlider = document.querySelector('#volume-slider');
const volumeControl = document.querySelector('#volume-control');
const progressContainer = document.querySelector('#progress-container')

// Function
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = favSongAudio.duration;
  favSongAudio.currentTime = (clickX / width) * duration;
}

function setVolume(e) {
  let volume = e.offsetX / this.clientWidth;
  volume = Math.max(0, Math.min(1, volume)); 
  favSongAudio.volume = volume;
  volumeSlider.style.width = `${volume * 100}%`;
  
  localStorage.setItem('audioVolume', volume);
}

let isDraggingProgress = false;
let isDraggingVolume = false;

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
    document.querySelector('#favorite-song-container').classList.remove('from-[#460101]/70');
    document.querySelector('#favorite-song-container').classList.add('from-[#e81e63]/70');
    document.querySelector('#library-section').classList.remove('from-[#460101]/70');
    document.querySelector('#library-section').classList.add('from-[#e81e63]/70');

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
    document.querySelector('#favorite-song-container').classList.add('from-[#460101]/70');
    document.querySelector('#favorite-song-container').classList.remove('from-[#e81e63]/70');
    document.querySelector('#library-section').classList.add('from-[#460101]/70');
    document.querySelector('#library-section').classList.remove('from-[#e81e63]/70');

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
progressContainer.addEventListener('click', setProgress);
volumeControl.addEventListener('click', setVolume);

progressContainer.addEventListener('mousedown', (e) => {
  isDraggingProgress = true;
  setProgress(e); 
});

volumeControl.addEventListener('mousedown', (e) => {
  isDraggingVolume = true;
  setVolume(e);
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingProgress) {
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const duration = favSongAudio.duration;
    favSongAudio.currentTime = percentage * duration;
  }
  
  if (isDraggingVolume) {
    const rect = volumeControl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let volume = x / rect.width;
    volume = Math.max(0, Math.min(1, volume));
    favSongAudio.volume = volume;
    volumeSlider.style.width = `${volume * 100}%`;
    localStorage.setItem('audioVolume', volume);
  }
});

document.addEventListener('mouseup', () => {
  isDraggingProgress = false;
  isDraggingVolume = false;
});

progressContainer.addEventListener('touchstart', (e) => {
  isDraggingProgress = true;
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  progressContainer.dispatchEvent(mouseEvent);
});

volumeControl.addEventListener('touchstart', (e) => {
  isDraggingVolume = true;
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  volumeControl.dispatchEvent(mouseEvent);
});

document.addEventListener('touchmove', (e) => {
  if (isDraggingProgress || isDraggingVolume) {
    e.preventDefault();
  }
  
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  document.dispatchEvent(mouseEvent);
}, { passive: false });

document.addEventListener('touchend', () => {
  isDraggingProgress = false;
  isDraggingVolume = false;
});

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
  
  const savedVolume = parseFloat(localStorage.getItem('audioVolume')) || 0.7;
  favSongAudio.volume = savedVolume;
  volumeSlider.style.width = `${savedVolume * 100}%`;
});

favSongAudio.addEventListener('timeupdate', function() {
  if (Math.floor(favSongAudio.currentTime) % 5 === 0) {
    localStorage.setItem('audioCurrentTime', favSongAudio.currentTime);
  }
  updateProgress(); 
});