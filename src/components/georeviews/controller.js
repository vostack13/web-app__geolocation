import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
const resultNode = document.getElementById('main')

View.onEventEmitter('addComment', addComments)

function addComments(arg){
    
}

export default {
    resultNode,

    async render() {
        try {
            let map = await View.loadMap(resultNode, [55.76, 37.64])
            // const clusterer = View.renderMarks(Model.marks)
            // Model.addClusterer(clusterer)
        } catch (error) {
            console.error('Ошибка в render() ~controller.js: ', error);
        }
    },

}