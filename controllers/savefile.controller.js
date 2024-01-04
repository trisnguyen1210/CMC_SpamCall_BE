import fs from 'fs';

export const saveFile = async (req, res) => {
    try {
        const { originalname, path } = req.file;
        const nameFile = req.body.name;

        // Tạo đường dẫn thư mục đích
        const destinationDir = `uploads/`;

        // Kiểm tra xem thư mục đích có tồn tại chưa, nếu chưa thì tạo mới
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Đường dẫn đích cho file
        const destinationPath = `${destinationDir}/${originalname}`;

        // Đọc nội dung file
        const fileContent = await fs.promises.readFile(path, 'binary');

        // Ghi nội dung file vào đường dẫn đích
        await fs.promises.writeFile(destinationPath, fileContent, 'binary');

        // Xóa file tạm thời
        await fs.promises.unlink(path);

        return res.status(200).json({ status: "success", message: "save file success" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ status: "error", message: "save file error" });
    }
};
