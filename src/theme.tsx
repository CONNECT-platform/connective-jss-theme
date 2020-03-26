import { SheetsRegistry, StyleSheet } from 'jss';
import { PostProcessPlugin } from '@connectv/sdh/transport';
import { CompProcessPlugin, PluginPriority, StyledPlugin, RendererLike } from '@connectv/html';

import { ThemedStyle } from './themed-style';


export class ThemePlugin<ThemeType, R, T> implements PostProcessPlugin<R, T>, CompProcessPlugin<R, T> {
  priority = PluginPriority.High;

  private themedStyles: {[id: string]: ThemedStyle<ThemeType>} = {};
  private sheets: {[id: string]: StyleSheet} = {};
  private registry = new SheetsRegistry();

  constructor(readonly theme: any) {}

  add(themedStyle: ThemedStyle<ThemeType>) {
    if (!(themedStyle.id in this.themedStyles)) {
      this.themedStyles[themedStyle.id] = themedStyle;
      const sheet = this.sheets[themedStyle.id] = themedStyle.styleSheet(this.theme);
      this.registry.add(sheet);
    }

    return this;
  }

  sheet(themedStyle: ThemedStyle<ThemeType>) {
    return this.sheets[themedStyle.id];
  }

  post(html: HTMLDocument): void | Promise<void> {
    const el = html.createElement('style');
    el.innerHTML = this.registry.toString();
    html.body.append(el);
  }

  styleElement() {
    return (renderer: RendererLike<R, T>) => <style>{this.registry.toString()}</style>;
  }

  prepare(
    _: unknown, 
    __: unknown, 
    ___: unknown, 
    extra: { [name: string]: any; }): (result: Node) => void {

    const themeStyled = (themedStyle: ThemedStyle<ThemeType>) => {
      this.add(themedStyle);
      return new StyledPlugin<R, T>(this.sheet(themedStyle).classes);
    }

    extra.themeStyled = themeStyled;

    return () => {};
  }
}


export function theme<ThemeType=any, R=any, T=any>(theme: ThemeType) {
  return new ThemePlugin<ThemeType, R, T>(theme);
}
