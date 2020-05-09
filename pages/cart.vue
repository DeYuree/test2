<template>
	<v-container fluid class="main-content">
		<v-row no-gutters class="mt-4" v-if="GETTER_IN_CART_ITEMS.length">
			<v-col cols="12" md="8" class="main-content__block pa-8">
				<v-row no-gutters>
					<h3 class="text-center mx-auto">Ваш заказ</h3>
				</v-row>

				<v-row no-gutters>
					<v-col cols="12">
						<v-data-table
							class="cart-table mt-8"
							:class="{ disabled: GETTER_DISABLED_MARK }" 
							:headers="headers"
							:items="cartItemsInTable"
							dense
							hide-default-footer
							key="item.id"
							:disable-sort="GETTER_DISABLED_MARK"
							:disable-filtering="GETTER_DISABLED_MARK"
						>

							<template v-slot:item.action="{ item }">
								<v-icon small @click="initDeletionItem(item)">
									fas fa-trash
								</v-icon>
							</template>

							<template v-slot:item.image="{ item }">
								<nuxt-link :to="`catalog/` + item.link">
									<v-img
										:aspect-ratio="1/2"
										:src="item.image"
										width="100px"
										height="100px"
										class="my-2"
										style="border-radius: 50%"
									/>
								</nuxt-link>
							</template>

							<template v-slot:item.title="{ item }">
								<nuxt-link :to="`catalog/` + item.link">{{item.title}}</nuxt-link>
							</template>

							<template v-slot:item.quantity="{ item }">
								<v-text-field class="quantity_input text-center" readonly color="#ea2d0f" dense v-model="item.quantity">
									<v-icon slot="append" color="red" small @click="increaseQuantity(item)">fas fa-plus</v-icon>
									<v-icon slot="prepend" color="green" small @click="decreaseQuantity(item)">fas fa-minus</v-icon>
								</v-text-field>
							</template>

							<template v-slot:item.actualPrice="{ item }">
								<div v-if="item.actualPrice" class="price_actual">{{item.actualPrice}} <span>руб</span></div>
								<div v-if="item.oldPrice" class="price_old">{{item.oldPrice}} <span>руб</span></div>
							</template>

						</v-data-table>
					</v-col>
				</v-row>
			</v-col>

			<v-col cols="12" md="4" class="pl-md-5 mt-4 mt-md-0 hidden-sm-and-down">
				<div class="main-content__block order-sum pa-6">
					<v-row no-gutters>
						<h3 class="text-center mx-auto mb-8">Стоимость</h3>
					</v-row>
					<v-row no-gutters>
						<v-col cols="6" class="sum d-flex flex-column pr-4">								
							<div>{{ this.check.orderSum }} <span>руб</span></div>							
							<div>{{ this.check.deliverySum }} <span>руб</span></div>														
						</v-col>
						<v-col cols="6" class="label d-flex flex-column pl-4 pb-6">							
							<span>Заказ</span>
							<span>Доставка</span>
						</v-col>
					</v-row>
					<v-row no-gutters class="total pt-8">
						<v-col cols="7" class="sum order-1">								
							<div>{{ this.check.totalSum }} <span>руб</span></div>										
						</v-col>
						<v-col cols="5" class="label pb-6 order-0">					
							<span>Итого:</span>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>

		<v-row no-gutters v-if="GETTER_IN_CART_ITEMS.length" class="mt-4">
			<v-col cols="12" class="main-content__block delivery-card pa-8">
				<v-row no-gutters>
					<h3 class="text-center mx-auto mb-8">Доставка</h3>
				</v-row>

				<v-row no-gutters>
					<v-col cols="12 d-flex flex-row align-start flex-wrap justify-center" sm="6">
						<v-card
							class="mx-4 mb-4 d-flex flex-column"
							:ripple="false"
							:class="{ active: delivery.id === GETTER_CHECKED_DELIVERY }" 
							@click="changeDelivery(delivery.id)"
							:disabled="GETTER_DISABLED_MARK"
							v-for="delivery in this.GETTER_DELIVERY_TYPES" :key="delivery.id"
						>
							<transition name="fade">
								<v-badge 
									overlap 
									left
									v-if="GETTER_CHECKED_DELIVERY === delivery.id">
									<template v-slot:badge>
										<v-icon>fas fa-check</v-icon>
									</template>
								</v-badge>
							</transition>
							<v-card-title>{{delivery.label}}</v-card-title>
							<v-card-subtitle>{{delivery.description}}</v-card-subtitle>
							<v-spacer />
							<v-card-text class="text-right pr-6">
								{{(delivery.cost && delivery.costProcent) ? delivery.cost + '%' : 
								(delivery.cost && !delivery.costProcent) ? delivery.cost + ' руб' : 'Бесплатно'}}
							</v-card-text>
						</v-card>
					</v-col>
					<v-col cols="12" sm="6">
						<cart-form 
							v-if="GETTER_CHECKED_DELIVERY"
							ref="cartForm"
							:delivery="this.GETTER_DELIVERY_TYPES.find( (item) => item.id == this.GETTER_CHECKED_DELIVERY )"
						/>						
					</v-col>
					<v-col cols="12" class="d-flex justify-end mt-8">
						<v-slide-y-transition leave-absolute hide-on-leave group>		
							<v-btn
								key="change-data"
								class="confirm-btn px-4"
								fab
								@click.stop="comfirmPersonal"
								v-if="GETTER_DISABLED_MARK && GETTER_CHECKED_DELIVERY">							
								<v-icon>fas fa-edit</v-icon>
							</v-btn>
							<v-btn
								key="save-data"
								class="confirm-btn px-4"
								fab
								@click.stop="comfirmPersonal"
								v-if="!GETTER_DISABLED_MARK && GETTER_CHECKED_DELIVERY">
								<v-icon>fas fa-check</v-icon>
							</v-btn>
						</v-slide-y-transition>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-row no-gutters>
			<v-col cols="12" md="4" class="mt-4 hidden-md-and-up">
				<div class="main-content__block order-sum pa-6">
					<v-row no-gutters>
						<h3 class="text-center mx-auto mb-8">Стоимость</h3>
					</v-row>
					<v-row no-gutters>
						<v-col cols="6" class="sum d-flex flex-column pr-4">								
							<div>{{ this.check.orderSum }} <span>руб</span></div>							
							<div>{{ this.check.deliverySum }} <span>руб</span></div>														
						</v-col>
						<v-col cols="6" class="label d-flex flex-column pl-4 pb-6">							
							<span>Заказ</span>
							<span>Доставка</span>
						</v-col>
					</v-row>
					<v-row no-gutters class="total pt-8">
						<v-col cols="7" class="sum order-1">								
							<div>{{ this.check.totalSum }} <span>руб</span></div>										
						</v-col>
						<v-col cols="5" class="label pb-6 order-0">							
							<span>Итого:</span>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>

		<v-row no-gutters v-if="GETTER_IN_CART_ITEMS.length">
			<v-col cols="12 d-flex justify-center">
				<v-btn 
					class="check-btn px-4 my-8 elevation-8" 
					height="48px" 
					text 
					rounded 
					@click.stop="checkOrder"
					:disabled="!GETTER_DISABLED_MARK">
					Оформить заказ
				</v-btn>
			</v-col>
		</v-row>

		<v-row no-gutters v-if="!GETTER_IN_CART_ITEMS.length" class="main-content__block empty-cart mx-12 my-8">
				<v-col cols="12">
					<v-img
						:aspect-ratio="1/2"
						:src="require('~/static/empty cart.png')"
						width="200px"
						height="200px"
						class="mx-auto"
					/>
				</v-col>

				<v-col cols="12">
					<v-card-title class="justify-center">Ваша корзина пока пуста</v-card-title>
				</v-col>

				<v-col cols="12" class="text-right px-8 pb-8">
					<nuxt-link :to="`catalog`">
						<v-btn class="check-btn px-6" text rounded>
							начать покупки
						</v-btn>
					</nuxt-link>
				</v-col>				
			</v-row>

		<confirm-dialog
	   		:cancelButton="'Отмена'"
			:confirmButton="'Удалить'"
			:headerText="'Удалить из корзины'"
			:isVisible="isConfirmShow"
			@close="deleteItemFromCart">
			<v-container class="py-0 pt-2">
				<v-row>
					<v-col cols="4" justify-self="center">
						<v-img
							:aspect-ratio="1/2"
							:src="confirmDialogRemovableItem.img"
							width="60px"
							height="60px"
							class="my-0 mx-auto"
							style="border-radius: 50%"
						/>
					</v-col>
					<v-col cols="8" align-self="center">
						{{confirmDialogRemovableItem.title}}
					</v-col>
				</v-row>
			</v-container>
	   	</confirm-dialog>

		<quick-message />
	</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import ConfirmDialog from '@/components/page/ConfirmDialog.vue'
