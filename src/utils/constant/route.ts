import _ from 'lodash'

export const routes = {
  // admin
  dashboard: {
    source: '/dashboard',
    destination: '/dashboard',
    isAdmin: true
  },
  itemTypes: {
    source: '/quan-ly-loai-trang-phuc',
    destination: '/item-types',
    isAdmin: true
  },
  packagesAdmin: {
    source: '/quan-ly-goi',
    destination: '/packages',
    isAdmin: true
  },

  // user
  profile: {
    source: '/trang-ca-nhan',
    destination: '/profile',
    isAdmin: false
  },
  wardrobe: {
    source: '/tu-quan-ao',
    destination: '/wardrobe',
    isAdmin: false
  },
  outfitAdvice: {
    source: '/tu-van-phoi-do',
    destination: '/outfit-advice',
    isAdmin: false
  },
  userSubscription: {
    source: '/goi-dang-ky',
    destination: '/subscription',
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

export const noFooterRoutes = [routes.wardrobe.source, routes.outfitAdvice.source]
