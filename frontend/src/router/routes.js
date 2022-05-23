
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') }
    ]
  },
  // Guest Layout
  {
    path: '/login',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Login.vue') }
    ]
  },

  // Landing Page

  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/LandingPage.vue') }
  //   ]
  // }

  // Profile

  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') }
    ]
  },
  // Error
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
