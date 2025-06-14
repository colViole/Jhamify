document.addEventListener('DOMContentLoaded', function() {
  // Audio player setup
  const audioPlayer = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('progress-container');
  const currentTimeDisplay = document.getElementById('current-time');
  const durationDisplay = document.getElementById('duration');
  const songCover = document.getElementById('song-cover');
  const nowPlaying = document.getElementById('now-playing');
  const currentArtist = document.getElementById('current-artist');
  const playFavorite = document.getElementById('play-all-button-favorite');
  const createdPlay = document.getElementById('play-all-button');
  const originalNumbers = [];
  const playlistContainer = document.getElementById('created-playlist-container'); 
  
  // Volume control elements
  const volumeControl = document.getElementById('volume-control');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeIcon = document.getElementById('volume-icon');
  
  // Song data
  const favorite = [
    {
      title: "love.",
      artist: "wave to earth",
      cover: "/assets/cover/Love.jpeg",
      audio: "/assets/music/wave to earth - love.mp3",
      bgFrom: "#FF69B4", 
      bgTo: "#121212"
    }
  ];

  const songs = [
    {
      title: "Your Universe",
      artist: "Rico Blanco",
      cover: "/assets/cover/Your Universe.jpeg",
      audio: "/assets/music/Rico Blanco - Your Universe.mp3",
      bgFrom: "#D1001F",  
      bgTo: "#121212"
    },
    {
      title: "The Only Exception",
      artist: "Paramore",
      cover: "/assets/cover/Only Exception.jpeg",
      audio: "/assets/music/Paramore - The Only Exception.mp3",
      bgFrom: "#A020F0",  
      bgTo: "#121212"
    },
    {
      title: "I See The Light",
      artist: "Mandy Moore, Zachary Levi",
      cover: "/assets/cover/I See The Light.jpg",
      audio: "/assets/music/I See the Light.mp3",
      bgFrom: "#FFD700",  
      bgTo: "#121212"
    },
    {
      title: "This Town",
      artist: "Niall Horan",
      cover: "/assets/cover/This Town.jpeg",
      audio: "/assets/music/Niall Horan - This Town.mp3",
      bgFrom: "#E8DCB5",  
      bgTo: "#121212"
    },
    {
      title: "Out of My League",
      artist: "Stephen Speaks",
      cover: "/assets/cover/Out of My League.jpg",
      audio: "/assets/music/Stephen Speaks - Out Of My League.mp3",
      bgFrom: "#808080",  
      bgTo: "#121212"
    },
    {
      title: "Blessed",
      artist: "Daniel Caesar",
      cover: "/assets/cover/Blessed.jpeg",
      audio: "/assets/music/Blessed.mp3",
      bgFrom: "#217186",  
      bgTo: "#121212"
    }
  ];

  // Player state
  let currentSongIndex = 0;
  let isPlaying = false;
  let currentPlaylist = songs;
  let isFavoritePlaylist = false;
  let currentVolume = 0.7;
  let previousVolume = currentVolume;

  // Initialize player from localStorage
  function initPlayerState() {
    const savedState = localStorage.getItem('musicPlayerState');
    if (savedState) {
      const state = JSON.parse(savedState);
      
      // Restore playlist state
      isFavoritePlaylist = state.isFavoritePlaylist;
      currentPlaylist = isFavoritePlaylist ? favorite : songs;
      currentSongIndex = state.currentSongIndex;
      
      // Restore volume
      currentVolume = state.currentVolume;
      previousVolume = state.previousVolume;
      audioPlayer.volume = currentVolume;
      
      // Load the song but don't play yet
      loadSong(currentSongIndex, false);
      
      // Update UI to reflect paused state
      updateVolumeSlider(currentVolume);
      updateVolumeIcon();
      updatePlaylistButtons();
      updateAllSongItems();
      
      // Restore progress if available
      if (state.currentTime) {
        setTimeout(() => {
          audioPlayer.currentTime = state.currentTime;
        }, 100);
      }
    } else {
      // Initialize with first song
      loadSong(currentSongIndex, false);
    }
  }

  // Save player state to localStorage
  function savePlayerState() {
    const state = {
      currentSongIndex,
      isFavoritePlaylist,
      currentVolume,
      previousVolume,
      currentTime: audioPlayer.currentTime
    };
    localStorage.setItem('musicPlayerState', JSON.stringify(state));
  }

  // Initialize volume control
  function initVolume() {
    updateVolumeSlider(currentVolume);
    updateVolumeIcon();
    
    volumeControl.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.min(1, Math.max(0, x / rect.width));
      currentVolume = percentage;
      audioPlayer.volume = currentVolume;
      updateVolumeSlider(currentVolume);
      updateVolumeIcon();
      savePlayerState();
    });
    
    let isDragging = false;
    
    volumeControl.addEventListener('mousedown', function() {
      isDragging = true;
    });
    
    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        const rect = volumeControl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.min(1, Math.max(0, x / rect.width));
        currentVolume = percentage;
        audioPlayer.volume = currentVolume;
        updateVolumeSlider(currentVolume);
        updateVolumeIcon();
        savePlayerState();
      }
    });
    
    document.addEventListener('mouseup', function() {
      isDragging = false;
    });
    
    volumeIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      if (currentVolume > 0) {
        if (volumeIcon.classList.contains('fa-volume-mute')) {
          currentVolume = previousVolume || 0.7;
        } else {
          previousVolume = currentVolume;
          currentVolume = 0;
        }
      } else {
        currentVolume = previousVolume || 0.7;
      }
      audioPlayer.volume = currentVolume;
      updateVolumeSlider(currentVolume);
      updateVolumeIcon();
      savePlayerState();
    });
  }
  
  function updateVolumeSlider(volume) {
    volumeSlider.style.width = `${volume * 100}%`;
  }
  
  function updateVolumeIcon() {
    if (currentVolume === 0) {
      volumeIcon.className = 'fas fa-volume-mute text-xs text-[#b1b1b1]';
    } else if (currentVolume < 0.5) {
      volumeIcon.className = 'fas fa-volume-down text-xs text-[#b1b1b1]';
    } else {
      volumeIcon.className = 'fas fa-volume-up text-xs text-[#b1b1b1]';
    }
  }

  function resetAllPlaylistStates() {
    createdPlay.innerHTML = '<i class="fas fa-play"></i>';
    playFavorite.innerHTML = '<i class="fas fa-play"></i>';
    updateAllSongItems();
  }

  function updatePlaylistButtons() {
    if (isPlaying) {
      if (isFavoritePlaylist) {
        playFavorite.innerHTML = '<i class="fas fa-pause"></i>';
        createdPlay.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        createdPlay.innerHTML = '<i class="fas fa-pause"></i>';
        playFavorite.innerHTML = '<i class="fas fa-play"></i>';
      }
    } else {
      if (isFavoritePlaylist) {
        playFavorite.innerHTML = '<i class="fas fa-play"></i>';
      } else {
        createdPlay.innerHTML = '<i class="fas fa-play"></i>';
      }
    }
  }

  function updateText(fromColor) {
    document.querySelectorAll('.song-item').forEach(item => {
      const number = item.querySelector('.number');
      const icon = item.querySelector('.icon');
      if (number) number.style.color = '';
      if (icon) icon.style.color = ''; 
    });

    document.querySelectorAll('#favorite-item').forEach(item => {
      const number = item.querySelector('.number-favorite');
      const icon = item.querySelector('.icon-favorite');
      if (number) number.style.color = '';
      if (icon) icon.style.color = ''; 
    });

    let currentSongItem;
    if (isFavoritePlaylist) {
      currentSongItem = document.querySelector('#favorite-item');
    } else {
      currentSongItem = document.querySelectorAll('.song-item')[currentSongIndex];
    }

    if (currentSongItem) {
      const color = fromColor.startsWith('#') ? fromColor : `#${fromColor}`;
      const number = isFavoritePlaylist ? 
        currentSongItem.querySelector('.number-favorite') : 
        currentSongItem.querySelector('.number');
      const icon = isFavoritePlaylist ? 
        currentSongItem.querySelector('.icon-favorite') : 
        currentSongItem.querySelector('.icon');
      
      if (number) number.style.color = color;
      if (icon) icon.style.color = color;
    }
  }

  function updateBackground(fromColor, toColor) {
    const mainContent = document.getElementById('main-content-area');
    const favContainer = document.getElementById('favorite-song-container');
    const librarySection = document.getElementById('library-section');

    if (mainContent) {
      mainContent.style.background = `linear-gradient(to bottom, ${fromColor}70, ${toColor})`;
    }
    if (librarySection) {
      librarySection.style.background = `linear-gradient(to bottom, ${fromColor}70, ${toColor})`;
    }
    if (favContainer) {
      favContainer.style.background = `linear-gradient(to bottom, ${fromColor}70, ${toColor})`;
    }
    if (playlistContainer) {
      playlistContainer.style.background = `linear-gradient(to bottom, ${fromColor}70, ${toColor}70)`;
    }
  }
  
  function loadSong(index, autoplay = true) {
    const song = currentPlaylist[index];
    audioPlayer.src = song.audio;
    songCover.src = song.cover;
    nowPlaying.textContent = song.title;
    currentArtist.textContent = song.artist;

    updateBackground(song.bgFrom, song.bgTo);
    updateText(song.bgFrom);
    
    audioPlayer.addEventListener('loadedmetadata', function() {
      durationDisplay.textContent = formatTime(audioPlayer.duration);
    });

    updateAllSongItems();
    
    if (autoplay && isPlaying) {
      audioPlayer.play().catch(e => {
        console.log("Autoplay prevented:", e);
        isPlaying = false;
        updatePlaylistButtons();
        updateAllSongItems();
      });
    }
    
    savePlayerState();
  }

  function updateAllSongItems() {
    document.querySelectorAll('.song-item').forEach((item, i) => {
      updateSongItemState(item, i);
    });
    
    document.querySelectorAll('#favorite-item').forEach((item, i) => {
      updateSongItemState(item, i);
    });
  }
  
  function playSong() {
    isPlaying = true;
    audioPlayer.play()
      .then(() => {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        updatePlaylistButtons();
        updateAllSongItems();
        savePlayerState();
      })
      .catch(e => {
        console.log("Playback failed:", e);
        isPlaying = false;
      });
  }
 
  function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    updatePlaylistButtons();
    updateAllSongItems();
    savePlayerState();
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(currentTime);
    savePlayerState();
  }
  
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
    savePlayerState();
  }
  
  function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
      currentSongIndex = currentPlaylist.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > currentPlaylist.length - 1) {
      currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) playSong();
  }

  function updateSongItemState(item, index) {
    const isFavorite = item.id === 'favorite-item';
    const number = isFavorite ? 
      item.querySelector('.number-favorite') : 
      item.querySelector('.number');
    
    if (!number) return;
    
    const isActive = (isFavoritePlaylist && isFavorite) || 
                    (!isFavoritePlaylist && !isFavorite && currentSongIndex === index);
    
    if (isActive) {
      number.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    } else {
      if (isFavorite) {
        number.textContent = '1';
      } else {
        number.textContent = index + 1;
      }
    }
  }

  // Event listeners for playlist controls
  document.querySelector('#play-all-button-favorite').addEventListener('click', function() {
    if (isFavoritePlaylist) {
      isPlaying ? pauseSong() : playSong();
    } else {
      resetAllPlaylistStates();
      currentPlaylist = favorite;
      isFavoritePlaylist = true;
      currentSongIndex = 0;
      loadSong(currentSongIndex);
      playSong();
    }
  });

  document.querySelector('#favorite-item')?.addEventListener('click', function() {
    if (!isFavoritePlaylist) {
      resetAllPlaylistStates();
      currentPlaylist = favorite;
      isFavoritePlaylist = true;
      currentSongIndex = 0;
      loadSong(currentSongIndex);
      playSong();
    } else {
      isPlaying ? pauseSong() : playSong();
    }
  });

  document.querySelector('#play-all-button').addEventListener('click', function() {
    if (!isFavoritePlaylist) {
      isPlaying ? pauseSong() : playSong();
    } else {
      resetAllPlaylistStates();
      currentPlaylist = songs;
      isFavoritePlaylist = false;
      currentSongIndex = 0;
      loadSong(currentSongIndex);
      playSong();
    }
  });
  
  // Main playlist song items
  document.querySelectorAll('.song-item').forEach((item, index) => {
    const number = item.querySelector('.number');
    if (number) {
      originalNumbers[index] = number.textContent; 
    }
    
    updateSongItemState(item, index);
    item.addEventListener('mouseover', () => {
      if (currentSongIndex !== index || !isPlaying) {
        const number = item.querySelector('.number');
        if (number) number.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    
    item.addEventListener('mouseout', () => {
      updateSongItemState(item, index);
    });

    item.addEventListener('click', () => {
      if (!isFavoritePlaylist && currentSongIndex === index) {
        isPlaying ? pauseSong() : playSong();
      } else {
        if (isFavoritePlaylist) {
          resetAllPlaylistStates();
          currentPlaylist = songs;
          isFavoritePlaylist = false;
        }
        
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
      }
    });
  });

  // Favorite item hover effects
  const favoriteItem = document.querySelector('#favorite-item');
  if (favoriteItem) {
    const favoriteNumber = favoriteItem.querySelector('.number-favorite');
    
    favoriteItem.addEventListener('mouseover', () => {
      if (!isFavoritePlaylist || !isPlaying) {
        if (favoriteNumber) favoriteNumber.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    
    favoriteItem.addEventListener('mouseout', () => {
      updateSongItemState(favoriteItem, 0);
    });
  }

  // Player control event listeners
  playBtn.addEventListener('click', () => {
    isPlaying ? pauseSong() : playSong();
  });
  
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);
  
  audioPlayer.addEventListener('timeupdate', updateProgress);
  audioPlayer.addEventListener('ended', nextSong);
  
  progressContainer.addEventListener('click', setProgress);

  // Save state before page unload
  window.addEventListener('beforeunload', () => {
    // Always pause before unloading
    if (isPlaying) {
      audioPlayer.pause();
      isPlaying = false;
    }
    savePlayerState();
  });

  // Initialize player
  initPlayerState();
  initVolume();
  
  // Handle letter button clicks
  document.querySelectorAll('.fa-envelope').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      showLetter();
    });
  });

  function showLetter() {
    console.log("Letter button clicked");
    // Implement letter functionality here
  }
});