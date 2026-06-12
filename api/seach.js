
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'q required' });

    const url = `https://api.jstage.jst.go.jp/searchapi/do?service=3&keyword=${encodeURIComponent(q)}&count=30&sortflg=1`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.status(200).send(text);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}