import { compile } from '@connectv/sdh';
import { theme } from '../src';
import { externalSheet } from '../src/external-sheet';
import { Comp } from './comp';


const darkTheme = externalSheet(theme({
  bg: 'black'
}), './styles.css', 'dist/styles.css');

compile(renderer => <Comp/>, darkTheme)
.save('dist/index.html')
.then(() => darkTheme.save());