import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import * as labsComponents from 'vuetify/labs/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { fa } from 'vuetify/iconsets/fa'

const vuetify = createVuetify({
  components,
  directives,
  ...labsComponents,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1c6376',
          accent: '#e2edef',
        },
      },
    },
  },
  ssr: true,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa
    },
  },
});
export default vuetify;
