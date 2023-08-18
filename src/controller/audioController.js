import wild from '../assets/audio/wild.mp3'
import trainer from '../assets/audio/trainer.mp3'
import kantoGL from '../assets/audio/kantoGL.mp3'

const audioObj = {
    'wild': wild,
    'trainer': trainer,
    'kantoGL': kantoGL
}

export function setAudio(mp3, volume = .05) {
    let audio = new Audio(audioObj[mp3]);
    audio.volume = volume;

    return audio;
}

export function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}