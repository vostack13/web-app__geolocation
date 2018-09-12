import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
import { resolve } from 'path';
const resultNode = document.getElementById('main')



export default {
    resultNode,

    render() {
        const model = Model.getUser()
        View.render(resultNode, {authorization: true}, model)
        this.loadMap()

        // ymaps.ready(function(){
        //     let myMap = new ymaps.Map('main', {
        //         center: [55.76, 37.64],  // Москва
        //         zoom: 5
        //     }, {
        //         searchControlProvider: 'yandex#search'
        //     });
        //  });

    },

    async loadMap() {
        await ymaps.ready(function(){
            let myMap = new ymaps.Map('main', {
                center: [55.76, 37.64],  // Москва
                zoom: 5
            }, {
                searchControlProvider: 'yandex#search'
            });
        })
    }

}