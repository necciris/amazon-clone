import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, orange } from '@material-ui/core/colors';
import createPalette from '@material-ui/core/styles/createPalette';

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext({
    currentTheme: 'darkTheme',
    handleSetTheme: null,
});

const darkTheme = createMuiTheme({
    type: 'dark',
    palette: createPalette({
        primary: {
            main: grey[900],
        },
        secondary: {
            main: orange[500],
        },
    }),
});

const whiteTheme = createMuiTheme({
    type: 'light',
    palette: createPalette({
        primary: {
            main: grey[100],
        },
    }),
});

const themes = {
    darkTheme,
    whiteTheme,
};

const CustomThemeProvider = ({ children }) => {
    const getTheme = (theme) => {
        return themes[theme];
    };

    // Read current theme from localStorage or maybe from an api
    const currentThemeName = localStorage.getItem('appTheme') || 'darkTheme';
    const currentTheme = getTheme(currentThemeName);

    // State to hold the selected theme name
    const [themeName, setThemeName] = useState(currentThemeName);
    const [theme, setTheme] = useState(currentTheme);

    // Wrap _setThemeName to store new theme names in localStorage
    const handleSetTheme = (name) => {
        localStorage.setItem('appTheme', name);
        setThemeName(name);

        const newTheme = getTheme(name);
        setTheme({ ...newTheme });
    };

    const contextValue = {
        currentTheme: themeName,
        handleSetTheme: handleSetTheme,
    };

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CustomThemeContext.Provider>
    );
};

export default CustomThemeProvider;
