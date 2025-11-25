import configPromise from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './importMap'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN BY @payloadcms/next/layouts */
import React from 'react'

import '@payloadcms/next/css'
import './custom.scss'

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={configPromise}
        importMap={importMap}
        serverFunction={async (args) =>
            await handleServerFunctions({
                ...args,
                config: configPromise,
                importMap,
            })
        }
    >
        {children}
    </RootLayout>
)

export default Layout
