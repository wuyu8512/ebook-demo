import MI_LAN_TING from '../assets/fonts/MI LANTING.ttf'

let fontStyle = `@font-face {
  font-family: 'mi_lan_ting';
  src: url('{mi_lan_ting}');
}`

fontStyle = fontStyle.replace('{mi_lan_ting}',window.location.origin + MI_LAN_TING)

export const FONT_STYLE = fontStyle

export const FONT_FAMILY = [
	{font: "Default", name: "默认"},
	{font: 'mi_lan_ting', name: "小米兰亭"}
]