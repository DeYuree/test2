<template>
	<v-container fluid class="main-content">
		<v-row no-gutters>
			<v-col cols="10" class="main-content__block offset-1 mt-12 d-flex flex-column align-center">				
				<v-row no-gutters class="my-4">
					<h3 class="text-center mx-auto mt-12">Спасибо за заказ!</h3>
				</v-row>
				<v-row no-gutters  class="my-12">
					<v-col cols="12" class="d-flex flex-column justify-center">
						<div class="text-center">Ваш заказ <span class="mx-6">{{ this.$route.params.orderNumber }}</span> принят.</div>
						<div class="text-center">В ближайшее время с Вами свяжется специалист для подтверждения заказа и уточнения деталей</div>
					</v-col>
				</v-row>
				<v-row no-gutters class="my-12">
					<v-col cols="12">
						<v-btn 
							class="px-4" 
							height="48px" 
							text 
							rounded
							nuxt
							:to="'/'">
							Продолжить покупки
						</v-btn>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
.main-content
	::v-deep
		.main-content__block
			background-color: rgba($white-color, .95)
			border-radius: 24px 4px
			min-height: 300px
			h3
				color: $broun-color
				font: 36px Adigiana
				text-transform: lowercase
				font-weight: bold
				letter-spacing: 2px
				line-height: 32px
			div
				color: rgba($dark-color, 0.7)
				font: 22px OwnHand
				text-transform: lowercase
				font-weight: bold
				letter-spacing: 2px
				line-height: 32px
				span
					color: $blue-color
					font: 36px Adigiana
			.v-btn
				background-color: $red-color !important
				transition: all .4s				
				&:hover, &:active, &:focus
					background-color: $blue-color !important
				&::before
					background: transparent
				.v-btn__content
					color: $white-color
					font: 22px MooMoo
</style>