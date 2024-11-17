const Login = () => {
  const handleRedirect = async () => {
    try {
      window.location.href =
        'https://b93b-94-254-130-39.ngrok-free.app/api/login';
    } catch (e) {
      console.error('error', e);
    }
  };

  return (
    <div>
      <div>Click button to redirect to /callback</div>
      <button onClick={() => handleRedirect()}>redirect</button>
    </div>
  );
};

export default Login;
