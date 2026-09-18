import type { ReactNode } from "react";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionContainer({ children, className = "", id }: SectionContainerProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="section-container">{children}</div>
    </section>
  );
}
