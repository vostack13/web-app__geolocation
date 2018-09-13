import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'
const resultNode = document.getElementById('main')

export default {
    resultNode,

    render() {
        Model.loadMap(resultNode, View.renderPlacemark)
    }

}