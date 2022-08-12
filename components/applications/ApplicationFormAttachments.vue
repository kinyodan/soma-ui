<template>
  <div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <template>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    {{ formdata.application_name }}
                    <v-combobox
                      v-model="formdata.application_name"
                      :items="items"
                      label="Application Name (i.e wales university)"
                      chips
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </v-col>
          <v-col cols="12" sm="6" md="12">
            <a
              v-if="application_item.application_form"
              :href="`${application_item.application_form.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              Application Form
            </a>
            <v-file-input
              v-model="formdata.application_form"
              show-size
              label="Application Form "
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.passport_copy"
              :href="`${application_item.passport_copy.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current passport copy(s)
            </a>
            <v-file-input
              v-model="formdata.passport_copy"
              show-size
              label="Passport "
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.ksce_cert"
              :href="`${application_item.ksce_cert.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Kcse cert(s)
            </a>
            <v-file-input
              v-model="formdata.ksce_cert"
              show-size
              label="Kcse Certificate"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.degree_certificate"
              :href="`${application_item.degree_certificate.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Degree Certificate(s)
            </a>
            <v-file-input
              v-model="formdata.degree_certificate"
              show-size
              label="Degree Certificate"
              required
              hint="example of helper text only on focus"
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.degree_transcript"
              :href="`${application_item.degree_transcript.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Degree Transcript(s)
            </a>
            <v-file-input
              v-model="formdata.degree_transcript"
              show-size
              label="Degree Transcript"
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.recommendation_letters"
              :href="`${application_item.recommendation_letters.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current recommendation letter(s)
            </a>
            <v-file-input
              v-model="formdata.recommendation_letters"
              show-size
              label="Recommendation Letters"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a v-if="application_item.cv" :href="`${application_item.cv.url}`">
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current CV(s)
            </a>
            <v-file-input
              v-model="formdata.cv"
              show-size
              label="CV"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.personal_statement"
              :href="`${application_item.personal_statement.url}`" >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Personal Statement(s)
            </a>
            <v-file-input
              v-model="formdata.personal_statement"
              show-size
              label="Personal Statement"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.confirmation_of_acceptance"
              :href="`${application_item.confirmation_of_acceptance.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Confirmation of Acceptance(s)
            </a>
            <v-file-input
              v-model="formdata.confirmation_of_acceptance"
              show-size
              label="Confirmation of Acceptance"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <a
              v-if="application_item.bank_statement"
              :href="`${application_item.bank_statement.url}`"
            >
              <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              current Bank Statement(s)
            </a>
            <v-file-input
              v-model="formdata.bank_statement"
              show-size
              label="Bank Statement"
              required
              @change="selectFile"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import ApplicationsService from '~/services/ApplicationsService'

export default {
  name: 'ApplicationForm',
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['student', 'application_item'],
  data() {
    return {
      application_name_selected: '',
      formdata: {
        application_name: '',
        application_form: '',
        application_admin: this.application_item.application_admin
          ? this.application_item.application_admin.url
          : null,
        progress_state: this.application_item.progress_state
          ? this.application_item.progress_state.url
          : null,
        ksce_cert: this.application_item.ksce_cert
          ? this.application_item.ksce_cert
          : null,
        degree_certificate: this.application_item.degree_certificate
          ? this.application_item.degree_certificate
          : null,
        degree_transcript: this.application_item.degree_transcript
          ? this.application_item.degree_transcript
          : null,
        recommendation_letters: this.application_item.recommendation_letters
          ? this.application_item.recommendation_letters
          : null,
        cv: this.application_item.cv ? this.application_item.cv : null,
        personal_statement: this.application_item.personal_statement
          ? this.application_item.personal_statement
          : null,
        confirmation_of_acceptance: this.application_item
          .confirmation_of_acceptance
          ? this.application_item.confirmation_of_acceptance
          : null,
        bank_statement: this.application_item.bank_statement
          ? this.application_item.bank_statement
          : null,
        passport_copy: this.application_item.passport_copy
          ? this.application_item.passport_copy
          : null,
        passport: this.application_item.passport
          ? this.application_item.passport
          : null,
        school_leaving: this.application_item.school_leaving
          ? this.application_item.school_leaving
          : null,
        previous_visa: this.application_item.previous_visa
          ? this.application_item.previous_visa
          : null,
        visa_refusals: this.application_item.passport
          ? this.application_item.passport
          : null,
      },
      activator: null,
      fileCount: 0,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Foo',
          color: 'blue',
        },
        {
          text: 'Bar',
          color: 'red',
        },
      ],
      nonce: 1,
      menu: false,
      model: [
        {
          text: 'Foo',
          color: 'blue',
        },
      ],
      x: 0,
      search: null,
      y: 0,
    }
  },
  mounted() {
    // this.setData()
  },
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    selectFile() {
      console.log('file selected ')
      this.fileCount += 1
    },
    async submit() {
      const formData = new FormData()
      formData.append('name', JSON.stringify(this.application_name_selected))
      formData.append('application_form', this.formdata.application_form)
      formData.append('student_id', this.student.id)
      formData.append('application_admin', this.formdata.application_admin)
      formData.append('progress_state', this.formdata.progress_state)
      formData.append('ksce_cert', this.formdata.ksce_cert)
      formData.append('degree_certificate', this.formdata.degree_certificate)
      formData.append('degree_transcript', this.formdata.degree_transcript)
      formData.append('fileCount', this.fileCount)
      formData.append(
        'recommendation_letters',
        this.formdata.recommendation_letters
      )
      formData.append('cv', this.formdata.cv)
      formData.append('personal_statement', this.formdata.personal_statement)
      formData.append(
        'confirmation_of_acceptance',
        this.formdata.confirmation_of_acceptance
      )
      formData.append('bank_statement', this.formdata.bank_statement)
      formData.append('passport_copy', this.formdata.passport_copy)
      formData.append('passport', this.formdata.passport)
      formData.append('school_leaving', this.formdata.school_leaving)
      formData.append('previous_visa', this.formdata.previous_visa)
      formData.append('visa_refusals', this.formdata.visa_refusals)

      await ApplicationsService.addApplication(formData).then((response) => {
        console.log(response)
      })
    },
    setData() {
      if (this.application_item > 0) {
        this.formdata = {
          application_admin: this.application_item.application_admin.url,
          progress_state: this.application_item.progress_state.url,
          ksce_cert: this.application_item.ksce_cert.url,
          degree_certificate: this.application_item.degree_transcript,
          recommendation_letters: this.application_item.recommendation_letters,
          cv: this.application_item.cv,
          personal_statement: this.application_item.personal_statement,
          confirmation_of_acceptance: this.application_item.confirmation_of_acceptance,
          bank_statement: this.application_item.bank_statement,
          passport_copy: this.application_item.passport_copy,
          passport: this.application_item.passport,
          school_leaving: this.application_item.school_leaving,
          previous_visa: this.application_item.previous_visa,
          visa_refusals: this.application_item.passport,
        }
      }
    },
  },
  watch: {
    application_name_selected(val, prev) {
      console.log('application_name_selected')
      console.log(this.application_name_selected)

      this.items = []
      let v = null

      if (typeof val === 'string') {
        v = {
          text: val,
          color: this.colors[this.nonce - 1],
        }
        this.items.push(v)
        this.nonce++
      }
      this.application_name_selected = v
    },
  },
}
</script>
