import Vue from 'vue'
import Vuex from 'vuex'

import appSettings from './modules/appSettings'
import products from './modules/products'
import cart from './modules/cart'
import message from './modules/message'
import firebase from './modules/firebase'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        appSettings,
        products,
        cart,
        message,
        firebase
    },

    strict: process.env.MODE_ENV !== 'production'
})

export default store