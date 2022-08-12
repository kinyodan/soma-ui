<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="applications_list"
    >
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" v-if="deleting" max-width="500" content-class="dialog">
          <v-card>
            <v-card-title class="text-h6 text-center">Are you sure you want to delete this record?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="error" text @click="deleteItemConfirm(class_item)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template slot-scope="props">
        <b-table-column label="Name" field="name" sortable>
          <nuxt-link
            :to="{
              path: 'applications/' + props.row.uuid,
              params: { id: props.row.uuid },
            }"
          >
            <span class="ma-3">{{ props.row.name }}</span></br>
          </nuxt-link>
          <small class="has-text-grey is-abbr-like">
            {{ $moment(props.row.created_at) }}
          </small>
        </b-table-column>

        <b-table-column label="Current Stage" field="progress_steps" sortable>
          {{ props.row.progress_steps }}
        </b-table-column>
        <b-table-column
          class="is-progress-col"
          label="Progress"
          field="progress"
          sortable
        >
          <progress
            class="progress is-small is-primary"
            :value="props.row.progress"
            max="100"
          >
            {{ props.row.progress }}
          </progress>
        </b-table-column>

        <b-table-column label="Last updated">
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.updated_at"
            >{{ props.row.updated_at }}</small
          >
        </b-table-column>
        <b-table-column label="Status" field="" sortable>
          {{ props.row.status }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
<!--            <nuxt-link-->
<!--              :to="{ name: 'client-id', params: { id: props.row.id } }"-->
<!--              class="button is-small is-primary"-->
<!--            >-->
<!--              <b-icon icon="account-edit" size="is-small" />-->
<!--            </nuxt-link>-->
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from "vuex";
import ModalBox from '~/components/ModalBox'
import ApplicationsService from '~/services/ApplicationsService'

export default {
  name: 'ApplicationsTable',
  components: { ModalBox },
  props: ['applications_list', 'dataUrl', 'checkable'],
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      applications: this.applications_list,
      deleteSuccessMessage:null,
      deleteSuccess:false,
      deleteResponseError:null,
      deleteResponseErrorMessage:false,
      deleting:false,
      application_item:[],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    },
  },
  created() {},
  mounted() {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger',
          })
        })
    }
  },
  methods: {
    ...mapActions(['getApplications']),
    async getApplicationsList() {
      const response = await ApplicationsService.lisApplications()
      if (response.data.data.status) {
        this.applications = response.data.data
      }
    },
    trashModal(trashObject) {
      console.log(trashObject)
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.deleteItemConfirm(this.trashObject)
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    async deleteItemConfirm(trashObject){
      const response =await ApplicationsService.deleteApplication(trashObject.uuid)
      console.log(response)
      if(response.data.status){
        this.deleteSuccessMessage = response.data.message
        this.deleteSuccess=true
        this.loading=false
        await this.getApplications()
        setTimeout(() => {
          this.deleteSuccess=false
        }, "4000")
      }else{
        this.deleteResponseError=true
        this.deleteResponseErrorMessage=response.data.message
        setTimeout(() => {
          this.deleteResponseError=false
        }, "4000")
      }
      this.deleting=false
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
