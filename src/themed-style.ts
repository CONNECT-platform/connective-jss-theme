import jss, { Styles, StyleSheet } from 'jss';
import { autoId } from '@connectv/html';


/**
 * 
 * Denotes a function that returns a JSS style based on given
 * theme object.
 * 
 */
export type ThemedStyleFactory<ThemeType> = (theme: ThemeType) => Partial<Styles>;


/**
 *
 * Represents a themed style. A themed style can be resolved into
 * JSS stylesheets using a theme object.
 *
 */
export class ThemedStyle<ThemeType> {
  /**
   *
   * Uniquely identifies this themed style.
   *
   */
  readonly id: string;

  /**
   *
   * @param factory the `ThemedStyleFactory` function to be used for resolving this themed style
   *                to JSS stylesheets
   *
   */
  constructor(readonly factory: ThemedStyleFactory<ThemeType>) {
    this.id = autoId();
  }

  /**
   *
   * @param theme
   * @returns a resolved style object based on given theme
   *
   */
  style(theme: any) {
    return this.factory(theme);
  }

  /**
   *
   * @param theme
   * @returns a JSS stylesheet based on given theme
   *
   */
  styleSheet(theme: any): StyleSheet {
    return jss.createStyleSheet(this.style(theme));
  }
}


/**
 *
 * Creates a `ThemedStyle` object from given `ThemedStyleFactory`. The given
 * function will be utilized to resolve the themed style to JSS stylesheets
 * from given theme objects.
 *
 * @param factory 
 *
 */
export function themedStyle<ThemeType=any>(factory: ThemedStyleFactory<ThemeType>) {
  return new ThemedStyle(factory);
}
