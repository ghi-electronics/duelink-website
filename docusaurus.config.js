// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const organizationName = "ghi-electronics";
const projectName = "duelink-website";


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DUELink',
  tagline: 'Dynamic Universal Extensible Link',
  favicon: 'img/favicon.ico',

  url: `https://www.duelink.com`,
  baseUrl: `/`,
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName,
  projectName, 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

/*
  // Adds Docusaurus Faster. 
  future: {
    v4: true, // opt-in for Docusaurus v4 planned changes
    experimental_faster: true,
  },
*/

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  stylesheets: [
    '/css/fontawesome.min.css',
  ],


    // ...
    themes: [
        '@saucelabs/theme-github-codeblock'
    ],
    // ...
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //`https://github.com/ghi-electronics/duelink-website/tree/dev`,
        },
        gtag: {
            trackingID: 'G-VQMNJ216BC',
            anonymizeIP: true,
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
            href: '/docs/what-is',
            //type: 'docSidebar',
            //sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'What is DUElink?',
          },
          {
            href: '/docs/catalog/intro',
            //type: 'docSidebar',
            //sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'Product Catalog',
          },
          {
            href: '/about',
            //type: 'docSidebar',
            //idebarId: 'tutorialSidebar',
            position: 'right',
            label: 'About Us',
          },
          {
            href: '/news',
            //type: 'docSidebar',
            //idebarId: 'tutorialSidebar',
            position: 'right',
            label: 'News',
          },
          /*{
            href: 'https://forums.ghielectronics.com/c/duelink/31',
            //type: 'docSidebar',
            //sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'Forums',
          },*/
          {
          href: 'https://www.x.com/ghielectronics',
          position: 'left',
          html: '<i class="fa-brands fa-x-twitter" style="font-size: 18px;"></i>',
          },
                    {
          href: 'https://www.instagram.com/ghielectronics/',
          position: 'left',
          html: '<i class="fa-brands fa-instagram" style="font-size: 18px;"></i>',
          },
          {
          href: 'https://www.facebook.com/ghielec',
          position: 'left',
          html: '<i class="fa-brands fa-facebook" style="font-size: 18px;"></i>',
          },
          {
          href: 'https://www.youtube.com/user/GHIElectronics',
          position: 'left',
          html: '<i class="fa-brands fa-youtube" style="font-size: 18px;"></i>',
          },
          {
          href: 'https://linkedin.com/company/ghielectronics/',
          position: 'left',
          html: '<i class="fa-brands fa-linkedin" style="font-size: 18px;"></i>',
          },
          {
          href: 'https://github.com/ghi-electronics',
          position: 'left',
          html: '<i class="fa-brands fa-github" style="font-size: 18px;"></i>',
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
                href: 'https://github.com/ghi-electronics/',
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
                href: 'https://www.facebook.com/ghielec/',
              },
              
            ],
          },
          
        ],
        */
        logo: 
        {
          alt: 'DUELink Logo',
          src: 'img/duelinklogo.png',
        },
        copyright: `Copyright © ${new Date().getFullYear()} GHI Electronics, LLC`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'batch'],
      },
    }),
};

export default config;
