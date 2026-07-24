import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";

import { REGISTER_MUTATION } from "../graphql/mutations/authMutation";

export default function useRegister() {
  const navigate = useNavigate();

  const [registerMutation, { loading, error }] =
    useMutation(REGISTER_MUTATION);

  const registerUser = async (formData) => {
    await registerMutation({
      variables: {
        input: formData,
      },
    });

    navigate("/login");
  };

  return {
    registerUser,
    loading,
    error,
  };
}