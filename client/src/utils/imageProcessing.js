import config from '../config'
import Resizer from 'react-image-file-resizer'

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
  const response = await fetch(signedUploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg'
    },
    body: file
  })

  return response
}

async function updateUserProfilePicUrl(url){
  const response = await fetch(config.serverRoutes.graphQLUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: 
    JSON.stringify({
      query: `mutation UpdateProfile($imageUrl: String){
        updateProfile(imageUrl: $imageUrl){
          id
          imageUrl
        }
      }`,
      variables: { imageUrl: url }
    })
  })
  const json = await response.json()
  return json.data
}

async function migrateImage(imageUrl, userId){
  const originalFile = await getImageFileFromUrl(imageUrl)
  const {file} = await compressImage(originalFile)
  const signedUrl = await getSignedUploadUrl()
  await uploadImageToS3(file, signedUrl)
  const newUrl = "https://feelwithme-profile-pics.s3-us-west-2.amazonaws.com/" + userId + ".jpeg"
  const response = await updateUserProfilePicUrl(newUrl)
  return response
}

export {migrateImage, compressImage}