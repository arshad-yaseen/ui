import type { ComponentProps, ReactNode } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type TableProps = Omit<ComponentProps<"div">, "children"> & {
  head: ReactNode[];
  rows: ReactNode[][];
};

/** Cells are authored prose, so their position is their identity. */
export function Table({ head, rows, className, ...props }: TableProps) {
  return (
    <div
      className={cn("overflow-x-auto rounded-lg border-hairline border-current/10", className)}
      {...props}
    >
      <table className="w-full text-left text-sm tabular-nums">
        <thead>
          <tr className="border-b-hairline border-current/10 text-foreground/80">
            {head.map((cell, column) => (
              <th key={column} className="px-4 py-2.5 font-medium whitespace-nowrap">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-current/10 not-last:border-b-hairline">
              {row.map((cell, column) => (
                <td key={column} className="px-4 py-2.5 align-top text-foreground/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
