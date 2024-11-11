import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function SortBy() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  let topicSearch = "&";
  if (topicQuery) topicSearch = topicSearch + "topic=" + topicQuery;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <span
              onClick={() =>
                navigate(`/articles?sort_by=created_at&order=asc${topicSearch}`)
              }
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Old
            </span>
          </MenuItem>
          <MenuItem>
            <span
              onClick={() =>
                navigate(`/articles?sort_by=created_at${topicSearch}`)
              }
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              New
            </span>
          </MenuItem>
          <MenuItem>
            <span
              onClick={() =>
                navigate(`/articles?sort_by=votes&order=desc${topicSearch}`)
              }
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Most Likes
            </span>
          </MenuItem>

          <MenuItem>
            <span
              onClick={() =>
                navigate(`/articles?sort_by=votes&order=asc${topicSearch}`)
              }
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Least Likes
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
