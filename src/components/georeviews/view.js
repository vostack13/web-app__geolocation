import georeviewsTemplate from './georeviews.hbs'
import palcemarkTemplate from './placemark.hbs'
import style from './style.scss'


// Объект событий компонента
let events = {}

// Функция для вызова пользовательского события
function emitEventEmitter(type, ...arg) {
    if(events[type]) {
        events[type].forEach(callback => callback(arg));
    }
}

// Функция для подписывание на события
function onEventEmitter(type, callback) {
    events[type] = events[type] || []
    events[type].push(callback)
}

export default {
    onEventEmitter,

    renderMarks(propertiesMarks = []) {
        // Создаем макет балуна
        const balloonLayoutContent = ymaps.templateLayoutFactory.createClass(
            '<div id="balloon" class="balloon" data-id="{{ properties.baloonInfo.id }}">' +
                '<header> <h2> {{ properties.baloonInfo.address }} </h2> <a id="close" href="#">&times;</a> </header>' +
                '<main>' +
                    '<ul id="commentsList">' +
                        '{% for place in properties.baloonInfo.places %}' +
                            '<li>' + 
                                '<h4 class="comment__name">{{ place.name_user}} </h4>' +
                                '<span class="comment__place">{{ place.name_place }} </span>' +
                                '<span class="comment__date">{{ place.date }}</span>' +
                                '<p class="comment__text">{{ place.comments }}</p>' +
                            '</li>' +
                        '{% endfor %}' +
                    '</ul>' +
                    '<h3> Ваш отзыв </h3>' +
                    '<input id="userName" placeholder="Ваше имя" type="text"><br>' +
                    '<input id="userPlace" placeholder="Укажите место" type="text"><br>' +
                    '<textarea name="" id="userComment" placeholder="Поделитесь впечатлениями" rows="5"></textarea><br>' +
                    '<button id="commentButtonAdd">Добавить</button>' +
                '</main>' +
            '</div>', 

            {
                build: function () {
                    this.constructor.superclass.build.call(this);

                    const commentButtonAdd = document.getElementById('commentButtonAdd')
                    const closeButton = document.getElementById('close')
                    const userName = document.getElementById('userName')
                    const userPlace = document.getElementById('userPlace')
                    const userComment = document.getElementById('userComment')
                    const balloon = document.getElementById('balloon')


                    commentButtonAdd.addEventListener('click', this.getInputs)
                    closeButton.addEventListener('click', this.onCloseClick.bind(this))
                },

                clear: function () {
                    commentButtonAdd.removeEventListener('click', this.getInputs)
                    this.constructor.superclass.clear.call(this);
                },

                getInputs: function () {
                    const id = balloon.getAttribute('data-id')
                    let inputsValues = {
                        name_user: userName.value, 
                        name_place: userPlace.value, 
                        comments: userComment.value
                    }
                    
                    userName.value = ''
                    userPlace.value = ''
                    userComment.value = ''

                    emitEventEmitter('addComment', id, inputsValues)
                },

                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                }
            }
        )

        const placemarks = propertiesMarks.map(mark => {
            return new ymaps.Placemark(mark.coord, {
                baloonInfo: mark,
            }, {
                present: 'islands#blueHomeCircleIcon',
                // balloonLayout: balloonLayoutTemp,
                balloonContentLayout: balloonLayoutContent,
                balloonPanelMaxMapArea: 0,
                hideIconOnBalloonOpen: false,
                balloonOffset: [3, -40],
                balloonMaxWidth: 380,
                balloonMaxHeight: 528,
                balloonCloseButton: false
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
        // console.log(clusterer)
        // objMap.geoObjects.add(clusterer)
        return clusterer
    }

}