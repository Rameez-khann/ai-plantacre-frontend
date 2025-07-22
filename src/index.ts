import express from 'express';
import { homePage } from './pages/home';
import { getHtmlFile } from './utils/get-html-file';


const app = express();
const PORT = 5050;
app.use(express.static('public'));

app.get('/', async (_req: any, res: any) => {
    const html = await homePage();
    // const html = await getHtmlFile('index.html');
    res.send(html);
});

app.get('/hello/:name', async (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
