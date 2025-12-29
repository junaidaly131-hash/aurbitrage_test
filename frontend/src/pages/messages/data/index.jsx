import DeleteIcon from "@/components/Icons/DeleteIcon";
import EditIcon from "@/components/Icons/EditIcon";
import ReplyIcon from "@/components/Icons/ReplyIcon";
import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  Smiley,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  // {
  //   index: 2,
  //   icon: <Phone />,
  // },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const CallLogs = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: false,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  },
];

const MembersList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
];

// const ChatList = [
//   {
//     id: 0,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "9:36",
//     unread: 0,
//     pinned: true,
//     online: true,
//   },
//   {
//     id: 1,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "12:02",
//     unread: 2,
//     pinned: true,
//     online: false,
//   },
//   {
//     id: 2,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "10:35",
//     unread: 3,
//     pinned: false,
//     online: true,
//   },
//   {
//     id: 3,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "04:00",
//     unread: 0,
//     pinned: false,
//     online: true,
//   },
//   {
//     id: 4,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "08:42",
//     unread: 0,
//     pinned: false,
//     online: false,
//   },
//   {
//     id: 5,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "08:42",
//     unread: 0,
//     pinned: false,
//     online: false,
//   },
//   {
//     id: 6,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "08:42",
//     unread: 0,
//     pinned: false,
//     online: false,
//   },
//   {
//     id: 7,
//     name: faker.name.firstName(),
//     msg: faker.lorem.sentence(5),
//     time: "08:42",
//     unread: 0,
//     pinned: false,
//     online: false,
//   },
// ];

const ChatList = [
  {
    userId: 11,
    msg: "Hi John",
    type: "msg",
    name: "Marshall Thomas",
    dealerName: "Jack Hunt",
    time: "2024-06-03T12:42:59.584Z",
  },
  {
    userId: 3,
    msg: "Hi John",
    type: "msg",
    name: "John Doe",
    dealerName: "Aurbitrage",
    time: "2024-06-03T12:42:52.925Z",
  },
  {
    userId: 2,
    msg: "Following up on the project",
    type: "msg",
    name: "Jahan Zaib",
    dealerName: "Jack Hunt",
    time: "2024-06-03T12:12:29.871Z",
  },
];
const Chat_History = [
  {
    type: "msg",
    message: "Hi Marshall 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Jahan, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

// const Chat_History = [
//   {
//     id: 4,
//     userId: 1,
//     receiverId: 11,
//     message: "Hi John",
//     asset: null,
//     type: "msg",
//     createdAt: "2024-06-03T12:42:59.584Z",
//     updatedAt: "2024-06-03T12:42:59.584Z",
//     outgoing: true,
//     incoming: false,
//   },
//   {
//     id: 6,
//     userId: 1,
//     receiverId: 11,
//     message: "Hey Marshall",
//     asset: null,
//     type: "msg",
//     createdAt: "2024-06-05T15:04:43.141Z",
//     updatedAt: "2024-06-05T15:04:43.141Z",
//     outgoing: true,
//     incoming: false,
//   },
//   {
//     id: 8,
//     userId: 1,
//     receiverId: 11,
//     message: "how is it going?",
//     asset: null,
//     type: "msg",
//     createdAt: "2024-06-05T15:24:22.754Z",
//     updatedAt: "2024-06-05T15:24:22.754Z",
//     outgoing: true,
//     incoming: false,
//   },
// ];

const Message_options = [
  {
    title: "Delete Message",
    icon: DeleteIcon,
  },
  {
    title: "React to message",
    icon: Smiley,
  },
  {
    title: "Reply",
    icon: ReplyIcon,
  },
  {
    title: "Edit Message",
    icon: EditIcon,
  },
];

const SHARED_LINKS = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
];

const SHARED_DOCS = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
];

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_DOCS,
  SHARED_LINKS,
  CallLogs,
  MembersList,
};
