import { useContext, useEffect } from "react";

import { Can } from "../components/Can";
import { useCan } from "../hooks/useCan";
import { api } from "../services/apiClient";
import { setupApiClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext);

  // const userCanSeeMetrics = useCan({
  //   permissions: ["metrics.list"],
  // });

  useEffect(() => {
    api.get("/me")
      .then(response => console.log(response))
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      {/* {userCanSeeMetrics && <div>Métricas</div>} */}
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response);

  return {
    props: {}
  }
})