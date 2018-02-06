const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination(reg, file, callback) {
        callback(null, path.resolve(__dirname, '../uploads/'));
    },
    filename(req, file, callback) {
        let fileFormat = (file.originalname).split(".");
        callback(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})

const uploadMu = multer({
    storage: storage
}).single('file');

// .single('file') 为单图上传
// .array('file', 2) 为多图上传

const upload = (req, res, next) => {
    uploadMu(req, res, function(err) {
        if (err) {
            res.send({ code: 0, message: 'error:' + err });
            return;
        }

        let file = req.file;
        // http://127.0.0.1:3001/uploads/file-1517903865330.png
        let fileurl = file.path.split('/')[file.path.split('/').length-1]
        res.json({ code: 1, name: file.originalname, url: file.path, fileurl: 'http://node.zeroyh.cn/uploads/' + fileurl});
    })
}

const getFile = (req, res, next) => {
    fs.readdir(path.resolve(__dirname, '../uploads/'), function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        var result = files.reverse().map(function (file) {
            return { name: file, url: 'http://node.zeroyh.cn/uploads/' + file };
        })
        res.json(result);
    })
}


module.exports = {
    upload: upload,
    getFile: getFile
}