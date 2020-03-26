import { compile } from '@connectv/sdh';
import { theme } from '../src';
import { Comp } from './comp';


const darkTheme = theme({
  bg: 'black'
});


compile(renderer => <Comp/>, darkTheme)
.save('dist/index.html');