import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
const resultNode = document.getElementById('main')

View.onEventEmitter('addComment', addComments)

function addComments(arg){
    let [id, params] = arg
    Model.addCommentModel(id, params)
    const clusterer = View.renderMarks(Model.marks)
    Model.addClusterer(clusterer)
    
}

export default {
    resultNode,

    async render() {
        try {
            await Model.loadMap(resultNode)
            const clusterer = View.renderMarks(Model.marks)
            Model.addClusterer(clusterer)

        } catch (error) {
            console.error('Ошибка в render() ~controller.js: ', error);
        }
    },

}