import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useLayoutEffect,
} from 'react'
import PropTypes from 'prop-types'
import {
  TabsMain,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  ActiveTabRect,
} from './index.style'
import { useTabsContext } from '@reach/tabs'
import { useRect } from '@reach/rect'

const Tabs = ({ data }) => {
  const Context = createContext()
  const tabPadding = 12

  function AnimatedTab({ index, pad, children }) {
    const { selectedIndex } = useTabsContext()
    const isSelected = selectedIndex === index

    // measure the size of our element, only listen to rect if active
    const tabRef = useRef()
    const rect = useRect(tabRef, { observe: isSelected })

    // get the style changing function from context
    const setActiveRect = useContext(Context)

    // callup to set styles whenever we're active
    useLayoutEffect(() => {
      if (isSelected) {
        setActiveRect(rect)
      }
    }, [isSelected, rect, setActiveRect])

    return (
      <Tab ref={tabRef} open={isSelected} pad={pad} data-testid="tab">
        {children}
      </Tab>
    )
  }

  function AnimatedTabs({ children }) {
    // some state to store the position we want to animate to
    const [activeRect, setActiveRect] = useState(null)
    const tabsListRef = useRef()
    const tabListRect = useRect(tabsListRef)

    return (
      // put the function to change the styles on context so an active Tab can call it, then style it up
      <Context.Provider value={setActiveRect}>
        <TabsMain>
          <TabList ref={tabsListRef}>
            {React.Children.toArray(
              data.map((tab, tabIndex) => (
                <AnimatedTab pad={tabPadding} index={tabIndex}>
                  {tab.title}
                </AnimatedTab>
              ))
            )}

            <ActiveTabRect
              style={{
                transform: `translateX(${
                  tabPadding +
                  (activeRect && activeRect.left) -
                  (tabListRect && tabListRect.left)
                }px) scaleX(${
                  (activeRect && activeRect.width - tabPadding * 2) /
                  (tabListRect && tabListRect.width)
                })`,
              }}
            />
          </TabList>

          {children}
        </TabsMain>
      </Context.Provider>
    )
  }

  return (
    <AnimatedTabs>
      <TabPanels>
        {React.Children.toArray(
          data.map((tab, tabIndex) => (
            <TabPanel data-testid="tab-panel">{tab.content}</TabPanel>
          ))
        )}
      </TabPanels>
    </AnimatedTabs>
  )
}

Tabs.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Tabs
