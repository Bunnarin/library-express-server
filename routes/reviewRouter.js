const express = require('express');	
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();
const key = "secret";
let reviewList = [{},{},{}];

// route
router.get('/:bookID', (req,res)=>{
    const { bookID } = req.params;
    res.render('review', { bookID: bookID , reviewList: JSON.stringify(reviewList[bookID])});
});

router.post('/:bookID', (req,res) =>{
    try{
        let bookID = req.params.bookID;
        let userID = getUserID(req);
        const review = req.body.review;
        reviewList[bookID][userID]=review;
        res.send("posted. refresh to see changes");
    }
    catch (err) {
        res.send(err);
    }
});
router.delete('/:bookID', (req,res) =>{
    const bookID = req.params.bookID;
    const userID = getUserID(req);
    try{
        delete reviewList[bookID][userID]
        res.send("deleted. refresh to see changes");
    }
    catch (err) {
        res.send(err);
    }
});
module.exports = router;

function getUserID(req){
    const accessKey = req.session.authorization;
    try{
        const payload = jwt.verify(accessKey, key);
        return payload.userID;
    }
    catch(err){
        console.error(err);
    }
}
