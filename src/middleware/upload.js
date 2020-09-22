import multer from 'multer'
import moment from 'moment'

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const data = moment().format('DDMMYYYY-HHmmss')
        cb(null, file.originalname)
    }
})
export const fileValid = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
export const limits = {
    fileSize: 1024 * 1024 * 5
}
/*
export const upload = multer({
    storage: storage,
    fileFilter: fileValid,
    limits: limits
})*/
