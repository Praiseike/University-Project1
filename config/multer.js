


const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg') {
//       cb(null, 'thumbnails')
//     } else if (file.mimetype === 'video/mp4') {
//       cb(null, 'videos')
//     } else {
//       console.log(file.mimetype)
//       cb({ error: 'Mime type not supported' })
//     }
//   },

//   filename: (req, file, cd) => {
//     cd(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });

// const upload = multer({ storage: storage })

// module.exports = upload;