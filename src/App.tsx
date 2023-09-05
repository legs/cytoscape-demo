import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import './App.css';
import { layers } from 'cytoscape-layers';

export default function App() {
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

    const cy = cytoscape(config);

    // checking where taps happen on the cy layers
    cy.on('tap', function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      if( e.target === cy ){
        console.log('tap on background');
      } else {
        console.log('tap on some element');
      }
    });

    const svgLayer = addSvgLayer(cy);

    // remove svg onclick when the mouse pointer is over a cy element
    cy.elements().unbind("mouseover");
    cy.elements().bind("mouseover", (event) => {
      console.log("removing click handler")
      const g = svgLayer.node.lastElementChild! as SVGElement;
      g.removeEventListener("click", logMsg);
    });
    cy.elements().unbind("mouseout");
    cy.elements().bind("mouseout", (event) => {
      console.log("adding click handler")
      const g = svgLayer.node.lastElementChild! as SVGElement;
      g.addEventListener('click', logMsg);
    });
  }, []);

  // adds a svg layer after the select box layer
  const addSvgLayer = (cy: cytoscape.Core) => {
    const lys = layers(cy);
    const menuLayer = lys.selectBoxLayer.insertAfter('svg');
    menuLayer.node.insertAdjacentHTML(
      'beforeend',
      `<g class="menuItem">
        <rect width="300" height="100" x="500" y="500" style="fill:hsl(240deg,100%,50%,10%);stroke-width:3;stroke:rgb(0,0,0)" />
      </g>`
    );
    const g = menuLayer.node.lastElementChild! as SVGElement;
    g.addEventListener('click', logMsg);
    return menuLayer;
  }

  // console logs something for debugging
  const logMsg = (e: Event) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log('tap on the box');
  }

  return (
    <div>
      <div ref={containerRef} style={{ height: "100vh" }} />
    </div>
  );
}