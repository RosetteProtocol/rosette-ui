import React from 'react'
import { Field, TextInput } from '@1hive/1hive-ui'

import Page from 'comps/Page/Page'
import Container from '../components/Page/DemoContainer'
import readme from 'ui-src/components/Field/README.md'

const PageField = ({ title }) => (
  <Page title={title} readme={readme}>
    <Page.Demo>
      <Container>
        <div>
          <Field label="Enter name here:">
            <TextInput />
          </Field>
        </div>
      </Container>
      <Container>
        <div>
          <Field label="Enter name here:">
            <TextInput required />
          </Field>
        </div>
      </Container>
      <Container>
        <Field label="Enter number" error>
          <TextInput
            readOnly
            value="213123"
            error
            errorText="Provide a valid input"
          />
        </Field>
      </Container>
    </Page.Demo>
  </Page>
)

export default PageField
