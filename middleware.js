// Temporary maintenance mode: every request gets HTTP 503.
// To restore the site, delete this file (or revert the commit) and push.
const HTML = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>Технические сбои — Ko‘kcha eshiklari</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center;
      font-family: system-ui, -apple-system, Arial, sans-serif; background: #f8f6f2; color: #222; }
    main { max-width: 520px; padding: 24px; text-align: center; }
    h1 { font-size: 28px; margin: 0 0 16px; }
    p { font-size: 17px; line-height: 1.5; color: #555; }
  </style>
</head>
<body>
  <main>
    <h1>Ведутся технические сбои</h1>
    <p>Сайт временно недоступен. Мы уже работаем над устранением проблемы и скоро вернёмся.</p>
    <p>Texnik nosozliklar bartaraf etilmoqda. Sayt vaqtincha ishlamaydi.</p>
  </main>
</body>
</html>`;

export default function middleware() {
  return new Response(HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "retry-after": "3600",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  matcher: "/((?!_vercel).*)",
};
