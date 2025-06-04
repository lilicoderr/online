export default function handler(req, res) {
  const isOnline = true; // 여기에 나중에 크롤링 결과 넣으면 됨
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(isOnline ? 'online' : 'offline');
}
