import style from './style.scss'
import header from './components/header/router.js'
import georeviews from './components/georeviews/router.js';

var State = {
    authorization: false
}

document.addEventListener("DOMContentLoaded", () => {
    header.init()
    georeviews.init()
});

export {
    State
}