import { createTheme } from "@rneui/themed";

declare module "@rneui/themed" {
    export interface Colors {
        backgroundSecondary: string;
        text: string;
    }
}

const theme = createTheme({
    lightColors: {
        primary: "#517fa4",
        text: "#000000"
    },
    darkColors: {
        primary: "#6aa4d4",
        background: "#212138",
        backgroundSecondary: "#3e4661",
        text: "#ffffff"
    }
});

export default theme;
