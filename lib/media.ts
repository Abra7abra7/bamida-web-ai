
export const formatMediaUrl = (url?: string | null): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith('http')) return url;
    // If it's a relative path, prepend the server URL if available, otherwise assume it's served from the same domain
    // For Payload, usually uploads are served from the same domain in production, but in dev it might be different.
    // However, Next.js Image component handles relative URLs by assuming they are local.
    // The issue might be that Payload returns a relative URL like '/media/image.png' but the Next.js app needs to know where that is.
    // If Payload is running on the same server (which it is here, via Next.js), then '/media/...' should work IF the static folder is set up correctly.

    // But let's try to be safe.
    return url;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getMediaUrl = (media: any): string | undefined => {
    if (!media) return undefined;
    if (typeof media === 'string') return media; // It's an ID, which is bad for frontend rendering without population
    if (typeof media === 'object' && media.url) {
        return formatMediaUrl(media.url);
    }
    return undefined;
}
