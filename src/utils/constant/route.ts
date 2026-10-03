import _ from 'lodash'

export const routes = {
  // admin
  dashboard: {
    title: 'Dashboard',
    source: '/dashboard',
    destination: '/dashboard',
    isAdmin: true
  },
  itemTypes: {
    title: 'Loại trang phục',
    source: '/quan-ly-loai-trang-phuc',
    destination: '/item-types',
    isAdmin: true
  },
  packages: {
    title: 'Gói dịch vụ',
    source: '/quan-ly-goi',
    destination: '/packages',
    isAdmin: true
  },
  users: {
    title: 'Người dùng',
    source: '/quan-ly-nguoi-dung',
    destination: '/users',
    isAdmin: true
  },
  userDetail: {
    title: 'Chi tiết người dùng',
    source: '/quan-ly-nguoi-dung/:userId',
    destination: '/users/:userId',
    isAdmin: true
  },
  payments: {
    title: 'Giao dịch',
    source: '/quan-ly-thanh-toan',
    destination: '/payments',
    isAdmin: true
  },
  expenses: {
    title: 'Chi phí',
    source: '/quan-ly-chi-tieu',
    destination: '/expenses',
    isAdmin: true
  },
  feedbacks: {
    title: 'Phản hồi',
    source: '/quan-ly-phan-hoi',
    destination: '/feedbacks',
    isAdmin: true
  },
  logs: {
    title: 'Logs',
    source: '/logs',
    destination: '/logs',
    isAdmin: true
  },
  systemkeys: {
    title: 'System Key',
    source: '/systemkeys',
    destination: '/systemkeys',
    isAdmin: true
  },

  // user
  profile: {
    title: 'Trang cá nhân',
    source: '/trang-ca-nhan',
    destination: '/profile',
    isAdmin: false
  },
  wardrobe: {
    title: 'Tủ quần áo',
    source: '/tu-quan-ao',
    destination: '/wardrobes',
    isAdmin: false
  },
  outfitAdvice: {
    title: 'Tư vấn phối đồ',
    source: '/tu-van-phoi-do',
    destination: '/outfit-advice',
    isAdmin: false
  },
  outfitAdviceDetail: {
    title: 'Tư vấn phối đồ',
    source: '/tu-van-phoi-do/:outfitAdviceId',
    destination: '/outfit-advice/:outfitAdviceId',
    isAdmin: false
  },
  userSubscription: {
    title: 'Gói đăng ký',
    source: '/goi-dang-ky',
    destination: '/subscription',
    isAdmin: false
  },
  checkout: {
    title: 'Thanh toán',
    source: '/thanh-toan/:packageId',
    destination: '/checkout/:packageId',
    root: '/thanh-toan',
    isAdmin: false
  },
  myFeedbacks: {
    title: 'Đóng góp ý kiến',
    source: '/phan-hoi',
    destination: '/my-feedbacks',
    isAdmin: false
  },

  // guest
  home: {
    title: 'Trang chủ',
    source: '/',
    destination: '/home',
    isAdmin: false
  },
  login: {
    title: 'Đăng nhập',
    source: '/dang-nhap',
    destination: '/login',
    isAdmin: false
  },
  register: {
    title: 'Đăng ký',
    source: '/dang-ky',
    destination: '/register',
    isAdmin: false
  },
  packagesList: {
    title: 'Danh sách gói',
    source: '/danh-sach-goi',
    destination: '/packages-list',
    isAdmin: false
  },

  // error
  forbidden: {
    title: '403',
    source: '/forbidden',
    destination: '/forbidden',
    isAdmin: false
  },
  developing: {
    title: 'Đang phát triển',
    source: '/developing',
    destination: '/developing',
    isAdmin: false
  },
  notFound: {
    title: '404',
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
