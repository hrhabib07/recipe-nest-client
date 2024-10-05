import { Link } from "@nextui-org/link";
import React from "react";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl flex-grow">{children}</main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://github.com/hrhabib07"
          title="Habib's Github profile"
        >
          <span className="text-default-600">Developed by</span>
          <p className="text-primary">Habib</p>
        </Link>
      </footer>
    </div>
  );
};

<h2>Inside group layout</h2>;
export default layout;
