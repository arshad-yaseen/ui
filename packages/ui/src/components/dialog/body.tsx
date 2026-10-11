"use client";

import { useRender } from "@base-ui/react/use-render";
import { useEffect, useRef, useState } from "react";
import { cn } from "@arshad/ui/lib/cn";

export type DialogBodyProps = useRender.ComponentProps<"div">;

type Overflow = {
  isAbove: boolean;
  isBelow: boolean;
};

export function Body({ render, ref, className, ...props }: DialogBodyProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState<Overflow>({ isAbove: false, isBelow: false });
  const isScrollable = overflow.isAbove || overflow.isBelow;

  useEffect(() => {
    const element = internalRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      const isAbove = element.scrollTop > 0;
      const isBelow = element.scrollHeight - element.clientHeight - element.scrollTop > 1;
      setOverflow((previous) =>
        previous.isAbove === isAbove && previous.isBelow === isBelow
          ? previous
          : { isAbove, isBelow },
      );
    };

    const resizeObserver = new ResizeObserver(update);
    const observe = () => {
      resizeObserver.disconnect();
      resizeObserver.observe(element);
      for (const child of element.children) {
        resizeObserver.observe(child);
      }
    };
    const mutationObserver = new MutationObserver(observe);

    observe();
    mutationObserver.observe(element, { childList: true });
    element.addEventListener("scroll", update, { passive: true });
    return () => {
      element.removeEventListener("scroll", update);
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return useRender({
    render,
    ref: [internalRef, ref ?? null],
    props: {
      "data-slot": "dialog-body",
      "data-overflow-y-start": overflow.isAbove ? "" : undefined,
      "data-overflow-y-end": overflow.isBelow ? "" : undefined,
      tabIndex: isScrollable ? 0 : undefined,
      ...props,
      className: cn(
        "min-h-0 overflow-y-auto overscroll-contain px-(--dialog-padding)",
        "-my-1.5 py-1.5",
        "border-y-hairline border-transparent",
        "data-overflow-y-end:border-b-current/10 data-overflow-y-start:border-t-current/10",
        "focus:not-focus-visible:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
        className,
      ),
    },
  });
}
