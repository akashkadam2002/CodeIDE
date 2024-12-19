const express = require('express');
const port = 5000;
const app = express();
const cors = require('cors');

const indexRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());  

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
