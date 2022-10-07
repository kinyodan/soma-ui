import ApplicationsService from '~/services/ApplicationsService'
import StudentsService from '~/services/StudentsService'

export const state = () => ({
  /* User */
  userName: null,
  userEmail: null,
  userAvatar: null,

  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false,
  applications_list: [],
  students_list: [],
  student_applications: [],
  user: [],
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_APPLICATIONS_LIST(state, applications) {
    state.applications_list = applications
  },
  SET_STUDENTS_LIST(state, students) {
    state.students_list = students
  },
  SET_STUDENT_APPLICATIONS_LIST(state, applications) {
    state.student_applications = applications
  },
  /* A fit-them-all commit */
  basic(state, payload) {
    state[payload.key] = payload.value
  },

  /* User */
  user(state, payload) {
    if (payload.name) {
      state.userName = payload.name
    }
    if (payload.email) {
      state.userEmail = payload.email
    }
    if (payload.avatar) {
      state.userAvatar = payload.avatar
    }
  },

  /* Aside Mobile */
  asideMobileStateToggle(state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },
}

export const actions = {
  async getApplications({ commit },user) {
    const response = await ApplicationsService.lisApplications(user)
    if (response.data.status) {
      commit('SET_APPLICATIONS_LIST', response.data.data)
    }
  },
  async getStudentApplications({ commit }, studentId) {
    const response = await ApplicationsService.lisApplications(studentId)
    if (response.data.status) {
      commit('SET_STUDENT_APPLICATIONS_LIST', response.data.data)
    }
  },
  async getStudentsList({ commit }) {
    const response = await StudentsService.listStudents()
    if (response.data.status) {
      commit('SET_STUDENTS_LIST', response.data.data)
    }
  },
  async getStudent({ commit },studentId) {
    const response = await StudentsService.listStudents()
    if (response.data.status) {
      commit('SET_STUDENTS_LIST', response.data.data)
    }
  },
}
