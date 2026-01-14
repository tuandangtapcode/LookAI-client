import _ from 'lodash'

export const routes = {
  // admin
  dashboard: {
    source: '/dashboard',
    destination: '/dashboard',
    isAdmin: true
  },

  // user
  profile: {
    source: '/trang-ca-nhan',
    destination: '/profile',
    isAdmin: false
  },

  // guest
  home: {
    source: '/',
    destination: '/home',
    isAdmin: false
  },
  login: {
    source: '/dang-nhap',
    destination: '/login',
    isAdmin: false
  },
  register: {
    source: '/dang-ky',
    destination: '/register',
    isAdmin: false
  },

  // error
  forbidden: {
    source: '/forbidden',
    destination: '/forbidden',
    isAdmin: false
  },
  notFound: {
    source: '/not-found',
    destination: '/not-found',
    isAdmin: false
  }
}

export const rewriteRoutes = _.map(routes, (route) => ({
  source: route.source,
  destination: route.destination
}))

export const adminRoutes = _.filter(routes, (route) => route.isAdmin).map((route) => route.source)

export const noFooterRoutes = ['']
