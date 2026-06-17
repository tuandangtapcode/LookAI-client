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
      className={`bg-[#252641] py-7.5 px-20 text-white ${
        [routes.login.source, routes.register.source].includes(pathName) ? 'mt-10' : ''
      }`}
    >
      <Row gutter={[40, 20]} className='flex items-center'>
        <Col span={8} className='justify-items-center'>
          <div>
            <Image src='/logo-header.png' alt='' className='cursor-pointer !w-[90px] !h-[90px]' />
            <div className='flex gap-3.75 text-[24px] mt-2.5'>
              <FacebookOutlined
                style={{ fontSize: '23px' }}
                onClick={() => {}}
              />
              <InstagramOutlined
                style={{ fontSize: '24px' }}
                onClick={() => {}}
              />
              <FaTiktok
                style={{ fontSize: '22px' }}
                onClick={() => {}}
              />
            </div>
          </div>
        </Col>
        <Col span={8} className='justify-items-center'>
          <div>
            <div className='text-[16px] font-bold mb-3'>THÔNG TIN LIÊN HỆ</div>
            <div className='mb-1.5 flex items-center'>
              <div className='font-semibold mr-1.5 text-[16px]'>{icons.ICON_PHONE}</div>
              <div className='text-[16px]'>0328587528</div>
            </div>
            <div className='mb-1.5 flex items-center'>
              <div className='font-semibold mr-1.5 text-[16px]'>{icons.ICON_MAIL}</div>
              <div className='text-[16px]'>stylist-ai@gmail.com</div>
            </div>
            <div className='flex items-center'>
              <div className='font-semibold mr-1.5 text-[16px]'>{icons.ICON_LOCATION}</div>
              <div className='text-[16px]'>Phan Chu Trinh, Hoàn Kiếm, Hà Nội</div>
            </div>
          </div>
        </Col>
        <Col span={8} className='justify-items-center'>
          <div>
            <div className='text-[16px] font-bold mb-3'>DỊCH VỤ CỦA CHÚNG TÔI</div>
            <div className='mb-1.5'>Tư vấn trang phục</div>
            <div className='mb-1.5'>Cá nhân hoá theo phong cách</div>
            <div className='mb-1.5'>Sử dụng tủ đồ của bạn để tư vấn</div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
