<template>
	<div class="gallery-wrapper">
		<div v-swiper:mainSwiper="mainSwiperOption" class="gallery-main" ref="mainSwiper">
			<div class="swiper-wrapper">
				<div 
					class="swiper-slide px-8 text-center" 
					v-for="(banner, i) in banners" 
					:key="i" 
					@click="zoomSlide()" 
					:dataId="(banner.modificationId) ? banner.modificationId : ''">
						<div>
							<img :src="banner.src"  class=""/>
						</div>
						<div class="gallery-descr">{{banner.label}}</div>
				</div>
			</div>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
		<div v-swiper:thumbSwiper="thumbSwiperOption" class="gallery-thumbs my-2"  ref="swiperThumbs">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(banner, i) in banners" :key="i">
					<img :src="banner.src">
				</div>
			</div>
		</div>

		<!-- in zoomed -->
		<v-dialog
			v-model="overlay"
			fullscreen
			dark
			content-class="dialog-modal"
		>
			<v-card raised class="gallery-modal d-flex flex-column pa-4 pa-sm-12">

				<v-icon class="close-modal justify-end" @click="closeSlide()">fas fa-times</v-icon>

				<div v-swiper:mainSwiperInZoom="mainSwiperInZoomOption" class="gallery-main" ref="mainSwiperInZoom">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(banner, i) in banners" :key="i">
							<div class="swiper-zoom-container text-center d-flex flex-column">
								<img :src="banner.src">
								<div class="gallery-descr pt-2">{{banner.label}}</div>
							</div>
						</div>
					</div>
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>

				<div v-swiper:thumbSwiperInZoom="thumbSwiperInZoomOption" class="gallery-thumbs my-2"  ref="thumbSwiperInZoom">
					<div class="swiper-wrapper">
						<div class="swiper-slide text-center" v-for="(banner, i) in banners" :key="i">
							<img :src="banner.src">
						</div>
					</div>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

export default {
	props: ['banners'],
	data: () => ({
		overlay: false,
		mainSwiperOption: {
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			loop: true,
			loopedSlides: 50,
			slidesPerView: 1,
			grabCursor: true,
			effect: 'fade',
			spaceBetween: 5,
			mousewheel: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		},
		thumbSwiperOption: {
			observer: true,
			observeParents: true,			  
			observeSlideChildren: true,
			spaceBetween: 10,
			slidesPerView: 4,
			centeredSlides: true,
			touchRatio: 0.2,
			loopedSlides: 50,
			loop: true,
			mousewheel: true,
			slideToClickedSlide: true,
		},
		mainSwiperInZoomOption: {
			observer: true,
			observeParents: true,			
			observeSlideChildren: true,
			loop: true,
			loopedSlides: 50,
			slidesPerView: 1,
			effect: 'fade',
			spaceBetween: 5,		  
			initialSlide: 0,
			mousewheel: true,
			navigation: {
				nextEl: '.swiper-button-next',
    			prevEl: '.swiper-button-prev',
				},
			zoom: {
				maxRatio: 3,
			},
			breakpoints: {
				640: {
					zoom: {
						maxRatio: 2,
					},
				}
			}
		},
		thumbSwiperInZoomOption: {
			observer: true,
			observeParents: true,			  
			observeSlideChildren: true,
			spaceBetween: 10,
			slidesPerView: 4,
			centeredSlides: true,
			initialSlide: 0,
			touchRatio: 0.8,
			loopedSlides: 50,
			loop: true,
			mousewheel: true,
			slideToClickedSlide: true,
			breakpoints: {
				640: {
					slidesPerView: 4,
				}
			},
		},
	}),
	mounted() {		
		this.$nextTick(() => {
			this.mainSwiper.controller.control = this.thumbSwiper
			this.thumbSwiper.controller.control = this.mainSwiper
		})
	},
	methods: {
		zoomSlide() {
			this.overlay = true
			
			this.$nextTick(() => {
				setTimeout(() => {
					this.mainSwiperInZoom.slideToLoop(this.mainSwiper.realIndex, 10, false),
					this.thumbSwiperInZoom.slideToLoop(this.mainSwiper.realIndex, 10, false)
				}, 40)				

				this.mainSwiperInZoom.controller.control = this.thumbSwiperInZoom
				this.thumbSwiperInZoom.controller.control = this.mainSwiperInZoom
			})
		},

		closeSlide() {
			this.overlay = false
			this.$nextTick(() => {
				this.mainSwiper.slideToLoop(this.mainSwiperInZoom.realIndex, 10, false)
				this.thumbSwiper.slideToLoop(this.thumbSwiperInZoom.realIndex, 10, false)
			})
		}
	}

}
</script>

<style lang="sass" scoped>
.gallery-modal
	background-color: rgba(2, 2, 2, 0.95) !important
	height: 100%
	//width: 800px
	.close-modal
		outline: none
		color: $blue-color
	.gallery-main
		flex-grow: 1
		width: inherit
		height: 80%
		.swiper-slide 
			img
				max-width: 100%
				max-height: 300px
				cursor: zoom-in
				opacity: 0
			.gallery-descr
				font: 18px OwnHand
				letter-spacing: 2px
				text-transform: lowercase
		.swiper-slide-active img
			opacity: 1	
		.swiper-slide .gallery-descr
			opacity: 0
			width: 100%
		.swiper-slide-active .gallery-descr
			opacity: 1
		.swiper-wrapper
			box-sizing: border-box
			.swiper-slide img
				max-width: 100%
				max-height: calc(100% - 40px)
				cursor: move
	.gallery-thumbs
		max-height: 100px
		height: 100px
		cursor: pointer
		width: inherit
		.swiper-slide
			opacity: 0.4
			height: 90px
			text-align: center
		.swiper-slide-active
			opacity: 1
			img
				border: solid 3px $blue-color
				border-radius: 6px
		.swiper-slide img
			max-width: 100%
			max-height: 70px
			padding: 5px

.gallery-wrapper
	width: 1000px
	max-width: 100%
	::v-deep
		.gallery-main
			.swiper-wrapper
				box-sizing: border-box
				.swiper-slide 
					img
						max-width: 100%
						max-height: 300px
						cursor: zoom-in
						opacity: 0
					.gallery-descr
						font: 18px OwnHand
						letter-spacing: 2px
						text-transform: lowercase
						color: $broun-color
						font-weight: bold
				.swiper-slide-active img
					opacity: 1	
				.swiper-slide .gallery-descr
					opacity: 0
					width: 100%
				.swiper-slide-active .gallery-descr
					opacity: 1
		.gallery-thumbs
			max-height: 70px
			cursor: pointer
			.swiper-slide
				opacity: 0.4
				height: 70px
				text-align: center
			.swiper-slide-active
				opacity: 1
				img
					border: solid 3px $blue-color
					border-radius: 6px
			.swiper-slide img
				max-width: 100%
				max-height: 50px
				padding: 5px
</style>