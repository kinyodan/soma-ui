<template>
  <div>
    <v-card-title>
      {{ student }}
      <span class="text-h5">application details </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal first name*"
              required
              v-model="form_data.first_name"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal middle name"
              v-model="form_data.second_name"
              hint="example of helper text only on focus"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Legal last name*"
              v-model="form_data.last_name"
              hint="example of persistent helper text"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Email*"
              v-model="form_data.email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="[
                'Skiing',
                'Ice hockey',
                'Soccer',
                'Basketball',
                'Hockey',
                'Reading',
                'Writing',
                'Coding',
                'Basejump',
              ]"
              label="Interests"
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
  </div>
</template>
<script>
export default {
  name: 'ApplicationForm',
  props: ['student'],
  data() {
    return {
      form_data: {
        first_name: this.student.first_name,
        second_name: this.student.second_name || null,
        last_name: this.student.last_name || null,
        email: this.student.email || null,
      },
    }
  },
}
</script>
