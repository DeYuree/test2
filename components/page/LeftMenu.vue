<template>
	<v-navigation-drawer
			:value="this.GETTER_LEFT_MENU_SHOW"
			:mini-variant="this.GETTER_LEFT_MENU_MINI"
			clipped
			fixed
			floating
			app
			class="left-menu"
		>

		<social-links />

		<v-list>
			<v-list-item
				v-for="(link, i) in this.GETTER_LEFT_MENU_LINKS"
				:key="i"
				:to="'/catalog/' + link.link"
				exact
				dense
			>
				<v-list-item-content>
					<v-list-item-title v-text="link.title" />
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import SocialLinks from '~/components/page/SocialLinks.vue'

export default {
	components:{
		SocialLinks
	},
	computed: {
		...mapGetters('appSettings', [
			'GETTER_LEFT_MENU_SHOW',
			'GETTER_LEFT_MENU_MINI',
			'GETTER_LEFT_MENU_LINKS'
		])
	}
}
</script>

<style lang="sass" scoped>
.left-menu
	background-color: rgba($white-color, 0.95)
	a
		transition: all 0.4s
		.v-list-item__title
			font: 28px MooMoo
			font-weight: bold
			color: $broun-color
			transition: all 0.4s
		&:hover , &.v-list-item--active
			background-color: $broun-color
			.v-list-item__title
				color: $light-color
</style>