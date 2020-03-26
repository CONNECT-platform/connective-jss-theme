# JSS Themes
Static themes for [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)-based frontends using JSS. Provides a renderer plugin that makes styling your components using theme-based styles easy.

## Installation

```
npm i @connectv/jss-theme
```

## Usage

### Basic Examples:

```tsx
// component.tsx

import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';


//
// --> step 1: define your themed style, which is a style sheet that is resolved based on
// --- some theme:
//
export const MyStyle = themedStyle(theme => {
  div: {
    background: theme.bgcolor,
    color: theme.textcolor,
    padding: '8px',
    'border-radius': '3px'
  }
});

export function MyComp(this: ThemedComponentThis, _, renderer) {
  const classes = this.themeClasses(MyStyle);

  return <div class={classes.div}>Halo!</div>
}
```

```tsx
// index.tsx
import { Renderer } from '@connectv/html';
import { theme } from '@connectv/jss-theme';

import { MyStyle, MyComp } from './component';


const MyTheme = theme({                                    // --> define the theme
  bgcolor: 'black',
  textcolor: 'red'
})
.add(MyStyle);                                             // --> add your component styles

const renderer = new Renderer().plug(MyTheme);             // --> plug the theme in your renderer

renderer.render(MyTheme.styleElement()).on(document.body); // --> render the styles
renderer.render(<MyComp/>).on(document.body);              // --> render your components
```

