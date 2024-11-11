import PageNav from "../components/PageNav";
import Loader from "../components/Loader";
import { Outlet, useNavigation } from "react-router-dom";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      {isLoading && <Loader />}

      <PageNav />

      <div className="overflow-scroll">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
