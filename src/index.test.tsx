import React from 'react'
import { fireEvent, render } from './test/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { ChatBot } from '.'

test('renders the chat bot with version as 1', () => {
  const { getByTestId } = render(<ChatBot version={1} />)
  expect(getByTestId(1)).toBeTruthy()
  expect(getByTestId(1).attributes.getNamedItem('data-version')?.value).toEqual(
    '1'
  )
})

test('renders the chat bot icon and upon click it toggles visiblity of the chat container', async () => {
  const { getByTestId } = render(<ChatBot version={1} />)
  const chatWidget = getByTestId('chatWidget')
  expect(chatWidget.classList.value).toContain('hidden')
  const chatWidgetIcon = getByTestId('chatWidgetIcon')
  expect(chatWidgetIcon).toBeTruthy()
  fireEvent.click(chatWidgetIcon)
  expect(chatWidget.classList.value).toContain('visible')
})
