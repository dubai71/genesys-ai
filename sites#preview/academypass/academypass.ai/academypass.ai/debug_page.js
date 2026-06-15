const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const session = await page.context().newCDPSession(page);
  await session.send("Runtime.enable");
  session.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    console.log(
      `[cdp-exception] ${exceptionDetails.url || "no-url"}:${exceptionDetails.lineNumber}:${exceptionDetails.columnNumber} ${exceptionDetails.text}`
    );
  });
  page.on("console", (msg) => console.log(`[console:${msg.type()}] ${msg.text()}`));
  page.on("pageerror", (err) => console.log(`[pageerror] ${err.stack || err.message}`));
  page.on("requestfailed", (req) => console.log(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`));
  page.on("response", async (res) => {
    const url = res.url();
    if (url.includes(".js") || url.includes(".css")) {
      console.log(`[response] ${res.status()} ${res.headers()["content-type"] || ""} ${url}`);
    }
  });
  const res = await page.goto("http://127.0.0.1:5177/pass?fresh=5", { waitUntil: "networkidle" });
  console.log(`[status] ${res && res.status()}`);
  console.log(`[body] ${await page.locator("body").innerText().catch((err) => `ERR ${err.message}`)}`);
  console.log(`[root-html-length] ${await page.locator("#root").evaluate((el) => el.innerHTML.length).catch((err) => `ERR ${err.message}`)}`);
  await browser.close();
})();
