import List from "./List";
import useGetChats from "@/pages/messages/hooks/useGetChats";
import { useMemo } from "react";
import Fuse from "fuse.js";

const Chats = ({ toggleCheck, checked, search, compare }) => {
  const { chats, loading } = useGetChats();

  const fuse = useMemo(() => {
    const fuseOptions = {
      includeScore: true,
      threshold: 0.3,
      tokenize: true,
      matchAllTokens: true,
      useExtendedSearch: true,
      distance: 10000,
      keys: ["name"],
    };
    return new Fuse(chats, fuseOptions);
  }, [chats]);

  const filterUsers = search
    ? fuse.search(search).map((result) => result.item)
    : chats;

  return (
    <List
      toggleCheck={toggleCheck}
      checked={checked}
      chats={filterUsers}
      loading={loading}
      compare={compare}
    />
  );
};

export default Chats;
