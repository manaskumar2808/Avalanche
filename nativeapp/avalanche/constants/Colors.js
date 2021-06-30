import { Appearance } from 'react-native-appearance';

let colorScheme = Appearance.getColorScheme() || 'light';

console.log('colorScheme : ', colorScheme);

let subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorScheme);
    colorScheme = colorScheme;
});

let darkMode = true;

export default {
    primary: "#FF3403",
    primaryLight: "rgba(255, 52, 3, 0.5)",
    secondary: darkMode ? "#FFFFFF" : "#707070",
    navBar: darkMode ? "#000000" : "#FFFFFF",
    darkGrey: "#B2B1B1",
    swissGrey: "#696969",
    lightGrey: darkMode ? "#B2B1B1" : "#D3D3D3",
    milk: darkMode ? "#000000" : "#F5F5F5",
    background: darkMode ? "#242424" : "#FFFFFF",
    blue: "#03B1FF",
    green: "#00c738",
    danger: "#F80000",
    dark: darkMode ? "#FFFFFF" : "#000000",
}