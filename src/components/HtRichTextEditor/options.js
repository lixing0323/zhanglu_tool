// Detail plugins list see https://www.tinymce.com/docs/plugins/
// Custom builds see https://www.tinymce.com/download/custom-builds/
export const plugins = 'lists advlist anchor autolink autosave charmap emoticons link media image code wordcount searchreplace visualchars visualblocks'

// Detail list see https://www.tinymce.com/docs/advanced/editor-control-identifiers/#toolbarcontrols
export const toolbar = [
  'searchreplace | undo redo | styleselect | ' +
  'restoredraft code emoticons insertdatetime media nonbreaking wordcount image' +
  'bold italic underline strikethrough alignleft aligncenter alignright outdent indent | ' +
  'fontsizeselect fontselect forecolor backcolor table | image link charmap | code | bullist numlist hr removeformat'
]
export const fontSizeFormats = '14px 16px 18px 20px 24px 36px'

export const fontFormats = '微软雅黑=\'微软雅黑\';宋体=\'宋体\';黑体=\'黑体\';仿宋=\'仿宋\';楷体=\'楷体\';' +
  'Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;' +
  'Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;' +
  'Georgia=georgia,palatino;Helvetica=helvetica;Symbol=symbol;' +
  'Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times;'

export const styleFormats = [
  { title: '正文', inline: 'span', styles: { 'font-size': '14px', color: '#333333' }},
  { title: '大标题', inline: 'span', styles: { 'font-size': '24px', color: '#000', 'font-weight': 'bold' }},
  { title: '副标题', inline: 'span', styles: { 'font-size': '18px', color: '#111', 'font-weight': 'bold' }},
  { title: '强调', inline: 'span', styles: { 'font-size': '16px', color: '#333333', 'font-style': 'italic', 'font-weight': 'bold' }}
]
