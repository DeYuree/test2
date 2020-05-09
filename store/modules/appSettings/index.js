const state = () => ({
    leftMenuMini: false,
    leftMenuShow: true,
    topLinks: [
        { link: "/catalog", icon: "catalog", title: "Каталог" },
        { link: "/page/about", icon: "info", title: "О магазине" },
        { link: "/page/contacts", icon: "warning", title: "Контакты" },
        { link: "/page/delivery", icon: "warning", title: "Оплата и доставка" }
    ],
    leftMenuLinks: [
        { title: "Hot Weels", link: "hot-weels", sub: null },
        { title: "Куклы Pups", link: "pups" },
        { title: "Автоаксессуары", link: "accesories", sub: null },
    ],
    socialLinks: [
        {
        icon: 'fab fa-facebook',
        color: 'indigo',
        link: "https://www.facebook.com"
        },
        {
        icon: 'fab fa-vk',
        color: 'cyan darken-1',
        link: "https://www.vk.com"
        },
        {
        icon: 'fab fa-instagram',
        color: 'red lighten-3',
        link: "https://www.instagram.com"
        },
        {
        icon: 'fab fa-viber',
        color: 'red lighten-3',
        link: "https://www.viber.com"
        }
    ]
})

const getters = {
    GETTER_TOP_LINKS: (state) => {
        return state.topLinks
    },
    GETTER_LEFT_MENU_MINI: (state) => {
        return state.leftMenuMini
    },
    GETTER_LEFT_MENU_SHOW: (state) => {
        return state.leftMenuShow
    },
    GETTER_LEFT_MENU_LINKS: (state) => {
        return state.leftMenuLinks
    },
    GETTER_SOCIAL_LINKS: (state) => {
        return state.socialLinks
    }
}

const actions = {
    SET_LEFT_MENU_MINI: ({commit}, payload) => {
        commit('CHANGE_LEFT_MENU_MINI', payload)
    },
    SHOW_LEFT_MENU: ({commit}, payload) => {
        commit('CHANGE_LEFT_MENU_SHOW', payload)
    }
}

const mutations = {
    CHANGE_LEFT_MENU_MINI: (state, payload) => {
        state.leftMenuMini = payload
    },
    CHANGE_LEFT_MENU_SHOW: (state, payload) => {
        state.leftMenuShow = payload
    }
}

export default {
    namespaced: true,
    getters,
    actions,
    mutations,
    state
}