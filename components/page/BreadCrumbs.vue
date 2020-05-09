<template>
	<v-breadcrumbs :items="crumbs" divider=">" class="breadcrumbs pa-0">
		<template v-slot:item="{ item }">
			<v-breadcrumbs-item 
				class="breadcrumbs_item"
				nuxt
				:to="item.to"
				:disabled="item.disabled"
				exact
				exact-active-class="active"
			>
				{{ item.text }}				
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
		...mapGetters('products', ['ALL_PRODUCTS_GETTER', 'ALL_CATEGORIES_GETTER']),
        crumbs() {			
			let breadcrumbs = []

			// home link
			breadcrumbs.push({
				to: '/catalog',
				text: 'Каталог'
			})

			// crumb for category page
			if(this.$route.params.category) {				
				let currentCat = this.ALL_CATEGORIES_GETTER.find( cat => cat.link === this.$route.params.category)

				breadcrumbs.push({
					to: currentCat.link,
					text: currentCat.name
				})
			}

			// crumb for product page

			if(this.$route.params.product) {	
				let currentProd = this.ALL_PRODUCTS_GETTER.find(prod => prod.link === this.$route.params.product)
				
				let currentCat = this.ALL_CATEGORIES_GETTER.find( cat => cat.id === currentProd.categories.main)
				
				// link for product main category
				if(currentCat) {
					breadcrumbs.push({
						to: '/catalog/' + currentCat.link,
						text: currentCat.name
					})
				}

				// last link for product
				breadcrumbs.push({
					to: currentProd.link,
					text: currentProd.title
				})
			}
			
			return breadcrumbs
        }
    }
}
</script>

<style lang="sass" scoped>
.breadcrumbs
	::v-deep
		.breadcrumbs_item a
			font: 16px OwnHand
			text-transform: lowercase
			font-weight: bold
			letter-spacing: 1px
			color: $blue-color
			transition: color 0.4s
			&:hover
				color: $red-color !important
			&.active
				color: rgba($dark-color, 0.5)
		.v-breadcrumbs__divider
			font: 18px OwnHand
			padding: 0 8px 2px 8px
			color: $blue-color
			font-weight: bold
</style>