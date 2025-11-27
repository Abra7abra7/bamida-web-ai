'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
/* eslint-disable @typescript-eslint/no-explicit-any */
import configPromise from '@payload-config'
import { importMap } from './importMap'

export async function serverFunction(args: any) {
    return handleServerFunctions({
        ...args,
        config: configPromise,
        importMap,
    })
}
