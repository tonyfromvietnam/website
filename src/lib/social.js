import { existsSync } from "node:fs";
import path from "node:path";

// TikTok covers, best first: your own image at public/tiktok/<id>.jpg (never expires), then
// TikTok's oEmbed cover (links expire, so refetched every six hours). With neither, the tile
// draws a typographic poster instead. oEmbed also fills in a missing caption.
export async function tiktokCards(items, handle) {
  return Promise.all(items.map(async (it) => {
    const own = ["jpg", "jpeg", "png", "webp"].find((ext) => existsSync(path.join(process.cwd(), "public", "tiktok", `${it.id}.${ext}`)));
    const card = own ? { ...it, cover: `/tiktok/${it.id}.${own}` } : it;
    if (own && card.caption) return card;
    try {
      const url = `https://www.tiktok.com/oembed?url=${encodeURIComponent(`https://www.tiktok.com/@${handle}/video/${it.id}`)}`;
      const res = await fetch(url, { next: { revalidate: 21600 } });
      if (!res.ok) return card;
      const data = await res.json();
      return { ...card, cover: card.cover || data.thumbnail_url, caption: card.caption || (data.title || "").split("#")[0].trim() };
    } catch {
      return card;
    }
  }));
}
