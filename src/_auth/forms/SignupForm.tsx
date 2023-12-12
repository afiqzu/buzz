import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast.ts'
import { useForm } from 'react-hook-form'
import { SignupValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader.tsx'
import { Link, useNavigate } from 'react-router-dom'
import {
  useCreateUserAccount,
  useSignInAccount,
} from '@/lib/react-query/queriesAndMutations.ts'
import { useUserContext } from '@/context/AuthContext.tsx'

export const SignupForm = () => {
  const { toast } = useToast()
  const { checkAuthUser } = useUserContext()
  const navigate = useNavigate()
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount()
  const { mutateAsync: signInAccount } = useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)

    if (!newUser) {
      return toast({ title: 'Sign up failed. Please try again.' })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' })
    }

    const isLoggedIn = await checkAuthUser()
    if (isLoggedIn) {
      form.reset()
      navigate('/')
    } else {
      toast({ title: 'Sign in failed. Please try again.' })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex gap-1 m-0 p-0">
          <img
            src="/assets/images/buzz_logo.png"
            alt="logo"
            height={30}
            width={34}
          />
          <p className="text-3xl text-primary-500 m-0">buzz</p>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-5">
          Create a new account
        </h2>
        <p className="text-dark-3 small-medium md:base-regular mt-2">
          To use Buzz, please enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader />
                Creating account...
              </div>
            ) : (
              'Sign up'
            )}
          </Button>
          <p className="text-small-regular text-dark-3 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-tertiary-500 text-small-semibold ml-2"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
