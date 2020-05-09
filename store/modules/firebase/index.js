import {ref, firebaseDB} from '~/plugins/firebase'

const actions = {
    async writeToDB({commit}, order) {
        let routesArr = []

        await firebaseDB.collection('categories').get().then(res => {
            res.docs.map(category => {
                routesArr.push('/catalog/' + category.data().link)
            })
        })

        await firebaseDB.collection('products').get().then(res => {
            res.docs.map(product => {
                routesArr.push('/product/' + product.data().link)
            })
        })

        // console.log(routesArr)



        // if (process.browser) {
        //     window.$nuxt.$loading.start()
        // }

        // let DBCollection = firebaseDB.collection(order.collection)            
        // DBCollection.add(order.order) // write to DB            
               
        // if (process.browser) {
        //     setTimeout(() =>
        //         window.$nuxt.$loading.finish()
		// 	, 1000) 
        // }
    }
}

const state = () => ({

})

export default {
    namespaced: true,
    actions,
    state
}