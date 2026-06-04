import express from 'express';
import verifyRole from '../middleware/verifyrole.js';
import rolecheck from '../middleware/rolecheck.js';


const router = express.Router();    




router.get('/teacher', verifyRole , rolecheck("admin" , "teacher"), (req, res) => {
    res.send('welcome to guest page');
    }

);

router.get('/student',(req, res) => {
    res.send('welcome to student page');
})

export default router;
