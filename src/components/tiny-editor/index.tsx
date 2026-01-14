// 'use client'
// import { Editor } from '@tinymce/tinymce-react'

// interface TinyEditorProps {
//   height?: string
//   value?: string
//   onChange?: (value: string) => void
// }

// const TinyEditor = ({ height = '450px', onChange, value }: TinyEditorProps) => {
//   return (
//     <Editor
//       apiKey='hz3abjz12zjd33izfuwrl9vr164s01op7i8lc818d497bwj9'
//       onEditorChange={(content) => onChange?.(content)}
//       value={value}
//       init={{
//         height: height,
//         file_picker_types: 'file',
//         deprecation_warnings: false,
//         fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px 56px 64px',
//         plugins: [
//           'advlist',
//           'autolink',
//           'lists',
//           'link',
//           'image',
//           'charmap',
//           'preview',
//           'anchor',
//           'searchreplace',
//           'visualblocks',
//           'code',
//           'fullscreen',
//           'insertdatetime',
//           'media',
//           'table',
//           'code',
//           'help',
//           'wordcount'
//         ],
//         menubar: 'tệp chỉnh_sửa xem chèn định_dạng công_cụ bảng trợ_giúp',
//         toolbar:
//           'undo redo | bold italic underline strikethrough | fontfamily fontsize | alignleft aligncenter alignright alignjustify lineheight | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak charmap emoticons | fullscreen preview print | insertfile template link anchor codesample | ltr rtl',
//         toolbar_sticky: true,
//         autosave_ask_before_unload: true,
//         autosave_interval: '30s',
//         autosave_prefix: '{path}{query}-{id}-',
//         autosave_restore_when_empty: false,
//         autosave_retention: '2m',
//         importcss_append: true,
//         save_onsavecallback: () => {},
//         language: 'vi',
//         language_url: 'https://cdn.jsdelivr.net/npm/tinymce-i18n/langs/vi.js',
//         paste_data_images: false,
//         templates: [
//           {
//             title: 'Bảng mới',
//             description: 'tạo bảng mới',
//             content:
//               '<div class="mceTmpl"><table width="98%" border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
//           },
//           {
//             title: 'Bắt đầu câu chuyện của tôi',
//             description: 'Một cách để viết',
//             content: 'Ngày xửa ngày xưa...'
//           },
//           {
//             title: 'Danh sách mới với ngày tháng',
//             description: 'Danh sách mới với ngày tháng',
//             content:
//               '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>Danh sách của tôi</h2><ul><li></li><li></li></ul></div>'
//           }
//         ],
//         template_cdate_format: '[Ngày tạo (CDATE): %m/%d/%Y : %H:%M:%S]',
//         template_mdate_format: '[Ngày sửa đổi (MDATE): %m/%d/%Y : %H:%M:%S]',
//         image_caption: true,
//         quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quicktable',
//         noneditable_noneditable_class: 'mceNonEditable',
//         toolbar_mode: 'sliding',
//         contextmenu: 'link table',
//         skin: 'oxide',
//         content_css: 'default',
//         content_style: 'body { font-family:Helvetica,Arial,sans-serif font-size:14px }'
//       }}
//     />
//   )
// }

// export default TinyEditor
