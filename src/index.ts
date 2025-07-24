import express from 'express';
import { indoorPlantListPage } from './features/indoor-plants/pages/indoor-plant-lists';
import { homePage } from './features/home/home';


const app = express();
const PORT = 5050;

// Access static files from public folder
app.use(express.static('public'));

app.get('/', async (_req: any, res: any) => {
    const page = homePage();
    res.send(page);
});

app.get('/indoor-plants', async (req, res) => {
    const page = indoorPlantListPage();
    res.send(page);
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
