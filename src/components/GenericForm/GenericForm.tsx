import { Item } from "../../types/dataTypes";

interface GenericFormProps {
  closeForm: () => void;
  item?: Item;
}

export default function GenericForm({ closeForm, item }: GenericFormProps) {
  return <div>GenericForm</div>;
}
