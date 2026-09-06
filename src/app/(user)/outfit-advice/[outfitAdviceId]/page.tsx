'use client'
import { useState } from 'react'

const OutfitAdviceDetail = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    skinColor: '',
    gender: '',
    age: '',
    fashionStyle: '',
    occasion: '',
    notes: ''
  })
  const [response, setResponse] = useState<string | null>(null)

  return (
    <div className='bg-white p-6 border border-(--color-line)'>
      {/* Tóm tắt dữ liệu form phía trên */}
      <div className='mb-6 p-4 border border-(--color-line) bg-(--color-ivory)'>
        <h3 className='font-serif text-lg font-semibold mb-2 text-(--color-ink)'>Thông tin của bạn:</h3>
        <p>
          <strong>Chiều cao:</strong> {formData.height} cm
        </p>
        <p>
          <strong>Cân nặng:</strong> {formData.weight} kg
        </p>
        <p>
          <strong>Màu da:</strong>{' '}
          {formData.skinColor === 'fair' ? 'Trắng' : formData.skinColor === 'medium' ? 'Vàng' : 'Nâu/Đen'}
        </p>
        <p>
          <strong>Giới tính:</strong>{' '}
          {formData.gender === 'male' ? 'Nam' : formData.gender === 'female' ? 'Nữ' : 'Khác'}
        </p>
        <p>
          <strong>Tuổi:</strong> {formData.age}
        </p>
        <p>
          <strong>Phong cách:</strong> {formData.fashionStyle}
        </p>
        <p>
          <strong>Dịp:</strong>{' '}
          {formData.occasion === 'casual'
            ? 'Hàng ngày'
            : formData.occasion === 'formal'
              ? 'Đi làm'
              : formData.occasion === 'party'
                ? 'Dạ tiệc'
                : formData.occasion === 'wedding'
                  ? 'Đám cưới'
                  : formData.occasion === 'date'
                    ? 'Hẹn hò'
                    : 'Khác'}
        </p>
        {formData.notes && (
          <p>
            <strong>Ghi chú:</strong> {formData.notes}
          </p>
        )}
      </div>

      {/* Chat-like area phía dưới */}
      <div className='space-y-4'>
        {/* User message */}
        <div className='flex justify-end'>
          <div className='bg-(--color-ink) text-white p-3 max-w-md'>
            <p className='text-sm'>
              Tôi cần tư vấn trang phục cho dịp{' '}
              {formData.occasion === 'casual'
                ? 'hàng ngày'
                : formData.occasion === 'formal'
                  ? 'đi làm'
                  : formData.occasion === 'party'
                    ? 'dạ tiệc'
                    : formData.occasion === 'wedding'
                      ? 'đám cưới'
                      : formData.occasion === 'date'
                        ? 'hẹn hò'
                        : 'khác'}
              .
            </p>
          </div>
        </div>

        {/* AI message */}
        <div className='flex justify-start'>
          <div className='bg-(--color-ivory) text-(--color-text-default) p-3 max-w-md border border-(--color-line)'>
            <p className='text-sm'>{response}</p>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <button
          onClick={() => {}}
          className='bg-(--color-ink) text-white px-4 py-2 hover:bg-(--color-gold) transition-colors'
        >
          Tư vấn mới
        </button>
      </div>
    </div>
  )
}

export default OutfitAdviceDetail
