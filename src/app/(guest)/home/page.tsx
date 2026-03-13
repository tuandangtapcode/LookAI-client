'use client'
import { routes } from '@/utils/constant/route'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '40px 20px', color: '#111' }}>
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 420px',
          gap: 40,
          alignItems: 'center'
        }}
      >
        <div>
          <h1 style={{ fontSize: 48, margin: 0, lineHeight: 1.05 }}>LookAI — Tư vấn trang phục cá nhân hóa</h1>
          <p style={{ marginTop: 16, fontSize: 18, color: '#444' }}>
            Gợi ý trang phục theo phong cách: Free, Basic và Premium. Sử dụng tủ đồ của bạn và lịch sử tư vấn để xây
            dựng phong cách riêng.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Link
              href={routes.register?.source ?? '/register'}
              style={{
                background: '#111',
                color: '#fff',
                padding: '12px 18px',
                borderRadius: 8,
                textDecoration: 'none'
              }}
            >
              Bắt đầu
            </Link>
            <Link
              href={routes.login?.source ?? '/login'}
              style={{
                background: 'transparent',
                color: '#111',
                padding: '12px 18px',
                borderRadius: 8,
                border: '1px solid #ddd',
                textDecoration: 'none'
              }}
            >
              Đăng nhập
            </Link>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 16, color: '#666', fontSize: 14 }}>
            <div>
              <strong>Free:</strong> Gợi ý chung dựa trên thông tin bạn cung cấp.
            </div>
            <div>
              <strong>Basic:</strong> Sử dụng tủ đồ để gợi ý phù hợp.
            </div>
            <div>
              <strong>Premium:</strong> Stylist cá nhân dựa trên lịch sử tư vấn.
            </div>
          </div>
        </div>
        <div
          style={{ background: '#f6f7fb', borderRadius: 12, padding: 20, boxShadow: '0 6px 18px rgba(17,24,39,0.06)' }}
        >
          <h3 style={{ marginTop: 0 }}>Thử nghiệm ngay</h3>
          <p style={{ color: '#555' }}>Chọn gói và bắt đầu nhận gợi ý trang phục phù hợp với bạn.</p>
          <ul style={{ paddingLeft: 18, marginTop: 12 }}>
            <li>Nhập thông tin cơ bản</li>
            <li>Đồng bộ tủ đồ của bạn</li>
            <li>Nhận gợi ý theo phong cách</li>
          </ul>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            <button
              onClick={() => router.push(routes.packagesList?.source ?? '/packages-list')}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 8,
                border: 'none',
                background: '#06b6d4',
                color: '#fff'
              }}
            >
              Xem gói
            </button>
            <button
              onClick={() => router.push(routes.outfitAdvice?.source ?? '/outfit-advice')}
              style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff' }}
            >
              Gợi ý ngay
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '64px auto 0', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', margin: 0 }}>Tính năng nổi bật</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 24 }}>
          <Card
            title='Tự động kết hợp'
            desc='Hệ thống gợi ý những set đồ cân đối dựa trên tủ đồ và phong cách của bạn.'
          />
          <Card title='Lưu lịch sử' desc='Ghi nhớ các tư vấn trước để xây dựng phong cách cá nhân.' />
          <Card
            title='Stylist ảo'
            desc='Gói Premium giống như một stylist cá nhân, điều chỉnh theo phản hồi của bạn.'
          />
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '48px auto 80px', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>Sẵn sàng tạo phong cách của bạn?</h3>
        <p style={{ color: '#555', marginTop: 8 }}>Đăng ký ngay và bắt đầu nhận gợi ý phù hợp.</p>
        <div style={{ marginTop: 16 }}>
          <Link
            href={routes.register?.source ?? '/register'}
            style={{ background: '#111', color: '#fff', padding: '12px 20px', borderRadius: 8, textDecoration: 'none' }}
          >
            Đăng ký miễn phí
          </Link>
        </div>
      </section>
    </main>
  )
}

const Card = ({ title, desc }: { title: string; desc: string }) => (
  <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 4px 14px rgba(2,6,23,0.06)' }}>
    <h4 style={{ margin: '0 0 8px 0' }}>{title}</h4>
    <p style={{ margin: 0, color: '#555' }}>{desc}</p>
  </div>
)

export default Home
