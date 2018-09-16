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
        // const balloonLayoutTemp = ymaps.templateLayoutFactory.createClass( 
            // '',
            
        //     {
        //         build: function () {
        //             balloonLayoutTemp.superclass.build.call(this);

        //             const userName = document.getElementById('userName')
        //             const commentButtonAdd = document.getElementById('commentButtonAdd')
        //             const balloon = document.querySelector('.balloon')

        //             commentButtonAdd.addEventListener('click', this.onCounterClick)
        //         },

        //         clear: function () {
        //             commentButtonAdd.removeEventListener('click', this.onCounterClick)
        //             balloonLayoutTemp.superclass.clear.call(this);
        //         },

        //         onSublayoutSizeChange: function () {
        //             balloonLayoutTemp.superclass.onSublayoutSizeChange.apply(this, arguments);

        //             if(!this._isElement(this.balloon)) {
        //                 return;
        //             }

        //             this.applyElementOffset();

        //             this.events.fire('shapechange');
        //         },

        //         applyElementOffset: function () {
        //             this.balloon.css({
        //                 left: -(this.balloon[0].offsetWidth / 2),
        //                 top: -(this.balloon[0].offsetHeight + this.balloon.find('.arrow')[0].offsetHeight)
        //             });
        //         },

        //         getShape: function () {
        //             if(!this._isElement(this.balloon)) {
        //                 return balloonLayoutTemp.superclass.getShape.call(this);
        //             }

        //             var position = this.balloon.position();

        //             return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
        //                 [position.left, position.top], [
        //                     position.left + this.balloon[0].offsetWidth,
        //                     position.top + this.balloon[0].offsetHeight + this.balloon.find('.arrow')[0].offsetHeight
        //                 ]
        //             ]));
        //         },

        //         onCounterClick: function () {
        //             // console.log('Внутри шаблона маркера: ' + userName.value)
        //             emitEventEmitter('addComment', userName.value)
        //         },
        //     }
        // )

        
        const balloonLayoutContent = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon">' +
                '<header> <h2> {{ properties.baloonInfo.address }} </h2> <a id="close" href="#">&times;</a> </header>' +
                '<main>' +
                    '<ul id="commentsList">' +
                        '{% for user in properties.baloonInfo.users %}' +
                            '<li>' + 
                                '<h4 class="comment__name">{{ user.name }} </h4>' +
                                '<span class="comment__place">{{ user.place }} </span>' +
                                '<span class="comment__date">{{ user.date }}</span>' +
                                '<p class="comment__text">{{ user.comments }}</p>' +
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

                    const userName = document.getElementById('userName')
                    const commentButtonAdd = document.getElementById('commentButtonAdd')
                    const closeButton = document.getElementById('close')
                    const balloon = document.querySelector('.balloon')

                    commentButtonAdd.addEventListener('click', this.onCounterClick)
                    closeButton.addEventListener('click', this.onCloseClick.bind(this))
                },

                clear: function () {
                    commentButtonAdd.removeEventListener('click', this.onCounterClick)
                    this.constructor.superclass.clear.call(this);
                },

                onCounterClick: function () {
                    emitEventEmitter('addComment', userName.value)
                },

                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                // onSublayoutSizeChange: function () {
                //     balloonLayoutTemp.superclass.onSublayoutSizeChange.apply(this, arguments);

                //     if(!this._isElement(this.balloon)) {
                //         return;
                //     }

                //     this.applyElementOffset();

                //     this.events.fire('shapechange');
                // },

                // applyElementOffset: function () {
                //     this.balloon.css({
                //         left: -(this.balloon[0].offsetWidth / 2),
                //         top: -(this.balloon[0].offsetHeight + this.balloon.find('.arrow')[0].offsetHeight)
                //     });
                // },

                // getShape: function () {
                //     if(!this._isElement(this.balloon)) {
                //         return balloonLayoutTemp.superclass.getShape.call(this);
                //     }

                //     var position = this.balloon.position();

                //     return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                //         [position.left, position.top], [
                //             position.left + this.balloon[0].offsetWidth,
                //             position.top + this.balloon[0].offsetHeight + this.balloon.find('.arrow')[0].offsetHeight
                //         ]
                //     ]));
                // },
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
        objMap.geoObjects.add(clusterer)
    }

}