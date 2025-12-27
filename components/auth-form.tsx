"use client";
import { Eye, EyeOff } from "lucide-react";
import { Activity, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/lib/actions/auth-actions";
import { formattedName, lowercaseEmailUsername } from "@/utils/formats";

export default function AuthForm() {
  const pathname = usePathname();
  const signInRoute = "/auth/sign-in";
  const signUpRoute = "/auth/sign-up";
  const router = useRouter();

  const formSchema = z
    .object({
      name:
        pathname === signUpRoute
          ? z.string().min(1, "This is a required field")
          : z.string().optional(),
      email: z.string().min(1, "This field is required").email(),
      password:
        pathname === signUpRoute
          ? z
              .string()
              .min(8, "Password must be at least 8 characters long")
              .regex(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .regex(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .regex(/[0-9]/, "Password must contain at least one number")
              .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least one special character"
              )
          : z.string().min(1, "Password is required"),
      confirmPassword:
        pathname === signUpRoute
          ? z.string().min(1, "Please confirm your password")
          : z.string().optional(),
    })
    .refine(
      (data) => !data.confirmPassword || data.password === data.confirmPassword,
      { message: "Passwords do not match", path: ["confirmPassword"] }
    );

  type FormFields = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onHandleEmailAuth(data: FormFields) {
    const { name, email, password } = data;
    let success = false;
    try {
      if (pathname === signInRoute) {
        const result = await signIn(lowercaseEmailUsername(email), password);
        if (!result.user) {
          setError("root", { message: "Invalid email or password" });
          return;
        } else {
          success = true;
        }
      } else {
        const result = await signUp(
          formattedName(name!),
          lowercaseEmailUsername(email),
          password
        );
        if (!result.user) {
          setError("root", { message: "Failed to create account" });
          return;
        } else {
          success = true;
        }
      }
    } catch (error) {
      setError("root", {
        message: `${error instanceof Error ? error.message : "Unknown Error"}`,
      });
    }

    if (success) {
      router.push("/dashboard");
    }
  }

  const buttontext = pathname === "/auth/sign-in" ? "Log in" : "Sign up";

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="flex-1 border-gray-600 border-t "></span>
        <span className="text-[0.75rem] text-gray-400">Or continue with</span>
        <span className="flex-1 border-t border-gray-600"></span>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onHandleEmailAuth)}
      >
        <Activity mode={errors.root ? "visible" : "hidden"}>
          <span className="text-red-500 text-[0.75rem]">
            {errors.root?.message}
          </span>
        </Activity>
        <Activity mode={pathname === signUpRoute ? "visible" : "hidden"}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-[0.75rem] ml-1 justify-between flex"
            >
              Name
            </label>
            <input
              {...register("name")}
              className="py-2.5 px-2 rounded-md bg-field-black border border-gray-600 placeholder:text-[0.84rem] placeholder:text-gray-400 text-[0.84rem]"
              type="text"
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
            />
            <Activity mode={errors.email ? "visible" : "hidden"}>
              <span className="text-red-500 text-[0.75rem]">
                {errors.name?.message}
              </span>
            </Activity>
          </div>
        </Activity>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-[0.75rem] ml-1 justify-between flex"
          >
            Email
          </label>
          <input
            {...register("email")}
            className="py-2.5 px-2 rounded-md bg-field-black border border-gray-600 placeholder:text-[0.84rem] placeholder:text-gray-400 text-[0.84rem]"
            type="text"
            id="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Activity mode={errors.email ? "visible" : "hidden"}>
            <span className="text-red-500 text-[0.75rem]">
              {errors.email?.message}
            </span>
          </Activity>
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-[0.75rem] ml-1 justify-between flex"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              {...register("password")}
              className="py-2.5 px-2 rounded-md bg-field-black border border-gray-600 placeholder:text-[0.84rem] placeholder:text-gray-400 text-[0.84rem] w-full"
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              autoComplete="password"
            />
            <button
              type="button"
              className="absolute right-2 top-3"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
            >
              {isPasswordVisible ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
            <Activity mode={errors.password ? "visible" : "hidden"}>
              <span className="text-red-500 text-[0.75rem]">
                {errors.password?.message}
              </span>
            </Activity>
          </div>
        </div>
        <Activity mode={pathname === "/auth/sign-up" ? "visible" : "hidden"}>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirm-password"
              className="text-[0.75rem] ml-1 justify-between flex"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                {...register("confirmPassword")}
                className="py-2.5 px-2 rounded-md bg-field-black border border-gray-600 placeholder:text-[0.84rem] placeholder:text-gray-400 text-[0.84rem] w-full"
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirm-password"
                placeholder="Enter your password"
                autoComplete="confirm-password"
              />
              <button
                type="button"
                className="absolute right-2 top-3"
                onClick={() =>
                  setIsConfirmPasswordVisible((visible) => !visible)
                }
              >
                {isConfirmPasswordVisible ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
              <Activity mode={errors.confirmPassword ? "visible" : "hidden"}>
                <span className="text-red-500 text-[0.75rem]">
                  {errors.confirmPassword?.message}
                </span>
              </Activity>
            </div>
          </div>
        </Activity>
        <button
          type="submit"
          className="bg-btn-blue py-2.5 rounded-xl text-sm font-bold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : buttontext}
        </button>
        <div className="flex justify-between items-center">
          <Link
            href={pathname === signInRoute ? signUpRoute : signInRoute}
            className="text-[0.75rem] text-btn-blue"
          >
            {pathname === signInRoute ? "Sign up here" : "Sign in here"}
          </Link>
          <Activity mode={pathname === signUpRoute ? "hidden" : "visible"}>
            <p className="text-[0.75rem] text-btn-blue">Forgot password?</p>
          </Activity>
        </div>
      </form>
    </div>
  );
}
