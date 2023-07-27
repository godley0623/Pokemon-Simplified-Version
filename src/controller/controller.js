export function capFirstLetter(str) {
    const firstLetter = str.charAt(0)

    const firstLetterCap = firstLetter.toUpperCase()

    const remainingLetters = str.slice(1)

    return firstLetterCap + remainingLetters
}

export function setPageBackground(bg) {
    const html = document.querySelector('html');
    html.style.backgroundImage = `url(${bg})`;
    html.style.backgroundSize = '100% 100%';
    html.style.backgroundRepeat = 'no-repeat';
}