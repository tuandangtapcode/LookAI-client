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
  packages: {
    source: '/quan-ly-goi',
    destination: '/packages',
    isAdmin: true
  },
  users: {
    source: '/quan-ly-nguoi-dung',
    destination: '/users',
    isAdmin: true
  },
  userDetail: {
    source: '/quan-ly-nguoi-dung/:userId',
    destination: '/users/:userId',
    isAdmin: true
  },
  payments: {
    source: '/quan-ly-thanh-toan',
    destination: '/payments',
    isAdmin: true
  },
  expenses: {
    source: '/quan-ly-chi-tieu',
    destination: '/expenses',
    isAdmin: true
  },
  feedbacks: {
    source: '/quan-ly-phan-hoi',
    destination: '/feedbacks',
    isAdmin: true
  },
  logs: {
    source: '/logs',
    destination: '/logs',
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
    destination: '/wardrobes',
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
  checkout: {
    source: '/thanh-toan/:packageId',
    destination: '/checkout/:packageId',
    root: '/thanh-toan',
    isAdmin: false
  },
  myFeedbacks: {
    source: '/phan-hoi',
    destination: '/my-feedbacks',
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
  packagesList: {
    source: '/danh-sach-goi',
    destination: '/packages-list',
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

export const noFooterRoutes = [routes.wardrobe.source, routes.outfitAdvice.source, routes.checkout.root]
