import { describe, it, expect } from "vitest"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import userEvent from "@testing-library/user-event"
import { render, screen, waitFor } from "@/lib/test-utils"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./index"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
})

type LoginValues = z.infer<typeof loginSchema>

function TestLoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  )
}

describe("Form", () => {
  it("renders the form", () => {
    render(<TestLoginForm />)
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument()
  })

  it("renders field labels", () => {
    render(<TestLoginForm />)
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Password")).toBeInTheDocument()
  })

  it("shows validation errors on submit with empty fields", async () => {
    const user = userEvent.setup()
    render(<TestLoginForm />)

    await user.click(screen.getByRole("button", { name: "Sign in" }))

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("Password must be at least 8 characters.")
      ).toBeInTheDocument()
    })
  })

  it("does not show errors when form is first rendered", () => {
    render(<TestLoginForm />)
    expect(
      screen.queryByText("Please enter a valid email address.")
    ).not.toBeInTheDocument()
  })
})
