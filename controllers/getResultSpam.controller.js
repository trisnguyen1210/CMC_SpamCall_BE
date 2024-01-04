import fs from 'fs';
import util from 'util';

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

export const getResultSpam = async (req, res) => {
    try {
        const nameFile = req.query.namefile;
        const folderPath = `./logs/${nameFile}.xlsx`;

        // Kiểm tra sự tồn tại của thư mục
        if (!fs.existsSync(folderPath)) {
            console.error('Thư mục không tồn tại.');
            return res.status(404).json({ status: "fail", message: "Thư mục không tồn tại." });
        }

        // Kiểm tra xem tệp có phải là một thư mục không
        const stat = fs.statSync(folderPath);
        if (!stat.isDirectory()) {
            console.error('Đường dẫn không phải là một thư mục.');
            return res.status(404).json({ status: "fail", message: "Đường dẫn không phải là một thư mục." });
        }

        // Sử dụng Promises hoặc async/await
        const files = await readdir(folderPath);
        // Đọc nội dung của các tệp busy_numbers.txt và error_numbers.txt
        const busyNumbers = (await readFile(`${folderPath}/busy_numbers.txt`, 'utf-8')).split(',');
        const errorNumbers = (await readFile(`${folderPath}/error_numbers.txt`, 'utf-8')).split(',');
        // Trả về kết quả
        return res.status(200).json({ status: "success", message: { busyNumbers, errorNumbers } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Đã xảy ra lỗi." });
    }
};
