import styled from 'styled-components'
import {
  Tabs as ReachTabs,
  TabList as ReachTabList,
  Tab as ReachTab,
  TabPanels as ReachTabPanels,
  TabPanel as ReachTabPanel,
} from '@reach/tabs'
import { colors } from '../../styles/vars/colors.style'
import { easings } from '../../styles/vars/easings.style'

export const TabsMain = styled(ReachTabs)`
  position: relative;
`

export const TabList = styled(ReachTabList)`
  position: relative;
  display: inline-flex;
`

export const Tab = styled(ReachTab)`
  padding: 0.4rem ${props => `${props.pad / 10}rem`};
  cursor: pointer;
  border: none;
  background: ${colors.grey};
`

export const TabPanels = styled(ReachTabPanels)``

export const TabPanel = styled(ReachTabPanel)`
  padding-top: 2rem;
`

export const ActiveTabRect = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 0.2rem;
  background-color: ${colors.dark};
  transform-origin: 0% 50%;
  transition: transform 0.3s ${easings.inOut.default};
`
