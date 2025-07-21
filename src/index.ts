import express from 'express';
import { homePage } from './pages/home/home';
import { renderName } from './pages/single-page';


const app = express();
const PORT = 5050;
app.use(express.static('public'));

app.get('/', async (_req: any, res: any) => {
    const html = await homePage();
    res.send(html);
});

app.get('/hello/:name', async (req, res) => {
    const html = await renderName(req.params.name);
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
