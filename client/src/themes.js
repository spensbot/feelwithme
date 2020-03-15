import { createMuiTheme } from "@material-ui/core/styles"

const themes = {
    light: createMuiTheme({}),
    dark: createMuiTheme({
        palette: {type: 'dark'}
    })
}

export default themes