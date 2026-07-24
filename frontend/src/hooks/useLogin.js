import { useMutation } from "@apollo/client/react";
import { useDispatch } from "react-redux";
import { LOGIN_MUTATION } from "../graphql/mutations/authMutation";
import { login } from "../redux/authSlice";

export default function useLogin() {
  const dispatch = useDispatch();
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const loginUser = async (email, password) => {
    const { data } = await loginMutation({
      variables: {
        input: {
          email: String(email || "").trim(),
          password: String(password || "").trim(),
        },
      },
    });

    if (data?.login?.accessToken && data?.login?.user) {
      dispatch(
        login({
          user: data.login.user,
          token: data.login.accessToken,
        })
      );
    }
    return data?.login;
  };

  return {
    loginUser,
    loading,
    error,
  };
}
