# JSS Themes
Static themes for [CONNECTIVE HTML](https://github.com/CONNECT-platform/connective-html)-based frontends using JSS. Provides a renderer plugin that makes styling your components using theme-based styles easy.

## Installation

```
npm i @connectv/jss-theme
```

## Usage

### Basic Example (Client Side):

```tsx
// index.tsx
import { theme } from '@connectv/jss-theme';
import { Renderer } from '@connectv/html';

import { MyComp, MyCompStyle } from './component';


const DarkTheme = theme({                          // --> define your theme
  bgcolor: 'black',
  textcolor: 'red'
})
.add(MyCompStyle);                                 // --> add component styles to your theme

const renderer = new Renderer().plug(DarkTheme);   // --> plug the theme into your renderer
renderer.render(DarkTheme.styleElement())
        .on(document.body);                        // --> render the stylesheets
renderer.render(<MyComp/>).on(document.body);      // --> render your content
```
In your component code:
```tsx
// component.tsx
import { themedStyle, ThemedComponentThis } from '@connectv/jss-theme';

export const MyCompStyle = themedStyle(theme => ({
  div: {
    background: theme.bgcolor,
    color: theme.textcolor,
    padding: '8px',
    border-radius: '3px'
  }
}));

export function MyComp(this: ThemedComponentThis, _, renderer) {
  const classes = this.theme.classes(MyCompStyle);

  return <div class={classes.div}>Halo!</div>
}
```
