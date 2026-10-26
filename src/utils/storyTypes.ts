export const WRITTEN_STORY = "Written Story";
export const ILLUSTRATED_STORY = "Illustrated";

// Older mobile app releases submitted the dropdown labels instead of the values
const legacyStoryTypes: Record<string, string> = {
  "write story": WRITTEN_STORY,
  "written story": WRITTEN_STORY,
  "upload story file": ILLUSTRATED_STORY,
  "illustrated": ILLUSTRATED_STORY,
};

export const normalizeStoryType = (type: string | null | undefined): string =>
  legacyStoryTypes[(type ?? "").trim().toLowerCase()] ?? (type || "Unknown");

export const STATUS_PENDING = "pending";
export const STATUS_APPROVED = "approved";
export const STATUS_REJECTED = "rejected";

export const isReviewStatus = (status: unknown): status is "approved" | "rejected" | "pending" =>
  status === STATUS_APPROVED || status === STATUS_REJECTED || status === STATUS_PENDING;
