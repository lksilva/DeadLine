
import { palette } from "./palette";

const theme = {
  scheduled: {
    main: palette.primary.green.A600,
    contrastText: palette.primary.white,
  },
  confirmed: {
    main: palette.secondary.greenStone.A600,
    contrastText: palette.primary.white,
  },
  waiting: {
    main: palette.secondary.pinkAirbnb.A600,
    contrastText: palette.primary.white,
  },
  inProgress: {
    main: palette.secondary.yellow99.A500,
    contrastText: palette.primary.grayDark.A900,
  },
  finished: {
    main: palette.secondary.blueFacebook.A500,
    contrastText: palette.primary.white,
  },
  paid: {
    main: palette.secondary.redYouTube.A600,
    contrastText: palette.primary.white,
  },
  preferential: {
    main: palette.secondary.blueTwitter.A600,
    contrastText: palette.primary.white,
  },
  programed: {
    main: palette.secondary.orangeItau.A500,
    contrastText: palette.primary.white,
  },
  noShow: {
    main: palette.primary.grayLight.A500,
    contrastText: palette.primary.grayDark.A900,
  }
};

export default theme;
