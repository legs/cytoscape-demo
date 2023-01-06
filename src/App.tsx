import React, { useEffect, useRef } from 'react';
import cy from 'cytoscape';
import './App.css';

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const config = {
      container: containerRef.current,
      style: [
        {
          selector: "node",
          style: { content: "data(id)" },
        },
      ],
      elements: [
        { data: { id: "n1" } },
        { data: { id: "n2" } },
        { data: { id: "e1", source: "n1", target: "n2" } },
      ],
    };

    cy(config);
  }, []);

  return (
    <div>
      <div ref={containerRef} style={{ height: "100vh" }} />
    </div>
  );
}

export default App;
