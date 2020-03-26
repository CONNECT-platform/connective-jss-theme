import { SheetsRegistry, StyleSheet } from 'jss';
import { PostProcessPlugin } from '@connectv/sdh/transport';
import { CompProcessPlugin, PluginPriority, styled } from '@connectv/html';

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

      sheet.attach();
      this.registry.add(sheet);
    }

    return this;
  }

  sheet(themedStyle: ThemedStyle<ThemeType>) {
    this.add(themedStyle);
    return this.sheets[themedStyle.id];
  }

  classes(themedStyle: ThemedStyle<ThemeType>) {
    return this.sheet(themedStyle).classes;
  }

  styled(themedStyle: ThemedStyle<ThemeType>) {
    return styled(this.classes(themedStyle));
  }

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


export function theme<ThemeType=any, R=any, T=any>(theme: ThemeType) {
  return new ThemePlugin<ThemeType, R, T>(theme);
}
