<template>
  <form>
    <v-text-field
      v-model="appointmentData.name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="appointmentData.start_date"
      :error-messages="startDateErrors"
      label="Appointment Start Date"
      type="datetime-local"
      required
      class="mt-6"
      @input="$v.start_date.$touch()"
      @blur="$v.start_date.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="appointmentData.end_date"
      :error-messages="endDateErrors"
      label="Appointment End Date"
      type="datetime-local"
      required
      @input="$v.end_date.$touch()"
      @blur="$v.end_date.$touch()"
    ></v-text-field>
    <v-btn class="ma-1" outlined color="indigo" @click="submit">
      <small>Add appointment</small>
    </v-btn>
<!--    <v-btn class="mr-4" @click="submit"> submit</v-btn>-->
    <v-btn class="ma-1" outlined color="indigo" @click="clear"> clear</v-btn>
  </form>
</template>
<script>
import Vue from 'vue'
import { email, maxLength, required } from 'vuelidate/lib/validators'
import vuelidate, { validationMixin } from 'vuelidate'
import appointmentsService from '~/services/AppointmentsService'

Vue.use(vuelidate)

export default {
  props: ['student', 'application_item'],
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    start_date: { required },
    end_date: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },
  data: () => ({
    name: '',
    email: '',
    select: null,
    appointmentData: [
      {
        name: '',
        start_date: '',
        end_date: '',
        student_id: null,
        email: '',
      },
    ],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
    start_date: null,
    end_date: null,
  }),
  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    selectErrors() {
      const errors = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    startDateErrors() {
      const errors = []
      if (!this.$v.start_date.$dirty) return errors
      !this.$v.start_date.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.start_date.required && errors.push('Start date is required.')
      return errors
    },
    endDateErrors() {
      const errors = []
      if (!this.$v.end_date.$dirty) return errors
      !this.$v.end_date.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.end_date.required && errors.push('End data is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  methods: {
    async submit() {
      this.$v.$touch()
      const color = this.colors[this.rnd(0, this.colors.length - 1)]
      const formData = new FormData()
      formData.append('name', this.appointmentData.name)
      formData.append('student_id', this.student.id)
      formData.append('email', this.student.email)
      formData.append('start', new Date(`${this.appointmentData.start_date}`))
      formData.append('end', new Date(`${this.appointmentData.end_date}`))
      formData.append('student_application_id', this.application_item.id)
      formData.append('color', color)
      formData.append('timed', true)

      const response = await appointmentsService.addAppoitnment(formData)
      await this.$nuxt.$emit('setCalendarEvents', this.student.id)
      if (response.data.status) {
        await this.$nuxt.$emit('setCalendarEvents', this.student.id)
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>
