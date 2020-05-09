<template>
	<v-layout
		column
		justify-start
		align-start
	>
		<v-container fluid class="pa-4">
			<v-row no-gutters>
				<v-col cols='12' class="text-right pt-4">
					<cart-button />
				</v-col>
			</v-row>

			<v-row no-gutters>
				<v-col cols='12' sm="4" class="items-count">
					<fromto-of :currentPage="currentPage" />
				</v-col>
				<v-col cols='12' sm="4" class="">пагинация
				</v-col>
				<v-col cols='12' sm="4" class="">сортировка
				</v-col>
			</v-row>

			<v-row no-gutters class="pt-8">
				<template v-for="product in ALL_PRODUCTS_GETTER">
					<product-card :product="product" :key="product.id" />
				</template>
			</v-row>
		</v-container>



		<div class="test">используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum. .</div>
		<div class="test2">используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum. olores.</div>
		<div class="test3">используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum. olores.</div>
		<div class="test4">используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum. olores.</div>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import ProductCard from "@/components/product/ProductCard.vue"
import CartButton from "@/components/cart/CartButton.vue"
import FromtoOf from "@/components/page/FromtoOf.vue"

export default {
	components: {
	  ProductCard,
	  CartButton,
	  FromtoOf
	},
	data: () => ({
		pageSize: 5,
    	currentPage: 1,
	}),
	computed: {
		...mapGetters('products', [
			'ALL_PRODUCTS_GETTER'
		])
	}
}
</script>

<style lang="sass" scoped>
	.test
		font: 26px OwnHand
	.test2
		font: 26px Adigiana
	.test3
		font: 26px AngryBirds
	.test4
		font: 26px MooMoo
</style>
