const { S3 } = require('@aws-sdk/client-s3')
const dotenv = require('dotenv')
const { nanoid } = require('nanoid')

dotenv.config()

const client = new S3({
  // forcePathStyle: process.env.pathStyle,
  region: process.env.STORE_REGION,
  endpoint: process.env.STORE_END_POINT,
  credentials: {
    accessKeyId: process.env.STORE_SECRET_ID,
    secretAccessKey: process.env.STORE_SECRET_KEY,
  },
  apiVersion: '2006-03-01',
})

const bucket = process.env.STORE_BUCKET

/**
 * 
 * @param {String} after - Where you want S3 to start listing from
 * @returns Array of URIs
 */
async function getURIs({ after }) {
  const { Contents } = await client.listObjectsV2({
    Bucket: bucket,
    StartAfter: after
  })
  if (!Contents || Contents.length < 1) return [];
  return Contents.map(c => c.Key);
}

async function getCommentsOfURI({ uri }) {

  // ref: https://stackoverflow.com/a/36944450/4674834
  const data = await new Promise(async (resolve, reject) => {
    try {
      const response = await client.getObject({
        Bucket: bucket,
        Key: uri,
      })

      // Store all of data chunks returned from the response data stream 
      // into an array then use Array#join() to use the returned contents as a String
      let responseDataChunks = []

      // Attach a 'data' listener to add the chunks of data to our array
      // Each chunk is a Buffer instance
      response.Body.on('data', chunk => responseDataChunks.push(chunk))

      // Once the stream has no more data, join the chunks into a string and return the string
      response.Body.once('end', () => resolve(responseDataChunks.join('')))
    } catch (err) {
      // Handle the error or throw
      return reject(err)
    }
  });

  const jsonComment = JSON.parse(data);

  return jsonComment;
}

async function addComment({ uri, ...comment }) {

  const currentComments = await getCommentsOfURI({ uri })
    .catch(e => console.log('uri not found')) || [];
console.log(currentComments)
  // Generate ID for comment
  comment.id = nanoid(10);

  // TODO validate asdding comment, e.g. if parentId exists
  currentComments.push(comment)

  await client.putObject({
    Bucket: bucket,
    Key: uri,
    Body: JSON.stringify(currentComments),
    ContentType: "application/json",
  })

  // console.log(res)
  return comment
}

async function deleteComment({ uri, id }) {
  const currentComponents = await getCommentsOfURI({ uri })
    .catch(e => console.log('uri not found')) || [];

  if (currentComponents.length < 1) return;

  const newComponents = currentComponents.filter(c => c.id !== id);

  await client.putObject({
    Bucket: bucket,
    Key: uri,
    Body: JSON.stringify(newComponents),
    ContentType: "application/json",
  })

  return newComponents;
}

async function dumpComment() {

}

module.exports = {
  getURIs,
  getCommentsOfURI,
  addComment,
  deleteComment,
  dumpComment,
}