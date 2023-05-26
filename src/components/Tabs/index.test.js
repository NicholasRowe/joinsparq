import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs from '../Tabs'

describe('Tabs component', () => {
  const dummyData = [
    {
      title: 'Tab A',
      content: <p>Tab A content</p>,
    },
    {
      title: 'Tab B',
      content: <p>Tab B content</p>,
    },
  ]

  it('renders the first tab on mount', () => {
    const { getAllByTestId } = render(<Tabs data={dummyData} />)

    expect(getAllByTestId('tab-panel')[0]).toBeVisible()
    expect(getAllByTestId('tab-panel')[1]).not.toBeVisible()
  })

  it('updates the visible tab panel on tab click', async () => {
    const { getAllByTestId } = render(<Tabs data={dummyData} />)

    await userEvent.click(getAllByTestId('tab')[1])

    expect(getAllByTestId('tab-panel')[0]).not.toBeVisible()
    expect(getAllByTestId('tab-panel')[1]).toBeVisible()
  })
})
