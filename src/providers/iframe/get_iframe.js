const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/api/rill/iframe', async (req, res) => {
    const dashboardName = req.body.resource;
    try {
        const response = await fetch('https://admin.rilldata.com/v1/organizations/<org-name>/projects/<project-name>/iframe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer <rill-svc-token>`,
            },
            body: JSON.stringify({
                resource: dashboardName,
                user_email: '<user-email>',
            }),
        });
        const data = await response.json();
        res.json({ iframeResp: data.resp.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});