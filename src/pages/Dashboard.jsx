import { AtSymbolIcon } from "@heroicons/react/20/solid";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className=" text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Profile
            </h2>
          </div>
        </div>
        <div className=" gap-x-8 gap-y-12  sm:gap-y-16 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-6">
            <img
              alt=""
              src={user[0].avatar_url}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">
                {user[0].name}
              </h3>
              <p className="flex items-center gap-1 text-sm/6 font-semibold text-indigo-600">
                <AtSymbolIcon
                  aria-hidden="true"
                  className=" h-5 w-5 text-stone-700 "
                />
                {user[0].username}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
