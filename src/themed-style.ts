import jss, { Styles } from 'jss';
import { autoId } from '@connectv/html';


export type ThemedStyleFactory<ThemeType> = (theme: ThemeType) => Partial<Styles>;


export class ThemedStyle<ThemeType> {
  readonly id: string;

  constructor(readonly factory: ThemedStyleFactory<ThemeType>) {
    this.id = autoId();
  }

  style(theme: any) {
    return this.factory(theme);
  }

  styleSheet(theme: any) {
    return jss.createStyleSheet(this.style(theme));
  }
}


export function themedStyle<ThemeType=any>(factory: ThemedStyleFactory<ThemeType>) {
  return new ThemedStyle(factory);
}
