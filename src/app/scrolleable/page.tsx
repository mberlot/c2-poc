"use client";
import { useEffect, useRef } from "react";
import { db } from "../firebase-config"; // Import the configured Firestore instance

const ScrollableDiv: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("c2-test")
      .doc("documentId")
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const scrollPosition = data?.position || 0;
          scrollContainerRef.current?.scrollTo({ top: scrollPosition });
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleScroll = () => {
    const scrollPosition = scrollContainerRef.current?.scrollTop || 0;
    db.collection("scrollPosition")
      .doc("documentId")
      .set({ position: scrollPosition });
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{ height: "100vh", overflow: "scroll" }}
      onScroll={handleScroll}
    >
      {[1, 1, 1, 1, 1, 1, 11, 11, 1, 1, 1, 11, 1, 1, 1, 1, 1, 11, 1, 1].map(
        (item, index) => (
          <div
            key={index}
            style={{ width: "100%", height: "100px", border: "1px solid red" }}
          >
            test {index}
          </div>
        )
      )}
    </div>
  );
};

export default ScrollableDiv;
