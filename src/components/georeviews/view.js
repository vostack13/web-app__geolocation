import georeviewsTemplate from './georeviews.hbs'
import palcemarkTemplate from './placemark.hbs'
import style from './style.scss'

let events = {} // Объект событий компонента

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

// Функция создания placemark
function createPlacemark(paramsPlacemark = {}) {

        // Создаем макет балуна
        const balloonLayoutContent = ymaps.templateLayoutFactory.createClass(
            '<div id="balloon" class="balloon" data-coord="{{ properties.baloonInfo.coord }}">' +
                '<header> <h2 id="balloonTitle">{{ properties.baloonInfo.address }}</h2> <a id="close" href="#">&times;</a> </header>' +
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
                    const balloonTitle = document.getElementById('balloonTitle')
                    const commentsList = document.getElementById('commentsList')

                    commentButtonAdd.addEventListener('click', this.getInputs)
                    closeButton.addEventListener('click', this.onCloseClick.bind(this))
                },

                clear: function () {
                    commentButtonAdd.removeEventListener('click', this.getInputs)
                    // this.constructor.superclass.clear.call(this);
                },

                getInputs: function () {
                    const li = document.createElement('li')
                    const coord = balloon.getAttribute('data-coord')

                    let inputsValues = {
                        place: userPlace.value,
                        coord: paramsPlacemark.coord,
                        address: paramsPlacemark.address,
                        name: userName.value,
                        text: userComment.value,
                    }

                    li.textContent = userComment.value
                    
                    userName.value = ''
                    userPlace.value = ''
                    userComment.value = ''

                    commentsList.appendChild(li)
                    // console.log()
                    emitEventEmitter('addComment', inputsValues)
                },
                
                onCloseClick: function (e) {
                    e.preventDefault();
                    
                    this.events.fire('userclose');
                }
            }
        )
    
        return new ymaps.Placemark(paramsPlacemark.coord, {
            baloonInfo: paramsPlacemark,
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
}


function createClusterer(placemarks){
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
    
    return clusterer.add(placemarks)
}

function createObjectManager(placemarks) {
    let objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32,
        clusterDisableClickZoom: true
    });


}

export default {
    onEventEmitter,

    // Функция возвращает объект загруженной карты
    loadMap(nodeTarger, coordCenter) {
        return new Promise((resolve) => {
            ymaps.ready(() => {
                const objMap = new ymaps.Map(nodeTarger, {
                    center: coordCenter,
                    zoom:12
                }, {
                    searchControlProvider: 'yandex#search'
                });
                // console.log(objMap)
                resolve(objMap)
            })
        })
    },

    addToMap(map, placemarks){
        map.geoObjects.add(
            createClusterer(createPlacemark())
        )
        console.log(map.geoObjects)
    },

    addToMapAll(map, modelPlacemarks){
        const placemarks = modelPlacemarks.map(mark => {
            return createPlacemark(mark)
        })

        map.geoObjects.add(   
            createClusterer(placemarks)
        )
        // console.log(placemarks)
    }
}