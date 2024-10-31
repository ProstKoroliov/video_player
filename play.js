
const MAX = 400; 
let loop;

function init() { 
    media = document.getElementById("media"); 
    play = document.getElementById("play"); 
    mute = document.getElementById("mute"); 
    bar = document.getElementById("bar"); 
    progress = document.getElementById("progress"); 
    volume = document.getElementById("volume"); 

    play.addEventListener("click", push); 
    media.addEventListener("click", push); 
    mute.addEventListener("click", sound); 
    bar.addEventListener("click", move); 
    volume.addEventListener("input", changeVolume); // Добавляем обработчик для ползунка громкости
} 

function move(e) { 
    if (!media.ended) { 
        let mouseX = e.pageX - bar.offsetLeft; 
        let newTime = mouseX * media.duration / MAX; 
        media.currentTime = newTime; 
        progress.style.width = `${mouseX}px`; 
    } 
} 

let lastVolume = 1; // Переменная для хранения последнего уровня громкости

function changeVolume() {  
    lastVolume = this.value; // Сохраняем текущее значение громкости 
    media.volume = lastVolume;  
    
    // Проверяем, если громкость равна 0
    if (lastVolume == 0) {
        mute.querySelector('img').src = "img/sound off.svg"; // Устанавливаем картинку "sound off"
    } else {
        mute.querySelector('img').src = "img/sound.svg"; // Устанавливаем картинку "sound on"
    }
    
    updateMuteIcon();  
}
    
function sound() {    
    if (!media.muted) {    
        media.muted = true;    
        volume.value = 0; 
        media.volume = 0; 
        mute.querySelector('img').src = "img/sound off.svg";
        updateMuteIcon(); 
    } else {    
        media.muted = false;    
        media.volume = lastVolume; // Восстанавливаем сохраненное значение громкости
        volume.value = lastVolume; // Обновляем ползунок громкости
        mute.querySelector('img').src = "img/sound.svg";
        updateMuteIcon(); 
    }    
}

function push() {  
    if (!media.paused && !media.ended){  
        media.pause();  
        play.querySelector('img').src = "img/pause.svg"; // Измените на изображение для воспроизведения 
        clearInterval(loop);  
    } else {  
        media.play();  
        play.querySelector('img').src = "img/play.svg"; // Измените на изображение для паузы 
        loop = setInterval(myStatys, 1000);  
    }  
}  

function myStatys() { 
    if (!media.ended) { 
        let size = media.currentTime * MAX / media.duration; 
        progress.style.width = `${parseInt(size)}px`; 
    } else { 
        progress.style.width = "0"; 
        play.querySelector('img').src = "img/play.svg"; 
        clearInterval(loop); 
    } 
} 

addEventListener('load', init);