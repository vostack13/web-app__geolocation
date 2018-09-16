import Controller from './controller.js';

export default {
    init() {
        Controller.render()

        // document.addEventListener('click', (e) => {
        //     if (e.target.id === 'commentButtonAdd'){
        //         console.log(e.target.id)
        //         Controller.addComments()
        //     }
        // })
    }
}