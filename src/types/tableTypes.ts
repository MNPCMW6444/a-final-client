interface ColumnDefinitionType {
  key: string;
  header: string;
}
interface OtherColumnDefinition {
  Task: ColumnDefinitionType[];
  Event: ColumnDefinitionType[];
}

interface CustomRender {
  Red: string;
  Blue: string;
}

export type { ColumnDefinitionType, OtherColumnDefinition, CustomRender };
