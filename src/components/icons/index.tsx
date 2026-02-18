'use client'
import {
  AiFillBank,
  AiFillCreditCard,
  AiFillEdit,
  AiFillSetting,
  AiOutlineAppstore,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineMail,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlinePlus
} from 'react-icons/ai'
import { BiArchive, BiBarChart, BiLogIn, BiMenu, BiSolidUser } from 'react-icons/bi'
import { BsFillTrash3Fill, BsTelephone } from 'react-icons/bs'
import { CgRing } from 'react-icons/cg'
import { FaLocationDot } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { GiSkirt } from 'react-icons/gi'
import { MdPayment } from 'react-icons/md'
import { PiDress, PiHandbag, PiPants, PiSneaker, PiTShirt } from 'react-icons/pi'
import { TbLock, TbLockOpen } from 'react-icons/tb'

const icons = {
  ICON_GOOGLE: <FcGoogle />,
  ICON_DASBOARD: <BiBarChart className='text-[20px]!' />,
  ICON_USER: <BiSolidUser className='text-[20px]!' />,
  ICON_LOGOUT: <BiLogIn className='text-[20px]!' />,
  ICON_MENU_FOLD: <AiOutlineMenuFold />,
  ICON_MENU_UNFOLD: <AiOutlineMenuUnfold />,
  ICON_PLUS: <AiOutlinePlus />,
  ICON_VIEW: <AiOutlineEye className='text-(--color-blue)! text-[18px]!' />,
  ICON_EDIT: <AiFillEdit className='text-[#7cb305]! text-[18px]!' />,
  ICON_PHONE: <BsTelephone />,
  ICON_MAIL: <AiOutlineMail />,
  ICON_DELETE: <BsFillTrash3Fill className='text-(--color-red)! text-[16px]!' />,
  ICON_CONFIRM: <AiOutlineCheck className='text-(--color-green)! text-[18px]!' />,
  ICON_CLOSE: <AiOutlineClose className='text-(--color-red)! text-[18px]!' />,
  ICON_LOCATION: <FaLocationDot />,
  ICON_OUTLINE_CLOSE: <AiOutlineCloseCircle className='text-(--color-red)!' />,
  ICON_LOCK: <TbLock />,
  ICON_UNLOCK: <TbLockOpen />,
  ICON_PAYMENT: <MdPayment className='text-[#08979c]! text-[18px]!' />,
  ICON_SETTING: <AiFillSetting className='text-[18px]!' />,
  ICON_WITHDRAW_REQUEST: <AiFillCreditCard className='text-[18px]!' />,
  ICON_UPLOAD: <AiOutlineCloudUpload />,
  ICON_PAYMENT_ADMIN: <AiFillBank className='text-[20px]!' />,
  ICON_EDIT_NO_COLOR: <AiFillEdit />,
  ICON_ITEM_TYPE_ADMIN: <BiArchive className='text-[20px]!' />,
  ICON_TOP: <PiTShirt className='text-[20px]!' />,
  ICON_BOTTOM: <PiPants className='text-[20px]!' />,
  ICON_JEWELRY: <CgRing className='text-[20px]!' />,
  ICON_FOOTWEAR: <PiSneaker className='text-[20px]!' />,
  ICON_ACCESSORY: <PiHandbag className='text-[20px]!' />,
  ICON_DRESS: <PiDress className='text-[20px]!' />,
  ICON_SKIRT: <GiSkirt className='text-[20px]!' />,
  ICON_PLUS_FS20: <AiOutlinePlus className='text-[20px]!' />,
  ICON_EDIT_MINI: <AiFillEdit className='text-[15px]! text-[#08979c]!' />,
  ICON_PACKAGE: <AiOutlineAppstore className='text-[20px]!' />,
  ICON_MENU: <BiMenu className='text-[25px]!' />
}

export default icons
