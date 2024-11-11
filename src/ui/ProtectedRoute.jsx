import React, { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticatged
  const { user, isLoading, isAuthenticated } = useUser();

  //3. if no auth user, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/Login");
    },
    [isLoading, isAuthenticated, navigate]
  );

  //2. while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
