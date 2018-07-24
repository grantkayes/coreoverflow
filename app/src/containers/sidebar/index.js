import React from 'react'
import { Page, Box, Button } from '@procore/core-react'

function Sidebar() {
  return (
    <div style={{ height: '600px' }}>
      <Page.Sidebar>
        <Sidebar.Content>
          <Sidebar.Panel>
            <Box margin="none lg sm lg">
              <Button icon="create" size="block">
                Create Submittal
              </Button>
            </Box>

            <Box margin="none lg sm lg">
              <Button icon="create" size="block">
                Create Package
              </Button>
            </Box>

            <Sidebar.Divider />
          </Sidebar.Panel>

          <Sidebar.Panel>
            <Sidebar.PanelTitle>
              <Sidebar.Header>Submittal Reports</Sidebar.Header>
              <Sidebar.HeaderAction>+ New</Sidebar.HeaderAction>
            </Sidebar.PanelTitle>

            <Sidebar.Menu>
              <Sidebar.MenuItem>
              Submittal Approver's Response Time
              </Sidebar.MenuItem>
              <Sidebar.MenuItem active>
                Custom Order
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                Custom Report
              </Sidebar.MenuItem>
            </Sidebar.Menu>

            <Sidebar.Divider />
          </Sidebar.Panel>

          <Sidebar.Panel>
            <Sidebar.PanelTitle>
              <Sidebar.Header>Training</Sidebar.Header>
            </Sidebar.PanelTitle>
            <Sidebar.InfoText>
              Learn how to use the submittals tool Learn how to use the submittals tool Learn how to use the submittals tool Learn how to use the submittals tool
            </Sidebar.InfoText>
          </Sidebar.Panel>
        </Sidebar.Content>
        <Sidebar.FooterButton>
          Minimize Sidebar
        </Sidebar.FooterButton>
      </Page.Sidebar>
    </div>
  )
}

export default Sidebar