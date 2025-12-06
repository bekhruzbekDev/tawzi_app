export type NotificationFilter = "all" | "unread" | "read";

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
};
