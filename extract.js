const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/shard/.gemini/antigravity/brain/3cc680c6-edb3-43b2-8b7b-73c7db3981a7/.system_generated/steps/58/output.txt', 'utf8'));
const map = data.screens.map(s => ({ title: s.title, id: s.name }));
fs.writeFileSync('screens_utf8.json', JSON.stringify(map, null, 2));
