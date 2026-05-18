import type { BlockRegistrar } from '../types'
import {
  registerEditableTextType,
  registerRawHtmlBlock,
  registerCustomCssBlock,
  registerQuoteBlock,
} from './basic'
import {
  registerSectionBlock,
  registerContainerBlock,
  registerHeroBlock,
  registerContentAreaBlock,
  registerCardGridBlock,
  registerImageTextBlock,
  registerCtaBlock,
} from './layout'
import { registerRelatedPostsBlock, registerAuthorBlock } from './dynamic'

const ALL_BLOCK_REGISTRARS: BlockRegistrar[] = [
  registerEditableTextType,
  registerRawHtmlBlock,
  registerCustomCssBlock,
  registerSectionBlock,
  registerContainerBlock,
  registerHeroBlock,
  registerContentAreaBlock,
  registerCardGridBlock,
  registerRelatedPostsBlock,
  registerAuthorBlock,
  registerImageTextBlock,
  registerQuoteBlock,
  registerCtaBlock,
]

export const registerCustomBlocks: BlockRegistrar = (editor) => {
  ALL_BLOCK_REGISTRARS.forEach((register) => register(editor))
}
