import useGetUsers from "@/pages/messages/hooks/useGetUsers";
import useGetDealers from "@/pages/messages/hooks/useGetDealers";
import List from "./List";
import { useEffect, useMemo } from "react";
import Fuse from "fuse.js";

const NewChat = ({
  toggleCheck,
  checked,
  setGroupMembers,
  search,
  compare,
  post = {},
}) => {
  const { users, loading } = useGetUsers("?all=true");
  const { dealers, loading: dealersLoading } = useGetDealers();

  const filteredDealers = dealers.filter((dealer) => {
    //Filtering out the dealers that have no users associated
    if (dealer.type === "dealer") {
      return dealers.some(
        (user) => user.type === "user" && user.dealerName === dealer.name,
      );
    }
    return true;
  });

  const fuse = useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 100,
      keys: ["name"],
    };
    return new Fuse([...users, ...filteredDealers], fuseOptions);
  }, [users]);
  const postUser = users.find((user) => user.userId === post.userId);
  const filterUsers = search
    ? fuse.search(search).map((result) => result.item)
    : [
        { ...postUser, owner: true },
        ...users.filter((user) => user.userId !== post.userId),
      ].filter(Boolean);

  const searchedDealers = search ? [] : filteredDealers;

  useEffect(() => {
    if (checked[0]?.type && checked[0]?.type == "dealer") {
      let groupMembers = dealers.filter(
        (item) => item.dealerName === checked[0].name,
      );
      setGroupMembers(groupMembers);
    }
  }, [checked]);

  return (
    <>
      <List
        toggleCheck={toggleCheck}
        checked={checked}
        chats={filterUsers}
        groups={searchedDealers}
        loading={loading}
        compare={compare}
      />
    </>
  );
};

export default NewChat;
