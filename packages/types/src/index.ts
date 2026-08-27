export type ReportStatus =
  | "reported"
  | "visible"
  | "in_rescue"
  | "resolved";

export type UserRole = "reporter" | "rescuer" | "admin";

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
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
}

export interface LearnArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
}
