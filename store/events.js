import AppointmentsService from '~/services/AppointmentsService'

export const state = () => ({
  events: [],
})

export const mutations = {
  SET_STUDENT_CALENDER_EVENTS(state, applications) {
    state.events = applications
  },
}

export const actions = {
  async getAppointmentEvents({ commit }, studentid) {
    console.log(studentid)
    const response = await AppointmentsService.getAppoitnments(studentid)
    if (response.data.status) {
      console.log('getAppointmentEvents------')
      console.log(studentid)
      console.log(response.data)
      console.log('getAppointmentEvents------')
      commit('SET_STUDENT_CALENDER_EVENTS', response.data.data)
    }
  },
}
