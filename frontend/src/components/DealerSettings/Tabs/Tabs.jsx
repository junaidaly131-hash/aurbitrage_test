import { forwardRef } from "react";
import { DEALERS_TABS } from "@/constants/dealer-tabs";
import { Tab, TabsWrapper } from "./styles";

export const Tabs = forwardRef(({ onChange, active, ...rest }, ref) => {
  return (
    <TabsWrapper ref={ref} {...rest}>
      {DEALERS_TABS.map((t) => (
        <Tab
          variant="contained"
          active={active === t}
          key={t}
          onClick={() => onChange(t)}
        >
          {t}
        </Tab>
      ))}
    </TabsWrapper>
  );
});

Tabs.displayName = "Tabs";
