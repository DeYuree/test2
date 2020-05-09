<template>
	<v-container fluid class="pa-0">
		<v-row>
			<v-col cols='12' class='social pa-0' v-if="this.GETTER_SOCIAL_LINKS.length">
				<v-row class="ma-0" :justify="justifyAlign">
					<a :href="social.link" 
						v-for="(social, i) in this.GETTER_SOCIAL_LINKS" 
						:key="i" 
						target="_blank" 
						fab 
						icon 
						small 
						class="pa-3">
						<v-icon>{{ social.icon }}</v-icon>
					</a>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	props: ['justify'],
	computed: {
		...mapGetters('appSettings', [
			'GETTER_SOCIAL_LINKS'
		]),
		justifyAlign() {
			if(!this.justify){ //default val
				return 'center'
			}
			else {
				return this.justify.toString()
			}
		}
	},
}
</script>

<style lang="sass" scoped>
.social
	a
		text-decoration: none
		i
			color: $broun-color
			transition: all 0.4s
		&:hover i
			color: $red-color
</style>