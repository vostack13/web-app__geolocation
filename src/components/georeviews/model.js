let marks = [
    {
        coord: [55.76404, 37.602247],
        address: 'Москва, Сытинский переулок',
        users: [
            {
                name: 'Стасик',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Уютненьео туу'
            },
        ]
    },
    {
        coord: [55.756016, 37.637084],
        address: 'Москва, Петроверигский переулок, 6-8-10с1',
        users: [
            {
                name: 'Стасик',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Уютненьео туу'
            },
        ]
    },
    {
        coord: [55.74333, 37.601439],
        address: 'Москва, улица Остоженка, 5',
        users: [
            {
                name: 'Стасик',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
                date: '12.09.2018',
                place: 'Шоколадница',
                comments: 'Уютненьео туу'
            },
        ]
    },
]

function addMark(marks) {
    let result = marks
    


    return result
}

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

    // Функция возвращает объект загруженной карты
    loadMap(nodeTarger) {
        return new Promise((resolve) => {
            ymaps.ready(() => {
                const map = new ymaps.Map(nodeTarger, {
                    center: [55.76, 37.64],  // Москва
                    zoom:12
                }, {
                    searchControlProvider: 'yandex#search'
                });
                resolve(map)
            })
        })
    },

}