import QuickMessage from '@/components/page/QuickMessage.vue'
import CartForm from '@/components/cart/CartForm.vue'

export default {
	components: {
		ConfirmDialog,
		QuickMessage,
		CartForm
	},
	data: () => ({
		headers: [
			{ text: '', value: 'action', sortable: false },
			{ text: '', value: 'image', sortable: false },
			{ text: 'Товар', align: 'left', value: 'title', width: '50%' },
			{ text: 'Количество', value: 'quantity', sortable: false },
			{ text: 'Цена', value: 'actualPrice', width: '20%', align: 'center' },
		],
		cartSteps: [
			{title: 'Оплата и доставка'},
			{title: 'Контакты'},
			{title: 'Проверка заказа'},
		],
		isConfirmShow: false,
		cartInTable: [],
		confirmDialogRemovableItem: {},
		check: {
			orderSum: 0,
			deliverySum: 0,
			totalSum: 0
		}
	}),
	mounted() {
		this.calcOrderSumm()
	},

	computed: {
		...mapGetters('cart', [
			'GETTER_IN_CART_ITEMS', 
			'GETTER_DELIVERY_TYPES', 
			'GETTER_DISABLED_MARK', 
			'GETTER_CHECKED_DELIVERY',
			'GETTER_ORDER_FIELDS'
		]),

		cartItemsInTable() {
			this.cartInTable = []
			this.GETTER_IN_CART_ITEMS.map((item) => {
				let itemInCart = {
					id: item.id,
					image: (item.images.mainImage) ? item.images.mainImage : require('~/static/noProductImage.jpg'),
					title: item.title,
					link: item.link,
					actualPrice: item.actualPrice,
					oldPrice: item.oldPrice,
					quantity: item.quantity
				}
				this.cartInTable.push(itemInCart)
			})

			return this.cartInTable
		},
	},

	methods: {
		...mapMutations('cart', [
			'INCREASE_ITEM_QUANTITY', 
			'DECREASE_ITEM_QUANTITY', 
			'REMOVE_ITEM_FROM_CART', 
			'CHANGE_DISABLED_MARK',
			'CHANGE_CHECKED_DELIVERY',
			'CLEAR_CART'
			]),

		...mapActions('message', ['INIT_MESSAGE', 'clearMessage']),
		...mapActions('firebase', ['writeToDB']),

		calcOrderSumm() {
			this.check.orderSum = this.GETTER_IN_CART_ITEMS.reduce((sum, current) => {				
				return (current.quantity == 1) ? (parseFloat(sum) + current.actualPrice).toFixed(2) : 
						(parseFloat(sum) + current.actualPrice*current.quantity).toFixed(2)
			}, 0)
			
			if(this.GETTER_CHECKED_DELIVERY) {
				let currentDelivery = this.GETTER_DELIVERY_TYPES.filter(curItem => curItem.id === this.GETTER_CHECKED_DELIVERY)
				
				if(currentDelivery[0].costProcent) { // delivery like procent					
					this.check.deliverySum = (parseFloat(this.check.orderSum) * currentDelivery[0].cost/100).toFixed(2)
				}
				else {
					this.check.deliverySum = (currentDelivery[0].cost) ? (currentDelivery[0].cost).toFixed(2) : 0
				}
			}
			
			this.check.totalSum = (parseFloat(this.check.orderSum) + parseFloat(this.check.deliverySum)).toFixed(2)
		},

		initDeletionItem(item) {
			let index = this.cartInTable.indexOf(item)
			this.confirmDialogRemovableItem = {
				id: this.cartInTable[index].id,
				img: this.cartInTable[index].image,
				title: this.cartInTable[index].title
			}		
			//init confirm dialog	
			this.isConfirmShow = true
		},

		deleteItemFromCart: function (val) {
			//close confirm dialog		
			this.isConfirmShow = false

			if(val) {
				let message = {
					mainText: this.confirmDialogRemovableItem.title,
					extraText: 'Удалено из корзины:',
					color: 'red lighten-1',
					icon: 'fas fa-minus-circle'
				}
				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message),
					this.REMOVE_ITEM_FROM_CART(this.confirmDialogRemovableItem)
				, 400)

				this.calcOrderSumm() //recalc order summ
			}	
		},

		increaseQuantity(item) {
			this.INCREASE_ITEM_QUANTITY(item)
			this.calcOrderSumm()
		},

		decreaseQuantity(item) {
			this.DECREASE_ITEM_QUANTITY(item)
			this.calcOrderSumm()
		},

		changeDelivery(item) {
			if(!this.GETTER_DISABLED_MARK){
				this.CHANGE_CHECKED_DELIVERY(item)
				this.calcOrderSumm()
			}
		},

		comfirmPersonal () {
			this.$refs.cartForm.$v.$touch()
				

			if(this.$refs.cartForm.$v.$invalid) {
				let message = {
					//mainText: "неправильное поле",
					extraText: 'Проверьте введенные данные',
					color: 'red lighten-1',
					icon: 'fas fa-minus-circle'
				}
				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message)
				, 400)
			}
			else {  // form is valid
				if(!this.GETTER_DISABLED_MARK) {
					this.CHANGE_DISABLED_MARK(true) // disable data
				}
				else{
					this.CHANGE_DISABLED_MARK(false) // change data
				}
			}
		},

		async checkOrder() {
			this.$refs.cartForm.$v.$touch()

			if(this.$refs.cartForm.$v.$invalid) {
				let message = {
					//mainText: "неправильное поле",
					extraText: 'Проверьте введенные данные',
					color: 'red lighten-1',
					icon: 'fas fa-minus-circle'
				}
				this.clearMessage()

				setTimeout(() =>
					this.INIT_MESSAGE(message)
				, 400)
			}
			else {  // form is valid
				let currentDate = new Date()
				currentDate = currentDate.getDate()  + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getFullYear()

				let currentOrder = {
					collection: 'orders',
					order: {
						orderNumber: currentDate + '/' + Math.floor(Math.random() * (9999 - 1000 + 1)),
						orderTime: new Date(),
						status: 1,
						orderedItems: this.GETTER_IN_CART_ITEMS.map(item => {return item.id}),
						orderFields: this.GETTER_ORDER_FIELDS
					}
				}

				try {
					await this.writeToDB(currentOrder)
					
					this.CLEAR_CART()

					this.$router.push({ name: 'checkout', params: { orderNumber: currentOrder.order.orderNumber } })
				}
				catch (err) {
					if (process.browser) {
						setTimeout(() =>
							window.$nuxt.$loading.finish()
						, 1000) 
					}

					let message = {
						mainText: "Попробуйте оформить заказ заново",
						extraText: 'Что-то пошло не так во время оформления заказа',
						color: 'red lighten-1',
						icon: 'fas fa-minus-circle'
					}
					this.clearMessage()

					setTimeout(() =>
						this.INIT_MESSAGE(message)
					, 400)

				}
			}		
		}
	}
}
</script>

