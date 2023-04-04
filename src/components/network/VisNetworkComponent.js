import React, { useState, useEffect } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";

import Button from "../UI/Button/Button";

function VisNetworkComponent() {
  const [network, setNetwork] = useState(null);
  const [nodes, setNodes] = useState(
    new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ])
  );
  const [edges, setEdges] = useState(
    new DataSet([
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ])
  );
  // const [locale, setLocale] = useState(navigator.language || "en");
  const [nodeEditPopup, setNodeEditPopup] = useState(null);
  const [edgeEditPopup, setEdgeEditPopup] = useState(null);

  const getScaleFreeNetwork = (numberOfNodes) => {
    const nodes = [];
    const edges = [];
    for (let i = 0; i < numberOfNodes; i++) {
      nodes.push({ id: i, label: `Node ${i}` });
      if (i > 0) {
        const randomNodeIndex = Math.floor(Math.random() * i);
        edges.push({ from: i, to: randomNodeIndex });
      }
    }
    return { nodes, edges };
  };

  const data = getScaleFreeNetwork(25);

  // const setDefaultLocale = () => {
  //   if (locale !== "en") {
  //     import(`vis-locale/dist/locale/${locale}.js`)
  //       .then((localeModule) => {
  //         localeModule.default(Network);
  //         setNetwork((prevNetwork) => {
  //           prevNetwork.setOptions({ locale });
  //           return prevNetwork;
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(`Failed to load locale ${locale}`, error);
  //       });
  //   }
  // };

  const destroy = () => {
    if (network !== null) {
      network.destroy();
      setNetwork(null);
    }
  };

  const draw = () => {
    destroy();
    const container = document.getElementById("network-container");
    const options = {
      edges: {
        arrows: {
          to: { enabled: true },
        },
      },
    };
    const newNetwork = new Network(container, { nodes, edges }, options);
    setNetwork(newNetwork);
  };

  const editNode = (nodeId) => {
    const node = nodes.get(nodeId);
    setNodeEditPopup({
      nodeId,
      label: node.label,
    });
  };

  const clearNodePopUp = () => {
    setNodeEditPopup(null);
  };

  const cancelNodeEdit = () => {
    setNodeEditPopup(null);
  };

  const saveNodeData = () => {
    const { nodeId, label } = nodeEditPopup;
    nodes.update({
      id: nodeId,
      label,
    });
    setNodeEditPopup(null);
  };

  const editEdgeWithoutDrag = (edgeId) => {
    const edge = edges.get(edgeId);
    setEdgeEditPopup({
      edgeId,
      label: edge.label,
    });
  };

  const clearEdgePopUp = () => {
    setEdgeEditPopup(null);
  };

  const cancelEdgeEdit = () => {
    setEdgeEditPopup(null);
  };

  const saveEdgeData = () => {
    const { edgeId, label } = edgeEditPopup;
    edges.update({
      id: edgeId,
      label,
    });
    setEdgeEditPopup(null);
  };

  // const handleLocaleChange = (event) => {
  //   setLocale(event.target.value);
  // };

  // useEffect(() => {
  //   setDefaultLocale();
  // }, [locale]);

  useEffect(() => {
    draw();
  }, [nodes, edges]);

  return (
    <div>
      {/* <select onChange={handleLocaleChange} value={locale}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select> */}
      <Button onClick={editNode}>Add Node</Button>
      <div id="network-container" className="h-[100vh]"></div>
      {nodeEditPopup && (
        <div className="popup">
          <div>
            <label htmlFor="node-label">Label:</label>
            <input
              id="node-label"
              type="text"
              value={nodeEditPopup.label}
              onChange={(event) =>
                setNodeEditPopup({
                  ...nodeEditPopup,
                  label: event.target.value,
                })
              }
            />
          </div>
          <button onClick={saveNodeData}>Save</button>
          <button onClick={cancelNodeEdit}>Cancel</button>
        </div>
      )}
      {edgeEditPopup !== null && (
        <div className="popup">
          <div>
            <label htmlFor="edge-label">Label:</label>
            <input
              id="edge-label"
              type="text"
              value={edgeEditPopup.label}
              onChange={(event) =>
                setEdgeEditPopup({
                  ...edgeEditPopup,
                  label: event.target.value,
                })
              }
            />
          </div>
          <button onClick={saveEdgeData}>Save</button>
          <button onClick={cancelEdgeEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default VisNetworkComponent;
