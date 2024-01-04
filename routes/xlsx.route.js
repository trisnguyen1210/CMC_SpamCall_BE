import express from 'express';
import { saveFile } from '../controllers/savefile.controller.js';
import { makeCallController, runFileSpamCall } from '../controllers/makeCall.controller.js';
import multer from 'multer';
import { getName } from '../controllers/get_name.controller.js';
import { getResultSpam } from '../controllers/getResultSpam.controller.js';

const upload = multer({ dest: 'uploads/' })
const checkNumber = express.Router();

checkNumber.get('/gethardname', getName)
checkNumber.get('/resultspam', getResultSpam)
checkNumber.post('/savefile', upload.single('excel'), saveFile)
checkNumber.post('/makecall', makeCallController)
checkNumber.post('/runfile', runFileSpamCall)

export default checkNumber;

