'use client'
import Button from '@/components/button'
import { routes } from '@/utils/constant/route'
import {
  AppstoreAddOutlined,
  ArrowRightOutlined,
  CrownOutlined,
  MobileOutlined,
  RobotOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  StarFilled,
  ThunderboltOutlined
} from '@ant-design/icons'
import { Card, Col, Progress, Row, Space, Tag, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Benefit from './_components/Benefit'
import MobileAction from './_components/MobileAction'
import SuggestionItem from './_components/SuggestionItem'

const Home = () => {
  const router = useRouter()

  const metrics = [
    { label: 'Tư vấn mỗi ngày', value: '2.500+', icon: <RobotOutlined className='text-lg text-cyan-500' /> },
    { label: 'Set đồ đã cá nhân hóa', value: '120K+', icon: <SkinOutlined className='text-lg text-rose-500' /> },
    { label: 'Người dùng mobile', value: '68%', icon: <MobileOutlined className='text-lg text-emerald-500' /> }
  ]

  const featureCards = [
    {
      title: 'AI tư vấn thông minh',
      desc: 'AI phân tích phong cách, lịch sử tư vấn và dịp sử dụng để đề xuất outfit phù hợp theo ngữ cảnh.',
      icon: <RobotOutlined className='text-xl text-cyan-500' />
    },
    {
      title: 'Nâng cấp gói dễ dàng',
      desc: 'Mua gói dịch vụ để mở rộng số lượt tư vấn, tăng mức độ cá nhân hóa và ưu tiên phản hồi chất lượng cao.',
      icon: <CrownOutlined className='text-xl text-amber-500' />
    },
    {
      title: 'Tủ quần áo cá nhân',
      desc: 'Thêm đồ đang sở hữu vào tủ đồ để AI phối set thực tế, tiết kiệm thời gian và tránh mua sắm lãng phí.',
      icon: <AppstoreAddOutlined className='text-xl text-violet-500' />
    },
    {
      title: 'Đồng bộ đa nền tảng',
      desc: 'Bản mobile giúp chụp ảnh, cập nhật tủ đồ nhanh hơn để AI tư vấn sát tình huống hằng ngày.',
      icon: <MobileOutlined className='text-xl text-emerald-500' />
    }
  ]

  return (
    <main
      className='relative overflow-hidden text-(--color-text-default)'
      style={{
        background:
          'radial-gradient(circle at 20% 15%, rgba(73, 187, 189, 0.28), transparent 36%), radial-gradient(circle at 85% 55%, rgba(181, 238, 238, 0.45), transparent 35%), linear-gradient(180deg, #f4ffff 0%, #ebf9f9 45%, #dff2f2 100%)'
      }}
    >
      <div className='pointer-events-none absolute -top-28 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-(--color-primary)/20 blur-[120px]' />
      <div className='pointer-events-none absolute -right-24 top-136 h-105 w-105 rounded-full bg-(--color-primary-matte)/70 blur-[110px]' />

      <section className='relative mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pt-20'>
        <div className='grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
          <div>
            <Tag
              color='cyan'
              className='rounded-full border-0 bg-(--color-primary)/20! px-4 py-1 text-sm font-medium text-(--color-primary)!'
              icon={<ThunderboltOutlined />}
            >
              AI Styling Platform
            </Tag>

            <Typography.Title level={1} className='mb-4! mt-4! text-4xl! leading-tight! text-slate-900! md:text-6xl!'>
              LookAI giúp bạn mặc đẹp
              <span
                className='bg-clip-text text-transparent'
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-hover) 55%, #1db954 100%)'
                }}
              >
                {' '}
                theo đúng phong cách riêng
              </span>
            </Typography.Title>

            <Typography.Paragraph className='mb-7! max-w-2xl text-base! text-slate-700! md:text-lg!'>
              Tư vấn phối đồ bằng AI, nâng cấp bằng gói dịch vụ cá nhân hóa sâu hơn, đồng bộ tủ quần áo từ web và mobile
              để mọi gợi ý đều thực tế, đúng nhu cầu, đúng hoàn cảnh.
            </Typography.Paragraph>

            <Space size={12} wrap>
              <Button
                type='save'
                size='large'
                icon={<ArrowRightOutlined />}
                onClick={() => router.push(routes.register?.source)}
              >
                Đăng ký trải nghiệm
              </Button>
              <Button
                size='large'
                type='outline'
                icon={<ShoppingCartOutlined />}
                onClick={() => router.push(routes.packagesList?.source ?? '/packages-list')}
              >
                Xem gói dịch vụ
              </Button>
            </Space>

            <div className='mt-8 grid gap-3 sm:grid-cols-3'>
              {metrics.map((metric) => (
                <Card
                  key={metric.label}
                  className='rounded-2xl! border! border-white/70! bg-white/85! shadow-[0_10px_30px_rgba(73,187,189,0.12)]! backdrop-blur'
                  styles={{
                    body: {
                      padding: 16,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }
                  }}
                >
                  <Space className='mb-1!' size={8}>
                    {metric.icon}
                    <Typography.Text className='text-xs! uppercase! tracking-wider! text-slate-500!'>
                      {metric.label}
                    </Typography.Text>
                  </Space>
                  <Typography.Title level={4} className='m-0! text-slate-900!'>
                    {metric.value}
                  </Typography.Title>
                </Card>
              ))}
            </div>
          </div>

          <Card className='rounded-3xl! border! border-white/70! bg-white/85! shadow-[0_20px_60px_rgba(73,187,189,0.2)]! backdrop-blur-md'>
            <div className='rounded-2xl border border-(--color-primary)/35 bg-linear-to-br from-(--color-primary-matte)/45 via-white to-(--color-background)/35 p-5'>
              <div className='mb-4 flex items-start justify-between'>
                <div>
                  <Typography.Text className='text-xs! uppercase! tracking-[0.2em]! text-(--color-primary)!'>
                    AI Outfit Preview
                  </Typography.Text>
                  <Typography.Title level={4} className='mb-0! mt-1! text-slate-900!'>
                    Hôm nay mặc gì để vừa lịch sự vừa trẻ trung?
                  </Typography.Title>
                </div>
                <StarFilled className='text-amber-500' />
              </div>

              <Space size={10} className='w-full'>
                <SuggestionItem title='Áo sơ mi trắng oversize' tone='Năng động, sáng da' />
                <SuggestionItem title='Quần jeans ống suông xanh nhạt' tone='Cân bằng form và tôn dáng' />
                <SuggestionItem title='Giày sneaker trắng + túi đeo chéo' tone='Gọn gàng, phù hợp đi làm và cafe' />
              </Space>

              <div className='mt-5 rounded-xl border border-white/80 bg-white/80 p-4'>
                <Typography.Text className='text-slate-700!'>Độ phù hợp với tủ đồ hiện tại</Typography.Text>
                <Progress percent={92} strokeColor='var(--color-primary)' showInfo={false} />
                <Typography.Text className='text-xs! text-slate-500!'>
                  Dựa trên 18 món đồ đã đồng bộ từ tủ quần áo của bạn
                </Typography.Text>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='mb-6 text-center'>
          <Typography.Title level={2} className='mb-2! text-slate-900!'>
            Tính năng làm nên trải nghiệm khác biệt
          </Typography.Title>
          <Typography.Paragraph className='mx-auto! mb-0! max-w-3xl text-slate-700!'>
            Không chỉ là gợi ý đẹp mắt, LookAI giúp bạn xây hệ thống phong cách cá nhân có thể sử dụng mỗi ngày.
          </Typography.Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {featureCards.map((feature) => (
            <Col key={feature.title} xs={24} md={12}>
              <Card className='group h-full rounded-2xl! border! border-white/75! bg-white/90! transition-all duration-300 hover:border-(--color-primary)/50! hover:-translate-y-1! hover:shadow-[0_14px_30px_rgba(73,187,189,0.16)]!'>
                <Space align='start' size={12}>
                  <div className='rounded-xl bg-(--color-primary-matte)/65 p-3 transition-colors duration-300 group-hover:bg-(--color-primary)/20'>
                    {feature.icon}
                  </div>
                  <div>
                    <Typography.Title level={4} className='mb-1! text-slate-900!'>
                      {feature.title}
                    </Typography.Title>
                    <Typography.Paragraph className='mb-0! text-slate-700!'>{feature.desc}</Typography.Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className='mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8'>
        <Card className='rounded-3xl! border! border-(--color-primary)/35! bg-linear-to-br! from-(--color-primary-matte)/75! via-white! to-[#f0fbfb]!'>
          <Typography.Title level={3} className='mb-2! text-slate-900!'>
            Tủ quần áo số hóa cho AI hiểu rõ bạn
          </Typography.Title>
          <Typography.Paragraph className='text-slate-700!'>
            Tạo tủ đồ cá nhân bằng ảnh thật của bạn, phân loại theo kiểu dáng, màu sắc, chất liệu để AI phối đồ chính
            xác hơn sau mỗi lần tư vấn.
          </Typography.Paragraph>
          <Space size={8}>
            <Benefit text='Gợi ý dựa trên món đồ bạn đang sở hữu' />
            <Benefit text='Lưu lại công thức phối đồ đã hiệu quả' />
            <Benefit text='Giảm chi tiêu nhờ tận dụng đồ hiện có' />
          </Space>
          <div className='mt-6'>
            <Link href={routes.wardrobe?.source ?? '/wardrobe'}>
              <Button size='large' icon={<AppstoreAddOutlined />} onClick={() => {}}>
                Khám phá tủ quần áo
              </Button>
            </Link>
          </div>
        </Card>

        <Card className='rounded-3xl! border! border-white/75! bg-white/90!'>
          <div className='mx-auto max-w-lg rounded-4xl border-4 border-(--color-background) bg-[#f7ffff] p-4 shadow-[0_20px_50px_rgba(73,187,189,0.16)]'>
            <div className='mb-3 rounded-xl bg-linear-to-r from-(--color-primary-matte) to-(--color-background)/60 p-3'>
              <Typography.Text className='text-xs! uppercase! tracking-widest! text-(--color-green)!'>
                Mobile App
              </Typography.Text>
              <Typography.Title level={5} className='mb-0! mt-1! text-slate-900!'>
                Chụp đồ, lưu ngay vào tủ
              </Typography.Title>
            </div>
            <Space size={10} className='w-full'>
              <MobileAction icon={<MobileOutlined />} title='Quét ảnh quần áo trong 1 chạm' />
              <MobileAction icon={<SkinOutlined />} title='AI tự nhận diện danh mục & màu sắc' />
              <MobileAction icon={<RobotOutlined />} title='Nhận gợi ý outfit theo lịch trong ngày' />
            </Space>
          </div>
          <Typography.Paragraph className='mb-0! mt-4! text-center text-slate-700!'>
            Khi đang ở ngoài, bạn vẫn có thể cập nhật tủ đồ và nhận tư vấn tức thì từ điện thoại.
          </Typography.Paragraph>
        </Card>
      </section>

      <section className='mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8'>
        <Card className='rounded-3xl! border! border-(--color-primary)/35! bg-linear-to-r! from-[#eaffff]! via-(--color-primary-matte)/55! to-[#edf8f8]!'>
          <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
            <div className='max-w-2xl'>
              <Typography.Title level={2} className='mb-2! text-slate-900!'>
                Nâng cấp phong cách ngay hôm nay với LookAI
              </Typography.Title>
              <Typography.Paragraph className='mb-0! text-slate-700!'>
                Chọn gói dịch vụ phù hợp để mở khóa tư vấn cá nhân hóa sâu hơn, tăng chất lượng gợi ý và đồng hành phong
                cách lâu dài cùng AI.
              </Typography.Paragraph>
            </div>
            <Space size={12} wrap>
              <Link href={routes.packagesList?.source ?? '/packages-list'}>
                <Button size='large' icon={<CrownOutlined />} onClick={() => {}}>
                  Chọn gói nâng cấp
                </Button>
              </Link>
              <Link href={routes.login?.source ?? '/login'}>
                <Button size='large' onClick={() => {}}>
                  Đăng nhập
                </Button>
              </Link>
            </Space>
          </div>
        </Card>
      </section>
    </main>
  )
}

export default Home
