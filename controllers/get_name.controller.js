import fs from 'fs';

export const getName = async (req, res) => {
    try {
        // const test = NameTitleModel.create(data);
        const folderPath = './uploads/';
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error('Lỗi khi đọc thư mục:', err);
                return;
            }
            return res.status(200).json({ status: "success", message: files });
        });
    } catch (error) {
        console.log(error);
    }
}