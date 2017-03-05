/**
 * @class Theme
 */

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { fade } from 'material-ui/utils/colorManipulator';

const PRIMARY_COLOR = '#02C00A';
const ACTION_COLOR = '#F47203';

let opts = null;

if (typeof navigator === 'undefined') {
  opts = { userAgent: 'all' };
}

export default getMuiTheme({
  spacing: {
    desktopGutter: 12,
    desktopGutterMore: 16,
    desktopGutterLess: 8,
    desktopKeylineIncrement: 48,
    desktopSubheaderHeight: 40,
    desktopToolbarHeight: 40,
  },

  toolbar: {
    height: 40,
    backgroundColor: '#f4f4f4',
  },

  appBar: {
    color: '#fff',
    textColor: PRIMARY_COLOR,
  },

  floatingActionButton: {
    color: PRIMARY_COLOR,
    secondaryColor: ACTION_COLOR,
  },

  palette: {
    primary1Color: PRIMARY_COLOR,
    primary2Color: fade(PRIMARY_COLOR, 0.8),
    accent1Color: ACTION_COLOR,
    pickerHeaderColor: PRIMARY_COLOR,
  },
}, opts);
