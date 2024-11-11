import { useMutation } from "@tanstack/react-query";
import { signup as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
  const {
    mutate: signup,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: ({ email, fullName, password }) =>
      signUpApi({ email, fullName, password }),
    onSuccess: (data) => {
      console.log(data.user);
      toast.success(
        "user signed-up successfully, Please verify the new account on the user's email adress."
      );
    },
  });
  return { isSigningUp, error, signup };
}
