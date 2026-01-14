'use client'
import {
  AiFillBank,
  AiFillCreditCard,
  AiFillEdit,
  AiFillSetting,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineEye,
  AiOutlineFileDone,
  AiOutlineMail,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlinePlus,
  AiOutlineSync
} from 'react-icons/ai'
import {
  BiBarChart,
  BiCheckboxChecked,
  BiCheckCircle,
  BiCopyAlt,
  BiEdit,
  BiLogIn,
  BiRadioCircleMarked,
  BiSolidBook,
  BiSolidUser
} from 'react-icons/bi'
import { BsFileText, BsFiletypeDocx, BsFiletypePdf, BsFillTrash3Fill, BsTelephone } from 'react-icons/bs'
import { FaBook, FaLocationDot, FaUserGraduate } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { MdPayment } from 'react-icons/md'
import { TbLock, TbLockOpen } from 'react-icons/tb'

const icons = {
  ICON_GOOGLE: <FcGoogle />,
  ICON_DASBOARD: <BiBarChart className='text-[18px]!' />,
  ICON_USER: <BiSolidUser className='text-[18px]!' />,
  ICON_SUBJECT: <BiSolidBook className='text-[18px]!' />,
  ICON_LOGOUT: <BiLogIn className='text-[18px]!' />,
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
  ICON_EDUCATION: <FaUserGraduate />,
  ICON_BOOK: <FaBook />,
  ICON_OUTLINE_CLOSE: <AiOutlineCloseCircle className='text-(--color-red)!' />,
  ICON_LOCK: <TbLock />,
  ICON_UNLOCK: <TbLockOpen />,
  ICON_NOTE: <AiOutlineFileDone className='text-[#531dab]! text-[18px]!' />,
  ICON_PAYMENT: <MdPayment className='text-[#08979c]! text-[18px]!' />,
  ICON_SETTING: <AiFillSetting className='text-[18px]!' />,
  ICON_SYNC: <AiOutlineSync />,
  ICON_WITHDRAW_REQUEST: <AiFillCreditCard className='text-[18px]!' />,
  ICON_UPLOAD: <AiOutlineCloudUpload />,
  ICON_PAYMENT_ADMIN: <AiFillBank className='text-[18px]!' />,
  ICON_PDF: <BsFiletypePdf className='text-[16px]!' />,
  ICON_DOCX: <BsFiletypeDocx className='text-[16px]!' />,
  ICON_FORM: <BsFileText className='text-[16px]!' />,
  ICON_SINGLE_CHOICE: <BiRadioCircleMarked className='text-[24px]!' />,
  ICON_MULTIPLE_CHOICE: <BiCheckboxChecked className='text-[24px]!' />,
  ICON_TRUE_FALSE: <BiCheckCircle className='text-[24px]!' />,
  ICON_ANSWER: <BiEdit className='text-[24px]!' />,
  ICON_DELETE_NO_COLOR: <BsFillTrash3Fill />,
  ICON_EDIT_NO_COLOR: <AiFillEdit />,
  ICON_GROUP_QUESTION: <BiCopyAlt className='text-[24px]!' />
}

export default icons
