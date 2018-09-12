import Controller from './controller.js';

Controller.resultNode.addEventListener('click', (e) => {
    if (e.target.id === 'buttonLogout') {
        Controller.logout()
    }

    if (e.target.id === 'buttonLoginVk') {
        Controller.auth()
    }
})

export default {
    init() {
        Controller.render()

        // const 
    }
}