<template>
	<v-fade-transition leave-absolute>
		<div class="loading-page" v-if="loading">
			<v-progress-circular
				class="loading-page__progress"
				indeterminate
				value="50"
				size="100">
				Loading...
			</v-progress-circular>
		</div>
	</v-fade-transition>
</template>

<script>
export default {
	data: () => ({
		loading: false
	}),
	methods: {
		start() {
			this.loading = true
		},
		finish() {
			this.loading = false
		}
	}
}
</script>

<style lang="sass" scoped>
	.loading-page
		position: fixed
		top: 0
		left: 0
		width: 100%
		height: 100%
		background: rgba($dark-color, 0.9)
		z-index: 10000
		text-align: center
		display: flex
		.loading-page__progress
			margin: auto
			color: $red-color
</style>