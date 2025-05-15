import React from 'react';

interface Notification {
  id: number;
  type: string;
  sender: { name: string };
  post?: { content: string };
  createdAt: string;
}

export default function NotificationList({ notifications }: { notifications: Notification[] }) {
  return (
    <ul>
      {notifications.map(n => (
        <li key={n.id}>
          <strong>{n.type}</strong> from <em>{n.sender.name}</em>
          {n.post && <> – Post: "{n.post.content}"</>}
          <br />
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  );
}
