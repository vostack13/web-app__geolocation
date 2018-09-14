import georeviewsTemplate from './georeviews.hbs'
import palcemarkTemplate from './placemark.hbs'
import clusterTemplate from './cluster.hbs'
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

    renderMarks(objMap = {}, propertiesMarks = []) {
        const placemarks = propertiesMarks.map(mark => {
            return new ymaps.Placemark(mark.coord, {
                baloonInfo: mark
            }, {
                present: 'islands#blueHomeCircleIcon',
                balloonContentLayout: ymaps.templateLayoutFactory.createClass(
                    palcemarkTemplate(mark)),
            })
        })

        const clusterer = new ymaps.Clusterer({
            present: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: ymaps.templateLayoutFactory.createClass(
                '<div class=ballon_body>{{ properties.baloonInfo.address|raw }}</div>'
            ),
            clusterBalloonCycling: false,
        })

        clusterer.add(placemarks)
        objMap.geoObjects.add(clusterer)

        // const commentButtonAdd = document.getElementById('commentButtonAdd')
        
        // commentButtonAdd.addEventListener('click', (e) => {

        // })

    },

    getBalloonInputs(){
        let resultObj = {}
        const userName = document.getElementById('userName')
        const userPlace = document.getElementById('userPlace')
        const userComment = document.getElementById('userComment')
        // const commentsList = document.getElementById('commentsList')

        // const li = document.createElement('li')
        // const name = document.createElement('b')
        // const comment = document.createElement('p')

        resultObj.name = userName.value
        resultObj.comments = userComment.value

        return resultObj

        // li.appendChild(name)
        // li.appendChild(comment)
        // commentsList.appendChild(li)
    }

    // renderComments

}