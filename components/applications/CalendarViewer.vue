<template>
  <div class="wrapper_0">
    <card-component icon="account">
      <div class="file_list_0">
        <v-row>
          <h5>Add Appointment</h5>
          <appointment-form
            :student="student"
            :application_item="application_item"
          ></appointment-form>
        </v-row>
      </div>
    </card-component>
    <card-component>
      <div class="calendar_view_0">
        <template>
          <calendar-panel
            :events="events"
            :calendar_events="calendar_events"
            :student="student"
          ></calendar-panel>
        </template>
      </div>
    </card-component>
  </div>
</template>
<script>
import CalendarPanel from '~/components/applications/CalendarPanel'
import AppointmentForm from '~/components/applications/AppointmentForm'
import AppointmentsService from '~/services/AppointmentsService'

export default {
  name: 'DocumentVeiwer',
  components: { CalendarPanel, AppointmentForm },
  props: ['application_item', 'dialogDocuments', 'student'],
  data() {
    return {
      file: null,
      dialog: this.dialogDocuments,
      calendar_events: [],
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      calendarOptions: {
        initialView: 'dayGridMonth',
      },
      events: [
        {
          title: 'event1',
          start: '2010-01-01',
        },
        {
          title: 'event2',
          start: '2010-01-05',
          end: '2010-01-07',
        },
        {
          title: 'event3',
          start: '2010-01-09T12:30:00',
          allDay: false,
        },
      ],
    }
  },
  computed: {
    setDialog() {
      return this.dialog
    },
    setEvents() {
      return this.calendar_events
    },
  },
  created() {
    this.$nuxt.$on('setCalendarEvents', ($event) =>
      this.getEventsCalendar($event)
    )
    this.getEventsCalendar(this.student.id)
  },
  methods: {
    setFile(file) {
      this.file = file.url
    },
    async getEventsCalendar(studentId) {
      const response = await AppointmentsService.getAppoitnments(studentId)
      if (response.data.status) {
        this.calendar_events = response.data.data
      }
    },
  },
  watch: {
    dialogDocuments: {
      immediate: true,
      handler(val, oldVal) {
        this.dialog = val
        return this.setDialog
      },
    },
    calendar_events: {
      immediate: true,
      handler(val, oldVal) {
        return this.setEvents
      },
    },
  },
}
</script>
