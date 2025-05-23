// Buttons
const favSongButtonOne = document.querySelector('#favorite-song-library');
const favSongButtonTwo = document.querySelector('#favorite-song-content');
const createdPlaylist = document.querySelector('#created-playlist');

// Content Areas
const favSongContainer = document.querySelector('#favorite-song-container');
const mainContentArea = document.querySelector('#main-content-area');

// Song Functions
const love = document.querySelector('#love-w2e');

  love.addEventListener('mouseover', function() {
    const number = document.querySelector('.number');
      number.innerHTML = '<i class="fa-solid fa-play text-xs max-sm:text-[8px]"></i>';
  }); 

  love.addEventListener('mouseout', function() {
    const number = document.querySelector('.number');
      number.innerHTML = number.dataset.original;
    });

// Favorite Song Playlist
[favSongButtonOne, favSongButtonTwo].forEach(button => {
  if (button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      favSongUI();
      showFavSong();
      window.location.hash = '#favorite-song';
    });
  }
});

if (createdPlaylist) {
  createdPlaylist.addEventListener('click', function(e) {
    createdPlaylistUI();
  });
}

// Button Interface 
function createdPlaylistUI() {
  if (createdPlaylist) {
    createdPlaylist.classList.add('bg-[#444]', 'hover:bg-[#555]');
    createdPlaylist.classList.remove('hover:bg-[#444]');
  }
  
  if (favSongButtonOne) {
    favSongButtonOne.classList.remove('bg-[#444]', 'hover:bg-[#555]');
  }
}

function favSongUI() {
  if (favSongButtonOne) {
    favSongButtonOne.classList.add('bg-[#444]', 'hover:bg-[#555]');
    favSongButtonOne.classList.remove('hover:bg-[#444]');
  }
  
  if (createdPlaylist) {
    createdPlaylist.classList.remove('bg-[#444]', 'hover:bg-[#555]');
  }
}

function showFavSong() {
  if (favSongContainer) favSongContainer.style.display = 'block';
  if (mainContentArea) mainContentArea.style.display = 'none';
}

function showMainView() {
  if (favSongContainer) favSongContainer.style.display = 'none';
  if (mainContentArea) mainContentArea.style.display = 'block';
}

function checkInitialView() {
  if (window.location.hash === '#favorite-song') {
    showFavSong();
  } else {
    showMainView();
  }
}

window.addEventListener('popstate', checkInitialView);
window.addEventListener('load', checkInitialView);