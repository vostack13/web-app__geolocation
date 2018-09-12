import {State} from './../../index.js'
import Model from './model.js'
import View from './view.js'

const resultNode = document.getElementById('header')

export default {
    resultNode,
    render(){
        const model = Model.getUser()
        View.render(resultNode, {authorization: false}, model)
    },
    auth() {
        const model = Model.getUser()
        View.render(resultNode, {authorization: true}, model)
    },
    logout() {
        const model = Model.getUser()        
        View.render(resultNode, {authorization: false}, model)
    }
}