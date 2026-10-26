// TikTok's public oEmbed gives each video's cover and caption. Cover links expire,
// so they're refetched every six hours; a failed fetch just means a plain tile.
export async function tiktokCards(items, handle) {
  return Promise.all(items.map(async (it) => {
    try {
      const url = `https://www.tiktok.com/oembed?url=${encodeURIComponent(`https://www.tiktok.com/@${handle}/video/${it.id}`)}`;
      const res = await fetch(url, { next: { revalidate: 21600 } });
      if (!res.ok) return it;
      const data = await res.json();
      return { ...it, cover: data.thumbnail_url, caption: it.caption || (data.title || "").split("#")[0].trim() };
    } catch {
      return it;
    }
  }));
}
