let marks = [
    {
        id: 0,
        coord: [55.76404, 37.602247],
        address: 'Москва, Сытинский переулок',
        places: [
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
        ]
    },
    {
        id: 1,
        coord: [55.756016, 37.637084],
        address: 'Москва, Петроверигский переулок, 6-8-10с1',
        places: [
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
        ]
    },
    {
        id: 2,
        coord: [55.74333, 37.601439],
        address: 'Москва, улица Остоженка, 5',
        places: [
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
            {
                name_place: 'Шоколадница',
                name_user: 'Стасик',
                date: '12.09.2018',
                comments: 'Это очень крутое место на карте'
            },
        ]
    },
]

let objMap = {}

// myMap.events.add('click', function (e) {
    
//     ymaps.geocode(e.get('coords'))
//         .then (result => {
//             // let firstObj = result.geoObjects.get(0)
//             // console.log(result)
//             // console.log(firstObj.geometry.getCoordinates())
//             // console.log(firstObj.getAddressLine())

//             const placemark = new ymaps.Placemark(e.get('coords'), {
//                     baloonInfo: []
//                 }, {
//                     present: 'islands#blueHomeCircleIcon',
//                     balloonContentLayout: ymaps.templateLayoutFactory.createClass(
//                         placemarkBalloonTemplate()),
//                 })

//             clusterer.add(placemark)
//     }).catch( (e) => console.error(e))
// });


export default {
    marks,
    objMap,
    // Функция возвращает объект загруженной карты
    loadMap(nodeTarger) {
        return new Promise((resolve) => {
            ymaps.ready(() => {
                objMap = new ymaps.Map(nodeTarger, {
                    center: [55.76, 37.64],  // Москва
                    zoom:12
                }, {
                    searchControlProvider: 'yandex#search'
                });
                console.log(objMap)
                resolve()
            })
        })
    },

    addClusterer(clusterer){
        console.log(clusterer)
        objMap.geoObjects.add(clusterer)
        console.log(objMap)
    },

    addCommentModel(id, arg){
        marks[id].places.push(arg)
        console.log(marks[id])
        
    }

}