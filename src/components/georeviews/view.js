import georeviewsTemplate from './georeviews.hbs'
import palcemarkTemplate from './placemark.hbs'
import style from './style.scss'

export default {
    render(resultNode, paramState = {}, model) {
        resultNode.innerHTML = georeviewsTemplate(model)
        
    //     const headerUser = document.getElementById('headerUser')
    //     const buttonLogout = document.getElementById('buttonLogout')
    //     if (paramState.authorization === true) {
    //         headerUser.classList.add('hide')
    //         buttonLogout.classList.remove('hide')
    //     } else if (paramState.authorization === false) {
    //         headerUser.classList.remove('hide')
    //         buttonLogout.classList.add('hide')
    //     }
    },
    
    renderPlacemark(param = {}) {
        return palcemarkTemplate(param)
    }
}