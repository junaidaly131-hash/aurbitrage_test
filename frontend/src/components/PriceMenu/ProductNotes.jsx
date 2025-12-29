import { Clear } from "@mui/icons-material";
import { Back, Field, Group, SubMenu, SubMenuItem, Wrapper } from "./styles";

export default function ProductNotesMenu({ data, onBack }) {
  return (
    <Wrapper>
      <SubMenu>
        <Back onClick={onBack}>
          <Clear />
        </Back>
        <Group>
          <SubMenuItem>Bulk Discount</SubMenuItem>
          <Field>{data?.bulkDiscount}</Field>
        </Group>
        <Group>
          <SubMenuItem>Shipping Notes</SubMenuItem>
          <Field>{data?.shippingNote}</Field>
        </Group>
        <Group>
          <SubMenuItem>Product Notes</SubMenuItem>
          <Field>{data?.notes}</Field>
        </Group>
      </SubMenu>
    </Wrapper>
  );
}
