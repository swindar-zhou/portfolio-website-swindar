import { useState, useEffect } from 'react';
import { extractVibrantColor } from '@/lib/colorExtractor';

/**
 * Custom hook to extract and manage vibrant color from album cover
 * @param albumImageUrl - The URL of the album cover image
 * @returns The extracted vibrant color as an rgba string
 */
export function useAlbumColor(albumImageUrl: string | null): string {
  const [color, setColor] = useState<string>('rgba(255, 255, 255, 0.6)'); // Default white

  useEffect(() => {
    if (!albumImageUrl) {
      setColor('rgba(255, 255, 255, 0.6)');
      return;
    }

    let isCancelled = false;

    extractVibrantColor(albumImageUrl)
      .then((extractedColor) => {
        if (!isCancelled) {
          setColor(extractedColor);
        }
      })
      .catch((error) => {
        console.error('Failed to extract color from album cover:', error);
        // Keep the default or previous color on error
      });

    return () => {
      isCancelled = true;
    };
  }, [albumImageUrl]);

  return color;
}
