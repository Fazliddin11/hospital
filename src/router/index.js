import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import appointment from '../views/appointment.vue'
import department from '../views/department.vue'
import doctor from '../views/doctor.vue'
import patient from '../views/patient.vue'
import help from '../views/help.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/appointment',
    name: 'appointment',
    component:appointment
  },
  {
    path: '/department',
    name: 'department',
    component:department
  },
  {
    path: '/doctor',
    name: 'doctor',
    component:doctor
  },
  {
    path: '/patient',
    name: 'patient',
    component:patient
  },
  {
    path: '/help',
    name: 'help',
    component:help
  },
]

const router = new VueRouter({
  routes
})

export default router
