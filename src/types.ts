import { ComponentThis, StyledPlugin } from '@connectv/html';

import { ThemedStyle } from './themed-style';


export type ThemedComponentThis = ComponentThis & {
  themeStyled: <ThemeType, R, T>(style: ThemedStyle<ThemeType>) => StyledPlugin<R, T>;
}


export type SafeThemedComponentThis = Partial<ThemedComponentThis>;
