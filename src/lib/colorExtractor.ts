/**
 * Extracts the most vibrant color from an image URL
 * @param imageUrl - The URL of the image to analyze
 * @returns A promise that resolves to an RGB color string
 */
export async function extractVibrantColor(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Use smaller canvas for faster processing
        canvas.width = 100;
        canvas.height = 100;

        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const pixels = imageData.data;

        // Find the most vibrant color
        let maxVibrance = 0;
        let vibrantColor = { r: 255, g: 255, b: 255 };

        // Sample every 4th pixel for performance
        for (let i = 0; i < pixels.length; i += 16) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];

          // Skip very dark or very light colors
          const brightness = (r + g + b) / 3;
          if (brightness < 50 || brightness > 230) continue;

          // Calculate saturation and vibrance
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;

          // Vibrance combines saturation and brightness
          const vibrance = saturation * (brightness / 255);

          if (vibrance > maxVibrance) {
            maxVibrance = vibrance;
            vibrantColor = { r, g, b };
          }
        }

        // Return as rgba string with opacity
        resolve(`rgba(${vibrantColor.r}, ${vibrantColor.g}, ${vibrantColor.b}, 0.6)`);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
}
