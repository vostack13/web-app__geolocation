import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
import view from '../header/view.js';
const resultNode = document.getElementById('main')

View.onEventEmitter('addComment', addComments)

function addComments(arg){
    Model.addModelPlacemark(arg)
    // View.addToMap(Model.Map, Model.addModelPlacemark(arg))
    View.addToMap(Model.Map, Model.placemarks)
}

export default {
    resultNode,

    async render() {
        try {
            Model.Map = await View.loadMap(resultNode, [55.76, 37.64])
            // View.addToMap(map, Model.placemarks[0])
            View.addToMapAll(Model.Map, Model.placemarks)
            // const clusterer = View.renderMarks(Model.marks)
            // Model.addClusterer(clusterer)
        } catch (error) {
            console.error('Ошибка в render() ~controller.js: ', error);
        }
    },

}