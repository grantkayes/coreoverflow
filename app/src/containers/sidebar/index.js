import React from 'react'
import { Page, Box, Sidebar, Button } from '@procore/core-react'

const SideBar = props => (
  <div id='sidebar'>
    <Page.Sidebar>
      <Sidebar.Content>
        <Sidebar.Panel>
          <Box margin='none lg sm lg'>
            <Button icon='create' size='block' onClick={props.toggleModal}>
              Post a Question
            </Button>
          </Box>

          <Box margin='none lg sm lg'>
            <Button icon='view-list' size='block' onClick={props.changePage}>
              My Questions
            </Button>
          </Box>
        </Sidebar.Panel>
      </Sidebar.Content>
    </Page.Sidebar>
  </div>
)

export default SideBar