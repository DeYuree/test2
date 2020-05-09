import {ref, firebaseDB} from '~/plugins/firebase'

const getters = {
    ALL_PRODUCTS_GETTER: (state) => {
        return state.products
    },

    ALL_CATEGORIES_GETTER: (state) => {
        return state.categories
    },

    GETTER_CURRENT_PAGE: (state) => {
        return state.currentPage
    },

    GETTER_PAGE_SIZE: (state) => {
        return state.pageSize
    },

    GETTER_CURRENT_PAGE_PRODUCTS: (state) => {
        let currentPageProducts = state.visibleProducts,
            start = (state.currentPage-1) * state.pageSize,
            end = start + state.pageSize

        return currentPageProducts.slice(start, end)
    }
}

const actions = {
    // async GET_ALL_PRODUCTS ({commit}) {
    //     await dispatch('getAlldocsFromCollection', { collection: 'products'} )
    //     commit('RESET_CURRENT_PAGE')
    // },

    async GET_CURRENT_PRODUCT ({commit}, payload) {
        let curProd = {}

        await firebaseDB.collection("products").get().then((docData) => {
            if (docData.size) {            
                docData.forEach((doc) => {                    
                    if(doc.data().link == payload.route.params.product) {
                        curProd = doc.data()
                    }
                })
            } else {
                return this.$nuxt.error({ statusCode: 404, message: 'not found' })
            }
        })
        await commit('SET_CURRENT_PRODUCT', curProd)
    },

    async GET_PRODUCTS_FOR_CATEGORY( {state, commit, dispatch}, {route} ) {

        await dispatch('getAlldocsFromCollection', { collection: 'categories'} )
        await dispatch('getAlldocsFromCollection', { collection: 'products'} )

        let currentCategory = state.categories.find(cat => cat.link === route.params.category)

        let visibleProducts = []

        await state.products.find(item => {
            if( (item.categories.main === currentCategory.id) ||
                item.categories.additional.some(arrItem => arrItem === currentCategory.id) ) { 
                visibleProducts.push(item)
            }
        })

        commit('SET_PRODUCTS_FOR_CATEGORY', visibleProducts)
        commit('RESET_CURRENT_PAGE')

    },

    async getAlldocsFromCollection ({state, commit }, payload) {
        let curCollection = []

        await firebaseDB.collection(payload.collection).get().then((docData) => {
            
            if (docData.size) {                
                docData.forEach((doc) => {
                    curCollection.push({ id: doc.id, ...doc.data() })
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("Ничего не найдено...")                
            }
        })

        await commit('SET_' + payload.collection.toUpperCase(), curCollection)
    }
}

const mutations = {
    SET_CATEGORIES: (state, payload) => {        
        state.categories = payload
    },

    SET_PRODUCTS: (state, payload) => {
        state.products = payload
    },

    SET_PRODUCTS_FOR_CATEGORY: (state, payload) => {
        state.visibleProducts = payload
    },

    SET_CURRENT_PRODUCT: (state, payload) => {
        state.product = payload
    },

    SET_CURRENT_PAGE: (state, payload) => {
        state.currentPage = payload
    },

    RESET_CURRENT_PAGE: (state) => {
        state.currentPage = 1
    },

    SORTING_PRODUCTS_FOR_CATEGORY: (state, payload) => {
        payload.direction == 'desc' ? state.visibleProducts.sort((a, b) => (a[payload.prop] < b[payload.prop] ? 1 : -1)) :
                                      state.visibleProducts.sort((a, b) => (a[payload.prop] < b[payload.prop] ? -1 : 1))
    }
}

const state = () => ({
    visibleProducts: [],
    pageSize: 4,
    currentPage: 1,
    categories: [
        // {id: '1V2DaXwv1c43bZv2r8R3', link: 'hot-weels', name: 'ХОТ ВИЛС'},
        // {id: 'X7tUpsb4vTwvBj0C7w36', link: 'pups', name: 'Куклы Pups'},
        // {id: 'pMbeAf61xIBAbiBm7Dc6', link: 'games', name: 'Игры и игрушки'},
    ],
    product: {},
    products: [
        // {
        //     id: "1",
        //     vendor: "Hot Wheels",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "11111Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-ataka-osminoga",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200.30,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/product_1.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/product_1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['X7tUpsb4vTwvBj0C7w36', 'pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "2",
        //     vendor: "Hot Wheels2",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "22222Набор игровой Hot Wheels Сити",
        //     link: "hot-weels-city",
        //     description: "Игровой набор Атака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 800,
        //     oldPrice: 1050,
        //     images: {
        //         mainImage: { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), label: "1 Модельные ЭКОКОЖА" },
        //         galleryImages: [
        //           { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_4.jpg'), alt: "1 Модельные ЭКОКОЖА" },
        //           { alt: "2 Модельные ЭКОКОЖА", src: require('~/static/product_2.jpg'), alt: "2 Модельные ЭКОКОЖА" },
        //           { alt: "3 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), alt: "3 Модельные ЭКОКОЖА" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "3",
        //     vendor: "Hot Wheels3",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "33333Набор игровой Hot Wheels Атака осьминога Набор с треком KidzTech Hot Wheels",
        //     link: "hot-weels-trek1",
        //     description: "Игровой набор Атака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 125.8,
        //     images: {
        //         mainImage: { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_1.jpg'), label: "1 Модельные ЭКОКОЖА" },
        //         galleryImages: [
        //           { alt: "1 Модельные ЭКОКОЖА", src: require('~/static/product_4.jpg'), alt: "1 Модельные ЭКОКОЖА" },
        //           { alt: "2 Модельные ЭКОКОЖА", src: require('~/static/product_2.jpg'), alt: "2 Модельные ЭКОКОЖА" },
        //           { alt: "3 Модельные ЭКОКОЖА", src: require('~/static/product_3.jpg'), alt: "3 Модельные ЭКОКОЖА" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: []
        //     }
        // },
        // {
        //     id: "4",
        //     vendor: "Hot Wheels",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "Товар 4",
        //     link: "hot-weels-ataka-osminoga2",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200.60,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good1.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/product_1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: null,
        //         additional: ['1V2DaXwv1c43bZv2r8R3']
        //     }
        // },
        // {
        //     id: "5",
        //     vendor: "Hot Wheels5345345",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "555555555Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-trek3333",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 154,
        //     oldPrice: 350,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good2.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/good3.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: '1V2DaXwv1c43bZv2r8R3',
        //         additional: ['X7tUpsb4vTwvBj0C7w36', 'pMbeAf61xIBAbiBm7Dc6']
        //     }
        // },
        // {
        //     id: "6",
        //     vendor: "Hot Wheels5345345",
        //     vendorCode: "000156",
        //     statusCode: "В наличии",
        //     title: "666666Набор игровой Hot Wheels Атака осьминога",
        //     link: "hot-weels-trek4",
        //     description: "Игровой набор Афонтака осьминога на пристани – это еще одна возможность спасти город Hot Wheels от нового монстра. Город снова в опасности. Теперь на его главную пристань напал осьминог. Он может крутить головой и захватывать машинку своими щупальцами. Успейте доехать до маяка и не попасть в лапы чудовища. Одержать победу более неожиданным способом поможет неограниченное количество разнообразных трюков, которые может",
        //     actualPrice: 200,
        //     images: {
        //         mainImage: { alt: "товар 1 главное фото", src: require('~/static/good3.jpg'), label: "товар 1 главное фото" },
        //         galleryImages: [
        //           { alt: "товар 1 фото 2", src: require('~/static/good1.jpg'), label: "товар 1 фото 2" },
        //           { alt: "товар 1 фото 3", src: require('~/static/product_2.jpg'), label: "товар 1 фото 3" },
        //           { alt: "товар 1 фото 4", src: require('~/static/product_3.jpg'), label: "товар 1 фото 4" },
        //         ],
        //     },
        //     categories: {
        //         main: null,
        //         additional: []
        //     }
        // }
    ]
})

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}