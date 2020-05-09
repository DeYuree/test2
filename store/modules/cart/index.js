const state = () => ({
    inCartItems: [],
    checkedDelivery: 1123,
    disabledMark: false,
    orderFields: {
        customerName: null,
        customerFullName: null,
        phoneNumber: null,
        zipCode: null,
        deliveryCity: null,
        deliveryAddress: null,
        comment: null,
    },
    deliveryTypes: [
        {   
            id: 1123,
            label: 'Самовывоз', 
            description: 'адреса ПВЗ пр-т г. Звезда 47',
            cost: null, 
            costProcent: false, 
            active: true,
            availPay: [
                '1', '2', '3'
            ],
            fields: {
                customerName: {
                    display: true, 
                    required: false, 
                    label: 'Ваше имя', 
                    hintText: 'Как к вам можно обращаться',
                    icon: 'fa-users'                
                },
                phoneNumber: {
                    display: true,
                    required: true, 
                    label: 'Ваш телефон', 
                    hintText: 'телефон с кодом оператора (99) 999-99-99',
                    icon: '+375',
                    mask: '(##) ###-##-##',
                    counter: 14,
                    errors: `this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.required ? ["Обязательное поле"] : 
                    (this.$v.phoneNumber.counter != 14) ? ["Номер телефона введен некорректно"] : []`
                },
                comment: {
                    display: true,
                    required: false, 
                    label: 'Комментарий', 
                    hintText: 'Все, что считаете нужным сообщить дополнительно',
                    icon: 'fa-comment-alt',
                    counter: 200,
                    maxLength: 200,
                    type: 'textarea'
                }      
            }
        },
        {   
            id: 2,
            label: 'Почта', 
            description: '7% от суммы посылки, минимум 5 рублей',
            cost: 7, 
            costProcent: true,
            active: true,
            availPay: [
                '4'
            ],
            fields: {
                customerFullName: { 
                    display: true,
                    label: 'ФИО получателя посылки', 
                    hintText: 'Полное ФИО для почты',
                    icon: 'fa-address-card' 
                },
                phoneNumber: {
                    display: true,
                    required: true, 
                    label: 'Ваш телефон', 
                    hintText: 'телефон с кодом оператора (99) 999-99-99',
                    icon: '+375',
                    mask: '(##) ###-##-##',
                    //errors: `this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.required ? ["Обязательное поле"] : []`
                },
                zipCode: {
                    display: true, 
                    required: false, 
                    label: 'Почтовый индекс', 
                    hintText: '6 значный индекс, например 999999',
                    counter: '6',
                    icon: 'fa-search-location',
                    mask: '######',
                    counter: 6,
                    minLength: 6,
                },
                deliveryCity: {
                    display: true, 
                    required: true, 
                    label: 'Город', 
                    hintText: 'Ваш населенный пункт',
                    icon: 'fa-map-marked-alt',
                    errors: `this.$v.deliveryCity.$dirty && !this.$v.deliveryCity.required ? ["Обязательное поле"] : []`
                }, 
                deliveryAddress: {
                    display: true, 
                    required: true, 
                    label: 'Ваш адрес', 
                    hintText: 'Полный адрес доставки',
                    icon: 'fa-home',
                    errors: `this.$v.deliveryAddress.$dirty && !this.$v.deliveryAddress.required ? ["Обязательное поле"] : []`
                },
            }
        },
        {   
            id: 3,
            label: 'Курьер',
            description: '12 рублей курьером в любой город',
            cost: 12, 
            costProcent: false,
            active: true,
            availPay: [
                '1', '3'
            ],
            fields: {
                customerName: {
                    display: true, 
                    required: false, 
                    label: 'Ваше имя', 
                    hintText: 'Как к вам можно обращаться',
                    icon: 'fa-users'
                },
                phoneNumber: {
                    display: true,
                    required: true, 
                    label: 'Ваш телефон', 
                    hintText: 'телефон с кодом оператора (99) 999-99-99',
                    icon: '+375',
                    mask: '(##) ###-##-##',
                    // errors: `this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.required ? ["Обязательное поле"] : []`
                },
                deliveryCity: {
                    display: true, 
                    required: true, 
                    label: 'Город', 
                    hintText: 'Ваш населенный пункт',
                    icon: 'fa-map-marked-alt',
                    errors: `this.$v.deliveryCity.$dirty && !this.$v.deliveryCity.required ? ["Обязательное поле"] : []`
                }, 
                deliveryAddress: {
                    display: true, 
                    required: true, 
                    label: 'Ваш адрес', 
                    hintText: 'Полный адрес доставки',
                    icon: 'fa-home',
                    errors: `this.$v.deliveryAddress.$dirty && !this.$v.deliveryAddress.required ? ["Обязательное поле"] : []`
                },
            }
        },
        {   
            id: 4,
            label: 'По Минску',
            description: 'По Минску бесплатная',
            cost: null, 
            costProcent: false,
            active: true,
            availPay: [
                '1', '3'
            ],
            fields: {
                customerName: {
                    display: true, 
                    required: false, 
                    label: 'Ваше имя', 
                    hintText: 'Как к вам можно обращаться',
                    icon: 'fa-users'
                },
                phoneNumber: {
                    display: true,
                    required: true, 
                    label: 'Ваш телефон', 
                    hintText: 'телефон с кодом оператора (99) 999-99-99',
                    icon: '+375',
                    mask: '(##) ###-##-##',
                    // errors: `this.$v.phoneNumber.$dirty && !this.$v.phoneNumber.required ? ["Обязательное поле"] : []`
                },
                deliveryAddress: {
                    display: true, 
                    required: true, 
                    label: 'Ваш адрес', 
                    hintText: 'Полный адрес доставки',
                    icon: 'fa-home',
                    errors: `this.$v.deliveryAddress.$dirty && !this.$v.deliveryAddress.required ? ["Обязательное поле"] : []`
                },
                comment: {
                    display: true,
                    required: false, 
                    label: 'Комментарий', 
                    hintText: 'Все, что считаете нужным сообщить дополнительно',
                    icon: 'fa-comment-alt',
                    counter: 200,
                    maxLength: 200,
                    type: 'textarea'
                }
            }
        },
    ]
})


