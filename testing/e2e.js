const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: ["--window-size=1620,1080"],
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1620, height: 1080 });

  await page.goto("https://namastedev.com/");

  const getStartedButtonSelector = ".bg-primary-btn";

  const getStartedButton = await page.waitForSelector(getStartedButtonSelector);

  await getStartedButton.click();

  const enrollButtonSelector = ".bg-success-btn";

  const enrollButton = await page.waitForSelector(enrollButtonSelector);

  await enrollButton.click();

  const enrollTodayButtonSelector = ".bg-primary-btn";

  const enrollTodayButton = await page.waitForSelector(
    enrollTodayButtonSelector
  );

  await enrollTodayButton.click();

  // await browser.close();
})();
