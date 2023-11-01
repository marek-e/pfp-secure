import multer from 'multer'

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './home/uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
  }),
});


export default upload;