const getters = {
    GETTER_IN_CART_ITEMS: (state) => {
        return state.inCartItems
    },
    GETTER_DELIVERY_TYPES: (state) => {
        return state.deliveryTypes
    },
    GETTER_DISABLED_MARK: (state) => {
        return state.disabledMark
    },
    GETTER_CHECKED_DELIVERY: (state) => {
        return state.checkedDelivery
    },
    GETTER_ORDER_FIELDS: (state) => {
        return state.orderFields
    }
}

const actions = {
    SET_LOCAL_STORAGE_CART: ({state}) => {
        window.localStorage.setItem('shopping_cart', JSON.stringify(state.inCartItems))
    }
}

const mutations = {
    ADD_ITEM_TO_CART: (state, payload) => {
        state.inCartItems.push(payload)
    },

    REMOVE_ITEM_FROM_CART: (state, item) => {
        state.inCartItems = state.inCartItems.filter(cartItem => cartItem.id !== item.id)
    },

    INCREASE_ITEM_QUANTITY: (state, item) => {
        state.inCartItems = state.inCartItems.map(stateItem => {
            if(stateItem.id == item.id) {
                ++stateItem.quantity
                return stateItem
            }
            else {
                return stateItem
            }
        })
    },

    DECREASE_ITEM_QUANTITY: (state, item) => {
        state.inCartItems = state.inCartItems.map(stateItem => {
            if(stateItem.id == item.id && stateItem.quantity > 1) {
                --stateItem.quantity
                return stateItem
            }
            else {
                return stateItem
            }
        })
    },

    INIT_inCartItems_FROM_LOCALSTORAGE: (state, payload) => {
        state.inCartItems = payload
    },

    CHANGE_DISABLED_MARK: (state, flag) => {
        state.disabledMark = flag
    },

    CHANGE_CHECKED_DELIVERY: (state, flag) => {
        state.checkedDelivery = flag
    },

    CHANGE_ORDER_FIELDS: (state, payload) => {
        for (let item in payload) {           
            state.orderFields[item] = payload[item]
        }
    },

    CLEAR_CART: (state) => {
        state.inCartItems = []
        state.checkedDelivery = null
        state.disabledMark = false
        state.orderFields = {
            customerName: null,
            customerFullName: null,
            phoneNumber: null,
            zipCode: null,
            deliveryCity: null,
            deliveryAddress: null,
            comment: null,
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}