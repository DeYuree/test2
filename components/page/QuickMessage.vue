<template>
	<v-fade-transition>
		<v-snackbar
			:color="MESSAGE_GETTER.color"
			top
			right
			v-model="MESSAGE_GETTER.isVisible"
			:timeout=0
			@click="clearMessage"
		>
			<v-row justify="start" align="center">
				<v-col cols="2">
					<v-icon>{{MESSAGE_GETTER.icon}}</v-icon>
				</v-col>
				<v-col
					cols="10"
					class="text-start pl-0"
				>
					<span>{{MESSAGE_GETTER.extraText}}</span>
					<h4 class="pt-2">{{MESSAGE_GETTER.mainText}}</h4>
				</v-col>
			</v-row>
		</v-snackbar>
	</v-fade-transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	computed:{
		...mapGetters('message', [
			'MESSAGE_GETTER'
		]),
	},
	methods: {
		...mapActions('message', [
			'clearMessage'
		])
	}
	
}
</script>

<style lang="sass" scoped>
	.v-snack
		::v-deep
			.v-snack__wrapper
				width: 300px
				min-width: 300px		
				transition: opacity 0.4s
				cursor: pointer
				opacity: 0.90
				border-radius: 10px
				box-shadow: 0px 6px 8px -1px rgba(0, 0, 0, 0.1)
				.v-snack__content
					letter-spacing: 0.1em
					.v-icon
						color: $white-color
					h4
						font: 22px AngryBirds
						text-transform: lowercase
						line-height: 18px						
						color: $white-color
					span
						font: 22px MooMoo
						line-height: 18px
						color: $broun-color
						font-weight: bold
				&:hover
					opacity: 1
</style>