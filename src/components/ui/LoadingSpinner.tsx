import { Spinner } from "@nextui-org/spinner";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-sm">
      <div className="flex justify-center items-center h-full w-full">
        <Spinner color="default" size="lg" labelColor="foreground" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
