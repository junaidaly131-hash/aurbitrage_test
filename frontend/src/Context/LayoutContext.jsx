import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const LayoutContext = createContext();
export const MEDIA_QUERY_WIDTH = 1400;

export const LayoutProvider = ({ children }) => {
  const [isTitleExpanded, setExpanded] = useState(false);
  const [isSidebarOpen, setOpen] = useState(
    window.innerWidth > MEDIA_QUERY_WIDTH,
  );

  const toggleSidebar = useCallback((value) => {
    setOpen(value);
  }, []);
  const toggleTitle = useCallback((value) => {
    setExpanded(value);
  }, []);

  const value = useMemo(() => {
    return {
      isSidebarOpen,
      toggleSidebar,
      toggleTitle,
      isTitleExpanded,
    };
  }, [isSidebarOpen, toggleSidebar, isTitleExpanded, toggleTitle]);
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
