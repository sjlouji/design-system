import { describe, it, expect } from 'vitest'
import { render, screen } from '@/lib/test-utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card'

describe('Card', () => {
  it('renders title', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>My Card</CardTitle>
        </CardHeader>
      </Card>
    )
    expect(screen.getByText('My Card')).toBeInTheDocument()
  })

  it('renders content', () => {
    render(
      <Card>
        <CardContent>Card body content</CardContent>
      </Card>
    )
    expect(screen.getByText('Card body content')).toBeInTheDocument()
  })

  it('renders all sub-components together', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