<style lang="sass" scoped>
.main-content
	::v-deep
		.main-content__block
			background-color: rgba($white-color, .95)
			border-radius: 24px 4px
			h3
				color: $broun-color
				font: 36px Adigiana
				text-transform: lowercase
				font-weight: bold
				letter-spacing: 2px
				line-height: 32px
			.v-data-table
				background-color: transparent
				th 
					color: $broun-color
					&.active
						color: $blue-color
				a
					font: 22px Adigiana
					color: #005cc1
					letter-spacing: 0.04em
					line-height: 0.85em
					word-break: normal
				.v-icon
					outline: none
				.quantity_input
					.v-icon
						cursor: pointer
					.v-text-field__slot input
						text-align: center
				.price_actual
					color: $red-color
					font-weight: bold
					font: 22px Adigiana
				.price_old
					color: $broun-color
					font: 14px Adigiana
					text-decoration: line-through
				.v-data-table__mobile-row__header
					color: $broun-color
			&.order-sum
				.sum
					color: $blue-color
					font-weight: bold
					font: 22px Adigiana
					border-right: 1px solid $broun-color
					div
						text-align: right
				.label
					font: 20px OwnHand
					line-height: 26px
					text-transform: lowercase
					font-weight: bold
					letter-spacing: 1px
					color: $broun-color
				.total
					border-top: 1px solid $broun-color
					.sum
						border-right: none
						color: $red-color
						font-size: 28px
					.label
						border-left: none
						font-size: 28px
						padding-left: 0
			&.delivery-card
				.v-card
					width: 200px !important
					height: 180px !important
					transition: all 0.4s
					.v-badge
						position: absolute
						z-index: 3
					.v-card__title
						color: $broun-color
						font: 28px MooMoo
						font-weight: bold
						letter-spacing: 1px
					.v-card__subtitle
						font: 18px Adigiana
						line-height: 1em
						letter-spacing: 0.01em
						color: rgba($dark-color, 0.6)
					.v-card__text
						font: 16px OwnHand
						font-weight: bold
						color: rgba($dark-color, 0.6)
						transition: color 0.4s
					&.active.v-card--disabled
						.v-badge, .v-card__text, .v-card__title
							opacity: 1
					&::before
						content: ''
						position: absolute
						background-color: transparent
						top: 0
						left: 0
						width: 100%
						height: 100%
						border-top: 1px solid $blue-color
						border-bottom: 1px solid $blue-color
						opacity: 1
						transform: scale(0, 1)
						transition: opacity 0.4s, transform 0.4s
						border-radius: 4px
					&::after
						content: ''
						position: absolute
						top: 0
						left: 0
						width: 100%
						height: 100%
						border-left: 1px solid $blue-color
						border-right: 1px solid $blue-color
						opacity: 0
						transform: scale(1, 0)
						transition: opacity 0.4s, transform 0.4s
						border-radius: 4px	
					&.active
						.v-card__text
							color: $blue-color
						&::before
							opacity: 1
							transform: scale(1)
						&::after
							opacity: 1
							transform: scale(1)
		&.empty-cart
			.v-card__title
				font: 34px Adigiana
				color: $broun-color
			
		.check-btn
			background-color: $red-color !important
			transition: all .4s
			outline: 0
			right: 0
			height: 56px
			color: $white-color
			font: 18px MooMoo
			&:hover, &:active, &:focus
				background-color: $blue-color !important
			&::before
				background: transparent
			&.v-btn--disabled
				background-color: $gray-color !important
		.confirm-btn
			background-color: $white-color !important
			transition: all .4s
			outline: 0
			color: $broun-color
			&:hover, &:active, &:focus
				background-color: $broun-color !important
				.v-icon
					color: $white-color !important
			&::before
				background: transparent
		.cart-table
			pointer-events: auto
			user-select: auto
			&.disabled
				pointer-events: none
				user-select: none
</style>