<template>
	<v-col cols="12" sm="6" md="4" xl="3">
		<v-card class="product-card px-6 pt-6" raised shaped max-width="300px" min-width="170px" elevation="14">
			<nuxt-link :to="`/product/${product.link}`">
				<v-img
					:src="isImage"
					max-width="300px"
					max-height="250px"
					class="ma-0"
					contain
				></v-img>

				<v-card-title class="product-card__title py-2 px-0">
					{{product.title}}
				</v-card-title>

				<v-card-text class="product-card__price d-flex flex-column pt-2 pb-4 px-0">
					<div v-if="product.actualPrice" class="product-card__price_actual">{{product.actualPrice}} <span>руб</span></div>
					<div v-if="product.oldPrice" class="product-card__price_old">{{product.oldPrice}} <span>руб</span></div>
				</v-card-text>
			</nuxt-link>

			<to-cart :product="product" :fab="'fab'" :absolute="'absolute'" />

			<v-card-actions v-if="product.description" class="product-card__chevron pa-0">
				<v-btn
					icon
					absolute
					right
					retain-focus-on-click
					:ripple="false"
					x-small
					@click="showDescr = !showDescr"
				>	
					<v-slide-y-reverse-transition leave-absolute group>
						<v-icon v-if="showDescr"  key="extra-up">fas fa-chevron-up</v-icon>
						<v-icon v-if="!showDescr"  key="extra-down">fas fa-chevron-down</v-icon>
					</v-slide-y-reverse-transition>
				</v-btn>
			</v-card-actions>

			<v-slide-y-reverse-transition group leave-absolute hide-on-leave>
				<v-card-text 
					key="short"
					v-if="!showDescr"
					class="short-descr py-0 px-0 pr-4"
					:class="{'text-truncate': !showDescr}"
				>
					{{product.description}}
				</v-card-text>
				<v-card-text 
					v-if="showDescr" 
					key="full"
					class="product-card__descr pa-0 pb-4">
					{{product.description}}
				</v-card-text>
			</v-slide-y-reverse-transition>
		</v-card>
	</v-col>
</template>

<script>
import ToCart from '~/components/product/ToCart.vue'
	export default {
		props: ['product'],
		components: {
			ToCart
		},
		data: () => ({
			showDescr: false,
		}),
		computed: {
			isImage() {
				const test = this.product.images.mainImage.src
				return (this.product.images.mainImage == null || this.product.images.mainImage == "") ? 
					require("~/static/noProductImage.jpg") : 
					this.product.images.mainImage.src
			},
			generateLink() {
				let mainCat = this.product.categories.main.link
				return '/catalog/' + this.product.link
			}
		}
	}    
</script>

<style lang="sass" scoped>
.product-card
	background-color: $white-color
	margin: 0 auto 40px auto
	::v-deep
		.product-card__title
			font: 26px Adigiana
			color: $blue-color
			letter-spacing: 0.04em
			line-height: 0.85em
			word-break: normal
		.product-card__price
			.product-card__price_actual
				color: $red-color
				font-weight: bold
				font: 34px Adigiana
			.product-card__price_old
				color: $broun-color
				font: 18px Adigiana
				text-decoration: line-through
		.product-card__chevron
			position: relative
			height: 1px
			z-index: 5
			.v-btn
				top: 4px
				right: 0
				color: $broun-color
				&::before
					background: transparent
		.short-descr
			height: 38px
			font: 22px Adigiana
			color: $broun-color
			text-transform: lowercase
			line-height: 1em
			letter-spacing: 0.01em
			font-weight: normal
			opacity: 0.5
		.product-card__descr
			font: 22px Adigiana
			color: $broun-color
			text-transform: lowercase
			line-height: 1em
			letter-spacing: 0.01em
			font-weight: normal
</style>