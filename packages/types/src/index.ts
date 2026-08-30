export type ReportStatus =
  | "reported"
  | "visible"
  | "in_rescue"
  | "resolved";

export type UserRole = "reporter" | "rescuer" | "admin";

/** How the person is known to the system. Guests never register (ADR-004). */
export type IdentityKind = "anonymous" | "registered";

export interface Report {
  id: string;
  title: string;
  city: string;
  department: string;
  neighborhood: string;
  lat: number;
  lng: number;
  status: ReportStatus;
  createdAt: string;
  photoUrl?: string;
  /** Session owner. Absent in v0 mocks; set for every v1 report (anon or registered). */
  authorId?: string;
}

export interface User {
  id: string;
  identity: IdentityKind;
  role: UserRole;
  /** Guests have none until they opt in. */
  displayName?: string;
  /** Null/absent until they link email (magic link) or register as rescuer. */
  email?: string;
}

export interface LearnArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
}
