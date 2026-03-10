export type ToolStatus = "planned" | "active";

export type ToolDefinition = {
  id: string;
  name: string;
  summary: string;
  status: ToolStatus;
  isIntegrated?: boolean;
  category: string;
  href?: string;
};
