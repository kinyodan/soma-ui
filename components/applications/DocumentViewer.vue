<template>

          <div class="wrapper_0">
            <card-component icon="account">
              <div class="file_list_0">
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.ksce_cert)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  <span> Kcse Cert </span>
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.school_leaving)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  school_leaving
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.passport_copy)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Passport copy
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.recommendation_letters)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Recommendation letters
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.cv)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Curriculum vitae(cv)
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.personal_statement)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Personal statement
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.confirmation_of_acceptance)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Confirmation of acceptance
                </v-chip>
                <v-spacer></v-spacer>
                <v-chip
                  class="ma-2"
                  color="primary"
                  outlined
                  @click="setFile(item.cv)"
                  label
                >
                  <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                  Curriculum vitae(cv)
                </v-chip>
              </div>
            </card-component>
            <card-component>
              <div class="file_view_0">
                <b-field label="Document "></b-field>
                <embed
                  v-if="file"
                  :src="`${file}`"
                  width="1440px"
                  height="800px"
                />
              </div>
            </card-component>
          </div>
</template>
<script>
export default {
  name: 'DocumentVeiwer',
  components: {},
  props: ['item', 'dialogDocuments'],
  data() {
    return {
      file: null,
      dialog: this.dialogDocuments,
    }
  },
  computed: {
    setDialog() {
      return this.dialog
    },
  },
  methods: {
    setFile(file) {
      this.file = file.url
      console.log(file.url)
    },
  },
  watch: {
    dialogDocuments: {
      immediate: true,
      handler(val, oldVal) {
        console.log(val)
        console.log('dialogDocuments state---')
        this.dialog = val
        return this.setDialog
      },
    },
  },
}
</script>
