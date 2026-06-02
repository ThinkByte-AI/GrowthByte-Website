import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsPresetWebpage from 'grapesjs-preset-webpage'

export const buildGrapesInitOptions = (container: HTMLElement) => ({
  container,
  height: '100%',
  width: 'auto',
  storageManager: false,
  fromElement: false,
  plugins: [gjsBlocksBasic, gjsPresetWebpage],
  pluginsOpts: {
    [gjsBlocksBasic as any]: {
      blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video'],
      flexGrid: true,
    },
    [gjsPresetWebpage as any]: {
      blocksBasicOpts: { flexGrid: true },
      navbarOpts: false,
      countdownOpts: false,
      formsOpts: false,
    },
  },
  canvas: {
    styles: [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    ],
  },
  deviceManager: {
    devices: [
      { id: 'desktop', name: 'Desktop', width: '' },
      { id: 'tablet', name: 'Tablet', width: '768px', widthMedia: '992px' },
      { id: 'mobile', name: 'Mobile', width: '375px', widthMedia: '576px' },
    ],
  },
  selectorManager: { componentFirst: true },
  styleManager: {
    sectors: [
      {
        name: 'Dimension',
        open: true,
        properties: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'padding', 'margin'],
      },
      {
        name: 'Typography',
        open: false,
        properties: ['font-size', 'font-weight', 'font-family', 'color', 'line-height', 'text-align', 'letter-spacing'],
      },
      {
        name: 'Background',
        open: false,
        properties: ['background', 'background-color', 'background-image', 'background-size', 'background-repeat'],
      },
      {
        name: 'Border',
        open: false,
        properties: ['border', 'border-radius', 'border-color', 'border-width', 'border-style'],
      },
      {
        name: 'Extra',
        open: false,
        properties: ['display', 'flex-direction', 'justify-content', 'align-items', 'gap', 'opacity', 'box-shadow'],
      },
    ],
  },
})
