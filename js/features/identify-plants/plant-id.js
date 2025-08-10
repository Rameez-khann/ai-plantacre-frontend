import { postRequest } from "../../core/requests.js";


export async function uploadAndIdentifyPlant(file) {
  const formData = new FormData();
  formData.append('file', file); // 👈 'file' must match upload.single('file')

  const url = 'http://localhost:5501/identify-plant';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status ${response.status}`);
  }

  return response.json(); // Will contain { base64: '...' }
}



// export async function uploadAndIdentifyPlant(file) {
//   const formData = new FormData();
//   formData.append('file', file); // 🔥 Must match backend: upload.single('file')
// console.log(formData);

//   try {
//     const res = await postRequest('/identify-plant', formData);
// console.log(res);

//     // if (res?.base64) {
//     //   // You can use this base64 to preview image or send elsewhere
//     //   return res.base64;
//     // } else {
//     //   throw new Error('No base64 returned from server.');
//     // }
//   } catch (error) {
//     console.error('Upload failed:', error);
//     throw error;
//   }
// }