<template>
	<v-select
		@change="sortBy(selected)"
		class="content-sort"
		v-model="selected"
		:items="items"
		label="Сначала"
		dense
		color="#ea2d0f"
		hide-selected
		hide-details>
	</v-select>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	data: () => ({
		selected: '',
		items: [
			// {
			//     text: "Популярные",
			//     value: "no",
			// },
			{
				text: 'Дешевые',
				value: 'actualPrice',
			},
			{
				text: 'Дорогие',
				value: 'actualPrice_DESC',
			},
			{
				text: 'По алфавиту',
				value: 'title',
			},
		]
	}),

	computed: {
		...mapGetters('products', ['GETTER_CURRENT_PAGE_PRODUCTS'])
	},

	methods: {
		...mapMutations('products', ['SORTING_PRODUCTS_FOR_CATEGORY']),

		sortBy(chechedProp) {
			let checkOrder = this.selected.split("_")

			checkOrder[1] == "DESC" ? this.SORTING_PRODUCTS_FOR_CATEGORY({prop: checkOrder[0], direction: 'desc'}) :
									  this.SORTING_PRODUCTS_FOR_CATEGORY({prop: chechedProp, direction: 'asc'})
		}
	}
}
</script>

<style lang="sass" scoped>
.content-sort
	width: 200px
	font: 22px MooMoo
	font-weight: bold
	color: $white-color
	::v-deep
		.v-select__selection, .v-select__slot label
			color: $broun-color
			font-size: 20px
</style>