// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import requireFromUrl from 'require-from-url/sync.js'


export default function handler(req, res) {
  const data = requireFromUrl('https://binaries.soliditylang.org/bin/list.js');

  res.status(200).json({ releases: data.releases })
}
