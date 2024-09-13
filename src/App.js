import React from "react";
import TabWidget from "./components/TabWidget";
import GalleryWidget from "./components/GalleryWidget";
import "./App.css";

function App() {
  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1"></div>
      <div className="flex-none w-full max-w-lg mx-auto p-4 sm:p-10 space-y-9">
        <TabWidget />
        <GalleryWidget />
      </div>
    </div>
  );
}

export default App;
