const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

// exports.uploads = (file, folder) => {
//   return new Promise((resolve) => {
//     cloudinary.v2.uploader.upload(file, (result) => {
//       resolve({
//         url: result.url,
//         id: result.public.id
//       })
//     }, {
//       resourcetype: 'auto',
//       folder: folder,
//     })
//   })
// }