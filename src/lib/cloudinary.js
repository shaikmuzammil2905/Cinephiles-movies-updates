export const CLOUDINARY_CONFIG = {
  cloudName: 'sswvfb6h',
  uploadPreset: 'ml_default',
  uploadUrl: 'https://api.cloudinary.com/v1_1/sswvfb6h/image/upload'
};

/**
 * Uploads a file (File object or Data URL) to Cloudinary.
 * Falls back gracefully or provides detailed error responses.
 */
export async function uploadToCloudinary(file, onProgress) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl, true);

      if (onProgress && xhr.upload) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            onProgress(percent);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const res = JSON.parse(xhr.responseText);
          resolve({
            success: true,
            url: res.secure_url || res.url,
            publicId: res.public_id,
            format: res.format,
            width: res.width,
            height: res.height
          });
        } else {
          try {
            const errRes = JSON.parse(xhr.responseText);
            reject(new Error(errRes.error?.message || `Upload failed with status ${xhr.status}`));
          } catch (e) {
            reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error('Network error while uploading image to Cloudinary'));
      xhr.send(formData);
    });
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw err;
  }
}
