import { useLoginMutation } from "../services/apiService";

export const UserPage = () => {
  const [, { data: userData }] = useLoginMutation({
    fixedCacheKey: "shared-sso-data",
  });

  return (
    <div>
      <h1>Hello {userData?.data?.user?.full_name}</h1>
    </div>
  );
};
