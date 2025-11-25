import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['sk', 'en', 'de'],

    // Used when no locale matches
    defaultLocale: 'sk',

    // The default locale can be used without a prefix (e.g. `/about`)
    localePrefix: 'as-needed'
});

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        '/((?!api|admin|_next|_vercel|.*\\..*).*)',
        // Match all pathnames within `/`
        '/'
    ]
};
