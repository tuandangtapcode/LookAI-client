'use client'
import { routes } from '@/utils/constant/route'
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import { Col, Image, Row } from 'antd'
import { usePathname } from 'next/navigation'
import { FaTiktok } from 'react-icons/fa6'
import icons from '../icons'

const Footer = () => {
  const pathName = usePathname()

  return (
    <div
      className={`bg-(--color-ink) py-12 px-6 sm:px-12 lg:px-20 text-white/85 ${
        [routes.login.source, routes.register.source].includes(pathName) ? 'mt-10' : ''
      }`}
    >
      <Row gutter={[40, 32]}>
        <Col xs={24} md={8} className='flex flex-col items-center md:items-start text-center md:text-left'>
          <Image src='/logo-header.png' alt='' preview={false} className='cursor-pointer !w-[80px] !h-[80px]' />
          <p className='mt-3 max-w-60 text-[13px] leading-relaxed text-white/55'>
            Nền tảng tư vấn phong cách bằng AI — giúp bạn mặc đẹp, đúng gu, mỗi ngày.
          </p>
          <div className='flex gap-4 text-[18px] mt-4 text-white/70'>
            <FacebookOutlined className='cursor-pointer transition-colors hover:text-(--color-gold)' />
            <InstagramOutlined className='cursor-pointer transition-colors hover:text-(--color-gold)' />
            <FaTiktok className='cursor-pointer transition-colors hover:text-(--color-gold)' />
          </div>
        </Col>
        <Col xs={24} md={8} className='flex flex-col items-center md:items-start text-center md:text-left'>
          <div className='tracking-label mb-4 text-(--color-gold)'>Thông tin liên hệ</div>
          <div className='mb-2.5 flex items-center gap-2 text-[14px]'>
            <span className='text-(--color-gold)'>{icons.ICON_PHONE}</span>
            <span>0328587528</span>
          </div>
          <div className='mb-2.5 flex items-center gap-2 text-[14px]'>
            <span className='text-(--color-gold)'>{icons.ICON_MAIL}</span>
            <span>stylist-ai@gmail.com</span>
          </div>
          <div className='flex items-center gap-2 text-[14px]'>
            <span className='text-(--color-gold)'>{icons.ICON_LOCATION}</span>
            <span>Phan Chu Trinh, Hoàn Kiếm, Hà Nội</span>
          </div>
        </Col>
        <Col xs={24} md={8} className='flex flex-col items-center md:items-start text-center md:text-left'>
          <div className='tracking-label mb-4 text-(--color-gold)'>Dịch vụ của chúng tôi</div>
          <div className='mb-2 text-[14px] text-white/70'>Tư vấn trang phục</div>
          <div className='mb-2 text-[14px] text-white/70'>Cá nhân hoá theo phong cách</div>
          <div className='text-[14px] text-white/70'>Sử dụng tủ đồ của bạn để tư vấn</div>
        </Col>
      </Row>
      <div className='mt-10 border-t border-white/10 pt-5 text-center text-[12px] tracking-wide text-white/40'>
        © {new Date().getFullYear()} LookAI. All rights reserved.
      </div>
    </div>
  )
}

export default Footer
