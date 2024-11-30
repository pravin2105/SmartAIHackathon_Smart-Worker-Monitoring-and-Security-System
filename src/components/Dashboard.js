import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const gridItems = [
    {
      title: "No of Workers Working Now",
      value: "32",
      bgColor: "rgba(0, 0, 0, 0.6)",
      onClick: () => navigate("/workers-now"),
    },
    {
      title: "Today's Entries & Exits",
      value: "120 / 115",
      bgColor: "rgba(0, 0, 0, 0.6)",
      onClick: () => navigate("/rfid-dashboard"),
    },
    {
      title: "Workforce Requirements",
      value: "Area A: 5, Area B: 8",
      bgColor: "rgba(0, 0, 0, 0.6)",
      onClick: () => navigate("/workforce-requirements"),
    },
    {
      title: "Efficiency Graph",
      value: "Graph Placeholder",
      bgColor: "rgba(0, 0, 0, 0.6)",
    },
    {
      title: "Unauthorized Entry Alerts",
      value: "3",
      bgColor: "rgba(0, 0, 0, 0.6)",
      onClick: () => navigate("/alertpage"),
    },
    {
      title: "Insights",
      value: "Peak: 10 AM, Least: 3 PM",
      bgColor: "rgba(0, 0, 0, 0.6)",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "32px",
        backgroundColor: "#000",
        background: `radial-gradient(circle at 20% 30%, #342643, #1e1e38, #0a081f)`,
        minHeight: "100vh",
        color: "#fff",
        overflowY: "scroll",
      }}
    >
      {/* Animated Starry Sky with Movement */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                            radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "5px 5px, 3px 3px, 1px 1px",
          animation: "twinkle 3s infinite, moveStars 15s infinite",
          pointerEvents: "none",
        }}
      ></div>

      {/* Nebula-like Effects with Colorful Gradient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(186, 104, 200, 0.5), transparent 80%)",
          filter: "blur(50px)",
          zIndex: 0,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "70%",
          right: "20%",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(66, 165, 245, 0.5), transparent 80%)",
          filter: "blur(70px)",
          zIndex: 0,
        }}
      ></div>

      {/* Dynamic Grid Items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {gridItems.map((item) => (
          <div
            key={item.title}
            style={{
              background: item.bgColor,
              borderRadius: "20px",
              boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)",
              color: "#fff",
              padding: "60px", // Increased padding for larger boxes
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "400px", // Increased height for larger boxes
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: item.onClick ? "pointer" : "default",
              textAlign: "center",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.5)";
            }}
            onClick={item.onClick}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "2.5em", // Increased font size
                fontWeight: "600",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {item.title}
            </h2>
            <p
              style={{
                fontSize: "2em", // Increased font size for better visibility
                fontWeight: "300",
                marginBottom: "15px",
                color: "#e0e0e0",
              }}
            >
              {item.value}
            </p>
            {/* Add an Animated Progress Bar */}
            {item.value === "Graph Placeholder" && (
              <div
                style={{
                  height: "10px",
                  background: "#fff",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "75%",
                    height: "100%",
                    background: "linear-gradient(to right, #42a5f5, #66bb6a)",
                    animation: "progress 3s ease-in-out infinite",
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Animated UI Elements */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          padding: "20px",
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
          color: "#fff",
          fontSize: "1.2em",
          fontWeight: "500",
          animation: "float 5s ease-in-out infinite",
        }}
      ></div>
    </div>
  );
};

export default Dashboard;
