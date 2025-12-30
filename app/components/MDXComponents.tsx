import { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

// Custom table wrapper for horizontal scrolling
function Table({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-hidden my-8 rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table {...props} className="w-full border-collapse text-sm !m-0 !p-0 !border-0">
          {children}
        </table>
      </div>
    </div>
  );
}

function Thead({ children, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead {...props} className="bg-bg-card m-0 p-0">
      {children}
    </thead>
  );
}

function Th({ children, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      {...props}
      className="text-text-primary font-semibold text-left px-4 py-2 border-b border-border-highlight whitespace-nowrap"
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td {...props} className="px-4 py-2 border-b border-border text-text-secondary last:border-b-0">
      {children}
    </td>
  );
}

function Tbody({ children, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody {...props} className="[&>tr:last-child>td]:border-b-0 m-0 p-0">
      {children}
    </tbody>
  );
}

function Tr({ children, ...props }: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr {...props} className="hover:bg-bg-card/50 transition-colors">
      {children}
    </tr>
  );
}

// Custom link that uses Next.js Link for internal links
function CustomLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  table: Table,
  thead: Thead,
  tbody: Tbody,
  th: Th,
  td: Td,
  tr: Tr,
  a: CustomLink,
};

