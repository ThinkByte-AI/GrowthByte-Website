import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { richTextEditor } from './editor'

import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { CaseStudies } from './collections/CaseStudies'
import { BlogPosts } from './collections/BlogPosts'
import { Categories } from './collections/Categories'
import { Waitlist } from './collections/Waitlist'
import { DocRequests } from './collections/DocRequests'
import { Authors } from './collections/Authors'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { PageTemplates } from './collections/PageTemplates'
import { HomePage } from './globals/HomePage'
import { GrowthByteOsLaunch } from './globals/GrowthByteOsLaunch'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  sharp,
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' — GrowthByte CMS',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo',
        Icon: '@/components/admin/Icon',
      },
      beforeNavLinks: ['@/components/admin/AIBuilderNavLink'],
      afterNavLinks: ['@/components/admin/AdminLogoutLink'],
      views: {
        aiBuilder: {
          Component: '@/components/admin/AIBuilder',
          path: '/ai-builder',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname, '..'),
    },
  },
  collections: [
    Users,
    Services,
    Industries,
    CaseStudies,
    BlogPosts,
    Categories,
    Waitlist,
    DocRequests,
    Authors,
    Media,
    PageTemplates,
  ],
  globals: [HomePage, GrowthByteOsLaunch],
  editor: richTextEditor,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    seoPlugin({
      collections: ['blog-posts', 'case-studies', 'services', 'industries'],
      uploadsCollection: 'media',
      tabbedUI: true,
    }),
    // AWS S3 Storage Plugin
    s3Storage({
      bucket: process.env.S3_BUCKET || '',
      collections: {
        media: true,
      },
      config: {
        region: process.env.S3_REGION || 'ap-south-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
