import React from "react";

export const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-5xl mb-10">{children}</h1>
);

export const PageSubtitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl mb-4">{children}</h2>
);

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4">{children}</p>
);

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    referrerPolicy="no-referrer"
    className="text-blue-500 hover:text-blue-700"
  >
    {children}
  </a>
);
