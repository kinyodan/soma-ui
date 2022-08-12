<template>
  <v-app>
    <div data-app>
      <title-bar :title-stack="titleStack" :student="student" />
      <section class="section is-main-section">
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
                  <v-expansion-panel @click="keepOpen">
                    <v-expansion-panel-header>
                      Application Attachments
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <application-form-attachments
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
        <tiles>
          <card-component
            width="300"
            title="Profile"
            icon="account"
            class="tile is-child"
          >
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
            <v-container min-height="200">
              <application-timeline
                :item="application_item"
              ></application-timeline>
<!--              <v-expansion-panels v-model="openApplication">-->
<!--                <v-expansion-panel>-->
<!--                  <v-expansion-panel-header>-->
<!--                    Application to: <strong>{{ application_item.name }}</strong>-->
<!--                  </v-expansion-panel-header>-->
<!--                  <v-expansion-panel-content>-->
<!--                    <application-timeline-->
<!--                      :item="application_item"-->
<!--                    ></application-timeline>-->
<!--                  </v-expansion-panel-content>-->
<!--                </v-expansion-panel>-->
<!--              </v-expansion-panels>-->
            </v-container>
          </v-card>

          <!--        <card-component v-if="application_item && application_item.length > 0">-->
          <!--          <b-field label="Document "> </b-field>-->
          <!--          <div style="height: 1050px">-->
          <!--            <document-display :key="file" :file="file"></document-display>-->
          <!--          </div>-->
          <!--        </card-component>-->
          <!--        <card-component-->
          <!--          v-else-->
          <!--          title="Application Document"-->
          <!--          icon="account"-->
          <!--          class="tile is-child"-->
          <!--        >-->
          <!--        </card-component>-->
        </tiles>
      </section>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import ProfileUpdateForm from '@/components/ProfileUpdateForm'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
import DocumentDisplay from '@/components/DocumentDisplay'
import ApplicationsService from '~/services/ApplicationsService'
import ApplicationFormAttachments from '~/components/applications/ApplicationFormAttachments'
import ApplicationTimeline from '~/components/students/ApplicationTimeline'

export default {
  name: 'Student',
  layout: 'Default',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent,
    DocumentDisplay,
    ApplicationFormAttachments,
    ApplicationTimeline,
  },
  computed: {
    titleStack() {
      return ['Admin', 'Profile']
    },
    ...mapState(['userName', 'userEmail']),
    setApplication() {
      return this.application_item
    },
    getFile() {
      console.log('file')
      return this.file
    },
    openMe() {
      return this.panel
    },
    openApplication() {
      return this.panel
    },
  },
  mounted() {
    this.getApplication()
  },
  methods: {
    setFile(file) {
      this.file = file
    },
    async getApplication() {
      const response = await ApplicationsService.getApplication(
        this.$route.params.application
      )
      if (response.data.status) {
        this.application_item = response.data.applications
        this.student = response.data.student
      }
    },
    openDialog() {
      this.dialog = true
    },
    keepOpen() {
      return this.panel
    },
  },
  head() {
    return {
      title: 'Profile — Admin One Nuxt.js',
    }
  },
  data() {
    return {
      file: '',
      dialog: false,
      application_item: [],
      student: [],
      panel: 0,
    }
  },
}
</script>
<style scoped>
embed {
  height: 100%;
  width: 1050px;
}
</style>
