const marks = [
    {
        coord: [55.76404, 37.602247],
        address: 'Москва, Сытинский переулок',
        users: [
            {
                name: 'Стасик',
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
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
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
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
                comments: 'Это очень крутое место на карте'
            },
            {
                name: 'Максим',
                comments: 'Уютненьео туу'
            },
        ]
    },
]



export default {
    async loadMap(nodeTarger, balloonCustomTemplate) {
        let myMap
        let clusterer
        await ymaps.ready(() => {
            myMap = new ymaps.Map(nodeTarger, {
                center: [55.76, 37.64],  // Москва
                zoom: 13
            }, {
                searchControlProvider: 'yandex#search'
            });

            clusterer = new ymaps.Clusterer({
                present: 'islands#invertedVioletClusterIcons',
                clusterDisableClickZoom: true,
                openBalloonOnClick: true,
                clusterBalloonContentLayout: 'cluster#balloonCarousel',
                clusterBalloonCycling: false,
            })

            const placemarks = marks.map(mark => {
                console.log(mark)
                return new ymaps.Placemark(mark.coord, {}, {
                    present: 'islands#blueHomeCircleIcon',
                    balloonContentLayout: ymaps.templateLayoutFactory.createClass(balloonCustomTemplate(mark))
                })
            })
            
            clusterer.add(placemarks)
            myMap.geoObjects.add(clusterer);


            // myMap.events.add('click', function (e) {
    
            //     ymaps.geocode(e.get('coords'))
            //         .then (result => {
            //             let firstObj = result.geoObjects.get(0)
            //             console.log(result)
            //             console.log(firstObj.geometry.getCoordinates())
            //             console.log(firstObj.getAddressLine())
            //     }).catch( (e) => console.error(e))
            // });
        })

    }
}