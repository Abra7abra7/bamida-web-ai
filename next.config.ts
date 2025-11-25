import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'],
}

export default withPayload(withNextIntl(nextConfig))
