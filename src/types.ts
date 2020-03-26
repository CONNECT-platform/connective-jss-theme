import { ComponentThis, StyledPlugin, SafeComponentThis } from '@connectv/html';

import { ThemedStyle } from './themed-style';


type _ThemedComponentThis = {
  themeStyled: <ThemeType, R, T>(style: ThemedStyle<ThemeType>) => StyledPlugin<R, T>;
  themeClasses: <ThemeType>(style: ThemedStyle<ThemeType>) => {[name: string]: string};
}


export type ThemedComponentThis = ComponentThis & _ThemedComponentThis;
export type SafeThemedComponentThis = SafeComponentThis & _ThemedComponentThis | SafeComponentThis;
