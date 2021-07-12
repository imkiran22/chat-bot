import React from 'react'
import { render } from '../../../test/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { Button } from './Button'

test('renders a button component', () => {
  const { getByTestId } = render(
    <Button text={'Test'} id={'22'} onClick={() => {}} />
  )
  expect(getByTestId('22').textContent).toBe('Test')
})
