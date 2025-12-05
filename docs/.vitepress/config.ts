import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue Lightweight Charts Pro',
  description: 'Vue 3 components for TradingView Lightweight Charts',
  base: '/vue-lightweight-charts-pro/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nandkapadia/vue-lightweight-charts-pro' },
    ],

    search: {
      provider: 'local',
    },
  },
});
