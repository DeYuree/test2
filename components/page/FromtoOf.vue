<template>
	<div>
		Товары:
			<span>{{fromToDisplay}}</span>
		из {{total}}
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	props: ['total'],
	computed: {
		...mapGetters('products', ['GETTER_PAGE_SIZE', 'GETTER_CURRENT_PAGE']),
		...mapState('products', {
			visibleProducts: 'visibleProducts'
		}),
		fromToDisplay() {
			const start = (this.GETTER_CURRENT_PAGE * this.GETTER_PAGE_SIZE+1)-this.GETTER_PAGE_SIZE;
			const end = ((this.GETTER_CURRENT_PAGE * this.GETTER_PAGE_SIZE)-this.GETTER_PAGE_SIZE) + this.GETTER_PAGE_SIZE;
			return start + "-" + ((end <= this.visibleProducts.length) ? end : this.visibleProducts.length);
		}
	}
}
</script>

<style lang="sass" scoped>
div
	color: $broun-color
	font: 26px MooMoo
	font-weight: bold
	::v-deep
		span
			color: $red-color
</style>