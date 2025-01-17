const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const myUploadMiddleware = upload.single('image')

module.exports = myUploadMiddleware;