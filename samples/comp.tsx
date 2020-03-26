import { themedStyle, ThemedComponentThis } from '../src';


export const style = themedStyle(theme => ({
  div: {
    background: theme.bg,
    color: 'red'
  },
  btn: {
    background: 'red',
    color: theme.bg
  }
}));


export function Comp(this: ThemedComponentThis, _: any, renderer: any) {
  renderer = renderer.plug(this.themeStyled(style));
  const classes = this.themeClasses(style);

  return <div>
    Hellow!
    <button class={classes.btn}>CLICK ME!</button>
  </div>
}
