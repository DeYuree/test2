<template>
    <v-fade-transition mode="out-in">
		<v-form
			lazy-validation
			:key="delivery.id"
			class="pt-4"
			>
				<v-text-field
					v-if="delivery.fields.customerFullName"
					v-model="customerFullName"
					:label="delivery.fields.customerFullName.label"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.customerFullName.icon"
					:hint="delivery.fields.customerFullName.hintText"
					:error-messages="customerFullNameErrors"
					@blur="$v.customerFullName.$touch()"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-text-field
					v-if="delivery.fields.customerName"
					v-model="customerName"
					:label="delivery.fields.customerName.label"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.customerName.icon"
					:hint="delivery.fields.customerName.hintText"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-text-field
					v-if="delivery.fields.phoneNumber"
					v-model="phoneNumber"
					:label="delivery.fields.phoneNumber.label"
					:required="delivery.fields.phoneNumber.required"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.phoneNumber.icon"
					:hint="delivery.fields.phoneNumber.hintText"
					v-mask="delivery.fields.phoneNumber.mask"
					:error-messages="phoneNumberErrors"
					@blur="$v.phoneNumber.$touch()"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-text-field
					v-if="delivery.fields.zipCode"
					v-model="zipCode"
					:label="delivery.fields.zipCode.label"
					:required="delivery.fields.zipCode.required"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.zipCode.icon"
					:hint="delivery.fields.zipCode.hintText"
					v-mask="delivery.fields.zipCode.mask"
					:error-messages="zipCodeErrors"
					@blur="$v.zipCode.$touch()"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-text-field
					v-if="delivery.fields.deliveryCity"
					v-model="deliveryCity"
					:label="delivery.fields.deliveryCity.label"
					:required="delivery.fields.deliveryCity.required"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.deliveryCity.icon"
					:hint="delivery.fields.deliveryCity.hintText"
					:error-messages="deliveryCityErrors"
					@blur="$v.deliveryCity.$touch()"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-text-field
					v-if="delivery.fields.deliveryAddress"
					v-model="deliveryAddress"
					:label="delivery.fields.deliveryAddress.label"
					:required="delivery.fields.deliveryAddress.required"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="delivery.fields.deliveryAddress.icon"
					:hint="delivery.fields.deliveryAddress.hintText"
					:error-messages="deliveryAddressErrors"
					@blur="$v.deliveryAddress.$touch()"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-text-field>

				<v-textarea
					class="mt-6"
					v-if="delivery.fields.comment"
					dense
					auto-grow
					outlined
					filled
					rows='3'
					clearable
					v-model="comment"
					:label="delivery.fields.comment.label"
					color="#005cc1"
					background-color="transparent"
					:prepend-icon="delivery.fields.comment.icon"
					:hint="delivery.fields.comment.hintText"
					:maxlength="delivery.fields.comment.maxlength"
					:counter="delivery.fields.comment.counter"
					:disabled="GETTER_DISABLED_MARK"
					>
				</v-textarea>

			<!-- <template v-for="(field, key) in delivery.fields">
				<v-text-field
					v-if="field.display && field.mask && field.type!='textarea'"		
					:key="key"
					v-model="$data[key]"
					:label="field.label"
					required="true"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="field.icon"
					:hint="field.hintText"
					:maxlength="executeErrors(field.maxlength)"
					:counter="executeErrors(field.counter)"
					v-mask="field.mask"
					:error-messages="executeErrors(field.errors)"
					@input="$v[key].$touch()"
					@blur="$v[key].$touch()"
					>
				</v-text-field>

				<v-text-field
					v-else-if="field.display && !field.mask && field.type!='textarea'"
					:key="key"
					v-model="$data[key]"
					:label="field.label"
					:required="field.required"
					clearable
					dense
					color="#005cc1"
					:prepend-icon="field.icon"
					:hint="field.hintText"
					:maxlength="executeErrors(field.counter)"
					:counter="executeErrors(field.counter)"
					:error-messages="executeErrors(field.errors)"
					@input="$v[key].$touch()"
					@blur="$v[key].$touch()"
					>
				</v-text-field>

				<v-textarea
					class="mt-6"
					v-else-if="field.display && field.type=='textarea'"
					dense
					auto-grow
					outlined
					filled
					rows='3'
					clearable
					:key="key"
					v-model="$data[key]"
					:label="field.label"
					:required="field.required"
					color="#005cc1"
					:prepend-icon="field.icon"
					:hint="field.hintText"
					:maxlength="executeErrors(field.counter)"
					:counter="executeErrors(field.counter)"
					:error-messages="executeErrors(field.errors)"
					@input="$v[key].$touch()"
					@blur="$v[key].$touch()"
					>
				</v-textarea>
			</template>             -->
		</v-form>
	</v-fade-transition>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, integer } from 'vuelidate/lib/validators'
import { helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[а-яА-Яa-zA-Z ]*$/)

import {mask} from 'vue-the-mask'

import { mapGetters, mapMutations } from 'vuex'

export default {
	props: ['delivery'],

	mixins: [validationMixin],

	directives: {mask},

	validations() {
		let validationsList = {}

		if(this.delivery.fields.customerFullName) { Object.assign(validationsList, {customerFullName: {required, alpha}	})}

		if(this.delivery.fields.phoneNumber) {Object.assign(validationsList, { phoneNumber: {required, minLength: minLength(14)} })}

		if(this.delivery.fields.zipCode) {Object.assign(validationsList, { zipCode: {minLength: minLength(6)} })}

		if(this.delivery.fields.deliveryCity) {Object.assign(validationsList, { deliveryCity: {required} })}

		if(this.delivery.fields.deliveryAddress) {Object.assign(validationsList, { deliveryAddress: {required} })}

		Object.assign(validationsList, { customerName: {} })

		Object.assign(validationsList, { comment: {} })

		return validationsList
	},

	computed: {
		...mapGetters('cart', ['GETTER_DISABLED_MARK', 'GETTER_ORDER_FIELDS']),

		customerName: {
			get() {	return this.GETTER_ORDER_FIELDS.customerName },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['customerName']: val }) }			
		},

		customerFullName: {
			get() {	return this.GETTER_ORDER_FIELDS.customerFullName },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['customerFullName']: val }) }			
		},

		phoneNumber: {
			get() {	return this.GETTER_ORDER_FIELDS.phoneNumber	},
			set(val) { this.CHANGE_ORDER_FIELDS({ ['phoneNumber']: val }) }			
		},

		zipCode: {
			get() {	return this.GETTER_ORDER_FIELDS.zipCode },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['zipCode']: val }) }			
		},

		deliveryCity: {
			get() {	return this.GETTER_ORDER_FIELDS.deliveryCity },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['deliveryCity']: val }) }			
		},

		deliveryAddress: {
			get() {	return this.GETTER_ORDER_FIELDS.deliveryAddress },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['deliveryAddress']: val }) }			
		},

		comment: {
			get() {	return this.GETTER_ORDER_FIELDS.comment },
			set(val) { this.CHANGE_ORDER_FIELDS({ ['comment']: val }) }			
		},


		customerFullNameErrors () {
			const errors = []
			if (!this.$v.customerFullName.$dirty) return errors
			!this.$v.customerFullName.required && errors.push("Обязательное поле")
			!this.$v.customerFullName.alpha && errors.push("Только буквы")
			return errors
		},

		phoneNumberErrors () {
			const errors = []
			if (!this.$v.phoneNumber.$dirty) return errors
			!this.$v.phoneNumber.required && errors.push("Обязательное поле")
			!this.$v.phoneNumber.minLength && errors.push("Номер телефона введен некорректно")
			return errors
		},

		zipCodeErrors () {
			const errors = []
			if (!this.$v.zipCode.$dirty) return errors
			!this.$v.zipCode.minLength && errors.push("Почтовый индекс должен быть 6-значный")
			return errors
		},

		deliveryCityErrors () {
			const errors = []
			if (!this.$v.deliveryCity.$dirty) return errors
			!this.$v.deliveryCity.required && errors.push("Обязательное поле")
			return errors
		},

		deliveryAddressErrors () {
			const errors = []
			if (!this.$v.deliveryAddress.$dirty) return errors
			!this.$v.deliveryAddress.required && errors.push("Обязательное поле")
			return errors
		},
	},

	methods: {
		...mapMutations('cart', ['CHANGE_ORDER_FIELDS'])
	}
}
</script>

<style lang="sass" scoped>
	.v-form
		::v-deep
			input, textarea
				font: 20px OwnHand
				color: rgba($dark-color, 0.8)
				letter-spacing: 1px
				background-color: transparent
			.v-icon
				color: $blue-color
				font-size: 14px
				font-style: normal
			.v-label
				color: $blue-color
				font: 18px Adigiana
				letter-spacing: 2px
			.v-input__control
				margin-top: 8px
			.v-input__prepend-outer
				margin-top: 14px
			&.v-input--is-disabled
				.v-label
					color: rgba($dark-color, 0.38) !important
</style>