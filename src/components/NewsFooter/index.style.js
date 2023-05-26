import styled from 'styled-components'
import { mq } from '@styles/vars/media-queries.style'
import { breakpoints } from '@styles/vars/breakpoints.style'
export const Wrapper = styled.div`
  padding: 20px 0;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
  margin-bottom: 110px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 24px;
`
export const PressText = styled.div`
  font-size: 30px;
  font-weight: 400;
  font-farmily: Plain;
  margin-bottom: 20px;
  text-align: center;
  ${mq.desk} {
    margin-bottom: 0;
    padding: 40px 0;
  }
`
export const Contact = styled.div`
  a {
    text-align: center;
    font-weight: 300;
    color: #0094ff;
  }
`
