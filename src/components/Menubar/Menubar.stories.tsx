import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  BoldIcon,
  CheckIcon,
  ClipboardIcon,
  CopyIcon,
  DownloadIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  MaximizeIcon,
  MinimizeIcon,
  MonitorIcon,
  PrinterIcon,
  RedoIcon,
  ScissorsIcon,
  SearchIcon,
  SidebarIcon,
  TrashIcon,
  UndoIcon,
  UnderlineIcon,
  UploadIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './Menubar'

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes on the root menubar container (the horizontal bar itself).',
    },
    children: {
      control: false,
      description: 'One or more MenubarMenu elements, each containing a MenubarTrigger and MenubarContent.',
    },
  },
} satisfies Meta<typeof Menubar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <FilePlusIcon />
            New File
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window
            <MenubarShortcut>⇧⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <UploadIcon />
            Open...
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <DownloadIcon />
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As...
            <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <PrinterIcon />
            Print...
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <UndoIcon />
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <RedoIcon />
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <ScissorsIcon />
            Cut
            <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <CopyIcon />
            Copy
            <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <ClipboardIcon />
            Paste
            <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <SearchIcon />
            Find
            <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <ZoomInIcon />
            Zoom In
            <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <ZoomOutIcon />
            Zoom Out
            <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <MaximizeIcon />
            Full Screen
            <MenubarShortcut>F11</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithCheckboxItems: Story = {
  render: () => {
    const [wordWrap, setWordWrap] = React.useState(true)
    const [lineNumbers, setLineNumbers] = React.useState(true)
    const [minimap, setMinimap] = React.useState(false)
    const [breadcrumbs, setBreadcrumbs] = React.useState(true)

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Editor</MenubarLabel>
            <MenubarCheckboxItem checked={wordWrap} onCheckedChange={setWordWrap}>
              Word Wrap
              <MenubarShortcut>⌥Z</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={lineNumbers} onCheckedChange={setLineNumbers}>
              Line Numbers
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={minimap} onCheckedChange={setMinimap}>
              Minimap
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarLabel>Interface</MenubarLabel>
            <MenubarCheckboxItem checked={breadcrumbs} onCheckedChange={setBreadcrumbs}>
              <SidebarIcon />
              Breadcrumbs
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}

export const WithRadioItems: Story = {
  render: () => {
    const [theme, setTheme] = React.useState('system')
    const [fontSize, setFontSize] = React.useState('medium')

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Preferences</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Theme</MenubarLabel>
            <MenubarRadioGroup value={theme} onValueChange={setTheme}>
              <MenubarRadioItem value="light">
                <MonitorIcon />
                Light
              </MenubarRadioItem>
              <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
              <MenubarRadioItem value="system">System Default</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarLabel>Font Size</MenubarLabel>
            <MenubarRadioGroup value={fontSize} onValueChange={setFontSize}>
              <MenubarRadioItem value="small">Small</MenubarRadioItem>
              <MenubarRadioItem value="medium">Medium</MenubarRadioItem>
              <MenubarRadioItem value="large">Large</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}

export const WithSubMenus: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <BoldIcon />
              Text Style
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>
                <BoldIcon />
                Bold
                <MenubarShortcut>⌘B</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <ItalicIcon />
                Italic
                <MenubarShortcut>⌘I</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <UnderlineIcon />
                Underline
                <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>
              <GlobeIcon />
              Language
            </MenubarSubTrigger>
            <MenubarSubContent>
              {['English', 'French', 'Spanish', 'German', 'Japanese'].map((lang) => (
                <MenubarItem key={lang}>{lang}</MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">
            <TrashIcon />
            Clear Formatting
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithDestructiveItem: Story = {
  name: 'Destructive Item Variant',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <CopyIcon />
            Duplicate
          </MenubarItem>
          <MenubarItem>
            <DownloadIcon />
            Export
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <FileTextIcon />
            Archive
          </MenubarItem>
          <MenubarItem variant="destructive">
            <TrashIcon />
            Delete permanently
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <UndoIcon />
            Undo
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            <RedoIcon />
            Redo
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>
            <ScissorsIcon />
            Cut
          </MenubarItem>
          <MenubarItem>
            <CopyIcon />
            Copy
          </MenubarItem>
          <MenubarItem disabled>
            <ClipboardIcon />
            Paste
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Insert</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarLabel>Content</MenubarLabel>
            <MenubarItem>Image</MenubarItem>
            <MenubarItem>Video</MenubarItem>
            <MenubarItem>File attachment</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Structure</MenubarLabel>
            <MenubarItem>Table</MenubarItem>
            <MenubarItem>Code block</MenubarItem>
            <MenubarItem>Divider</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarLabel>Interactive</MenubarLabel>
            <MenubarItem>Button</MenubarItem>
            <MenubarItem>Form</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const WithInsetItems: Story = {
  name: 'Inset Label Alignment',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Window</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel inset>Workspace</MenubarLabel>
          <MenubarItem inset>New Workspace</MenubarItem>
          <MenubarItem inset>Open Workspace...</MenubarItem>
          <MenubarSeparator />
          <MenubarLabel inset>Panels</MenubarLabel>
          <MenubarItem inset>
            <CheckIcon className="size-4 mr-1" />
            Terminal
          </MenubarItem>
          <MenubarItem inset>File Explorer</MenubarItem>
          <MenubarItem inset>Extensions</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}

export const BrowserMenubar: Story = {
  name: 'Browser-Style Menubar',
  render: () => {
    const [bookmarksBar, setBookmarksBar] = React.useState(true)
    const [statusBar, setStatusBar] = React.useState(false)
    const [encoding, setEncoding] = React.useState('utf8')

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Incognito Window
              <MenubarShortcut>⇧⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Open Recent</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>github.com/acme/app</MenubarItem>
                <MenubarItem>localhost:3000</MenubarItem>
                <MenubarItem>docs.example.com</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Clear History</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Close Tab
              <MenubarShortcut>⌘W</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Print...
              <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={bookmarksBar} onCheckedChange={setBookmarksBar}>
              Show Bookmarks Bar
              <MenubarShortcut>⇧⌘B</MenubarShortcut>
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
              Show Status Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem>
              <ZoomInIcon />
              Zoom In
              <MenubarShortcut>⌘+</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <ZoomOutIcon />
              Zoom Out
              <MenubarShortcut>⌘-</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              <MinimizeIcon />
              Reset Zoom
              <MenubarShortcut>⌘0</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <MaximizeIcon />
              Enter Full Screen
              <MenubarShortcut>^⌘F</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Developer</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  View Source
                  <MenubarShortcut>⌥⌘U</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Developer Tools
                  <MenubarShortcut>⌥⌘I</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>JavaScript Console</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Encoding</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value={encoding} onValueChange={setEncoding}>
              <MenubarRadioItem value="utf8">UTF-8</MenubarRadioItem>
              <MenubarRadioItem value="utf16">UTF-16</MenubarRadioItem>
              <MenubarRadioItem value="latin1">ISO-8859-1 (Latin-1)</MenubarRadioItem>
              <MenubarRadioItem value="ascii">ASCII</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
}

export const ShortcutsOnly: Story = {
  name: 'Shortcuts Showcase',
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Shortcuts</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Navigation</MenubarLabel>
          <MenubarItem>
            Go to Line
            <MenubarShortcut>⌃G</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Go to Symbol
            <MenubarShortcut>⇧⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarLabel>Editing</MenubarLabel>
          <MenubarItem>
            Select All
            <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Comment Line
            <MenubarShortcut>⌘/</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Format Document
            <MenubarShortcut>⇧⌥F</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarLabel>Terminal</MenubarLabel>
          <MenubarItem>
            New Terminal
            <MenubarShortcut>⌃`</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
