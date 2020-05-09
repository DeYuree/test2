<template>
	<v-app class="app-body">
		
		<left-menu />

		<top-bar />

		<v-content>
			<v-container fluid class="pa-0">
				<nuxt />
			</v-container>			
		</v-content>	

		<foo-ter />
	</v-app>
</template>

<script>
import TopBar from '~/components/page/TopBar.vue'
import LeftMenu from '~/components/page/LeftMenu.vue'
import FooTer from '~/components/page/Footer.vue'
import { mapGetters } from 'vuex'
export default {
	components: {
		TopBar,
		LeftMenu,
		FooTer
	},
	computed: {
		...mapGetters('appSettings', [
			'GETTER_LEFT_MENU_MINI',
			'GETTER_LEFT_MENU_SHOW'
		])
	}
}
</script>


<style lang="sass" scoped>
.app-body
	margin: 0
	padding: 0
	background-image: url("~static/bg1.jpg")
	background-repeat: no-repeat
	background-position: 0 0
	background-attachment: fixed
	background-size: cover
	font-size: 16px
	min-width: 320px
	position: relative
	line-height: 1.6
	overflow-x: hidden
	transition: all .5s cubic-bezier(.55,0,.1,1)
</style>