import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: '#7761FF',
    },
    secondary: {
      main: '#292929',
    },
  },
});
