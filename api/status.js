import https from 'https';

const streamerIds = [
  'viichan6',
  'inehine',
  'lilpa0309',
  'gosegu2',
  'cotton1217',
  'jingburger1'
];

export default async function handler(req, res) {
  const results = await Promise.all(streamerIds.map(async (id) => {
    const html = await fetchHtml(`https://play.sooplive.co.kr/${id}/`);
    const isOffline = html
      .split('\n')
      .find(line => line.includes('window.szBroadTitle'))
      ?.includes('오프라인');
    return `${id.slice(0, 3)}${isOffline ? 'offline' : 'online'}`;
  }));

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(results.join('<br>\n'));
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => reject(err));
  });
}
