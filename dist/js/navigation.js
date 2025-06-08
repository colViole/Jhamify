// Button UI
const showCreatedPLButton = document.querySelector('#created-playlist-library');
const showFavSongButton = document.querySelector('#favorite-song-library');

// Content Areas
const favSongContainer = document.querySelector('#favorite-song-container');
const mainContentArea = document.querySelector('#main-content-area');
const playlistContainer = document.querySelector('#created-playlist-container');
const homePageID = document.querySelector('#home-page');
const accountPage = document.querySelector('#account-page');
const letterPage = document.querySelector('#letter-page');

// Functions
function saveCurrentView(viewName) {
  localStorage.setItem('currentView', viewName);
}

function loadSavedView() {
  const currentView = localStorage.getItem('currentView');
  
  if (currentView === 'favoriteSong') {
    showFavSong();
  } else if (currentView === 'createdPlaylist') {
    createdPlaylist();
  } else if (currentView === 'accountPage') {
    showAccount();
  } else if (currentView === 'letterPage') {
    showLetter();
  } else {
    homePage(); 
  }
}

document.addEventListener('DOMContentLoaded', loadSavedView);

function showFavSong() {
  favSongContainer.classList.remove('hidden');
  mainContentArea.classList.add('hidden');
  playlistContainer.classList.add('hidden');

  // UI
  showFavSongButton.classList.add('bg-[#333]');
  showFavSongButton.classList.remove('hover:bg-[#333]');
  showFavSongButton.classList.add('hover:bg-[#444]');
  showCreatedPLButton.classList.remove('bg-[#333]');

  saveCurrentView('favoriteSong');
}

function createdPlaylist() {
  favSongContainer.classList.add('hidden');
  mainContentArea.classList.add('hidden');
  playlistContainer.classList.remove('hidden');

  // UI
  showCreatedPLButton.classList.add('bg-[#333]');
  showCreatedPLButton.classList.remove('hover:bg-[#333]');
  showCreatedPLButton.classList.add('hover:bg-[#444]');
  showFavSongButton.classList.remove('bg-[#333]');

  saveCurrentView('createdPlaylist');
}

function homePage() {
  favSongContainer.classList.add('hidden');
  mainContentArea.classList.remove('hidden');
  playlistContainer.classList.add('hidden');
  homePageID.classList.remove('hidden');

  // UI 
  showCreatedPLButton.classList.remove('bg-[#333]');
  showFavSongButton.classList.remove('bg-[#333]');

  saveCurrentView('homePage');
}

function showAccount() {
  homePageID.classList.add('hidden');
  letterPage.classList.add('hidden');
  accountPage.classList.remove('hidden');

  saveCurrentView('accountPage');
}

function showLetter() {
  homePageID.classList.add('hidden');
  letterPage.classList.remove('hidden');
  accountPage.classList.add('hidden');

  saveCurrentView('letterPage');
}
