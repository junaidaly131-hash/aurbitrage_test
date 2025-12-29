import profileDropDown from "./assets/profile-dropdown.png";
import profileAddUser from "./assets/profile-add-user.png";
import profileAddUserTab from "./assets/profile-add-user-tab.png";
import messageSidebar from "./assets/message-sidebar.png";
import messagActionBar from "./assets/message-action-bar.png";
import newChat from "./assets/new-chat.png";
import newConverstation from "./assets/new-conversation.png";
import messageInput from "./assets/message-input.png";
import newGroup from "./assets/new-group.png";
import confirmGroup from "./assets/confirm-group.png";
import confirmGroupFilled from "./assets/confirm-group-filled.png";
import newGroupConversation from "./assets/new-group-conversation.png";
const HelpQuestions = [
  {
    question: "How can I add more users to my account?",
    answer: [
      {
        text: "Click the drop-down arrow next to your profile picture, then click User Profile.",
        image: profileDropDown,
      },
      {
        text: "Click on the link on the far-right labeled “Add Users.",
        image: profileAddUser,
      },
      {
        text: "Enter the email address and name of the user you would like to add in the appropriate fields. Once complete, click the Add Users button on the bottom right.",
        image: profileAddUserTab,
      },
      {
        text: "The user’s email will appear under the Invited Users section, confirming they have been invited. That new user will immediately receive an email with a link for them to set up an account on Aurbitrage.",
      },
      {
        text: "If you would like to add more than one user, please repeat step 3 and the users will continue to appear under the Invited Users section.",
      },
    ],
  },
  {
    question:
      "How can I start a chat with someone using the messenger service?",
    answer: [
      {
        text: "Click on the Messages section on the left sidebar.",
        image: messageSidebar,
      },
      {
        text: `You are now in the messenger application. On the left side of the application, there will be a column that shows your recent chats, as well as options to filter existing chats or create new ones. 

        To start a chat with an individual, click the left of the three icons that has a + inside of a text bubble on the top left, above the All filter.`,
        image: messagActionBar,
      },
      {
        text: "Next, search the member’s name in the search box, or scroll through the list of members to find the person you are looking for.",
        image: newChat,
      },
      {
        text: "Once you have located the person you would like to begin to chat with, click on their name and a chat window will populate on the right side of the application. The member’s name will appear on the top left side of the chat window, and the company they work for will be listed on the top middle of the chat window",
        image: newConverstation,
      },
      {
        text: "Begin typing in the text box on the bottom of the window! Enhance your chat by using emojis or including pictures from your computer. Emojis can be inserted by clicking the smiley face next to the send button, and pictures can be added by clicking the link button to the left of the text box. Press the enter button on your keyboard to send a message, or click the yellow send button on the right side of the text box. ",
        image: messageInput,
      },
    ],
  },
  {
    question:
      "How can I chat with a group of people using the messenger service?",
    answer: [
      {
        text: "Click on the Messages section on the left sidebar.",
        image: messageSidebar,
      },
      {
        text: `You are now in the messenger application. On the left side of the application, there will be a column that shows your recent chats, as well as options to filter existing chats or create new ones. 

                   To start a chat with a group, click the middle of the three icons that has two figures with a + on their right side, above the My Teams and Groups filters.`,
        image: messagActionBar,
      },
      {
        text: "Next, search the group’s name in the search box, or scroll through the list of groups and people to find the people you are looking for. Once you find the group you’d like to chat with, click on their name with a single click. Their name should appear under the search bar in yellow font. To the right of their name should be the text Create Group in blue font. Click the Create Group link.",
        image: newGroup,
      },
      {
        text: "Once you have clicked Create Group, a new window will pop up confirming the chat, and will ask you to name the chat. You can simply copy and paste the Dealer’s name in that field, or create a customized name for your chat.",
        image: [confirmGroup, confirmGroupFilled],
      },
      {
        text: "When you have entered a name for the chat, a Yes button will appear. Be aware that you must name the group before the Yes button will appear. Click Yes and the group will appear as the most recent chat on the left side of the application, click on that and you have entered the group chat! Note that you have to click on the group chat on the left before it will populate on the right side of your screen. ",
      },
      {
        text: "The chat will now appear with the group name on the left side of the application, while a group of three figures will be on the top right side of the application, indicating it is a group chat.",
        image: newGroupConversation,
      },
    ],
  },
];

export default HelpQuestions;
