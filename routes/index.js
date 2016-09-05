var express = require('express');
var Email = require('../model/email');
var router = express.Router();
var success=false;

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.post('/save',function(req,res,next){
  console.log("This is post method");
  if(req.body)
  {
    var msg = new Email();
    msg.msgId = req.body.id;
    msg.msgFrom = req.body.from;
    msg.msgTo = req.body.to;
    msg.msgSubject = req.body.sub;
    msg.message = req.body.body;
    msg.save(function(err,msg)
    {
      if(err)
        return(console.log(err));
      else
      {
        success=true;
        res.send(success);
      }
    });
  }
  else
  {
    res.send(success);
  }
});

router.get('/home', function(req, res, next) {
  Email.find(function(err,docs)
  {
    if(docs)
    {
      res.json(docs);
    }
    else
    {
      console.log(err);
    }
  });
});

router.put('/update',function(req,res,next){
  console.log(req);
  Email.findById(req.body.dataId, function (err, email) {
  if (err) return console.log(err);

  email.msgFrom = req.body.updateFrm;
  email.msgSubject = req.body.updateSub;
  email.save(function (err, updatedEmail) {
    if (err) return handleError(err);
    res.send(updatedEmail);
  });
});
});

router.delete('/delete',function(req,res,next){
  Email.remove({_id:req.body.dataId},function(err){
    if(err)
    {
      return console.log(err);
    }
    res.send("Data deleted");
  });
});

module.exports = router;
