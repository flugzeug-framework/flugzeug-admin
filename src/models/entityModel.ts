export interface Attribute {
  type: string;
  fieldName: string;
  allowNull: boolean;
  values?: string[];
  validate?: any;
  references?: {
    key: string;
    model: string;
  };
}

export interface SchemaModel {
  [key: string]: Attribute;
}

export interface EntityModel {
  [key: string]: any;
}
