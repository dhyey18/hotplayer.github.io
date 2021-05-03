const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const music = document.querySelector("audio");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
  {
    name: "mrsk",
    displayName: "Main Rang Sharbaton ka",
    artist: "Arijit Singh",
  },
  {
    name: "ppp",
    displayName: "Pehla Pyar",
    artist: "Armaan Malik",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// on load select first song
loadSong(songs[songIndex]);

//  Update progressBar

// e --> event object , which contain many attribute
// among then we are using srcElement
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // To Display the duration
    const durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    if (durationSec < 10) {
      durationSec = `0${durationSec}`;
    }
    // to avoid NAN
    if (duration > 0) {
      durationEl.textContent = `${durationMin}:${durationSec}`;
    }

    // To Display the currentTime
    let curretnMin = Math.floor(currentTime / 60);
    let curretnSec = Math.floor(currentTime % 60);
    if (curretnSec < 10) {
      curretnSec = `0${curretnSec}`;
    }
    currentTimeEl.textContent = `${curretnMin}:${curretnSec}`;
  }
}

function setProgressBar(e) {
  // 'this' refer to the element that receve the event
  //  this --> progressContainer , in our case
  width = this.clientWidth;
  const currentWidth = e.offsetX;
  const { duration } = music;
  music.currentTime = (currentWidth / width) * duration;
}

// Event Listner
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", playSong);
