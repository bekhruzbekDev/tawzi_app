import { useMemo, useState } from "react";
import { NotificationFilter, NotificationItem } from "./types";

export const useNotifications = () => {
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "To'lov muvaffaqiyatli",
      body: "Joriy billing oygi uchun 200.000 so'm to'lov qabul qilindi.",
      createdAt: "2024-11-20 09:12",
      isRead: false,
    },
    {
      id: "2",
      title: "Hisobingiz yangilandi",
      body: "Hisobingizga 50.000 so'm cashback qo'shildi.",
      createdAt: "2024-11-18 16:04",
      isRead: true,
    },
    {
      id: "3",
      title: "Yangi tarif taklifi",
      body: "Siz uchun mos bo'lgan yangi tarif paketini ko'rib chiqing.",
      createdAt: "2024-11-15 11:30",
      isRead: false,
    },
  ];

  const filteredNotifications = useMemo(() => {
    if (filter === "all") return notifications;
    if (filter === "read") return notifications.filter((item) => item.isRead);
    return notifications.filter((item) => !item.isRead);
  }, [filter]);

  return { data: filteredNotifications, filter, setFilter };
};
