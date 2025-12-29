import { SendBtn, Table, Error, RefreshBtn, ErrorWrapper } from "./styles";
import SendIcon from "@/components/Icons/SendIcon";
import { useEffect, useMemo } from "react";
import useGetPeople from "../../Hooks/useGetPeople";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  SetSelectedChatId,
  SetSelectedConversation,
  UpdateSidebarType,
} from "@/redux/slices/app";
import UserProfile from "./UserProfile";
import ContactInfo from "./ContactInfo";
import Links from "./Links";
import { Skeleton } from "@mui/material";
import { useDealers } from "@/Context/DealerContext";

export const Peoples = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { peoples } = useDealers();
  const { loading, error, data, getPeople } = peoples;

  useEffect(() => {
    getPeople(id);
  }, [id, getPeople]);

  const handleChat = (user) => () => {
    dispatch(SetSelectedChatId(user.id));
    dispatch(
      SetSelectedConversation({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        dealer: user.dealerName,
        chatType: "direct",
      }),
    );
    dispatch(UpdateSidebarType("CHAT"));
    navigate("/dashboard/messages");
  };
  const handelclick = () => {
    getPeople(id);
  };

  const tableData = useMemo(() => {
    return loading ? [0, 1, 2, 3] : data;
  }, [loading, data]);

  const skeletonRows = useMemo(() => {
    return Array(4)
      .fill()
      .map((_, i) => (
        <tr key={`skeleton-${i}`}>
          <td>
            <Skeleton height={48} />
          </td>
          <td>
            <Skeleton height={48} />
          </td>
          <td>
            <Skeleton height={48} />
          </td>
          <td>
            <Skeleton height={48} />
          </td>
          <td>
            <Skeleton height={48} />
          </td>
        </tr>
      ));
  }, []);

  if (error) {
    return (
      <ErrorWrapper>
        <Error>{error}</Error>
        <RefreshBtn onClick={handelclick}>Try Again</RefreshBtn>
      </ErrorWrapper>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th>Reason</th>
          <th>Contact Info</th>
          <th>Social Media</th>
        </tr>
      </thead>

      <tbody>
        {loading
          ? skeletonRows
          : tableData.map((user, i) => {
              return (
                <tr key={`${i + 1}`}>
                  <td>
                    <UserProfile user={user} />
                  </td>
                  <td>{user.subtitle}</td>
                  <td>
                    <ContactInfo user={user} index={i} />
                  </td>
                  <td>
                    <Links user={user} />
                  </td>
                  <td>
                    <SendBtn
                      variant="contained"
                      color="secondary"
                      disabled={user.status === "external"}
                      onClick={handleChat(user)}
                    >
                      <span>Message</span> <SendIcon />
                    </SendBtn>
                  </td>
                </tr>
              );
            })}
      </tbody>
    </Table>
  );
};

export default Peoples;
