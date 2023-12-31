import wild from '../assets/audio/wild.mp3'
import trainer from '../assets/audio/trainer.mp3'
import sei424E from '../assets/audio/sei424-easy.mp3'
import sei424 from '../assets/audio/sei424.mp3'
import sei424H from '../assets/audio/sei424-hard.mp3'
import kantoGL from '../assets/audio/kantoGL.mp3'

export const audioObj = {
    'wild': wild,
    'trainer': trainer,
    'sei424E': sei424E,
    'sei424': sei424,
    'sei424H': sei424H,
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