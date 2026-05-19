# Mobile Flashcards Hosting

这个文件夹用于生成一个固定手机链接。

## Files

- `index.html`：手机翻卡片界面。
- `vocab.json`：词汇数据。以后每天主要更新这个文件。

## Recommended Hosting

最佳方案：GitHub Pages / Netlify / Cloudflare Pages 任一静态托管。

发布后，手机只需要打开一次固定链接，例如：

```text
https://your-name.github.io/french-vocab/
```

以后这里更新 `vocab.json` 并重新发布，手机刷新页面就会看到新卡片。

## Important

如果直接把 `index.html` 文件发到手机，它只是一个文件副本，不会自动同步更新。

要实现“手机链接不变、内容自动更新”，必须使用托管 URL。

