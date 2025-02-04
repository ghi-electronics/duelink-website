// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

//const organizationName = "ghi-electronics";
//const projectName = "duelink-website";


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DUELink',
  tagline: 'Dynamic Universal Extensible Link',
  favicon: 'img/favicon.ico',

  url: `https://www.duelink.com/`,
  baseUrl: `/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  //organizationName,
  //projectName, 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            `https://github.com/ghi-electronics/duelink-website/tree/dev`,
        },
        /*blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            `https://${organizationName}.github.io/${projectName}`,
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },*/
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },

      // Replace with your project's social card
      image: 'img/ghielectronics-social-card.jpg',
      navbar: {
        title: 'by GHI Electronics',
        logo: {
          alt: 'DUELink Logo',
          src: 'img/duelinklogo.png',

        },
        items: [
            
          {
            href: 'https://www.ghielectronics.com/',
            //type: 'docSidebar',
            //idebarId: 'tutorialSidebar',
            position: 'right',
            label: 'GHI Electronics',
          },
          {
            href: 'https://forums.ghielectronics.com/c/duelink/31',
            //type: 'docSidebar',
            //sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'Forums',
          },
          
         // {to: '/blog', label: 'Blog', position: 'left'},
          /*{
            href:            
            `https://github.com/ghi-electronics/duelink-website`,
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        /*
        links: [
            
          {
            
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          
          {
            title: 'Resources',
            items: [
              {
                label: 'GHI Electronics',
                href: 'https://www.ghielectronics.com/',
              },
              {
                label: 'DUELink Forum',
                href: 'https://forums.ghielectronics.com/c/duelink/31',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ghi-electronics/duelink-website',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@GHIElectronics',
              },
              {
                label: 'X',
                href: 'http://x.com/GHIElectronics',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/ghielectronics/',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/ghielectronics/',
              },
            ],
          },
          
        ],
        */
        copyright: `Copyright © ${new Date().getFullYear()} GHI Electronics, LLC`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp'],
      },
    }),
};

export default config;
