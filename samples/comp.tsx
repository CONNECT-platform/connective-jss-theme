import { themedStyle, ThemedComponentThis } from '../src';


export const style = themedStyle(theme => ({
  div: {
    background: theme.bg,
    color: 'red'
  }
}));


export function Comp(this: ThemedComponentThis, _: any, renderer: any) {
  renderer = renderer.plug(this.themeStyled(style));

  return <div>Hellow!</div>
}
