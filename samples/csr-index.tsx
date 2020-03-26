import { theme } from '../src';
import { Renderer } from '@connectv/html';

import { Comp, style } from './comp';


const darkTheme = theme({
  bg: 'black'
})
.add(style);

const renderer = new Renderer().plug(darkTheme);
renderer.render(darkTheme.styleElement()).on(document.body);
renderer.render(<Comp/>).on(document.body);
