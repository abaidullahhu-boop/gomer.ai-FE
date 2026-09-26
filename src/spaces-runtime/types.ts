/** Frontend mirror of the backend AppSpec contract (src/spaces/spec/app-spec.ts). */

export type FieldType =
  | "string"
  | "text"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "reference";

export interface FieldSpec {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  refEntity?: string;
}

export interface EntitySpec {
  name: string;
  label: string;
  fields: FieldSpec[];
}

export interface FormViewSpec {
  type: "form";
  title: string;
  entity: string;
  fields?: string[];
}

export interface TableViewSpec {
  type: "table";
  title: string;
  entity: string;
  columns?: string[];
}

export interface DashboardWidgetSpec {
  kind: "count" | "sum" | "list";
  label: string;
  entity: string;
  field?: string;
}

export interface DashboardViewSpec {
  type: "dashboard";
  title: string;
  widgets: DashboardWidgetSpec[];
}

export type ViewSpec = FormViewSpec | TableViewSpec | DashboardViewSpec;

export interface AppSpec {
  name: string;
  description?: string;
  entities: EntitySpec[];
  views: ViewSpec[];
  auth: { mode: "magic-link"; allowSignup: boolean };
}

/** An app rendered from its spec, or a page Gaspo wrote as a whole HTML document. */
export type SpaceKind = "app" | "page";

export interface PublicSpace {
  slug: string;
  name: string;
  kind: SpaceKind;
  spec: AppSpec;
}

/** A page's HTML and what it has saved, served once the viewer is signed in. */
export interface PageDocument {
  html: string;
  state: Record<string, unknown>;
}

export interface SpaceRecord {
  id: string;
  entityName: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SpaceSession {
  token: string;
  user: { id: string; email: string; name: string | null };
}
