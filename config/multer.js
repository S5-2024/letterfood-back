const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const now = new Date();
        const timestamp = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}_${String(now.getMinutes()).padStart(2, "0")}_${String(now.getSeconds()).padStart(2, "0")}`;

        // Gera um número aleatório para garantir que o nome seja único
        const randomNumber = Math.floor(Math.random() * 1000000);
        
        // Adiciona a extensão do arquivo
        cb(null, `${timestamp}_${randomNumber}${path.extname(file.originalname)}`); 
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (!['.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
          return cb(new Error('Tipo de arquivo não suportado'), false);
        }
        cb(null, true);
      },
})

module.exports = upload