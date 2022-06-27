
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LandingPage.vue') }
    ]
  },

  // Login Page

  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth.vue') }
    ]
  },

  // Profile

  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Profile.vue') }
    ]
  },

  // Playlist

  {
    path: '/playlists',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/playlist/YourLibrary.vue') },
      { path: 'detail/:id', component: () => import('pages/playlist/PlaylistDetails.vue') },
      { path: 'create', component: () => import('src/pages/playlist/CreatePlaylist.vue') },
      { path: 'liked_songs', component: () => import('src/pages/playlist/LikedSongs.vue') },
    ]
  },

  // Queue

  {
    path: '/queue',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Queue.vue') },
    ]
  },

  // Error
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
