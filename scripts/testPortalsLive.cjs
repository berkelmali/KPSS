async function testLiseCategories() {
  const url = 'https://ilan.memurlar.net/kategori/daimi-isci-ilanlari/?Expire=false';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const buf = await res.arrayBuffer();
  const text = new TextDecoder('windows-1254').decode(buf);
  const links = [...text.matchAll(/<a[^>]+href="(\/ilan\/(\d+)\/([^"]+))"[^>]*>([\s\S]*?)<\/a>/gi)];
  console.log('Daimi isci links found:', links.length);
  links.slice(0, 10).forEach(m => {
    const raw = m[4].replace(/<[^>]+>/g, '').trim();
    console.log(`[${m[2]}] ${raw}`);
  });
}

testLiseCategories();
