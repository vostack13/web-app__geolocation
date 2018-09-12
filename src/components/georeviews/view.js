import georeviewsemplate from './georeviews.hbs'
import style from './style.scss'

export default {
    render(resultNode, paramState = {}, model) {
        resultNode.innerHTML = georeviewsemplate(model)
        
    //     const headerUser = document.getElementById('headerUser')
    //     const buttonLogout = document.getElementById('buttonLogout')
    //     if (paramState.authorization === true) {
    //         headerUser.classList.add('hide')
    //         buttonLogout.classList.remove('hide')
    //     } else if (paramState.authorization === false) {
    //         headerUser.classList.remove('hide')
    //         buttonLogout.classList.add('hide')
    //     }
    }
}