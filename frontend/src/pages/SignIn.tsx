import React from 'react';
import SignInForm from "../components/forms/signIn";
interface Props {}

const SignIn: React.FC<Props> = () => (
  <div className={'center'}>
    <SignInForm />
  </div>
);

export default SignIn;