
export const isVideo = (url: string) => {
  if (!url) return false;
  return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
};

export const getOptimizedUrl = (url: string, width: number = 800) => {
  if (!url) return '';
  if (isVideo(url)) return url;
  
  // Skip optimization for already optimized URLs, local paths, or data URLs
  if (url.includes('wsrv.nl') || url.includes('images.weserv.nl') || !url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }
  
  // Use wsrv.nl (Cloudflare-backed, very fast globally) to convert huge PNGs to WebP
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=75&output=webp&we`;
};
