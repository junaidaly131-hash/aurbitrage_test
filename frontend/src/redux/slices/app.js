import { createSlice } from "@reduxjs/toolkit";

// define initial state
const initialState = {
  sidebar: {
    open: false,
    type: "CHAT",
  },
  chat: {
    selectedChatId: null,
    selectedConversation: null, // conversation object with `id`, `name`, `dealer`, `online`, etc.
  },
};

// create slice
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle sidebar
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    setSelectedChatId(state, action) {
      state.chat.selectedChatId = action.payload.chatId;
    },
    setSelectedConversation(state, action) {
      state.chat.selectedConversation = action.payload.conversation;
    },
    updateSelectedConversationOnlineStatus(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.online = action.payload.online;
      }
    },
    setMessageType(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.type = action.payload.type;
      }
    },
    setMessageId(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.msgId = action.payload.msgId;
      }
    },
    setMessageText(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.msg = action.payload.msg;
      }
    },
    setMessageImage(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.img = action.payload.img;
      }
    },
    setRepliedMsgName(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.name = action.payload.name;
      }
    },
    setPayload(state, action) {
      if (state.chat.selectedConversation) {
        state.chat.selectedConversation.payload = action.payload.payload;
      }
    },
    resetChatStore(state) {
      return initialState;
    },
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch) => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
}

export function SetSelectedChatId(chatId) {
  return async (dispatch) => {
    dispatch(slice.actions.setSelectedChatId({ chatId }));
  };
}

export function SetSelectedConversation(conversation) {
  return async (dispatch) => {
    dispatch(slice.actions.setSelectedConversation({ conversation }));
  };
}

export function UpdateSelectedConversationOnlineStatus(online) {
  return async (dispatch) => {
    dispatch(slice.actions.updateSelectedConversationOnlineStatus({ online }));
  };
}
export function setMessageType(type) {
  return async (dispatch) => {
    dispatch(slice.actions.setMessageType({ type }));
  };
}

export function setMessageId(msgId) {
  return async (dispatch) => {
    dispatch(slice.actions.setMessageId({ msgId }));
  };
}

export function setMessageText(msg) {
  return async (dispatch) => {
    dispatch(slice.actions.setMessageText({ msg }));
  };
}

export function setMessageImage(img) {
  return async (dispatch) => {
    dispatch(slice.actions.setMessageImage({ img }));
  };
}

export function setRepliedMsgName(name) {
  return async (dispatch) => {
    dispatch(slice.actions.setRepliedMsgName({ name }));
  };
}

export function ResetChatStore() {
  return async (dispatch) => {
    dispatch(slice.actions.resetChatStore());
  };
}

export function setPayload(payload) {
  return async (dispatch) => {
    dispatch(slice.actions.setPayload({ payload }));
  };
}
