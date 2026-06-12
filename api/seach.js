export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'query required' });

    const url = `https://api.jstage.jst.go.jp/searchapi/do?service=3&query=${encodeURIComponent(query)}&count=30&sortorder=score&lang=Japanese`;

    try {
        const response = await fetch(url);
        const text = await response.text();
        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(text);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
