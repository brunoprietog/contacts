import { test, expect } from '@playwright/test'

const apiURL = 'http://localhost:3001'

const contacts = [
  {
    id: 1,
    name: 'Bran',
    lastName: 'Stark',
    email: 'bran@stark.com',
    phone: '+56987654321'
  }
]

const newContact = {
  id: 2,
  name: 'Rob',
  lastName: 'Stark',
  email: 'rob@stark.com',
  phone: '+56998765432'
}

test.describe('Contacts', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${apiURL}/contacts`, (route) => {
      const method = route.request().method()
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(contacts)
        })
      }
      else if (method === 'POST') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(newContact)
        })
        contacts.push(newContact)
      }
    })
    await page.route(`${apiURL}/contacts/1`, (route) => {
      const method = route.request().method()
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          body: JSON.stringify(contacts[0])
        })
      }
      else if (method === 'PUT') {
        contacts[0].email = 'hello@branstark.com'
        route.fulfill({
          status: 200,
          body: JSON.stringify(contacts[0])
        })
      }
      else if (method === 'DELETE') {
        contacts.splice(0, 1)
        route.fulfill({
          status: 200,
          body: JSON.stringify({})
        })
      }
    })
  });

  test('Show contacts', async ({ page }) => {
    await page.goto('http://localhost:3000/contacts')
    await expect(page.locator('a', { hasText: contacts[0].name })).toBeVisible()
  })
  
  test('Show contact', async ({ page }) => {
    await page.goto('http://localhost:3000/contacts/1')
    await expect(page.locator('p', { hasText: contacts[0].email })).toBeVisible()
  })

  test('Create contact', async ({ page }) => {
    await page.goto('http://localhost:3000/contacts/new')
    await page.fill('[name="name"]', newContact.name)
    await page.fill('[name="lastName"]', newContact.lastName)
    await page.fill('[name="email"]', newContact.email)
    await page.fill('[name="phone"]', newContact.phone)
    await page.locator('button').click()
    await expect(page.locator('a', { hasText: contacts[1].name })).toBeVisible()
  })
  
  test('Update contact', async ({ page }) => {
    const newEmail = 'hello@branstark.com'
    await page.goto('http://localhost:3000/contacts/1/edit')
    await page.fill('[name="email"]', newEmail)
    await page.locator('button').click()
    await expect(page.locator('p', { hasText: newEmail })).toBeVisible()
  })
  
  test('Delete contact', async ({ page }) => {
    await page.goto('http://localhost:3000/contacts/1')
    await page.locator('button').click()
    await expect(page.locator('a', { hasText: 'Bran' })).not.toBeVisible()
  })
})
