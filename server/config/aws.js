const AWS = require('aws-sdk')
const config = require('../config')

const s3 = new AWS.S3({
  accessKeyId : process.env.AWS_KEY,
  secretAccessKey : process.env.AWS_SECRET
})

function createProfilePicUploadUrl(userId) {
  return new Promise(function(resolve, reject) {
    const expireSeconds = 60 * 5

    const params = {
      Bucket: config.awsBucketName,
      Key: userId + '.jpeg',
      Expires: expireSeconds,
      //ACL: 'bucket-owner-full-control',
      ContentType:'image/jpeg'
    }
    
    s3.getSignedUrl('putObject', params, function (err, url) {
      if (err) {
        reject(err)
      } else {
        console.log('The URL is', url);
        resolve(url)
      }
    })
  })
}

module.exports = { createProfilePicUploadUrl }
