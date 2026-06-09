import type { Meta, StoryObj } from "@storybook/react-vite"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "./index"

const meta: Meta = {
  title: "Forms/Form",
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

// ---------------------------------------------------------------------------
// Default — Login form with zod validation
// ---------------------------------------------------------------------------

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
})

type LoginValues = z.infer<typeof loginSchema>

function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(values: LoginValues) {
    console.log("Login submitted:", values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={!!form.formState.errors.password}
                  {...field}
                />
              </FormControl>
              <FormDescription>Must be at least 8 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
  )
}

export const Default: Story = {
  render: () => <LoginForm />,
}

// ---------------------------------------------------------------------------
// ProfileForm — name + email + bio
// ---------------------------------------------------------------------------

const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(160, { message: "Bio must be 160 characters or fewer." }).optional(),
})

type ProfileValues = z.infer<typeof profileSchema>

function ProfileFormStory() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", bio: "" },
  })

  function onSubmit(values: ProfileValues) {
    console.log("Profile submitted:", values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jane Smith"
                  aria-invalid={!!form.formState.errors.name}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="jane@example.com"
                  aria-invalid={!!form.formState.errors.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tell us about yourself"
                  aria-invalid={!!form.formState.errors.bio}
                  {...field}
                />
              </FormControl>
              <FormDescription>Max 160 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save profile
        </Button>
      </form>
    </Form>
  )
}

export const ProfileForm: Story = {
  render: () => <ProfileFormStory />,
}
