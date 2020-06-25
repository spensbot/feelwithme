import Axios from 'axios'
import config from '../config'
import Resizer from 'react-image-file-resizer'

Axios.defaults.withCredentials = true

async function getImageFileFromUrl(imageUrl) {
  const response = await fetch(imageUrl)
  const blob = await response.blob()
  const file = new File([blob], 'image.jpeg')
  return file
}

function compressImage(file){
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      512,
      512,
      'JPEG',
      80,
      0,
      blob => {
        const file = new File([blob], "image.jpeg")
        //console.log(file)
        var reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          var base64 = reader.result;
          resolve({
            file,
            base64
          })
        }
      },
      'blob'
    )
  })
}

async function getSignedUploadUrl(){
  // const response = await Axios.post(config.serverRoutes.graphQLUrl, {
  //   headers: { 'Content-Type': 'application/json'},
  //   withCredentials: true,
  //   //data: JSON.stringify({ query: 'query { signedProfilePicUploadUrl }'})
  //   query: 'query { signedProfilePicUploadUrl }'
  // })
  // return response.data.signedProfilePicUploadUrl

  const response = await fetch(config.serverRoutes.graphQLUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ query: '{ signedProfilePicUploadUrl }' }),
  })
  const json = await response.json()
  return json.data.signedProfilePicUploadUrl
}

async function uploadImageToS3(file, signedUploadUrl){
  const response = await Axios.request({
    url: signedUploadUrl,
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg'
    },
    data: file
  })
  return response
}

async function updateUserProfilePicUrl(url){
  const response = await Axios.post(config.serverRoutes.graphQLUrl, {
    headers: { 'Content-Type': 'application/json'},
    data: {
      query: `mutation UpdateProfile($imageUrl: String){
        updateProfile(imageUrl: $imageUrl){
          id
          imageUrl
        }
      }`,
      variables: { imageUrl: url }
    }
  })
  return response
}

async function migrateImage(imageUrl, userId){
  console.log("Existing url", imageUrl)
  const originalFile = await getImageFileFromUrl(imageUrl)
  console.log("Original File", originalFile)
  const {file} = await compressImage(originalFile)
  console.log("File", file)
  const signedUrl = await getSignedUploadUrl()
  console.log("signedUrl:", signedUrl)
  await uploadImageToS3(file, signedUrl)
  const newUrl = "https://feelwithme-profile-pics.s3-us-west-2.amazonaws.com/" + userId + ".jpeg"
  console.log("newUrl", newUrl)
  const response = await updateUserProfilePicUrl(newUrl)
  console.log("updateUserProfilePicUrl response", response)
}

export {migrateImage, compressImage}