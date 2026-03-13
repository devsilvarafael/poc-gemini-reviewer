import React from "react";

export default function Card({
  title,
  content,
}: {
  title: string;
  content: string;
}): React.ReactElement {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}
