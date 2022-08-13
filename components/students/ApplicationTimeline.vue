<template>
  <v-card class="mx-auto" max-width="700">
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
            <v-expansion-panels v-model="panel">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Application Attachments--{{ item.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <application-form-attachments
                    :application_item="item"
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

    <v-card dark flat>
      <v-card-title class="pa-2 blue-grey darken-4">
        <h3 class="text-h6 font-weight-light text-center grow">
          Application Details
        </h3>
        <div class="text-center float-right">
          <v-btn class="" outlined bottom color="white" @click="openDialog">
            <small>edit</small>
            <i class="fa fa-pencil-square" aria-hidden="true"></i>
          </v-btn>
        </div>
        <v-btn icon class="ml-5" @click="deleteApplication">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <template>
      <v-dialog
        v-model="dialogDelete"
        v-if="openDeleteDialog"
        max-width="500"
        content-class="dialog"
      >
        <v-card>
          <v-card-title class="text-h6 text-center"
            >Are you sure you want to delete this record?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="error" text @click="deleteApplicationConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item :color="setProcessColor('color', 'done')">
          <template v-slot:icon>
            <v-avatar>
              <i
                :style="`color:${setProcessColor('style', 'done')}`"
                :class="setProcessColor('icon', 'done')"
                aria-hidden="true"
              ></i>
            </v-avatar>
          </template>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>Application Started</strong>
            </v-col>
            <v-col>
              <div class=""></div>
            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item
          :color="setProcessColor('color', item.fill_form_workprocess_flow)"
        >
          <template v-slot:icon>
            <v-avatar>
              <i
                :style="`color:${setProcessColor(
                  'style',
                  item.fill_form_workprocess_flow
                )}`"
                :class="
                  setProcessColor('icon', item.fill_form_workprocess_flow)
                "
                aria-hidden="true"
              ></i>
            </v-avatar>
          </template>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>Form filled</strong>
            </v-col>
            <v-col>
              <div class="">Application form filled</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          :color="setProcessColor('color', item.visa_payment_workprocess_flow)"
        >
          <template v-slot:icon>
            <v-avatar>
              <i
                :style="`color:${setProcessColor(
                  'style',
                  item.visa_payment_workprocess_flow
                )}`"
                :class="
                  setProcessColor('icon', item.visa_payment_workprocess_flow)
                "
                aria-hidden="true"
              ></i>
            </v-avatar>
          </template>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong>Payment of Visa Fee</strong>
            </v-col>
            <v-col>
              <div class="mb-2">Visa fee payment to account XXXXXX xxx</div>
              <v-avatar
                class="payment_button payment_button_card"
                @click="opanPaymentDialog('card')"
              >
                <v-img
                  src="/credit-card.png"
                  @click="opanPaymentDialog('mpesa')"
                >
                </v-img>
              </v-avatar>
              <v-avatar class="payment_button">
                <v-img src="/mpesa_0.png" @click="opanPaymentDialog('mpesa')">
                </v-img>
              </v-avatar>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          :color="setProcessColor('color', item.appointment_workprocess_flow)"
        >
          <template v-slot:icon>
            <v-avatar>
              <i
                :style="`color:${setProcessColor(
                  'style',
                  item.appointment_workprocess_flow
                )}`"
                :class="
                  setProcessColor('icon', item.visa_payment_workprocess_flow)
                "
                aria-hidden="true"
              ></i>
            </v-avatar>
          </template>

          <v-row class="pt-1">
            <v-col cols="3">
              <strong> Appointment</strong>
            </v-col>
            <v-col>
              <div class="mb-2">Appointment booking-TLC website</div>
            </v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item
          :color="
            setProcessColor('color', item.document_uploading_workprocess_flow)
          "
        >
          <template v-slot:icon>
            <v-avatar>
              <i
                :style="`color:${setProcessColor(
                  'style',
                  item.document_uploading_workprocess_flow
                )}`"
                :class="
                  setProcessColor(
                    'icon',
                    item.document_uploading_workprocess_flow
                  )
                "
                aria-hidden="true"
              ></i>
            </v-avatar>
          </template>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong> Document uploading</strong>
            </v-col>
            <v-col>
              <div class="">
                Uploading of all required application Documents
                <div class="my-2">
                  <v-btn
                    small
                    class="float-right"
                    outlined
                    bottom
                    color="blue darken-1"
                    @click="openDialogDocuments"
                  >
                    View documents
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
      <v-row justify="center">
        <v-dialog
          v-model="dialogDocuments"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="blue-grey darken-4">
              <v-toolbar-title
                >Submitted Application documents
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="closeDialogDocuments">
                  <v-icon>mdi-close</v-icon>
                  Close
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <DocumentViewer
              :item="item"
              :dialogDocuments="dialogDocuments"
            ></DocumentViewer>
          </v-card>
        </v-dialog>
      </v-row>

      <template>
        <v-row justify="center">
          <v-dialog v-model="openPaymentDialog" width="600px">
            <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="openPaymentDialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
              <payment-display></payment-display>
              <v-card-text></v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>
<script>
import ApplicationsService from '@/services/ApplicationsService'
import paymentDisplay from '@/components/applications/PaymentDisplay'
import ModalBox from '~/components/ModalBox'
import DocumentViewer from '~/components/applications/DocumentViewer'
import ApplicationFormAttachments from '~/components/applications/ApplicationFormAttachments'

export default {
  name: 'ApplicationTimeline',
  // eslint-disable-next-line vue/no-unused-components
  components: {
    ModalBox,
    DocumentViewer,
    ApplicationFormAttachments,
    paymentDisplay,
  },
  // eslint-disable-next-line vue/prop-name-casing
  props: ['students_list', 'dataUrl', 'checkable', 'item'],
  data() {
    return {
      dialog: false,
      openDeleteDialog: false,
      dialogDocuments: false,
      notifications: false,
      dialogDelete: [],
      openPaymentDialog: false,
      sound: true,
      widgets: false,
      panel: 0,
      file: '',
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle:
            '<span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
      ],
      done_color: {
        main_color: 'green',
        icon_color: 'white',
        icon: 'fa fa-check',
      },
      in_progress_color: {
        main_color: 'orange accent-2',
        icon_color: 'white',
        icon: 'fa fa-hourglass-half',
      },
      notDoneColor: {
        main_color: 'blue-grey darken-2',
        icon_color: 'white',
        icon: '',
      },
      stoppedColor: {
        main_color: 'red darken-3',
        icon_color: 'white',
        icon: 'fa fa-exclamation-circle',
      },
    }
  },
  created() {
    this.$nuxt.$on('setDialogDocuments', ($event) =>
      this.closeDialogDocuments()
    )
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    openDialogDocuments() {
      console.log('openDialogDocuments')
      this.dialogDocuments = true
    },
    closeDialogDocuments() {
      console.log('closeDialogDocuments')
      this.dialogDocuments = false
    },
    setFile(file) {
      this.file = file.url
      console.log(file.url)
    },
    // eslint-disable-next-line camelcase
    setProcessColor(sectionName, workflow) {
      if (workflow === 'done') {
        return this.setDoneProcess(sectionName)
      } else if (workflow === 'pending') {
        return this.setInProgressProcess(sectionName)
      } else if (workflow === 'not_started') {
        return this.setNotStartedProcess(sectionName)
      } else if (workflow === 'stopped') {
        return this.setStoppedProcess(sectionName)
      } else {
        return this.setNotStartedProcess(sectionName)
      }
    },
    setDoneProcess(sectionName) {
      if (sectionName === 'color') {
        return this.done_color.main_color
      } else if (sectionName === 'style') {
        return this.done_color.icon_color
      } else if (sectionName === 'icon') {
        return this.done_color.icon
      }
    },
    setInProgressProcess(sectionName) {
      if (sectionName === 'color') {
        return this.in_progress_color.main_color
      } else if (sectionName === 'style') {
        return this.in_progress_color.icon_color
      } else if (sectionName === 'icon') {
        return this.in_progress_color.icon
      }
    },
    setNotStartedProcess(sectionName) {
      if (sectionName === 'color') {
        return this.notDoneColor.main_color
      } else if (sectionName === 'style') {
        return this.notDoneColor.icon_color
      } else if (sectionName === 'icon') {
        return this.notDoneColor.icon
      }
    },
    setStoppedProcess(sectionName) {
      if (sectionName === 'color') {
        return this.stoppedColor.main_color
      } else if (sectionName === 'style') {
        return this.stoppedColor.icon_color
      } else if (sectionName === 'icon') {
        return this.stoppedColor.icon
      }
    },
    deleteApplication() {
      console.log('deleteApplication')
      this.openDeleteDialog = true
    },
    async deleteApplicationConfirm() {
      const formData = new FormData()
      formData.append('id', this.item.uuid)
      formData.append('is_deleted', true)
      const response = await ApplicationsService.deleteApplication(formData)
      if (response.status) {
        this.openDeleteDialog = false
        this.responseSuccess = true
        this.responseSuccessMessage = response.data.message
        this.$nuxt.$emit('refreshStudentData', {
          successStatus: this.responseSuccess,
          successMessage: this.responseSuccessMessage,
        })
        console.log(response)
      }
    },
    closeDelete() {
      this.openDeleteDialog = false
    },
    opanPaymentDialog(paymentMode) {
      this.openPaymentDialog = true
    },
  },
}
</script>
<style>
html {
  height: 100%;
}
.file_list_0 {
  width: 300px;
}
.file_view_0 {
  width: 100%;
}
.file_view_0 embed {
  height: 600px !important;
  overflow: scroll;
}
.wrapper_0 {
  display: grid;
  grid-template-columns: 300px 80%;
}
</style>
