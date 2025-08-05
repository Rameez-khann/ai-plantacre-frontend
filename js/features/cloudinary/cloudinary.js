/**
 * Upload a file to Cloudinary (unsigned upload).
 * @param {File} file - The file object from input type="file"
 * @param {string} cloudName - Your Cloudinary cloud name
 * @param {string} uploadPreset - Your unsigned upload preset name
 * @returns {Promise<string>} - Uploaded file's URL
 */
export async function uploadFileToCloudinary(file, cloudName, uploadPreset) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (res.ok) {
    return data.secure_url; // or data.public_id if you want to track/delete later
  } else {
    throw new Error(data.error?.message || 'Upload failed');
  }
}

/**
 * Delete a file from Cloudinary (⚠️ not safe on frontend, use server-side only)
 * @param {string} publicId - The Cloudinary public ID of the image
 * @param {string} cloudName
 * @param {string} apiKey
 * @param {string} apiSecret
 * @returns {Promise<any>}
 */
export async function deleteFileFromCloudinary(publicId, cloudName, apiKey, apiSecret) {
  const timestamp = Math.floor(Date.now() / 1000);
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

  // Hash it to get the signature
  const signature = await sha1(stringToSign);

  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });

  return res.json();
}

/**
 * Simple SHA-1 hash function for signature generation.
 * @param {string} message
 * @returns {Promise<string>}
 */
async function sha1(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

