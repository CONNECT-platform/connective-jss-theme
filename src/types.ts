import { ComponentThis } from '@connectv/html';
import { ThemePlugin } from './theme';


/**
 *
 * Represents the type of `this` in a component function that is to be
 * rendered by a renderer with a theme plugged in.
 *
 */
export type ThemedComponentThis<ThemeType=any, R=any, T=any> = ComponentThis & {
  /**
   *
   * The theme plugged into the renderer.
   *
   */
  theme: ThemePlugin<ThemeType, R, T>;
};

export type SafeThemedComponentThis<ThemeType, R, T> = Partial<ThemedComponentThis<ThemeType, R, T>>;
