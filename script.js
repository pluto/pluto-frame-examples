export const pseudoBankScript = {
  label: 'Pseudo Bank',
  script: `import { createSession } from '@plutoxyz/automation';
import { chromium } from 'playwright-core';

const session = await createSession();

/**
 * Prompt credentials
 */
const [username, password] = await session.prompt({
  title: 'Login to Pseudo Bank',
  description: 'Enter your username and password to login to Pseudo Bank',
  prompts: [
    { label: 'Username', type: 'text', attributes: {} },
    { label: 'Password', type: 'password', attributes: {} },
  ],
});

/**
 * Setup browser
 */
const browser = await chromium.connectOverCDP(await session.cdp());
const context = browser.contexts()[0];
const page = context.pages()[0];

/**
 * Navigate to Login and enter credentials
 */
await page.goto('https://pseudo-bank.pluto.dev');
await page.getByRole('textbox', { name: 'Username' }).fill(username);
await page.getByRole('textbox', { name: 'Password' }).fill(password);
await page.getByRole('button', { name: 'Login' }).click();
await page.waitForSelector('text=Your Accounts', { timeout: 5000 });

/**
 * Scrape balance
 */
const balanceLocator = page.locator('#balance-2');
await balanceLocator.waitFor({ state: 'visible', timeout: 5000 });
const balanceText = (await balanceLocator.textContent()) || '';
const balance = parseFloat(balanceText.replace(/[$,]/g, ''));

/**
 * Generate proof and cleanup
 */
await session.prove('bank_balance', balance);
await page.close();
await browser.close();
await session.close();
`
}
