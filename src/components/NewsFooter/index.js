import React from 'react'
import Container from '@components/Container'
import { Wrapper, PressText, Contact } from './index.style'
function index() {
  return (
    <Container>
      <Wrapper>
        <PressText>Press Contacts</PressText>
        <Contact>
          <div>Press Team @ SPARQ </div>
          <a href="mailto:press@joinsparq.com">press@joinsparq.com</a>
        </Contact>
      </Wrapper>
    </Container>
  )
}

export default index
