const express = require('express');
const bodyParser = require('body-parser')
const userRouter = require('./routes/route')
const app = express();
const PORT = 5000;
const morgan = require('morgan')


app.use(morgan('dev'))
app.use(bodyParser.json());

/*definition de route /enquete
et on qui ce relier avec fichier route.js dans le dossier de route*/
// tp-async-callback
app.use("/enquete", userRouter);
app.get('/',(req,res) => res.send('hello hhh'));
app.listen(PORT,()=>console.log('app listening at http://localhost:'+PORT));
