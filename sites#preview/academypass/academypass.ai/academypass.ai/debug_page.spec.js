const { test } = require("playwright/test");

test("debug pass page", async ({ page }) => {
  page.on("console", (msg) => console.log(`[console:${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`[pageerror] ${err.stack || err.message}`));
  page.on("requestfailed", (req) => console.log(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`));
  const res = await page.goto("http://127.0.0.1:5177/pass?fresh=6", { waitUntil: "networkidle" });
  console.log(`[status] ${res && res.status()}`);
  console.log(`[body] ${await page.locator("body").innerText().catch((err) => `ERR ${err.message}`)}`);
  console.log(`[root-html-length] ${await page.locator("#root").evaluate((el) => el.innerHTML.length).catch((err) => `ERR ${err.message}`)}`);
});
