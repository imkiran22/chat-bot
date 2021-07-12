import React from 'react'
import { PusherMock } from 'pusher-js-mock'
import { render, fireEvent } from '../../../test/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { ConversationView } from './ConversationView'

const pusherMock = { ...new PusherMock(), trigger: () => {} }

test('renders a conversation view component', () => {
  const { getByTestId } = render(
    <ConversationView
      {...{
        data: { prevMessages: [], messages: [] },
        pusherInstance: {},
        currentSequence: { number: 0 }
      }}
    />
  )
  expect(getByTestId('conversationView')).toBeTruthy()
})

test(`renders first name as the first component in the chat sequence 
and upon typed value with enter key, loads the next field in sequence and for
 email addresses only business emails allowed`, async () => {
  const { getByTestId } = render(
    <ConversationView
      {...{
        data: { prevMessages: [], messages: [] },
        pusherInstance: pusherMock,
        currentSequence: { number: 0 }
      }}
    />
  )
  const firstName = getByTestId('First Name')
  expect(firstName).toBeTruthy()

  fireEvent.change(firstName, { target: { value: 'Test User' } })
  fireEvent.keyDown(firstName, { key: 'Enter', code: 'Enter' })
  const lastName = getByTestId('Last Name')
  expect(lastName).toBeTruthy()

  fireEvent.change(lastName, { target: { value: 'Test Last' } })
  fireEvent.keyDown(lastName, { key: 'Enter', code: 'Enter' })
  const email = getByTestId('Email')
  expect(email).toBeTruthy()

  fireEvent.change(email, { target: { value: 'testgoogle.com' } })
  fireEvent.keyDown(email, { key: 'Enter', code: 'Enter' })
  expect(email.style.outline).toBe('1px solid red')
})
