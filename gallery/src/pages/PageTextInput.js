import React from 'react'
import styled from 'styled-components'
import { Field, TextInput } from '@1hive/1hive-ui'
import Page from 'comps/Page/Page'
import Container from 'comps/Page/DemoContainer'
import readme from 'ui-src/components/Input/TextInput.md'

const DemoHeader = styled.h4`
  padding: 15px;
`

const PageTextInput = ({ title }) => (
  <Page title={title} readme={readme}>
    <Page.Demo>
      <DemoHeader>TextInputs</DemoHeader>
      <Container>
        <div>
          <TextInput placeholder="TextInput" type="text" />
        </div>
        <div>
          <TextInput readOnly type="text" value="Readonly" />
        </div>
        <div>
          <TextInput disabled type="text" value="Disabled" />
        </div>
      </Container>
      <Container>
        <div>
          <TextInput
            error
            errorText="A custom error message"
            type="text"
            value="Wrong value"
          />
        </div>
      </Container>

      <DemoHeader>TextInput.Number</DemoHeader>
      <Container>
        <div>
          <TextInput.Number placeholder="Number" />
        </div>
      </Container>
    </Page.Demo>
  </Page>
)

export default PageTextInput
