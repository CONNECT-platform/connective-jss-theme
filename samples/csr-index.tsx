import { theme } from '../src';
import { Renderer } from '@connectv/html';

import { Comp } from './comp';


const darkTheme = theme({
  bg: 'black'
});

const renderer = new Renderer().plug(darkTheme);
renderer.render(<Comp/>).on(document.body);
