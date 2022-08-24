<template>
  <v-app>
    <v-card data-app class="ma-padding-i">
      <title-bar :salutation="`Hello `" :student="student" />
      <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card min-height="500px" class="">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
          <tiles>
            <template>
              <v-expansion-panels v-model="openMe">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Application Attachments
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <application-form-attachments
                      :student="student"
                      :application_item="application_item"
                    ></application-form-attachments>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </tiles>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <section class="section is-main-section">
        <tiles>
          <card-component
            width="300"
            title="Profile"
            icon="account"
            class="tile is-child"
          >
            <b-field>
              <div class="text-center float-right">
                <v-btn class="ma-1" outlined color="indigo" @click="openDialog">
                  <small>Add application</small>
                </v-btn>
              </div>
            </b-field>
            <b-field label="Student Email">
              <b-input
                :value="student.email"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Phone number">
              <b-input
                :value="student.phone"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Locations">
              <b-input
                :value="student.location"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Updated at">
              <b-input
                :value="student.updated_at"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <b-field label="Created at">
              <b-input
                :value="student.created_at"
                custom-class="is-static"
                readonly
              />
            </b-field>
            <hr />
            <b-field label="E-mail">
              <b-input :value="userEmail" custom-class="is-static" readonly />
            </b-field>
          </card-component>

          <v-card width="700">
            <v-alert v-if="responseSuccess" dense text type="success">
              {{ responseSuccessMessage }}
            </v-alert>
            <v-container min-height="200">
              <v-expansion-panels
                v-if="application_list.length > 0"
                v-model="openApplication"
              >
                <v-expansion-panel
                  v-for="(item, i) in application_list"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    Application to: <strong>{{ item.name }}</strong>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <application-timeline
                      :item="item"
                      :student="student"
                    ></application-timeline>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-card v-else width="600">
                <v-card-title>No applications to display </v-card-title>
              </v-card>
            </v-container>
          </v-card>
        </tiles>
      </section>
    </v-card>
  </v-app>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import DocumentDisplay from '@/components/DocumentDisplay'
import StudentsService from '@/services/StudentsService'
import { mapActions, mapState } from 'vuex'
import ApplicationsListStudent from '~/components/applications/ApplicationsListStudent'
import ApplicationTimeline from '~/components/students/ApplicationTimeline'
import ApplicationForm from '~/components/applications/ApplicationForm'
import ApplicationFormAttachments from '~/components/applications/ApplicationFormAttachments'

export default {
  name: 'Student',
  layout: 'Default',
  components: {
    ApplicationForm,
    ApplicationFormAttachments,
    ApplicationTimeline,
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
    DocumentDisplay,
    ApplicationsListStudent,
  },
  data() {
    return {
      file: '',
      dialog: false,
      student: [],
      application_list: [],
      application_item: { student_id: this.student },
      userEmail: '',
      panel: 0,
      responseError: false,
      responseErrorMessage: '',
      responseSuccess: false,
      responseSuccessMessage: '',
      emitResponseError: false,
      emitResponseErrorMessage: '',
      emitResponseSuccess: false,
      emitResponseSuccessMessage: '',
    }
  },
  computed: {
    ...mapState('applications', {
      student_applications: (state) => state.student_applications,
    }),
    titleStack() {
      return ['Hi ']
    },
    setApplication() {
      return this.student
    },
    getFile() {
      return this.file
    },
    // eslint-disable-next-line vue/return-in-computed-property
    openApplication() {
      if (this.application_list.length === 1) {
        return this.panel
      } else {
        return null
      }
    },
    openMe() {
      return this.panel
    },
  },
  created() {
    this.getStudent()
    this.$nuxt.$on('refreshStudentData', ($event) => this.getStudent($event))
  },
  mounted() {
    this.getStudent()
    this.getApplicationsList()
  },
  methods: {
    ...mapActions(['getStudent']),
    ...mapActions('applications', ['getStudentApplications']),
    setFile(file) {
      this.file = file
    },
    // eslint-disable-next-line camelcase
    async getApplicationsList(event) {
      if (event) {
        await this.getStudentApplications(event)
      }
    },
    async getStudent(event) {
      if (event) {
        this.responseSuccess = event.successStatus
        this.responseSuccessMessage = event.successMessage

        setTimeout(() => {
          this.responseSuccess = false
          this.responseSuccessMessage = ''
        }, '4000')
      }
      const response = await StudentsService.getStudent(
        this.$route.params.student
      )
      if (response.status) {
        this.student = response.data.student
        this.application_list = response.data.applications
      }
    },
    openDialog() {
      this.dialog = true
    },
  },
  head() {
    return {
      title: `Profile — `,
    }
  },
}
</script>
<style scoped>
embed {
  height: 100%;
  width: 1050px;
}
.ma-padding-i {
  padding: 5px;
}
</style>
