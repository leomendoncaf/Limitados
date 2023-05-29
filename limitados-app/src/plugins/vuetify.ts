/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Blueprint
import { md3 } from "vuetify/blueprints";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          primary: "#301E67",
          secondary: "#5B8FB9",
          tertiary: "#B6EADA",
          "on-primary": "#FAFAFA",
          "on-background": "#03001C",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#7067CF",
          secondary: "#FFAFF0",
          tertiary: "#CBF7ED",
          background: "#161925",
          "on-background": "#fafafa",
          "on-primary": "#fafafa",
        },
      },
    },
  },
});
