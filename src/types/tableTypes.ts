interface ColumnDefinitionType {
  key: string;
  header: string;
  customRender?: CustomRender;
}
interface OtherColumnDefinition {
  Task: ColumnDefinitionType[];
  Event: ColumnDefinitionType[];
}

interface CustomRender {
  red: string;
  blue: string;
}

export type { ColumnDefinitionType, OtherColumnDefinition, CustomRender };
