import { useEffect, useState } from "react";

interface Notification {
  id: number;
  type: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: number;
    name: string;
  };
  post?: {
    id: number;
    content: string;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 2; // Replace with dynamic user logic if needed

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/notifications/${userId}`
        );
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔔 Notifications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((notif) => (
            <li
              key={notif.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ddd",
                paddingBottom: "1rem",
              }}
            >
              <p>
                <strong>{notif.sender.name}</strong>{" "}
                {notif.type === "NEW_POST"
                  ? "posted something new"
                  : notif.type}
              </p>
              {notif.post && <p>📝 "{notif.post.content}"</p>}
              <p style={{ color: "#888", fontSize: "0.9rem" }}>
                {new Date(notif.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
