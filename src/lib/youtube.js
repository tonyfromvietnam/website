// Newest uploads from a channel's public RSS feed: no API key, cached for an hour
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export async function latestYouTube(channelId, count = 1) {
  if (!channelId) return [];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>[\s\S]*?<yt:videoId>(.*?)<\/yt:videoId>[\s\S]*?<title>(.*?)<\/title>/g)]
      .slice(0, count)
      .map(([, id, title]) => ({ id, title: decode(title) }));
  } catch {
    return [];
  }
}
