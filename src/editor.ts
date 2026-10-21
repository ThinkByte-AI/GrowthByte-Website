import {
  lexicalEditor,
  HorizontalRuleFeature,
  HeadingFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature,
  LinkFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  AlignFeature,
  IndentFeature,
  UploadFeature,
  RelationshipFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const richTextEditor = lexicalEditor({
  features: () => [
    HeadingFeature({
      enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    InlineCodeFeature(),
    LinkFeature({
      enabledCollections: [],
      fields: [
        {
          name: 'rel',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
    }),
    OrderedListFeature(),
    UnorderedListFeature(),
    ChecklistFeature(),
    BlockquoteFeature(),
    HorizontalRuleFeature(),
    AlignFeature(),
    IndentFeature(),
    UploadFeature({
      collections: {
        media: {
          fields: [
            {
              name: 'caption',
              type: 'text',
            },
            {
              name: 'alt',
              type: 'text',
            },
          ],
        },
      },
    }),
    RelationshipFeature({
      enabledCollections: ['services', 'case-studies', 'blog-posts'],
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
