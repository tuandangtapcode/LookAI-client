'use client'
import Button from '@/components/button'
import { ICreateOutfitAdvice } from '@/interfaces/outfit-adivce'
import { globalSelector } from '@/redux/store'
import { SYSTEM_KEY } from '@/utils/constant/common'
import { getListComboKey } from '@/utils/helper/common'
import { formatAIAnswer } from '@/utils/helper/string'
import { memo } from 'react'
import { useSelector } from 'react-redux'

interface OutfitAdviceResultProps {
  answer: string
  payload: ICreateOutfitAdvice
  onNewAdvice: () => void
}

const OutfitAdviceResult = ({ answer, payload, onNewAdvice }: OutfitAdviceResultProps) => {
  const { listSystemKey } = useSelector(globalSelector)
  const GENDER = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg'>
      <div className='space-y-4'>
        <div className='flex justify-end'>
          <div className='bg-blue-500 text-white py-3 px-4 rounded-lg max-w-md'>
            <h3 className='text-lg font-semibold mb-2'>Thông tin của bạn:</h3>
            <p>
              <strong>Chiều cao:</strong> {payload.height} cm
            </p>
            <p>
              <strong>Cân nặng:</strong> {payload.weight} kg
            </p>
            <p>
              <strong>Màu da:</strong> {payload.skinColor}
            </p>
            <p>
              <strong>Giới tính:</strong> {GENDER.find((item) => item.keyValue === payload.gender)?.keyName}
            </p>
            <p>
              <strong>Tuổi:</strong> {payload.age}
            </p>
            <p>
              <strong>Phong cách hiện tại:</strong> {payload.currentStyle}
            </p>
            <p>
              <strong>Phong cách mong muốn:</strong> {payload.desiredStyle}
            </p>
            <p>
              <strong>Nghề nghiệp:</strong> {payload.occupation}
            </p>
            <p>
              <strong>Nơi sống:</strong> {payload.place}
            </p>
            <p>
              <strong>Dịp:</strong> {payload.occasion}
            </p>
          </div>
        </div>
        <div className='flex justify-start'>
          <div className='bg-gray-200 text-gray-800 py-3 px-4 rounded-lg max-w-md'>
            <div dangerouslySetInnerHTML={{ __html: formatAIAnswer(answer) }} />
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <Button type='outlineFullWidth' onClick={onNewAdvice}>
          Tư vấn mới
        </Button>
      </div>
    </div>
  )
}

export default memo(OutfitAdviceResult)
