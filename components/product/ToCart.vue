<template>
	<v-card-actions class="product-card__actions pa-0 mx-2">
		<v-btn
			top
			:fab='fab'
			rounded
			:ripple="false"
			:absolute="absolute"
			class="px-4"
			:class="isAdded ? 'product-card__actions_to-cart incart' : 'product-card__actions_to-cart'"
			@click.stop="isAdded ? removeFromCart(product) : addToCart(product)"
			>
				<v-slide-y-reverse-transition leave-absolute group>				
					<v-icon v-if="!isAdded" key="cart">fab fa-opencart</v-icon>
					<span v-if="toCartText && !isAdded" key="cartText" class="pl-3">{{toCartText}}</span>

					<v-icon v-if="isAdded" key="remove">fas fa-trash-alt</v-icon>
					<span v-if="removeFromCartText && isAdded" key="fromCartText" class="pl-3">{{removeFromCartText}}</span>
				</v-slide-y-reverse-transition>
				
		</v-btn>

		<quick-message />
	</v-card-actions>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import QuickMessage from '@/components/page/QuickMessage.vue'

export default {
	props: ['product', 'fab', 'absolute', 'toCartText', 'removeFromCartText'],
	components: {
		QuickMessage
	},
	computed: {
		...mapGetters('cart', ['GETTER_IN_CART_ITEMS']),
		isAdded: {
			get() {
				return this.GETTER_IN_CART_ITEMS.some(item => item.id == this.product.id)
			},
			set() {

			}			
		}
	},
	methods: {
		...mapMutations('cart', ['ADD_ITEM_TO_CART', 'REMOVE_ITEM_FROM_CART']),
		...mapActions('message', ['INIT_MESSAGE', 'clearMessage']),
		addToCart(item) {
			let message = {
				mainText: this.product.title,
				extraText: 'Добавлен в корзину:',
				color: 'green accent-4',
				icon: 'fas fa-check'
			}
			this.clearMessage()

			let prod = this.product
			prod.quantity = 1

			setTimeout(() =>
				this.INIT_MESSAGE(message),
				this.ADD_ITEM_TO_CART(item)
			, 400)			
		},

		removeFromCart(item) {
			let message = {
				mainText: this.product.title,
				extraText: 'Вы убрали из корзины:',
				color: 'red lighten-1',
				icon: 'fas fa-minus-circle'
			}
			this.clearMessage()

			setTimeout(() =>
				this.INIT_MESSAGE(message),
				this.REMOVE_ITEM_FROM_CART(item)
			, 400)
		}
	}
}
</script>

<style lang="sass" scoped>
.product-card__actions
	position: relative
	height: 1px
	top: -47px
	.product-card__actions_to-cart
		background-color: $red-color !important
		transition: all .4s
		outline: 0
		right: 0
		height: 56px
		color: $white-color
		font: 18px MooMoo
		&:hover, &:active, &:focus
			background-color: $blue-color !important
		&::before
			background: transparent
		&.incart
			background-color: $blue-color !important
		
</style>