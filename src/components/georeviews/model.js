let marks_old = [
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

let placemarks = [
    {
        place: 'Шоколадница',
        coord: [55.76404, 37.602247],
        address: 'Москва, Сытинский переулок',
        name: 'Антон',
        text: 'Очень интересное место',
        date: '18.09.2018' 
    },
    {
        place: 'Burger King',
        coord: [55.76404, 37.602247],
        address: 'Москва, Сытинский переулок',
        name: 'Вячеслав',
        text: 'Вкусные бургеры, буду чаще сюда приходить',
        date: '19.09.2018' 
    },
    {
        place: 'Спортмастер',
        coord: [55.756016, 37.637084],
        address: 'Москва, Петроверигский переулок, 6-8-10с1',
        name: 'Сергей',
        text: 'Очень большой выбор крутых красовок. Я доволен',
        date: '17.09.2018' 
    }
]

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
    placemarks,
    
    getAllPlacemarks(){
        let result = []
        
        
        return result
    }
    // addClusterer(clusterer){
    //     // console.log(clusterer)
    //     objMap.geoObjects.add(clusterer)
    //     // console.log(objMap)
    // },

    // addCommentModel(id, arg){
    //     marks[id].places.push(arg)
    //     // console.log(marks[id])
        
    // }

}