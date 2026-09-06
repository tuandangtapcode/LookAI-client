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
import { Card, Col, Progress, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Benefit from './_components/Benefit'
import MobileAction from './_components/MobileAction'
import SuggestionItem from './_components/SuggestionItem'

const Home = () => {
  const router = useRouter()

  const metrics = [
    { label: 'Tư vấn mỗi ngày', value: '2.500+', icon: <RobotOutlined className='text-lg text-(--color-gold)' /> },
    { label: 'Set đồ đã cá nhân hóa', value: '120K+', icon: <SkinOutlined className='text-lg text-(--color-gold)' /> },
    {
      label: 'Người dùng mobile',
      value: '68%',
      icon: <MobileOutlined className='text-lg text-(--color-gold)' />
    }
  ]

  const featureCards = [
    {
      title: 'AI tư vấn thông minh',
      desc: 'AI phân tích phong cách, lịch sử tư vấn và dịp sử dụng để đề xuất outfit phù hợp theo ngữ cảnh.',
      icon: <RobotOutlined className='text-xl text-(--color-gold)' />
    },
    {
      title: 'Nâng cấp gói dễ dàng',
      desc: 'Mua gói dịch vụ để mở rộng số lượt tư vấn, tăng mức độ cá nhân hóa và ưu tiên phản hồi chất lượng cao.',
      icon: <CrownOutlined className='text-xl text-(--color-gold)' />
    },
    {
      title: 'Tủ quần áo cá nhân',
      desc: 'Thêm đồ đang sở hữu vào tủ đồ để AI phối set thực tế, tiết kiệm thời gian và tránh mua sắm lãng phí.',
      icon: <AppstoreAddOutlined className='text-xl text-(--color-gold)' />
    },
    {
      title: 'Đồng bộ đa nền tảng',
      desc: 'Bản mobile giúp chụp ảnh, cập nhật tủ đồ nhanh hơn để AI tư vấn sát tình huống hằng ngày.',
      icon: <MobileOutlined className='text-xl text-(--color-gold)' />
    }
  ]

  return (
    <main className='relative overflow-hidden bg-(--color-ivory) text-(--color-text-default)'>
      <section className='relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pt-24'>
        <div className='grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'>
          <div className='animate-fade-up'>
            <Space size={8} className='mb-5 text-(--color-gold)'>
              <ThunderboltOutlined />
              <span className='tracking-label'>AI Styling Platform</span>
            </Space>

            <Typography.Title
              level={1}
              className='mb-6! mt-0! text-[42px]! leading-[1.15]! font-semibold! md:text-[64px]!'
            >
              LookAI giúp bạn mặc đẹp
              <br />
              <em className='text-(--color-gold)' style={{ fontStyle: 'italic' }}>
                theo đúng phong cách riêng
              </em>
            </Typography.Title>

            <Typography.Paragraph className='mb-9! max-w-xl text-base! leading-relaxed! text-(--color-text-default)/80!'>
              Tư vấn phối đồ bằng AI, nâng cấp bằng gói dịch vụ cá nhân hóa sâu hơn, đồng bộ tủ quần áo từ web và mobile
              để mọi gợi ý đều thực tế, đúng nhu cầu, đúng hoàn cảnh.
            </Typography.Paragraph>

            <Space size={16} wrap>
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

            <div className='mt-12 grid gap-6 border-t border-(--color-line) pt-8 sm:grid-cols-3'>
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <Space className='mb-1.5! min-h-8! items-start!' size={8}>
                    {metric.icon}
                    <span className='tracking-label text-(--color-text-default)/50'>{metric.label}</span>
                  </Space>
                  <Typography.Title level={3} className='m-0! text-3xl!'>
                    {metric.value}
                  </Typography.Title>
                </div>
              ))}
            </div>
          </div>

          <Card className='animate-fade-up rounded-none! border! border-(--color-line)! bg-white! shadow-[0_24px_60px_rgba(26,23,20,0.08)]!'>
            <div className='border border-(--color-line) bg-(--color-ivory) p-6'>
              <div className='mb-5 flex items-start justify-between'>
                <div>
                  <span className='tracking-label text-(--color-gold)'>AI Outfit Preview</span>
                  <Typography.Title level={4} className='mb-0! mt-2! text-xl!'>
                    Hôm nay mặc gì để vừa lịch sự vừa trẻ trung?
                  </Typography.Title>
                </div>
                <StarFilled className='text-(--color-gold)' />
              </div>

              <div className='flex flex-col gap-3'>
                <SuggestionItem title='Áo sơ mi trắng oversize' tone='Năng động, sáng da' />
                <SuggestionItem title='Quần jeans ống suông xanh nhạt' tone='Cân bằng form và tôn dáng' />
                <SuggestionItem title='Giày sneaker trắng + túi đeo chéo' tone='Gọn gàng, phù hợp đi làm và cafe' />
              </div>

              <div className='mt-6 border border-(--color-line) bg-white p-4'>
                <Typography.Text className='text-(--color-text-default)/80!'>
                  Độ phù hợp với tủ đồ hiện tại
                </Typography.Text>
                <Progress percent={92} strokeColor='var(--color-gold)' showInfo={false} />
                <Typography.Text className='text-xs! text-(--color-text-default)/50!'>
                  Dựa trên 18 món đồ đã đồng bộ từ tủ quần áo của bạn
                </Typography.Text>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <span className='tracking-label text-(--color-gold)'>Vì sao chọn LookAI</span>
          <Typography.Title level={2} className='mb-3! mt-3! text-3xl! md:text-4xl!'>
            Tính năng làm nên trải nghiệm khác biệt
          </Typography.Title>
          <Typography.Paragraph className='mx-auto! mb-0! max-w-2xl text-(--color-text-default)/70!'>
            Không chỉ là gợi ý đẹp mắt, LookAI giúp bạn xây hệ thống phong cách cá nhân có thể sử dụng mỗi ngày.
          </Typography.Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {featureCards.map((feature) => (
            <Col key={feature.title} xs={24} md={12}>
              <Card className='group h-full rounded-none! border! border-(--color-line)! bg-white! transition-all duration-300 hover:border-(--color-gold)! hover:shadow-[0_16px_36px_rgba(26,23,20,0.08)]!'>
                <Space align='start' size={16}>
                  <div className='flex h-12 w-12 shrink-0 items-center justify-center border border-(--color-line) transition-colors duration-300 group-hover:border-(--color-gold)'>
                    {feature.icon}
                  </div>
                  <div>
                    <Typography.Title level={4} className='mb-1.5! text-lg!'>
                      {feature.title}
                    </Typography.Title>
                    <Typography.Paragraph className='mb-0! text-(--color-text-default)/70!'>
                      {feature.desc}
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className='mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8'>
        <Card className='rounded-none! border! border-(--color-line)! bg-(--color-ivory-deep)!'>
          <span className='tracking-label text-(--color-gold)'>Tủ đồ số hóa</span>
          <Typography.Title level={3} className='mb-3! mt-3! text-2xl!'>
            Tủ quần áo số hóa cho AI hiểu rõ bạn
          </Typography.Title>
          <Typography.Paragraph className='text-(--color-text-default)/75!'>
            Tạo tủ đồ cá nhân bằng ảnh thật của bạn, phân loại theo kiểu dáng, màu sắc, chất liệu để AI phối đồ chính
            xác hơn sau mỗi lần tư vấn.
          </Typography.Paragraph>
          <div className='flex flex-col gap-2.5'>
            <Benefit text='Gợi ý dựa trên món đồ bạn đang sở hữu' />
            <Benefit text='Lưu lại công thức phối đồ đã hiệu quả' />
            <Benefit text='Giảm chi tiêu nhờ tận dụng đồ hiện có' />
          </div>
          <div className='mt-7'>
            <Link href={routes.wardrobe?.source ?? '/wardrobe'}>
              <Button size='large' icon={<AppstoreAddOutlined />} onClick={() => {}}>
                Khám phá tủ quần áo
              </Button>
            </Link>
          </div>
        </Card>

        <Card className='rounded-none! border! border-(--color-line)! bg-white!'>
          <div className='mx-auto max-w-lg border border-(--color-line) bg-(--color-ivory) p-5'>
            <div className='mb-4 border border-(--color-line) bg-white p-4'>
              <span className='tracking-label text-(--color-gold)'>Mobile App</span>
              <Typography.Title level={5} className='mb-0! mt-2! text-base!'>
                Chụp đồ, lưu ngay vào tủ
              </Typography.Title>
            </div>
            <div className='flex flex-col gap-3'>
              <MobileAction icon={<MobileOutlined />} title='Quét ảnh quần áo trong 1 chạm' />
              <MobileAction icon={<SkinOutlined />} title='AI tự nhận diện danh mục & màu sắc' />
              <MobileAction icon={<RobotOutlined />} title='Nhận gợi ý outfit theo lịch trong ngày' />
            </div>
          </div>
          <Typography.Paragraph className='mb-0! mt-5! text-center text-(--color-text-default)/70!'>
            Khi đang ở ngoài, bạn vẫn có thể cập nhật tủ đồ và nhận tư vấn tức thì từ điện thoại.
          </Typography.Paragraph>
        </Card>
      </section>

      <section className='mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8'>
        <Card className='rounded-none! border! border-(--color-ink)! bg-(--color-ink)! text-white!'>
          <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
            <div className='max-w-2xl'>
              <span className='tracking-label text-(--color-gold)'>Bắt đầu ngay</span>
              <Typography.Title level={2} className='mb-2! mt-3! text-2xl! text-white! md:text-3xl!'>
                Nâng cấp phong cách ngay hôm nay với LookAI
              </Typography.Title>
              <Typography.Paragraph className='mb-0! text-white/70!'>
                Chọn gói dịch vụ phù hợp để mở khóa tư vấn cá nhân hóa sâu hơn, tăng chất lượng gợi ý và đồng hành phong
                cách lâu dài cùng AI.
              </Typography.Paragraph>
            </div>
            <Space size={12} wrap>
              <Link href={routes.packagesList?.source ?? '/packages-list'}>
                <Button size='large' type='register' icon={<CrownOutlined />} onClick={() => {}}>
                  Chọn gói nâng cấp
                </Button>
              </Link>
              <Link href={routes.login?.source ?? '/login'}>
                <Button size='large' type='cancel' onClick={() => {}}>
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
