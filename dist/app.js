const favSong = document.querySelector('#favorite-song');
const createdPlaylist = document.querySelector('#created-playlist');

favSong.addEventListener('click', function () {
createdPlaylist.style.backgroundColor = '';
  favSong.classList.add('bg-[#444]');
  favSong.classList.add('hover:bg-[#555]');
  createdPlaylist.classList.remove('bg-[#444]');
})

createdPlaylist.addEventListener('click', function () {
  createdPlaylist.classList.add('bg-[#444]');
  createdPlaylist.classList.add('hover:bg-[#555]');
  favSong.classList.remove('bg-[#444]');
})
