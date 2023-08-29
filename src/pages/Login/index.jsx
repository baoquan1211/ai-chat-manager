import React from "react";
import { login } from "../../services/Auth/index.js";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/authAction.js";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  // const loginQuery = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const error = useSelector((state) => state.auth.error);
  const queryClient = useQueryClient();
  // loginQuery.setMutationDefaults(["login"], {
  //   mutationFn: (loginInfo) => login(loginInfo),
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  // const loginMutation = useMutation({
  //   mutationKey: ["login"],
  // });
  const loginHandle = (event) => {
    event.preventDefault();
    dispatch(
      loginAction({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  //   const state = dehydrate(loginQuery);

  //   hydrate(loginQuery, state);

  //   console.log(loginMutation);
  //   console.log(loginQuery);
  useEffect(() => {
    // if (loginMutation.data?.access) {
    //   navigate("/");
    // }
    if (auth) {
      navigate("/");
      queryClient.invalidateQueries(["get-conversation"]);
    }
  });
  return (
    <form onSubmit={loginHandle} className="bg-background">
      <label htmlFor="username">Username</label>
      <input type="text" id="username" ref={usernameRef} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordRef} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
