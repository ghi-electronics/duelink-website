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
  //onBrokenMarkdownLinks: 'warn',

  stylesheets: [
    {
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
      type: 'text/css',
    },
  ],

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
        //title: 'by GHI Electronics',
        logo: {
          alt: 'DUELink Logo',
          src: 'img/duelinklogo.webp',

        },
        items: [
          {
            href: '/docs/what-is',
            position: 'left',
            label: 'What is DUELink?',
          },
          {
            href: '/docs/start',
            position: 'left',
            label: 'Get Started',
          },
          {
            href: '/docs/educators',
            position: 'left',
            label: 'Educators',
          },
          {
            href: '/docs/catalog/products',
            position: 'left',
            label: 'Catalog',
          },
          {
            href: '/docs/projects',
            position: 'left',
            label: 'Projects',
          },
          {
            href: '/about',
            position: 'right',
            label: 'About',
          },
          {
            href: '/buy',
            position: 'right',
            label: 'Buy',
            className: 'navbar-buy',
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
        logo: {
          alt: 'DUELink Logo',
          src: 'img/duelinklogo.webp',
        },
        copyright: `
          <div class="footer-attribution">By <a href="https://www.ghielectronics.com/" target="_blank" rel="noopener">GHI Electronics</a></div>
          <div class="footer-social">
            <a href="https://www.youtube.com/@GHIElectronics" aria-label="YouTube" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://x.com/GHIElectronics" aria-label="X" target="_blank" rel="noopener"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/ghielectronics/" aria-label="Instagram" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/ghielec/" aria-label="Facebook" target="_blank" rel="noopener"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://www.linkedin.com/company/ghielectronics/" aria-label="LinkedIn" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/ghi-electronics" aria-label="GitHub" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a>
            <a href="https://forums.ghielectronics.com/c/duelink/31" aria-label="Forum" target="_blank" rel="noopener"><i class="fa-solid fa-comments"></i></a>
          </div>
          <div class="footer-copyright">Copyright © ${new Date().getFullYear()} GHI Electronics, LLC</div>
        `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['csharp', 'batch'],
      },
    }),
};

export default config;
