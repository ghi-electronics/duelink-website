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
    component: ComponentCreator('/duelink-website/docs', '8b0'),
    routes: [
      {
        path: '/duelink-website/docs',
        component: ComponentCreator('/duelink-website/docs', '292'),
        routes: [
          {
            path: '/duelink-website/docs',
            component: ComponentCreator('/duelink-website/docs', 'bbc'),
            routes: [
              {
                path: '/duelink-website/docs/about',
                component: ComponentCreator('/duelink-website/docs/about', 'd09'),
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
                path: '/duelink-website/docs/catalog/accessories',
                component: ComponentCreator('/duelink-website/docs/catalog/accessories', '4d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/bluetooth-hook',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/bluetooth-hook', 'cb4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/breakout',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/breakout', '4e0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/cable-connector',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/cable-connector', 'e3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/dueclick',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/dueclick', 'b39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/duepi',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/duepi', '880'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/holey-board',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/holey-board', '0b2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/holey-moley-board',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/holey-moley-board', 'd8d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/mount-hw',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/mount-hw', 'fa0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/power-inject',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/power-inject', 'df5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/power-min',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/power-min', '6ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/pwr-switch',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/pwr-switch', '04c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/sticker',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/sticker', '9d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/accessory/usb-hook',
                component: ComponentCreator('/duelink-website/docs/catalog/accessory/usb-hook', '3f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/fan',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/fan', 'b94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/load',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/load', '581'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/motomax',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/motomax', '402'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/mototwin',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/mototwin', '980'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/relay-p16',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/relay-p16', 'ebc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/relay-p4',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/relay-p4', '58a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/relay-x1',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/relay-x1', '39c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/servo-p8',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/servo-p8', '1b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/servo-x1',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/servo-x1', '146'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/step-pulse',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/step-pulse', '6b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/stepdrive-x1',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/stepdrive-x1', '1c5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuator/stepdrive-x3',
                component: ComponentCreator('/duelink-website/docs/catalog/actuator/stepdrive-x3', '67e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/actuators',
                component: ComponentCreator('/duelink-website/docs/catalog/actuators', '68b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com',
                component: ComponentCreator('/duelink-website/docs/catalog/com', 'e03'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/can',
                component: ComponentCreator('/duelink-website/docs/catalog/com/can', '55d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/dmx',
                component: ComponentCreator('/duelink-website/docs/catalog/com/dmx', '494'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/ethernet',
                component: ComponentCreator('/duelink-website/docs/catalog/com/ethernet', '5d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/jacdac',
                component: ComponentCreator('/duelink-website/docs/catalog/com/jacdac', '6dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/midi',
                component: ComponentCreator('/duelink-website/docs/catalog/com/midi', '18a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/rs485',
                component: ComponentCreator('/duelink-website/docs/catalog/com/rs485', '8e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/serial-usb',
                component: ComponentCreator('/duelink-website/docs/catalog/com/serial-usb', '6fe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/com/usb-host',
                component: ComponentCreator('/duelink-website/docs/catalog/com/usb-host', 'edc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/epaper29',
                component: ComponentCreator('/duelink-website/docs/catalog/display/epaper29', '4db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/lcd-16x2',
                component: ComponentCreator('/duelink-website/docs/catalog/display/lcd-16x2', '3bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/lcd-20x4',
                component: ComponentCreator('/duelink-website/docs/catalog/display/lcd-20x4', 'a48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/oled-096',
                component: ComponentCreator('/duelink-website/docs/catalog/display/oled-096', 'd59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/tft-cp23',
                component: ComponentCreator('/duelink-website/docs/catalog/display/tft-cp23', '82d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/tft-cp70bt',
                component: ComponentCreator('/duelink-website/docs/catalog/display/tft-cp70bt', '890'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/tft-n18',
                component: ComponentCreator('/duelink-website/docs/catalog/display/tft-n18', '0b0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/tft-r128',
                component: ComponentCreator('/duelink-website/docs/catalog/display/tft-r128', '406'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/tft-t32',
                component: ComponentCreator('/duelink-website/docs/catalog/display/tft-t32', '192'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/display/vfd-b8',
                component: ComponentCreator('/duelink-website/docs/catalog/display/vfd-b8', 'bf7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/displays',
                component: ComponentCreator('/duelink-website/docs/catalog/displays', '068'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi', '671'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/button-l',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/button-l', '9be'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/button-l7',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/button-l7', 'd6b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/button-s',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/button-s', '233'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/capslide',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/capslide', 'a86'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/dial',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/dial', 'b82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/dip-switch',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/dip-switch', 'e9c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/joystick-l',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/joystick-l', '1fa'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/keypad-3x4',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/keypad-3x4', 'd5d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/keypad-4x4',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/keypad-4x4', '512'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/rotary',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/rotary', 'b23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/hmi/slider',
                component: ComponentCreator('/duelink-website/docs/catalog/hmi/slider', '8b5'),
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
                path: '/duelink-website/docs/catalog/led/led-md0808',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-md0808', '0e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-md3208',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-md3208', '994'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-r16',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-r16', 'f45'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-rgb3',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-rgb3', '355'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s284-c',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s284-c', 'e6a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s284-t',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s284-t', '41e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s404-c',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s404-c', 'f48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s404-t',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s404-t', 'a5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s564-c',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s564-c', 'c44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-s564-t',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-s564-t', '8a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/led-ss805',
                component: ComponentCreator('/duelink-website/docs/catalog/led/led-ss805', 'bee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/led/smart-led',
                component: ComponentCreator('/duelink-website/docs/catalog/led/smart-led', '361'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/leds',
                component: ComponentCreator('/duelink-website/docs/catalog/leds', '6a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/cincobit',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/cincobit', '124'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/clipit',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/clipit', 'ee9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/dueduino',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/dueduino', 'b57'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/dueflea',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/dueflea', 'e64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/duestem',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/duestem', '3d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/duestick',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/duestick', '100'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/holiday-tree',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/holiday-tree', '073'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/john-due',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/john-due', '766'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/octobit',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/octobit', '165'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboard/pixobit',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboard/pixobit', '884'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/mainboards',
                component: ComponentCreator('/duelink-website/docs/catalog/mainboards', 'e10'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/accel',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/accel', 'c72'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/air-quality',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/air-quality', '255'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/barometer',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/barometer', 'eab'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/ClipSense',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/ClipSense', '5af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/Color',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/Color', '786'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/Current',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/Current', 'c4d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/distance',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/distance', '383'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/dof9',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/dof9', '12b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/ekg',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/ekg', '433'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/gas',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/gas', '912'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/light',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/light', 'd59'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/motion',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/motion', '678'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/pressure',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/pressure', '446'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/pulseoxi',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/pulseoxi', '509'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/rtc',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/rtc', '328'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/temphmd',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/temphmd', '042'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/temprtd',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/temprtd', 'c2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensor/thermal',
                component: ComponentCreator('/duelink-website/docs/catalog/sensor/thermal', '3b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sensors',
                component: ComponentCreator('/duelink-website/docs/catalog/sensors', '91f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sound',
                component: ComponentCreator('/duelink-website/docs/catalog/sound', 'e24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sound/Buzzer',
                component: ComponentCreator('/duelink-website/docs/catalog/sound/Buzzer', '1df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sound/Codec',
                component: ComponentCreator('/duelink-website/docs/catalog/sound/Codec', 'd89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/sound/MP3',
                component: ComponentCreator('/duelink-website/docs/catalog/sound/MP3', '22f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/storage',
                component: ComponentCreator('/duelink-website/docs/catalog/storage', 'c87'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/storage/flash',
                component: ComponentCreator('/duelink-website/docs/catalog/storage/flash', 'bbb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/storage/sd-card',
                component: ComponentCreator('/duelink-website/docs/catalog/storage/sd-card', '7a2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/storage/usd-card',
                component: ComponentCreator('/duelink-website/docs/catalog/storage/usd-card', 'ca4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/third-party',
                component: ComponentCreator('/duelink-website/docs/catalog/third-party', '602'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless', '1f0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/gnss',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/gnss', 'a96'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/gnss-wa',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/gnss-wa', 'c82'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/nrf24-max',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/nrf24-max', '46f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/nrf24-min',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/nrf24-min', '455'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/radio-fm',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/radio-fm', '8ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/catalog/wireless/rfid',
                component: ComponentCreator('/duelink-website/docs/catalog/wireless/rfid', '474'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/app-inventor',
                component: ComponentCreator('/duelink-website/docs/coding/app-inventor', '4a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/cpp',
                component: ComponentCreator('/duelink-website/docs/coding/cpp', '81b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/dotnet',
                component: ComponentCreator('/duelink-website/docs/coding/dotnet', '7a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/excel',
                component: ComponentCreator('/duelink-website/docs/coding/excel', '35f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/intro',
                component: ComponentCreator('/duelink-website/docs/coding/intro', '618'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/javascript',
                component: ComponentCreator('/duelink-website/docs/coding/javascript', 'c60'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/micropython',
                component: ComponentCreator('/duelink-website/docs/coding/micropython', '4da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/other',
                component: ComponentCreator('/duelink-website/docs/coding/other', '77f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/python',
                component: ComponentCreator('/duelink-website/docs/coding/python', '5b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/scripting',
                component: ComponentCreator('/duelink-website/docs/coding/scripting', 'db3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/swift',
                component: ComponentCreator('/duelink-website/docs/coding/swift', 'f2b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/tinyclr',
                component: ComponentCreator('/duelink-website/docs/coding/tinyclr', '484'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/coding/typescript',
                component: ComponentCreator('/duelink-website/docs/coding/typescript', '4dc'),
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
                path: '/duelink-website/docs/engine/daisylink',
                component: ComponentCreator('/duelink-website/docs/engine/daisylink', 'de9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/intro',
                component: ComponentCreator('/duelink-website/docs/engine/intro', 'a31'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/samples',
                component: ComponentCreator('/duelink-website/docs/engine/samples', '4d2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/scripting',
                component: ComponentCreator('/duelink-website/docs/engine/scripting', '4b9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/standalone',
                component: ComponentCreator('/duelink-website/docs/engine/standalone', 'bc6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/stdlib',
                component: ComponentCreator('/duelink-website/docs/engine/stdlib', '7d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/engine/streams',
                component: ComponentCreator('/duelink-website/docs/engine/streams', '1b3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/downstream',
                component: ComponentCreator('/duelink-website/docs/interface/downstream', '22c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/i2c',
                component: ComponentCreator('/duelink-website/docs/interface/i2c', '9a6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/intro',
                component: ComponentCreator('/duelink-website/docs/interface/intro', 'c39'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/spi',
                component: ComponentCreator('/duelink-website/docs/interface/spi', '282'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/uart',
                component: ComponentCreator('/duelink-website/docs/interface/uart', '512'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/usb',
                component: ComponentCreator('/duelink-website/docs/interface/usb', 'f40'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/interface/wireless',
                component: ComponentCreator('/duelink-website/docs/interface/wireless', '01c'),
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
                path: '/duelink-website/docs/loader',
                component: ComponentCreator('/duelink-website/docs/loader', 'fd0'),
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
                path: '/duelink-website/docs/start/commercial',
                component: ComponentCreator('/duelink-website/docs/start/commercial', '954'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/start/demo',
                component: ComponentCreator('/duelink-website/docs/start/demo', 'a70'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/start/education',
                component: ComponentCreator('/duelink-website/docs/start/education', '7b7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/start/intro',
                component: ComponentCreator('/duelink-website/docs/start/intro', '03b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/start/makers',
                component: ComponentCreator('/duelink-website/docs/start/makers', '064'),
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
                path: '/duelink-website/docs/system/arduino',
                component: ComponentCreator('/duelink-website/docs/system/arduino', 'f8e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/beagleboard',
                component: ComponentCreator('/duelink-website/docs/system/beagleboard', '0ce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/beyond',
                component: ComponentCreator('/duelink-website/docs/system/beyond', 'cea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/intro',
                component: ComponentCreator('/duelink-website/docs/system/intro', '2d8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/microbit',
                component: ComponentCreator('/duelink-website/docs/system/microbit', 'a0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/pc-laptop',
                component: ComponentCreator('/duelink-website/docs/system/pc-laptop', '712'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/phone-tablet',
                component: ComponentCreator('/duelink-website/docs/system/phone-tablet', '64e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/duelink-website/docs/system/raspberry-pi',
                component: ComponentCreator('/duelink-website/docs/system/raspberry-pi', '2b5'),
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
