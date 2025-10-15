import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import AudioUpload from '@/components/audio_process/AudioUpload.vue'
import login from '@/components/webpage/login.vue'
import progressList from '@/components/webpage/progress list.vue'
import search from '@/components/webpage/search.vue'
import Transcript from '@/components/webpage/transcript.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'audio-upload',
      component: AudioUpload,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/progress-list',
      name: 'progress-list',
      component: progressList,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/transcript',
      name: 'transcript',
      component: Transcript,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
