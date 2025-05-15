import { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationList from '../components/NotificationList';

interface Notification {
  id: number;
  type: string;
  sender: { name: string };
  post?: { content: string };
  createdAt: string;
}

export default function Home() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/notifications/1')
      .then(res => setNotifications(res.data));
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Notifications for User #1</h1>
      <NotificationList notifications={notifications} />
    </main>
  );
}
