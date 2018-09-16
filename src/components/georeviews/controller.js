import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
const resultNode = document.getElementById('main')

View.onEventEmitter('addComment', addComments)

function addComments(arg){
    console.log('Из контроллера: ' + arg)
}

export default {
    resultNode,

    async render() {
        try {
            const map = await Model.loadMap(resultNode)
            View.renderMarks(map, Model.marks)

        } catch (error) {
            console.error('Ошибка в render() ~controller.js: ', error);
        }
    },

}