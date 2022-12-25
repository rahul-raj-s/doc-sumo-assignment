import { Route, Routes, Navigate } from "react-router-dom";
import { LoginPage, UserPage } from "./pages";

export const UnAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="user" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/user" />} />
      </Route>
    </Routes>
  );
};
