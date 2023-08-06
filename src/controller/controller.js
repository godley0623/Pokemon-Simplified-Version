export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function capFirstLetter(str) {
    const firstLetter = str.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = str.slice(1)

    return firstLetterCap + remainingLetters
}

export function lowerFirstLetter(str) {
    const firstLetter = str.charAt(0)

    const firstLetterCap = firstLetter.toLowerCase()

    const remainingLetters = str.slice(1)

    return firstLetterCap + remainingLetters
}

export function setPageBackground(bg, bgSize='100% 100%', bgColor='white') {
    const html = document.querySelector('html');
    html.style.backgroundColor = bgColor
    html.style.backgroundImage = `url(${bg})`;
    html.style.backgroundSize = bgSize;
    html.style.backgroundRepeat = 'no-repeat';
}

export function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}