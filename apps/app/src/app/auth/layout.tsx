export type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="h-screen flex justify-center items-center">{children}</div>;
};

// eslint-disable-next-line import/no-default-export
export default AuthLayout;
