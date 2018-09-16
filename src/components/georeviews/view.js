import georeviewsTemplate from './georeviews.hbs'
import palcemarkTemplate from './placemark.hbs'
import style from './style.scss'


// Объект событий компонента
let events = {}

// Функция для вызова пользовательского события
function emitEventEmitter(type, arg) {
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

    renderMarks(objMap = {}, propertiesMarks = []) {
        // Создание макета содержимого балуна.
        const balloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon">' +
                '<header> {{ properties.baloonInfo.address }} </header>' +
                '<main>' +
                    '<ul id="commentsList">' +
                        '{% for user in properties.baloonInfo.users %}' +
                            '<li>' + 
                                '<b>{{ user.name }}</b>' +
                                '<p>{{ user.comments }}</p>' +
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
                    balloonLayout.superclass.build.call(this);

                    const userName = document.getElementById('userName')
                    const commentButtonAdd = document.getElementById('commentButtonAdd')

                    commentButtonAdd.addEventListener('click', this.onCounterClick)
                },

                clear: function () {
                    commentButtonAdd.removeEventListener('click', this.onCounterClick)
                    balloonLayout.superclass.clear.call(this);
                },

                onCounterClick: function () {
                    // console.log('Внутри шаблона маркера: ' + userName.value)
                    emitEventEmitter('addComment', userName.value)
                }
            }
        )
        const placemarks = propertiesMarks.map(mark => {
            return new ymaps.Placemark(mark.coord, {
                baloonInfo: mark
            }, {
                present: 'islands#blueHomeCircleIcon',
                balloonContentLayout: balloonLayout
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
    }

}