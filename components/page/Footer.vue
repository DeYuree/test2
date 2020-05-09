<template>
	<v-layout class="footer-app">
		<v-footer 
			app 
			inset 
			absolute 
			height="auto" 
			width="auto" 
			max-width="100%" 
			padless
			class="footer-top">
			<v-container class="pa-0 pt-2" fluid>
				<v-row class="pa-0 ma-0" no-gutters>
					<v-col cols="12" class="text-center hidden-xs-only" sm="4">
						<v-card>
							<v-card-title>Каталог</v-card-title>
							<v-divider class="divider"></v-divider>
							<v-card-text>
								<v-list>
									<v-list-item
										v-for="footerLink in this.GETTER_LEFT_MENU_LINKS"
										:key="footerLink.title"
										nuxt
										:to="footerLink.link"
										active-class
										:ripple=false
									>
										<v-list-item-title v-text="footerLink.title"></v-list-item-title>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" class="text-center" sm="4">
						<v-card>
							<v-card-title>О магазине</v-card-title>
							<v-divider class="divider"></v-divider>
							<v-card-text>
								<v-list>
									<v-list-item
										v-for="footerLink in this.GETTER_TOP_LINKS"
										:key="footerLink.title"
										nuxt
										:to="footerLink.link"
										active-class
										:ripple=false
									>
										<v-list-item-title v-text="footerLink.title"></v-list-item-title>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" class="text-center hidden-xs-only" sm="4">
						<v-card>
							<v-card-title>О магазине</v-card-title>
							<v-divider class="divider"></v-divider>
							<v-card-text>
								<p>Услуги оказывает: ИП </p>
								<p>УНП: </p>
								<p>Режим работы: Ежедневно с 10.00 до 22.00</p>
								<p>Офис и склад находится в Минске</p>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-footer>

		<v-footer 
			fixed 
			app 
			padless 
			class="footer-bottom">
			<v-container class="px-0 py-1">
				<v-row align="center" no-gutters>
					<v-col cols="12" class="pa-0 pr-sm-3 pt-1 text-center text-sm-right" sm="6">
						<nuxt-link class="copyright" :to="'/'">&copy; {{ new Date().getFullYear() }} gulki.by</nuxt-link>
					</v-col>
					<v-col cols="12" class="media pa-0 pl-sm-3" sm="6">
						<social-links :justify="(this.windowWidth > 600) ? 'start' : 'center'"></social-links>
					</v-col> 
				</v-row>
			</v-container>
		</v-footer>
	</v-layout>
</template>

<script>
import SocialLinks from '~/components/page/SocialLinks.vue'

import { mapGetters } from 'vuex'

export default {
	components: {
		SocialLinks
	},
	data: () => ({
		windowWidth: 0
	}),
	mounted() {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize)
	},
	computed: {
		...mapGetters('appSettings', ['GETTER_TOP_LINKS', 'GETTER_LEFT_MENU_LINKS'])
	},
	methods: {
		handleResize() {
			this.windowWidth = window.innerWidth
		}	
  	}
}
</script>

<style lang="sass" scoped>
.footer-app
	background-color: transparent
	::v-deep
		.footer-top
			background-color: rgba($white-color, 0.95) !important
			background: none
			border-radius: 24px 0px
			margin-bottom: 57px
			.v-card
				background: none
				box-shadow: none
				border: none
				.v-card__title
					justify-content: center
					margin: 10px 0 10px 0
					padding: 0
					text-transform: uppercase
					font: 18px Adigiana
					letter-spacing: 1px
					color: $broun-color
				.divider
					width: 30%
					left: 35%
					position: relative
					border-color: $broun-color
				.v-card__text
					color: $light-color
					padding: 10px 0 10px 0
					.v-list
						background: transparent
						padding: 0
						.v-list-item
							padding: 0
							min-height: 18px
							&:before
								background: none !important
							.v-list-item__title
								text-align: center
								transition: color 0.4s
								font: 20px MooMoo
								font-weight: bold
								letter-spacing: 1px
								color: $blue-color
							&:hover
								background: none !important
								.v-list-item__title
									color: $broun-color
								.v-list-item--active
									color: $broun-color
					p
						font: 16px MooMoo
						line-height: 1em
						letter-spacing: 0.01em
						color: rgba(11, 6, 3, 0.6)
						margin-bottom: 0
		.footer-bottom
			background-color: rgba($light-color, .9) !important
			z-index: 10		
			.copyright
				font-weight: bold
				color: $blue-color
				font: 24px Adigiana
				letter-spacing: 1px

		@include media-xs-only
			.footer-top
				margin-bottom: 89px

</style>