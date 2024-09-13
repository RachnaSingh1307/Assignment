import React, { useState } from "react";
import { FaQuestionCircle, FaThLarge } from "react-icons/fa"; // Import question mark icon

function TabWidget() {
  const [activeTab, setActiveTab] = useState("About Me");

  const renderContent = () => {
    switch (activeTab) {
      case "About Me":
        return (
          <div className="max-h-40 overflow-y-auto pr-4 custom-scrollbar">
            <p className="leading-relaxed">
              Hello! I'm Dave, your sales rep here from Salesforce. I've been
              working at this awesome company for 3 years now. I was born and
              raised in Albany, NY, and have been living in Santa Clara for the
              past 10 years with my wife Tiffany and our 4-year-old twin
              daughters – Emma and Ella. Both of them are just starting school,
              so my calendar is usually blocked between 9–10 AM.
            </p>
          </div>
        );
      case "Experiences":
        return <p>Your experiences content goes here.</p>;
      case "Recommended":
        return <p>Recommended content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gray-800 text-white rounded-lg pl-11 pt-2 pr-2 shadow-lg">
      <div className="absolute top-5 left-2">
        <FaQuestionCircle
          className=""
          size={24}
          style={{
            borderRadius: "50%",
            padding: "3px",
            background: "linear-gradient(to top, #131b24, #8e9096)",
          }}
        />
        <FaThLarge
          className="text-gray-400 mt-12 left-2"
          style={{ fontSize: "14px" }}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap space-x-2 mb-4 bg-black p-2 rounded-full gap-8">
        {["About Me", "Experiences", "Recommended"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-1 rounded-full ${
              activeTab === tab ? "bg-gray-600 " : "bg-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col items-center">
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
export default TabWidget;
