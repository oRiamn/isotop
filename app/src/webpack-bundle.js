require('@src/main.scss');
require('@src/test.html');
require('@src/index.html');

require('@components/app-root/app-root.js');

import * as brush from './library/brush';
import * as figure from './library/figure';
import * as color from './library/color';
import * as observer from './library/observer';

export default {
	brush,
	figure,
	color,
	observer
};