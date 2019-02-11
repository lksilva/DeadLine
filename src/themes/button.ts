
import { createMuiTheme } from "@material-ui/core/styles";

import { palette } from "./palette";

const theme = {
  palette: {
    primary: {
      contrastText: palette.primary.grayLight.A100,
      dark: palette.primary.purple.A1000,
      light: palette.primary.purple.A300,
      main: palette.primary.purple.A600,
    },
    secondary: {
      contrastText: palette.primary.grayLight.A100,
      dark: palette.secondary.blueFacebook.A1000,
      light: palette.secondary.blueFacebook.A400,
      main: palette.secondary.blueFacebook.A600,
    },
  },
};

export default createMuiTheme(theme);
