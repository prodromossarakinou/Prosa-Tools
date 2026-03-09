export type ToolStatus = "planned" | "active";

export type ToolDefinition = {
  id: string;
  name: string;
  summary: string;
  status: ToolStatus;
  category: string;
  href?: string;
};
