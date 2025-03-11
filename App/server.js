const express = require('express');
const bodyParser = require('body-parser');
const { encryptAES, decryptAES } = require('./utils.service'); 
const app = express();
const port = 3000;

app.use(bodyParser.json());


app.post('/api/encrypt-decrypt', (req, res) => {
  const encryptedComment = req.body.encryptedComment;

  
  console.log('Encrypted Comment received from Angular:', encryptedComment);


  const decryptedComment = decryptAES(encryptedComment);
  console.log('Decrypted Comment:', decryptedComment); 

 
  const reEncryptedComment = encryptAES(decryptedComment);


  res.json({ decryptedComment: reEncryptedComment });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
