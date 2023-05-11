"use client";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase-config"; // Import the configured Firestore instance

const Trackpad: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const unsubscribe = db
      .collection("c2-test")
      .doc("documentId")
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setPosition(data?.position || { x: 0, y: 0 });
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;
    db.collection("c2-test")
      .doc("documentId")
      .set({ position: scrollPosition });
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>Web Trackpad</h1>
      <p>Swipe up or down to scroll the boxes:</p>

      <div
        ref={scrollContainerRef}
        style={{ height: "100vh", overflow: "scroll" }}
        onScroll={handleScroll}
      >
        {[1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 11, 1, 1, 1, 1, 1, 11, 1, 1].map(
          (item, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                height: "100px",
                border: "1px solid red",
              }}
            >
              test {index}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Trackpad;
