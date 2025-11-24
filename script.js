const songs = [
    {
        title: "First Song",
        artist: "Artist A",
        src: "audio/song1.mp3",
        cover: "image/cover.png",
    },
    {
        title: "Second Song",
        artist: "Artist B",
        src: "audio/song2.mp3",
        cover: "image/cover.png",
    },
    {
        title: "Third Song",
        artist: "Artist C",
        src: "audio/song3.mp3",
        cover: "image/cover.png",
    },
    {
        title: "Four Song",
        artist: "Artist D",
        src: "audio/song4.mp3",
        cover:"image/cover.png",
    }
];


let currentSong = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playlist = document.getElementById('playlist');

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
    updatePlaylist();
}

function playSong() {
    audio.play().then(() => {
        playBtn.textContent = "⏸️";
    }).catch(error => {
        console.error("Playback failed:", error);
    });
}
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}
playBtn.onclick = () => {
    if (audio.paused) playSong();
    else pauseSong();
};
prevBtn.onclick = () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
};
nextBtn.onclick = () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
};
audio.ontimeupdate = () => {
    if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
};
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};
volume.oninput = () => {
    audio.volume = volume.value;
};
audio.onended = () => nextBtn.onclick();

function updatePlaylist() {
    playlist.innerHTML = '';
    songs.forEach((song, idx) => {
        const div = document.createElement('div');
        div.className = 'playlist-item' + (idx === currentSong ? ' active' : '');
        div.textContent = `${song.title} – ${song.artist}`;
        div.onclick = () => { currentSong = idx; loadSong(idx); playSong(); };
        playlist.appendChild(div);
    });
}
loadSong(currentSong);
audio.volume = volume.value;
