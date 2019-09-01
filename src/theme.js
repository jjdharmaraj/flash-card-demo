import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

//https://material-ui.com/customization/color/#color-tool
export const theme = createMuiTheme({
  palette: {
    primary: { main: "#2e2b8a" },
    secondary: red
  },
  overrides: {
    MuiCard: {
      root: {
        color: "#f1f2f6",
        backgroundColor: "#38383d",
        fontFamily: "Roboto"
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "transparent",
        color: "#f1f2f6"
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: "32px",
        color: "#f1f2f6"
      }
    },
    MuiButtonBase: {
      root: {
        backgroundColor: "#0090eb"
      }
    },
    MuiButton: {
      root: {
        margin: "4px"
      },
      textPrimary: {
        "&:hover": {
          backgroundColor: "#2e2b8a"
        }
      },
      label: {
        color: "#f1f2f6",
        fontSize: "16px"
      }
    }
  }
});
