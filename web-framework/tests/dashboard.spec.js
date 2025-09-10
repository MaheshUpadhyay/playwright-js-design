import{ test, expect } from '@playwright/test';
import { LoginPage } from '../fixtures/authFixtures';

test('Dashboard Test with Auth Fixture', async ({ loggedInPage }) => {
    await loggedInPage.goto();
    await expect(loggedInPage).toHaveURL('https://example.com/dashboard');  
});