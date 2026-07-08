"use client";

import { useEffect } from "react";

type PageBodyClass = "page-home" | "page-profile" | "page-audio";

export default function PageBodyClass({ pageClass }: { pageClass: PageBodyClass }) {
  useEffect(() => {
    const body = document.body;
    body.classList.remove("page-home", "page-profile", "page-audio");
    body.classList.add(pageClass);

    return () => {
      body.classList.remove(pageClass);
      if (!body.classList.contains("page-home")) {
        body.classList.add("page-home");
      }
    };
  }, [pageClass]);

  return null;
}
