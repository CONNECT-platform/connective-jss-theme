import { ComponentThis } from '@connectv/html';
import { ThemePlugin } from './theme';


export type ThemedComponentThis<ThemeType=any, R=any, T=any> = ComponentThis & {
  theme: ThemePlugin<ThemeType, R, T>;
};

export type SafeThemedComponentThis<ThemeType, R, T> = Partial<ThemedComponentThis<ThemeType, R, T>>;
