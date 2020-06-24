const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = 'profile-pics'

async function generateV4ReadSignedUrl(userId) {
  // These options will allow temporary jpeg write access to the file
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 30 * 60 * 1000, // 30 minutes
    contentType: "image/jpeg"
  };

  // Get a v4 signed URL for reading the file
  const [url] = await storage
    .bucket(bucketName)
    .file(userId)
    .getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log(`curl '${url}'`);
}

generateV4ReadSignedUrl('5k3j95kj342l').catch(console.error);