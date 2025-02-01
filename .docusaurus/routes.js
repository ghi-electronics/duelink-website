import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/my-markdown-page',
    component: ComponentCreator('/my-markdown-page', '438'),
    exact: true
  },
  {
    path: '/my-react-page',
    component: ComponentCreator('/my-react-page', 'f2d'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'c91'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '3dd'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '413'),
            routes: [
              {
                path: '/docs/about',
                component: ComponentCreator('/docs/about', '941'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/analog',
                component: ComponentCreator('/docs/api/analog', 'feb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/bluetooth',
                component: ComponentCreator('/docs/api/bluetooth', 'ed8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/button',
                component: ComponentCreator('/docs/api/button', 'e6e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/can',
                component: ComponentCreator('/docs/api/can', 'a24'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/digital',
                component: ComponentCreator('/docs/api/digital', 'b02'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/distance',
                component: ComponentCreator('/docs/api/distance', '273'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/frequency',
                component: ComponentCreator('/docs/api/frequency', 'e52'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/i2c',
                component: ComponentCreator('/docs/api/i2c', '24e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/infrared',
                component: ComponentCreator('/docs/api/infrared', '70c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/intro',
                component: ComponentCreator('/docs/api/intro', '5da'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/lcd',
                component: ComponentCreator('/docs/api/lcd', '758'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/led',
                component: ComponentCreator('/docs/api/led', 'c1a'),
                exact: true
              },
              {
                path: '/docs/api/neopixel',
                component: ComponentCreator('/docs/api/neopixel', '51f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/pulse',
                component: ComponentCreator('/docs/api/pulse', '2db'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/script',
                component: ComponentCreator('/docs/api/script', 'db0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/servo',
                component: ComponentCreator('/docs/api/servo', 'c0b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/sound',
                component: ComponentCreator('/docs/api/sound', '121'),
                exact: true
              },
              {
                path: '/docs/api/spi',
                component: ComponentCreator('/docs/api/spi', 'e8d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/systemfunctions',
                component: ComponentCreator('/docs/api/systemfunctions', '834'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/temp-humidity',
                component: ComponentCreator('/docs/api/temp-humidity', '17e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/template',
                component: ComponentCreator('/docs/api/template', 'cee'),
                exact: true
              },
              {
                path: '/docs/api/touch',
                component: ComponentCreator('/docs/api/touch', '7f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/api/uart',
                component: ComponentCreator('/docs/api/uart', '0e4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessories',
                component: ComponentCreator('/docs/catalog/accessories', '211'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/bluetooth-hook',
                component: ComponentCreator('/docs/catalog/accessory/bluetooth-hook', '69f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/breakout',
                component: ComponentCreator('/docs/catalog/accessory/breakout', '159'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/cable-connector',
                component: ComponentCreator('/docs/catalog/accessory/cable-connector', '549'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/dueclick',
                component: ComponentCreator('/docs/catalog/accessory/dueclick', '42d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/duepi',
                component: ComponentCreator('/docs/catalog/accessory/duepi', '4f3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/holey-board',
                component: ComponentCreator('/docs/catalog/accessory/holey-board', 'dae'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/holey-moley-board',
                component: ComponentCreator('/docs/catalog/accessory/holey-moley-board', '32d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/mount-hw',
                component: ComponentCreator('/docs/catalog/accessory/mount-hw', '9ac'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/power-inject',
                component: ComponentCreator('/docs/catalog/accessory/power-inject', 'f06'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/power-min',
                component: ComponentCreator('/docs/catalog/accessory/power-min', 'f3d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/pwr-switch',
                component: ComponentCreator('/docs/catalog/accessory/pwr-switch', '885'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/sticker',
                component: ComponentCreator('/docs/catalog/accessory/sticker', '400'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/accessory/usb-hook',
                component: ComponentCreator('/docs/catalog/accessory/usb-hook', 'afb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/fan',
                component: ComponentCreator('/docs/catalog/actuator/fan', '06f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/load',
                component: ComponentCreator('/docs/catalog/actuator/load', 'cd6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/motomax',
                component: ComponentCreator('/docs/catalog/actuator/motomax', '617'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/mototwin',
                component: ComponentCreator('/docs/catalog/actuator/mototwin', 'dde'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/relay-p16',
                component: ComponentCreator('/docs/catalog/actuator/relay-p16', 'a49'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/relay-p4',
                component: ComponentCreator('/docs/catalog/actuator/relay-p4', 'e3b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/relay-x1',
                component: ComponentCreator('/docs/catalog/actuator/relay-x1', 'a77'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/servo-p8',
                component: ComponentCreator('/docs/catalog/actuator/servo-p8', '8d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/servo-x1',
                component: ComponentCreator('/docs/catalog/actuator/servo-x1', 'c74'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/step-pulse',
                component: ComponentCreator('/docs/catalog/actuator/step-pulse', '920'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/stepdrive-x1',
                component: ComponentCreator('/docs/catalog/actuator/stepdrive-x1', '44e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuator/stepdrive-x3',
                component: ComponentCreator('/docs/catalog/actuator/stepdrive-x3', 'b68'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/actuators',
                component: ComponentCreator('/docs/catalog/actuators', 'bc7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com',
                component: ComponentCreator('/docs/catalog/com', '340'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/can',
                component: ComponentCreator('/docs/catalog/com/can', '7de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/dmx',
                component: ComponentCreator('/docs/catalog/com/dmx', '221'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/ethernet',
                component: ComponentCreator('/docs/catalog/com/ethernet', '285'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/jacdac',
                component: ComponentCreator('/docs/catalog/com/jacdac', '14d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/midi',
                component: ComponentCreator('/docs/catalog/com/midi', '4a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/rs485',
                component: ComponentCreator('/docs/catalog/com/rs485', '33c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/serial-usb',
                component: ComponentCreator('/docs/catalog/com/serial-usb', '10e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/com/usb-host',
                component: ComponentCreator('/docs/catalog/com/usb-host', 'a75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/epaper29',
                component: ComponentCreator('/docs/catalog/display/epaper29', '6eb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/lcd-16x2',
                component: ComponentCreator('/docs/catalog/display/lcd-16x2', 'd4e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/lcd-20x4',
                component: ComponentCreator('/docs/catalog/display/lcd-20x4', 'ae4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/oled-096',
                component: ComponentCreator('/docs/catalog/display/oled-096', 'b6b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/tft-cp23',
                component: ComponentCreator('/docs/catalog/display/tft-cp23', '264'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/tft-cp70bt',
                component: ComponentCreator('/docs/catalog/display/tft-cp70bt', '14d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/tft-n18',
                component: ComponentCreator('/docs/catalog/display/tft-n18', 'b11'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/tft-r128',
                component: ComponentCreator('/docs/catalog/display/tft-r128', '0fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/tft-t32',
                component: ComponentCreator('/docs/catalog/display/tft-t32', 'dfe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/display/vfd-b8',
                component: ComponentCreator('/docs/catalog/display/vfd-b8', 'c1f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/displays',
                component: ComponentCreator('/docs/catalog/displays', '198'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi',
                component: ComponentCreator('/docs/catalog/hmi', '076'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/button-l',
                component: ComponentCreator('/docs/catalog/hmi/button-l', 'e98'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/button-l7',
                component: ComponentCreator('/docs/catalog/hmi/button-l7', 'c07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/button-s',
                component: ComponentCreator('/docs/catalog/hmi/button-s', '1b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/capslide',
                component: ComponentCreator('/docs/catalog/hmi/capslide', 'b65'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/dial',
                component: ComponentCreator('/docs/catalog/hmi/dial', '8f2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/dip-switch',
                component: ComponentCreator('/docs/catalog/hmi/dip-switch', '587'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/joystick-l',
                component: ComponentCreator('/docs/catalog/hmi/joystick-l', '040'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/keypad-3x4',
                component: ComponentCreator('/docs/catalog/hmi/keypad-3x4', '30f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/keypad-4x4',
                component: ComponentCreator('/docs/catalog/hmi/keypad-4x4', '991'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/rotary',
                component: ComponentCreator('/docs/catalog/hmi/rotary', '454'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/hmi/slider',
                component: ComponentCreator('/docs/catalog/hmi/slider', '837'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/intro',
                component: ComponentCreator('/docs/catalog/intro', '764'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-md0808',
                component: ComponentCreator('/docs/catalog/led/led-md0808', '35d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-md3208',
                component: ComponentCreator('/docs/catalog/led/led-md3208', '93f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-r16',
                component: ComponentCreator('/docs/catalog/led/led-r16', '940'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-rgb3',
                component: ComponentCreator('/docs/catalog/led/led-rgb3', 'feb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s284-c',
                component: ComponentCreator('/docs/catalog/led/led-s284-c', '654'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s284-t',
                component: ComponentCreator('/docs/catalog/led/led-s284-t', '36c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s404-c',
                component: ComponentCreator('/docs/catalog/led/led-s404-c', '4d9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s404-t',
                component: ComponentCreator('/docs/catalog/led/led-s404-t', 'b4f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s564-c',
                component: ComponentCreator('/docs/catalog/led/led-s564-c', '925'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-s564-t',
                component: ComponentCreator('/docs/catalog/led/led-s564-t', '240'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/led-ss805',
                component: ComponentCreator('/docs/catalog/led/led-ss805', '668'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/led/smart-led',
                component: ComponentCreator('/docs/catalog/led/smart-led', '0ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/leds',
                component: ComponentCreator('/docs/catalog/leds', '059'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/cincobit',
                component: ComponentCreator('/docs/catalog/mainboard/cincobit', '77b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/clipit',
                component: ComponentCreator('/docs/catalog/mainboard/clipit', '2a5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/dueduino',
                component: ComponentCreator('/docs/catalog/mainboard/dueduino', '44d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/dueflea',
                component: ComponentCreator('/docs/catalog/mainboard/dueflea', 'ce0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/duestem',
                component: ComponentCreator('/docs/catalog/mainboard/duestem', '785'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/duestick',
                component: ComponentCreator('/docs/catalog/mainboard/duestick', '844'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/holiday-tree',
                component: ComponentCreator('/docs/catalog/mainboard/holiday-tree', '4e5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/john-due',
                component: ComponentCreator('/docs/catalog/mainboard/john-due', '8dd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/octobit',
                component: ComponentCreator('/docs/catalog/mainboard/octobit', 'bb7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboard/pixobit',
                component: ComponentCreator('/docs/catalog/mainboard/pixobit', '7d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/mainboards',
                component: ComponentCreator('/docs/catalog/mainboards', '60c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/accel',
                component: ComponentCreator('/docs/catalog/sensor/accel', '947'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/air-quality',
                component: ComponentCreator('/docs/catalog/sensor/air-quality', 'a64'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/barometer',
                component: ComponentCreator('/docs/catalog/sensor/barometer', 'bce'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/ClipSense',
                component: ComponentCreator('/docs/catalog/sensor/ClipSense', 'dc2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/Color',
                component: ComponentCreator('/docs/catalog/sensor/Color', 'f0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/Current',
                component: ComponentCreator('/docs/catalog/sensor/Current', 'cee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/distance',
                component: ComponentCreator('/docs/catalog/sensor/distance', '41b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/dof9',
                component: ComponentCreator('/docs/catalog/sensor/dof9', '7ef'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/ekg',
                component: ComponentCreator('/docs/catalog/sensor/ekg', 'fa8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/gas',
                component: ComponentCreator('/docs/catalog/sensor/gas', 'a4a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/light',
                component: ComponentCreator('/docs/catalog/sensor/light', 'e4c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/motion',
                component: ComponentCreator('/docs/catalog/sensor/motion', 'b54'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/pressure',
                component: ComponentCreator('/docs/catalog/sensor/pressure', 'bcd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/pulseoxi',
                component: ComponentCreator('/docs/catalog/sensor/pulseoxi', '10d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/rtc',
                component: ComponentCreator('/docs/catalog/sensor/rtc', 'a66'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/temphmd',
                component: ComponentCreator('/docs/catalog/sensor/temphmd', 'd9a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/temprtd',
                component: ComponentCreator('/docs/catalog/sensor/temprtd', 'af4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensor/thermal',
                component: ComponentCreator('/docs/catalog/sensor/thermal', '01e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sensors',
                component: ComponentCreator('/docs/catalog/sensors', '563'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sound',
                component: ComponentCreator('/docs/catalog/sound', '2a3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sound/Buzzer',
                component: ComponentCreator('/docs/catalog/sound/Buzzer', 'f16'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sound/Codec',
                component: ComponentCreator('/docs/catalog/sound/Codec', '31c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/sound/MP3',
                component: ComponentCreator('/docs/catalog/sound/MP3', '8b1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/storage',
                component: ComponentCreator('/docs/catalog/storage', 'a2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/storage/flash',
                component: ComponentCreator('/docs/catalog/storage/flash', '61f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/storage/sd-card',
                component: ComponentCreator('/docs/catalog/storage/sd-card', 'ec3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/storage/usd-card',
                component: ComponentCreator('/docs/catalog/storage/usd-card', 'e0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/third-party',
                component: ComponentCreator('/docs/catalog/third-party', 'ca7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless',
                component: ComponentCreator('/docs/catalog/wireless', '14c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/gnss',
                component: ComponentCreator('/docs/catalog/wireless/gnss', '401'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/gnss-wa',
                component: ComponentCreator('/docs/catalog/wireless/gnss-wa', '585'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/nrf24-max',
                component: ComponentCreator('/docs/catalog/wireless/nrf24-max', '4c2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/nrf24-min',
                component: ComponentCreator('/docs/catalog/wireless/nrf24-min', 'a1e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/radio-fm',
                component: ComponentCreator('/docs/catalog/wireless/radio-fm', 'b0e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/catalog/wireless/rfid',
                component: ComponentCreator('/docs/catalog/wireless/rfid', '098'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/app-inventor',
                component: ComponentCreator('/docs/coding/app-inventor', '68e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/cpp',
                component: ComponentCreator('/docs/coding/cpp', 'b9d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/dotnet',
                component: ComponentCreator('/docs/coding/dotnet', '897'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/excel',
                component: ComponentCreator('/docs/coding/excel', '35e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/intro',
                component: ComponentCreator('/docs/coding/intro', '3b8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/javascript',
                component: ComponentCreator('/docs/coding/javascript', 'f9b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/micropython',
                component: ComponentCreator('/docs/coding/micropython', 'a97'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/other',
                component: ComponentCreator('/docs/coding/other', 'ac7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/python',
                component: ComponentCreator('/docs/coding/python', '23c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/scripting',
                component: ComponentCreator('/docs/coding/scripting', '394'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/swift',
                component: ComponentCreator('/docs/coding/swift', '025'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/tinyclr',
                component: ComponentCreator('/docs/coding/tinyclr', '7d6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/coding/typescript',
                component: ComponentCreator('/docs/coding/typescript', 'c33'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/console',
                component: ComponentCreator('/docs/console', '880'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/downloads',
                component: ComponentCreator('/docs/downloads', 'b16'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/daisylink',
                component: ComponentCreator('/docs/engine/daisylink', '0d7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/intro',
                component: ComponentCreator('/docs/engine/intro', '699'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/samples',
                component: ComponentCreator('/docs/engine/samples', '60c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/scripting',
                component: ComponentCreator('/docs/engine/scripting', '0bf'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/standalone',
                component: ComponentCreator('/docs/engine/standalone', '77e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/stdlib',
                component: ComponentCreator('/docs/engine/stdlib', '981'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/engine/streams',
                component: ComponentCreator('/docs/engine/streams', 'ea4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/downstream',
                component: ComponentCreator('/docs/interface/downstream', 'dff'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/i2c',
                component: ComponentCreator('/docs/interface/i2c', 'cfe'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/intro',
                component: ComponentCreator('/docs/interface/intro', '297'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/spi',
                component: ComponentCreator('/docs/interface/spi', 'b48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/uart',
                component: ComponentCreator('/docs/interface/uart', '9c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/usb',
                component: ComponentCreator('/docs/interface/usb', 'e03'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/interface/wireless',
                component: ComponentCreator('/docs/interface/wireless', '666'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '89a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/licensing',
                component: ComponentCreator('/docs/licensing', '538'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/loader',
                component: ComponentCreator('/docs/loader', '4d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/release-notes',
                component: ComponentCreator('/docs/release-notes', '982'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/specs',
                component: ComponentCreator('/docs/specs', 'a2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/start/commercial',
                component: ComponentCreator('/docs/start/commercial', '046'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/start/demo',
                component: ComponentCreator('/docs/start/demo', '7a7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/start/education',
                component: ComponentCreator('/docs/start/education', '58e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/start/intro',
                component: ComponentCreator('/docs/start/intro', '23a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/start/makers',
                component: ComponentCreator('/docs/start/makers', '504'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/support',
                component: ComponentCreator('/docs/support', '57a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/arduino',
                component: ComponentCreator('/docs/system/arduino', '765'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/beagleboard',
                component: ComponentCreator('/docs/system/beagleboard', 'd23'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/beyond',
                component: ComponentCreator('/docs/system/beyond', '36b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/intro',
                component: ComponentCreator('/docs/system/intro', '83f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/microbit',
                component: ComponentCreator('/docs/system/microbit', '44a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/pc-laptop',
                component: ComponentCreator('/docs/system/pc-laptop', 'e44'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/phone-tablet',
                component: ComponentCreator('/docs/system/phone-tablet', '85c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/system/raspberry-pi',
                component: ComponentCreator('/docs/system/raspberry-pi', '31b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/template',
                component: ComponentCreator('/docs/template', '46f'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
