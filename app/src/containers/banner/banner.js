import React from 'react'
import { ActionBanner, Button, Banner } from '@procore/core-react'

export const AlertBanner = props => {
    <ActionBanner>
      <Banner.Content>
        <Banner.Title>Action Required</Banner.Title>
        <Banner.Body>Your action is required.</Banner.Body>
      </Banner.Content>
      <Banner.Action>
        <Button variant="action-outline" onClick={() => alert('action clicked')} >
          Action
        </Button>
      </Banner.Action>
      <Banner.Dismiss onClick={() => alert('dismiss clicked')} />
    </ActionBanner>
}

export default AlertBanner;