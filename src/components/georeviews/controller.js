import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
const resultNode = document.getElementById('main')

export default {
    resultNode,

    async render() {
        try {
            const map = await Model.loadMap(resultNode)
            View.renderMarks(map, Model.marks)
            // console.log(map)

        } catch (error) {
            console.error('Ошибка в render() ~controller.js: ', error);
        }
    },

    addComments(){
        console.log(View.getBalloonInputs())
    }

}