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
import { SigninValidation } from '@/lib/validation'
import Loader from '@/components/shared/Loader.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations.ts'
import { useUserContext } from '@/context/AuthContext.tsx'

export const SigninForm = () => {
  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
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
        <h2 className="h3-bold md:h2-bold pt-0 sm:pt-5">
          Log in to your account
        </h2>
        <p className="text-dark-3 small-medium md:base-regular mt-2">
          Welcome to Buzz!
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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
            {isUserLoading || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
          <p className="text-small-regular text-dark-3 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-tertiary-500 text-small-semibold ml-2"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
