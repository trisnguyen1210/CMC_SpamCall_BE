import esl from 'modesl';
import xlsx from 'xlsx';
import fs from 'fs';

// export const conn = new esl.Connection('127.0.0.1', 8021, 'ClueCon', function () {
//     console.log('Connected to FreeSWITCH ESL')
//     const sourcePhoneNumber = '0123';
//     const destinationPhoneNumber = '0962966077'
//     const originateCommand = `originate user/${sourcePhoneNumber} &bridge(sofia/internal/${destinationPhoneNumber}@localhost)`;
//     console.log(originateCommand)
//     conn.api(originateCommand, (response) => {
//         console.log('Call response:', response.getBody());
//     });

//     conn.api('status', function (res) {
//         console.log(res.getBody());
//     });
// });

export const runFileSpamCall = async (req, res) => {
    const name = req.body.name;
    const filePath = `./uploads/${name}`
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const listNumber = data.map(item => item[0]);
    const result = await makeCallProcess(listNumber, name);
    console.log(result)
    if (result === false) {
        return res.status(500).json({ status: "error", message: "Test call 1 file error" })
    }
    return res.status(200).json({ status: "success", message: "Test Call 1 file finish" });

}

const createXLSX = async (nameXLSX, dataXLSX) => {
    const ws = xlsx.utils.json_to_sheet(dataXLSX);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'CallResults');
    xlsx.writeFile(wb, `${nameXLSX}.xlsx`);
}

export const makeCallController = async (req, res) => {
    const listNumber = req.body.data
    // const x = req.body
    const phoneNumberArray = []
    // Số điện thoại đích
    listNumber.map(item => phoneNumberArray.push(item.sdt));
    const result = await makeCallProcess(phoneNumberArray);
    console.log(result)
    if (result === false) {
        return res.status(500).json({ status: "error", message: "Test call file error" })
    }
    return res.status(200).json({ status: "success", message: "Test call finish" });
};

async function makeCallProcess(phoneNumbers, name) {
    const conn = new esl.Connection('127.0.0.1', 8021, 'ClueCon', async function () {
        const testNumber = '0971977753';
        const testIP = '42.96.45.229:40601';
        let busyList = [];
        let errorList = [];
        for (const element of phoneNumbers) {
            const originateNumb = `84${element}`
            const originateCommand = `originate {originate_timeout=4,ignore_early_media=true,origination_caller_id_number=${originateNumb}}sofia/external/${testNumber}@${testIP} 123`;
            try {
                const response = await new Promise((resolve, reject) => {
                    conn.api(originateCommand, (response) => {
                        resolve(response);
                    });
                });
                const logFolderPath = `./logs/${name}/`;
                const createFolder = await fs.promises.mkdir(logFolderPath, { recursive: true });
                console.log(response.body)
                if (response.body === '-ERR USER_BUSY\n') {
                    busyList.push(originateNumb)
                } else {
                    errorList.push(originateNumb)
                }
            } catch (error) {
                console.log(error);
                return false
                // Handle the specific error, e.g., log it or throw it again
            }
        }
        await fs.promises.writeFile(`./logs/${name}/busy_numbers.txt`, `${busyList}\n`, { flag: 'a' });
        await fs.promises.writeFile(`./logs/${name}/error_numbers.txt`, `${errorList}\n`, { flag: 'a' });

        conn.disconnect();
    });
    // If you want to wait for the entire process to finish, you can use a Promise
    await new Promise((resolve) => conn.once('esl::end', resolve));
    return true
}
