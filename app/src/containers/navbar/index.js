import React from 'react'
import { ToolHeader, Tabs } from '@procore/core-react'

const NavBar = props => (
    <ToolHeader>
        <ToolHeader.Section>
            <ToolHeader.Icon />
            <ToolHeader.Header>List Header</ToolHeader.Header>
            <ToolHeader.Tabs>
            <Tabs.Tab variant="active">
                <Tabs.Link>Tab With Text</Tabs.Link>
            </Tabs.Tab>
            <Tabs.Tab>
                <Tabs.Link>Tab With Text</Tabs.Link>
            </Tabs.Tab>
            <Tabs.Tab>
                <Tabs.Link>Tab With Text</Tabs.Link>
            </Tabs.Tab>
            </ToolHeader.Tabs>
        </ToolHeader.Section>
    </ToolHeader>
)


export default NavBar
