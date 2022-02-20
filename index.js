const app = require('./src/app');
const { PORT } = process.env


app.listen(PORT, async () => {
    console.log('Listening on port: ', PORT);
}).on('error', (e) => {
    console.log('Error happened: ', e.message)
});