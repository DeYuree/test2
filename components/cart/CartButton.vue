<template>
	<v-badge color="#fff" overlap left>
		<template v-slot:badge>{{GETTER_IN_CART_ITEMS.length}}</template>
			<v-btn
				class="cart-button"
				rounded
				v-ripple="false"
				:to="`/cart`">
				<v-icon class="pr-2">fab fa-opencart</v-icon> Корзина
			</v-btn>
		</v-badge>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	computed: {
		...mapGetters('cart', ['GETTER_IN_CART_ITEMS'])
	}
}
</script>

<style lang="sass" scoped>
.v-badge
	::v-deep
		.cart-button
			color: $white-color
			background-color: $red-color !important
			font: 18px MooMoo
			transition: all .4s
			text-transform: uppercase
			&:hover, &:active, &:focus
				background-color: $blue-color !important
			&::before
				background: transparent
			&.incart
				background-color: $blue-color !important
		.v-badge__badge
			color: $blue-color
			font-weight: bold
</style>