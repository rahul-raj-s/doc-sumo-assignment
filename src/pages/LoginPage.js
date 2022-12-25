import { Input, Button } from "../components";
import { useForm } from "../hooks";
import { DocSumoLogo, Spinner } from "../assets";
import { useLoginMutation } from "../services/apiService";

const emailRegex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/

export const LoginPage = () => {
  const form = useForm({
    initialState: {
      email: "",
      password: "",
    },
    validator: (values) => validateForm(values),
    onSubmit: (values) => login({ formData: values }),
    stateChangeCallBack: () => { // Reset the form state once any change happens
      if (loginError) {
        reset();
      }
    },
  });

  // Share the data across the page
  const [login, { error: loginError, isLoading: isLogging, reset }] =
    useLoginMutation({
      fixedCacheKey: "shared-sso-data",
    });

  const validateForm = (values) => {
    let errors = {};

    if (!values.email || !emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  return (
    <div className="login-layout">
      <div className="login-container">
        <div>
          <a className="logo">
            <img src={DocSumoLogo} />
          </a>
        </div>
        <form className="login-form" onSubmit={form.submitForm}>
          <div>
            <h1 className="title">Login to your Docsumo account</h1>
            {loginError && (
              <div className="alert">{loginError?.data?.error}</div>
            )}
            <Input
              label="Work Email"
              placeholder="johndoe@abc.com"
              value={form.values.email}
              onChange={(e) =>
                form.setFieldValue("email", e.target.value.trim())
              }
              error={form.touched.email && form.errors.email}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password here..."
              value={form.values.password}
              onChange={(e) =>
                form.setFieldValue("password", e.target.value.trimStart())
              }
              error={form.touched.password && form.errors.password}
            />
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <div className="btn-wrapper">
              <Button disabled={isLogging} type="submit">
                {isLogging ? (
                  <>
                    <img src={Spinner} className="small-loader" />
                    Loggin In...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
            <p className="sign-up-text">
              Don't have an account? <a href="#">Sign Up</a>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
