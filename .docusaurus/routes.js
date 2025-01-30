import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/duelink-website/__docusaurus/debug',
    component: ComponentCreator('/duelink-website/__docusaurus/debug', '118'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/config',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/config', '7d7'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/content',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/content', 'c93'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/globalData',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/globalData', '97d'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/metadata',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/metadata', '5e2'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/registry',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/registry', 'bd6'),
    exact: true
  },
  {
    path: '/duelink-website/__docusaurus/debug/routes',
    component: ComponentCreator('/duelink-website/__docusaurus/debug/routes', '736'),
    exact: true
  },
  {
    path: '/duelink-website/markdown-page',
    component: ComponentCreator('/duelink-website/markdown-page', 'fe7'),
    exact: true
  },
  {
    path: '/duelink-website/my-markdown-page',
    component: ComponentCreator('/duelink-website/my-markdown-page', '57d'),
    exact: true
  },
  {
    path: '/duelink-website/my-react-page',
    component: ComponentCreator('/duelink-website/my-react-page', '1ac'),
    exact: true
  },
  {
    path: '/duelink-website/docs',
    component: ComponentCreator('/duelink-website/docs', '9c9'),
    routes: [
      {
        path: '/duelink-website/docs',
        component: ComponentCreator('/duelink-website/docs', '510'),
        routes: [
          {
            path: '/duelink-website/docs',
            component: ComponentCreator('/duelink-website/docs', '07d'),
            routes: [
              {
                path: '/duelink-website/docs/about',
                component: ComponentCreator('/duelink-website/docs/about', '136'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/analog',
                component: ComponentCreator('/duelink-website/docs/api/analog', '474'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/bluetooth',
                component: ComponentCreator('/duelink-website/docs/api/bluetooth', '12b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/button',
                component: ComponentCreator('/duelink-website/docs/api/button', '416'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/can',
                component: ComponentCreator('/duelink-website/docs/api/can', '593'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/digital',
                component: ComponentCreator('/duelink-website/docs/api/digital', '05b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/distance',
                component: ComponentCreator('/duelink-website/docs/api/distance', 'fb9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/frequency',
                component: ComponentCreator('/duelink-website/docs/api/frequency', '4f7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/i2c',
                component: ComponentCreator('/duelink-website/docs/api/i2c', '1d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/infrared',
                component: ComponentCreator('/duelink-website/docs/api/infrared', 'e60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/intro',
                component: ComponentCreator('/duelink-website/docs/api/intro', 'a73'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/lcd',
                component: ComponentCreator('/duelink-website/docs/api/lcd', 'd49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/led',
                component: ComponentCreator('/duelink-website/docs/api/led', '36c'),
                exact: true
              },
              {
                path: '/duelink-website/docs/api/neopixel',
                component: ComponentCreator('/duelink-website/docs/api/neopixel', '2b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/pulse',
                component: ComponentCreator('/duelink-website/docs/api/pulse', '4e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/script',
                component: ComponentCreator('/duelink-website/docs/api/script', '659'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/servo',
                component: ComponentCreator('/duelink-website/docs/api/servo', 'ab8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/sound',
                component: ComponentCreator('/duelink-website/docs/api/sound', '95d'),
                exact: true
              },
              {
                path: '/duelink-website/docs/api/spi',
                component: ComponentCreator('/duelink-website/docs/api/spi', 'e65'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/systemfunctions',
                component: ComponentCreator('/duelink-website/docs/api/systemfunctions', '566'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/temp-humidity',
                component: ComponentCreator('/duelink-website/docs/api/temp-humidity', '873'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/template',
                component: ComponentCreator('/duelink-website/docs/api/template', '45e'),
                exact: true
              },
              {
                path: '/duelink-website/docs/api/touch',
                component: ComponentCreator('/duelink-website/docs/api/touch', 'c30'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/api/uart',
                component: ComponentCreator('/duelink-website/docs/api/uart', '1fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessories/duePi',
                component: ComponentCreator('/duelink-website/docs/catalog/accessories/duePi', 'a68'),
                exact: true
              },
              {
                path: '/duelink-website/docs/catalog/accessories/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/accessories/intro', '4e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessories/power-inject',
                component: ComponentCreator('/duelink-website/docs/catalog/accessories/power-inject', 'a9a'),
                exact: true
              },
              {
                path: '/duelink-website/docs/catalog/actuators/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/actuators/intro', '588'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/comm/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/comm/intro', 'dfc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/displays/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/displays/intro', '7b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/intro', '041'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/intro', 'b54'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/led/intro', 'bd1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/intro', '5d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/intro', '407'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sound/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/sound/intro', '1ec'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/third-party/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/third-party/intro', 'b4b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/intro',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/intro', 'ed4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/cpp',
                component: ComponentCreator('/duelink-website/docs/coding-options/cpp', '1e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/dotnet',
                component: ComponentCreator('/duelink-website/docs/coding-options/dotnet', '199'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/excel',
                component: ComponentCreator('/duelink-website/docs/coding-options/excel', 'c8f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/intro',
                component: ComponentCreator('/duelink-website/docs/coding-options/intro', 'f37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/javascript',
                component: ComponentCreator('/duelink-website/docs/coding-options/javascript', '0fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/micro-python',
                component: ComponentCreator('/duelink-website/docs/coding-options/micro-python', '143'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/other',
                component: ComponentCreator('/duelink-website/docs/coding-options/other', 'fd8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/python',
                component: ComponentCreator('/duelink-website/docs/coding-options/python', '5a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/scripting',
                component: ComponentCreator('/duelink-website/docs/coding-options/scripting', '9d0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/swift',
                component: ComponentCreator('/duelink-website/docs/coding-options/swift', 'dcf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/tinyclr',
                component: ComponentCreator('/duelink-website/docs/coding-options/tinyclr', 'dc4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding-options/typescript',
                component: ComponentCreator('/duelink-website/docs/coding-options/typescript', 'ef0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/console',
                component: ComponentCreator('/duelink-website/docs/console', '0d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/downloads',
                component: ComponentCreator('/duelink-website/docs/downloads', '376'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/getting-started/commerical-proto',
                component: ComponentCreator('/duelink-website/docs/getting-started/commerical-proto', 'acf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/getting-started/education',
                component: ComponentCreator('/duelink-website/docs/getting-started/education', '87e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/getting-started/intro',
                component: ComponentCreator('/duelink-website/docs/getting-started/intro', '6f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/getting-started/makers',
                component: ComponentCreator('/duelink-website/docs/getting-started/makers', '6a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/getting-started/online-demo',
                component: ComponentCreator('/duelink-website/docs/getting-started/online-demo', '922'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/downstream',
                component: ComponentCreator('/duelink-website/docs/interfaces/downstream', '97f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/i2c',
                component: ComponentCreator('/duelink-website/docs/interfaces/i2c', '60e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/intro',
                component: ComponentCreator('/duelink-website/docs/interfaces/intro', '066'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/spi',
                component: ComponentCreator('/duelink-website/docs/interfaces/spi', 'ca8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/uart',
                component: ComponentCreator('/duelink-website/docs/interfaces/uart', '055'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/usb',
                component: ComponentCreator('/duelink-website/docs/interfaces/usb', '9e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interfaces/wireless',
                component: ComponentCreator('/duelink-website/docs/interfaces/wireless', 'bc1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/daisylink',
                component: ComponentCreator('/duelink-website/docs/internal-engine/daisylink', 'e80'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/intro',
                component: ComponentCreator('/duelink-website/docs/internal-engine/intro', 'bb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/samples',
                component: ComponentCreator('/duelink-website/docs/internal-engine/samples', 'c8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/scripting',
                component: ComponentCreator('/duelink-website/docs/internal-engine/scripting', 'ad6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/standalone',
                component: ComponentCreator('/duelink-website/docs/internal-engine/standalone', '5d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/stdlib',
                component: ComponentCreator('/duelink-website/docs/internal-engine/stdlib', '85c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/internal-engine/streams',
                component: ComponentCreator('/duelink-website/docs/internal-engine/streams', '1f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/intro',
                component: ComponentCreator('/duelink-website/docs/intro', 'a8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/licensing',
                component: ComponentCreator('/duelink-website/docs/licensing', '5a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/release-notes',
                component: ComponentCreator('/duelink-website/docs/release-notes', 'd12'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/specs',
                component: ComponentCreator('/duelink-website/docs/specs', 'eda'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/support',
                component: ComponentCreator('/duelink-website/docs/support', 'c84'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/arduino',
                component: ComponentCreator('/duelink-website/docs/supported-systems/arduino', '152'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/beagleboard',
                component: ComponentCreator('/duelink-website/docs/supported-systems/beagleboard', 'c89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/beyond',
                component: ComponentCreator('/duelink-website/docs/supported-systems/beyond', '851'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/intro',
                component: ComponentCreator('/duelink-website/docs/supported-systems/intro', 'acf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/microbit',
                component: ComponentCreator('/duelink-website/docs/supported-systems/microbit', '10c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/pc',
                component: ComponentCreator('/duelink-website/docs/supported-systems/pc', 'b36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/phone-tablet',
                component: ComponentCreator('/duelink-website/docs/supported-systems/phone-tablet', 'a78'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/supported-systems/raspberry-pi',
                component: ComponentCreator('/duelink-website/docs/supported-systems/raspberry-pi', 'f7b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/template',
                component: ComponentCreator('/duelink-website/docs/template', 'e32'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/duelink-website/',
    component: ComponentCreator('/duelink-website/', '2a2'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
