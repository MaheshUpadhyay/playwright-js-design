import {test as base} from '@playwright/test';

export const test = base.extend({
    loggedInPage: async ({page}, use) => {  
        await page.goto('https://example.com/login');
        await page.fill("input[name='name']", process.env.USERNAME || 'testuser');  
        await page.fill('input[name="password"]', 'password123');
        await page.fill('input[name="confirmpassword"]', 'password123');
        await page.click('text=LOGIN');
        await use(page);
    }
});