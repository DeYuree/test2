<template>
	<v-layout
		column
		justify-start
		align-start
	>
		<v-container fluid class="pa-4" v-if="this.GETTER_CURRENT_PAGE_PRODUCTS.length">
			<v-row no-gutters>
				<v-col cols='12' class="text-right py-4">
					<cart-button />
				</v-col>
			</v-row>

			<v-row no-gutters class="control-panel elevation-8 px-6 py-2">
				<v-col cols='12' sm="4" class="items-count">
					<fromto-of :total="visibleProducts.length" />
				</v-col>
				<v-col cols='12' sm="4" class="">
					<pagination-links
						v-if="visibleProducts.length > this.GETTER_PAGE_SIZE"
						:total="visibleProducts.length" />
				</v-col>
				<v-col cols='12' sm="4" class="d-flex justify-end">
					<v-spacer />
					<sort-by class="flex-grow-0" />
				</v-col>
			</v-row>

			<v-row no-gutters class="pt-8 products">				
				<v-fade-transition group>
				<!-- <transition-group name="tweets" tag="span"> -->
					<template v-for="product in this.GETTER_CURRENT_PAGE_PRODUCTS">				
						<product-card :product="product" :key="product.id" />									
					</template>
				<!-- </transition-group> -->
				</v-fade-transition>
			</v-row>

			<v-row no-gutters>
				<v-col cols='12' class="text-center pb-4">
					<pagination-links
						v-if="visibleProducts.length > this.GETTER_PAGE_SIZE"
						:total="visibleProducts.length" />
				</v-col>
			</v-row>
		</v-container>

		<v-container fluid class="pa-4" v-if="!this.GETTER_CURRENT_PAGE_PRODUCTS.length">
			<v-row no-gutters>
				<v-col cols='12' class="text-right py-4">
					<cart-button />
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col cols='8' class="pb-8 offset-2">
					<v-card class="d-flex flex-column align-center justify-center no-data">
						<v-card-text class="d-flex justify-center">
							<v-img :src="require('~/static/no-data.png')" alt="" max-width="200px"></v-img>
						</v-card-text>
						<v-card-title class="pa-0 pb-8">В этом разделе пока нет товаров</v-card-title>
					</v-card>					
				</v-col>
			</v-row>
		</v-container>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import ProductCard from "@/components/product/ProductCard.vue"
import CartButton from "@/components/cart/CartButton.vue"
import FromtoOf from "@/components/page/FromtoOf.vue"
import PaginationLinks from "@/components/page/PaginationLinks.vue"
import SortBy from "@/components/page/SortBy.vue"

export default {
    components: {
	  ProductCard,
	  CartButton,
	  FromtoOf,
	  PaginationLinks,
	  SortBy
	},
    computed: {
		...mapGetters('products', ['GETTER_CURRENT_PAGE_PRODUCTS', 'GETTER_PAGE_SIZE']),
		...mapState('products', {
			visibleProducts: 'visibleProducts'
		})
	},
	async asyncData ({ route, error, store }) {
		try {//console.log(route)
			await store.dispatch('products/GET_ALL_PRODUCTS')
			} catch (err) {
			console.log(err)
			return error({
				statusCode: 404,
				message: 'Категория не найдена или сервер не доступен'
			})
		}
	},
    methods: {
		...mapActions('products', ['GET_ALL_PRODUCTS']),
    }
}
</script>

<style lang="sass" scoped>
.control-panel
	background-color: rgba($light-color, 0.95) !important
	border-radius: 24px 4px
.products
	> span
		display: flex
		flex-wrap: wrap
		width: 100%
.no-data
	background-color: rgba($light-color, 0.95) !important
	border-radius: 24px 4px !important
	min-height: 100px
	.v-card__title
		font: 26px MooMoo
		font-weight: bold
		color: $broun-color
</style>