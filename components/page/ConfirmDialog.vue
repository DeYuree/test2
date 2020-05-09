<template>
	<v-dialog
		persistent
		v-model="isVisible"
		max-width="290"
	>
	  <v-card class="pb-2">
		<div class="text-center pt-8 pb-5">
			<v-icon>fas fa-question-circle</v-icon>
		</div>
		<v-card-title class="justify-center px-0 py-0">{{headerText}}</v-card-title>

		<v-card-text class="slot-data pa-0">
			<slot></slot>
		</v-card-text>

		<v-card-actions class="pt-0 px-4">         
		  <v-btn
		  	class="cancel"
			text
			@click="choose(false)"
		  >
			{{cancelButton}}
		  </v-btn>
		<v-spacer></v-spacer>
		  <v-btn
			class="confirm px-4"
			text
			rounded
			@click="choose(true)"
		  >
			{{confirmButton}}
		  </v-btn>
		</v-card-actions>
	  </v-card>
	</v-dialog>
</template>

<script>
export default {
	props:[
		'cancelButton', 
		'confirmButton', 
		'headerText',
		'isVisible'
		],
	methods: {
		choose(value) {
			this.$emit('close', value)
		}
	}
}
</script>

<style lang="sass" scoped>
	.v-icon
		font-size: 48px
		color: $red-color
	.v-card__title
		word-break: keep-all
		font: 28px MooMoo !important
		font-weight: bold !important
		line-height: 20px
		color: $broun-color
	.slot-data
		font: 20px Adigiana !important
		line-height: 18px !important
		color: $dark-color
	.v-btn
		font: 18px MooMoo
		color: $broun-color
		font-weight: bold
		&.confirm
			background-color: $red-color !important
			transition: all .4s
			outline: 0
			height: 44px
			color: $white-color
			font-weight: normal
			&:hover, &:active, &:focus
				background-color: $blue-color !important
		&::before
			background: transparent
</style>