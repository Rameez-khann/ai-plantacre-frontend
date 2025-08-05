import { postRequest } from "../../core/requests";

// plant-id.js
export async function uploadAndIdentifyPlant(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await postRequest(`/identify-plant`, formData);
  if(res?.instructions){
return res.instructions;
  } else{
 throw new Error('API request failed');
  }

//   const res = await fetch('/api/identify-plant', {
//     method: 'POST',
//     body: formData,
//   });


}