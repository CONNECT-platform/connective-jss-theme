import { SheetsRegistry, StyleSheet } from 'jss';
import { PostProcessPlugin } from '@connectv/sdh/transport';
import { CompProcessPlugin, PluginPriority, styled } from '@connectv/html';

import { ThemedStyle } from './themed-style';


/**
 *
 * A rendering plugin representing a theme. Provides access to the theme to
 * components. Resolves given `ThemedStyle` objects with the specified theme,
 * attaches them to the document on the client side or stores them and attaches them all
 * to the final document in server-side rendering.
 *
 */
export class ThemePlugin<ThemeType, R, T> implements PostProcessPlugin<R, T>, CompProcessPlugin<R, T> {
  priority = PluginPriority.High;

  private themedStyles: {[id: string]: ThemedStyle<ThemeType>} = {};
  private sheets: {[id: string]: StyleSheet} = {};
  private registry = new SheetsRegistry();

  /**
   *
   * @param theme the underlying theme object
   *
   */
  constructor(readonly theme: ThemeType) {}

  /**
   *
   * Adds given `ThemedStyle` object to the list of styles managed by this plugin.
   * Will attach resolved stylesheet of the style to the document on the client side
   * or stores the resolved stylesheets and renders them to given documents in case of
   * server side rendering, if the style is not added before.
   *
   * If you want to prefetch your component styles, simply call this function on your
   * styles. This will ensure that they are attached to the document and will not be dynamically
   * re-attached when accessed by a component.
   *
   * @param themedStyle
   * @returns `this` for chaining convenience.
   *
   */
  add(themedStyle: ThemedStyle<ThemeType>) {
    if (!(themedStyle.id in this.themedStyles)) {
      this.themedStyles[themedStyle.id] = themedStyle;
      const sheet = this.sheets[themedStyle.id] = themedStyle.styleSheet(this.theme);

      sheet.attach();
      this.registry.add(sheet);
    }

    return this;
  }

  /**
   *
   * Will add given style to managed styles (if not added before) and
   * return the resolved JSS stylesheet.
   *
   * @param themedStyle
   *
   */
  sheet(themedStyle: ThemedStyle<ThemeType>) {
    this.add(themedStyle);
    return this.sheets[themedStyle.id];
  }

  /**
   *
   * Will add given style to managed styles (if not added before) and
   * return the class map of the resolved JSS stylesheet.
   *
   * @param themedStyle
   *
   */
  classes(themedStyle: ThemedStyle<ThemeType>) {
    return this.sheet(themedStyle).classes;
  }

  /**
   *
   * Will add given style to managed styles (if not added before) and
   * return a rendering plugin that automatically adds classes to rendered elements
   * based on their tag name.
   *
   * Example:
   * ```tsx
   * const style = themedStyle(theme => ({
   *   div: {
   *      background: 'red',
   *      color: theme.primary,
   *   }
   * }));
   *
   * export function Comp(_, renderer) {
   *   renderer = renderer.plug(this.theme.styled(style));
   *   return <div>Hellow</div>         // --> the div will automatically get the styles.
   * }
   * ```
   *
   * @param themedStyle 
   *
   */
  styled(themedStyle: ThemedStyle<ThemeType>) {
    return styled(this.classes(themedStyle));
  }

  /**
   *
   * Will render all stored styles on the given document. This is particularly
   * useful for server-side rendering. DO NOT CALL THIS ON CLIENT SIDE, as on the
   * client side all styles are attached upon being added and this will only cause
   * duplicate styles to be attached to the document.
   *
   * @param html 
   *
   */
  post(html: HTMLDocument): void | Promise<void> {
    const el = html.createElement('style');
    el.innerHTML = this.registry.toString();
    html.head.append(el);
  }

  prepare(
    _: unknown, 
    __: unknown, 
    ___: unknown, 
    extra: { [name: string]: any; }): (result: Node) => void {

    extra.theme = this;

    return () => {};
  }
}


/**
 *
 * Creates a theme plugin based on given theme object. This plugin then can be
 * plugged into a renderer.
 *
 * Example:
 * ```tsx
 * import { Renderer } from '@connectv/html';
 *
 * const myTheme = theme({
 *   primary: '#ff00ff'
 * });
 *
 * const renderer = new Renderer().plug(myTheme);
 * ```
 *
 * @param theme 
 *
 */
export function theme<ThemeType=any, R=any, T=any>(theme: ThemeType) {
  return new ThemePlugin<ThemeType, R, T>(theme);
}
