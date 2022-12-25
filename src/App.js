import { UnAuthenticatedRoutes, AuthenticatedRoutes } from "./Routes";
import { useLoginMutation } from "./services/apiService";
import { useLocation, Outlet, UNSAFE_DataRouterContext } from "react-router-dom";

function App() {
  const location = useLocation();
  const [, { data: userData }] = useLoginMutation({
    fixedCacheKey: "shared-sso-data",
  });


  return (
    <div className="App">
      {/* {userData?.data ? <h1>Authenticated</h1> : <h1>UnAuthenticated</h1>} */}
      {userData?.data ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
    </div>
  );
}

export default App;
