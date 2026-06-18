import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hypemuse',
  tagline: 'A hybrid platform for anime artists and fans — Social + Marketplace + IoT',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://bhavik-wrteam-hub.github.io',
  baseUrl: '/anime_doc/',

  organizationName: 'Bhavik-Wrteam-hub',
  projectName: 'anime_doc',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/your-username/anime-artist-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Hypemuse',
      logo: {
        alt: 'Hypemuse Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        // Search box is injected on the right by the local-search theme below.
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} Hypemuse.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'javascript'],
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      // Offline, site-wide search \u2014 no external service required. Injects a
      // search box into the navbar (right side) and builds the index at
      // production build time.
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],
};

export default config;
