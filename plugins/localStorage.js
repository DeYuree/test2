export default ({store}) => {

    //read local storage for shopping cart
    if(localStorage.getItem('shopping_cart')) {
        store.commit('cart/INIT_inCartItems_FROM_LOCALSTORAGE', JSON.parse(localStorage.getItem('shopping_cart')), {root: true})
    }

    //set local storage for shopping cart
    store.subscribe((mutation) => {
        if (mutation.type.startsWith('cart')){
            store.dispatch('cart/SET_LOCAL_STORAGE_CART', {root: true})
        }
    });

}