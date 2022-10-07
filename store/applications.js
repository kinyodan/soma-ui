import ApplicationsService from '~/services/ApplicationsService'

export const state = () => ({
  applications_list: [],
  students_list: [],
  student_applications: [],
})

export const mutations = {
  SET_STUDENT_APPLICATIONS_LIST(state, applications) {
    state.student_applications = applications
  },
}

export const actions = {
  async getStudentApplications({ commit }, studentUuid,user) {
    const response = await ApplicationsService.lisApplicationsForStudent(
      studentUuid,user
    )
    if (response.data.status) {
      console.log('getStudentApplications------')
      console.log(studentUuid)
      console.log(response.data)
      console.log('getStudentApplications------')
      commit('SET_STUDENT_APPLICATIONS_LIST', response.data.data)
    }
  },
}
