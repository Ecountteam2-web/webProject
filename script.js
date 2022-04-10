let colors = [
    '#111',
    '#171010',
    '#423F3E',
    '#362222',
    '#111'
]

let container = document.getElementById('test');

container.onwheel = changeBgColor;

let colorIndex = 0;
let scrollValue = 0;
let dateNow = Date.now();

function changeBgColor(e) {
    scrollValue += e.deltaY * 0.01;
    console.log(Math.floor(scrollValue));
    timePassed = Date.now() - dateNow;
    if (scrollValue > 10 && timePassed > 500) {
        dateNow = Date.now();
        colorIndex += 1;
        if (colorIndex > colors.length-1) colorIndex = 0;
        
        container.style.backgroundColor = colors[colorIndex];
        scrollValue = 0;
    }

    if (scrollValue < -10 && timePassed > 500) {
        dateNow = Date.now();
        colorIndex -= 1;
        if (colorIndex < 0) colorIndex = colors.length-1;

        container.style.backgroundColor = colors[colorIndex];
        scrollValue = 0;
    }
}


let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'https://docs.google.com/uc?export=open&id=1uYqmA_NC6ccIk-tN4KR4PeHPCS3Nsi3r',
        name: 'Youngblood',
        artist: '5 Seconds of Summer',
        music: "https://docs.google.com/uc?export=open&id=14ApisTH_EJqsigrpFssfXayIa-W43DbZ"
    },
    {
        img: "https://docs.google.com/uc?export=open&id=1d_rQdX_z3SbinTWhq24P9heH02imGlqm",
        name: 'Day 1',
        artist : 'HONNE',
        music: "https://docs.google.com/uc?export=open&id=1aHRjEIJ_jkdJ5jGDaWgai7VJeGUjCVR2"
    },
    {
        img: 'https://docs.google.com/uc?export=open&id=1J5IrqkQ37PTgz9_mW4QCqaz6fYKPjYnF',
        name: 'Warm On A Cold Night',
        artist: 'HONNE',
        music: 'https://docs.google.com/uc?export=open&id=1PNaSnGL-wyGgUFy8lE-LrDk5UgwKqpx-'
    },
    {
        img: 'https://docs.google.com/uc?export=open&id=1ofJLLGbhnhQxWSvbFPcrc-W_Bj2jMDyE',
        name: 'Taste the feeling',
        artist: 'Avicii',
        music: 'https://docs.google.com/uc?export=open&id=1pEo9hQ4h_STsf-AnNpG3F6ClhMgy8Dp4'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){// ���� �������� �����ϴ� �Լ�
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    //document.body.style.background = gradient; //���� ���� �����ϴ°� �׶��̼�����
    document.body.style.backgroundColor = "#111111"; //���� ���� �����ϴ°�
}
function mute_Volume() {
    curr_track.volume = 0;
    volume_slider.value = 0;
}
function max_Volume() {    
    curr_track.volume = 1;
    volume_slider.value = 100;
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}