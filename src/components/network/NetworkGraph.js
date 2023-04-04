import React, { useState, useRef, useEffect } from "react";
import { Network } from "vis-network";

import Button from "../UI/Button/Button";

const NetworkGraph = () => {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      label: "Brand Party",
      group: "brandParty",
    },
    {
      id: 2,
      label: "Manufacturer 1",
      group: "manufacturer",
    },
    {
      id: 3,
      label: "Manufacturer 2",
      group: "manufacturer",
    },
    { id: 4, label: "Warehouse 1", group: "warehouse" },
    { id: 5, label: "Warehouse 2", group: "warehouse" },
    { id: 6, label: "Warehouse 3", group: "warehouse" },
    { id: 7, label: "Warehouse 4", group: "warehouse" },
    {
      id: 8,
      label: "Distributor 1",
      group: "distributor",
    },
    {
      id: 9,
      label: "Distributor 2",
      group: "distributor",
    },
    {
      id: 10,
      label: "Distributor 3",
      group: "distributor",
    },
    {
      id: 11,
      label: "Distributor 4",
      group: "distributor",
    },
    {
      id: 12,
      label: "Distributor 5",
      group: "distributor",
    },
    {
      id: 13,
      label: "Distributor 6",
      group: "distributor",
    },
    {
      id: 14,
      label: "Distributor 7",
      group: "distributor",
    },
    {
      id: 15,
      label: "Distributor 8",
      group: "distributor",
    },
    { id: 16, label: "Retailer 1", group: "retailer" },
    { id: 17, label: "Retailer 2", group: "retailer" },
    { id: 18, label: "Retailer 3", group: "retailer" },
    { id: 19, label: "Retailer 4", group: "retailer" },
    { id: 20, label: "Retailer 5", group: "retailer" },
    { id: 21, label: "Retailer 6", group: "retailer" },
    { id: 22, label: "Retailer 7", group: "retailer" },
    { id: 23, label: "Retailer 8", group: "retailer" },
    { id: 24, label: "Retailer 9", group: "retailer" },
    { id: 25, label: "Retailer 10", group: "retailer" },
    { id: 26, label: "Retailer 11", group: "retailer" },
    { id: 27, label: "Retailer 12", group: "retailer" },
    { id: 28, label: "Retailer 13", group: "retailer" },
    { id: 29, label: "Retailer 14", group: "retailer" },
    { id: 30, label: "Retailer 15", group: "retailer" },
    { id: 31, label: "Retailer 16", group: "retailer" },
  ]);
  const [edges, setEdges] = useState([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 8 },
    { from: 4, to: 9 },
    { from: 5, to: 10 },
    { from: 5, to: 11 },
    { from: 6, to: 12 },
    { from: 6, to: 13 },
    { from: 7, to: 14 },
    { from: 7, to: 13 },
    { from: 6, to: 15 },
    { from: 7, to: 15 },
    { from: 8, to: 16 },
    { from: 8, to: 17 },
    { from: 9, to: 18 },
    { from: 9, to: 19 },
    { from: 10, to: 20 },
    { from: 10, to: 21 },
    { from: 11, to: 22 },
    { from: 11, to: 23 },
    { from: 12, to: 24 },
    { from: 12, to: 25 },
    { from: 13, to: 26 },
    { from: 13, to: 27 },
    { from: 14, to: 28 },
    { from: 14, to: 29 },
    { from: 15, to: 30 },
    { from: 15, to: 31 },
  ]);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [isAddNodePopupOpen, setIsAddNodePopupOpen] = useState(false);
  const [isAddEdgePopupOpen, setIsAddEdgePopupOpen] = useState(false);
  const [newNodeId, setNewNodeId] = useState("");
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeGroup, setNewNodeGroup] = useState("");
  const [newNodeX, setNewNodeX] = useState(0);
  const [newNodeY, setNewNodeY] = useState(0);
  const [newEdgeFrom, setNewEdgeFrom] = useState(0);
  const [newEdgeTo, setNewEdgeTo] = useState(0);
  const [instruction, setInstruction] = useState("");
  const [showInstruction, setShowInstruction] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const network = useRef(null);
  const networkContainerRef = useRef(null);

  const options = {
    autoResize: true,
    height: "100%",
    width: "100%",
    clickToUse: false,
    nodes: {
      shape: "box",
      color: "#2B7CE9",
      font: {
        color: "#ffffff",
      },
    },
    edges: {
      arrows: {
        to: {
          enabled: true,
        },
      },
      color: {
        color: "#848484",
        highlight: "#848484",
        hover: "#848484",
      },
      width: 2,
    },
  };

  const addNode = () => {
    const newNode = {
      id: newNodeId,
      label: newNodeName,
      group: newNodeGroup,
      x: newNodeX,
      y: newNodeY,
    };
    setNodes([...nodes, newNode]);
    setIsAddNodePopupOpen(false);
  };

  const addEdge = () => {
    console.log("Inside add edge");
    const newEdge = {
      from: newEdgeFrom,
      to: newEdgeTo,
    };
    setEdges([...edges, newEdge]);
    setIsAddEdgePopupOpen(false);
  };

  const handleOpenEditPopup = () => {
    setEditPopupOpen(true);
  };

  const handleCancelEditPopup = () => {
    setEditPopupOpen(false);
  };

  const handleAddNodeClosePopup = () => {
    setIsAddNodePopupOpen(false);
  };

  const handleAddEdgeClosePopup = () => {
    setIsAddEdgePopupOpen(false);
  };

  const handleOpenAddNodePopup = (event) => {
    setInstruction("Click anywhere in screen to create a node.");
    setShowInstruction(true);
    const { x, y } = event.pointer.canvas;
    setShowInstruction(false);
    setNewNodeX(x);
    setNewNodeY(y);
    setIsAddNodePopupOpen(true);
  };

  const handleOpenAddEdgePopup = (event) => {
    setIsAddEdgePopupOpen(true);
  };

  const handleNodeIdChange = (e) => {
    setNewNodeId(e.target.value);
  };

  const handleNodeNameChange = (e) => {
    setNewNodeName(e.target.value);
  };

  const handleNodeGroupChange = (e) => {
    setNewNodeGroup(e.target.value);
  };

  const handleNodeXChange = (e) => {
    setNewNodeX(parseInt(e.target.value));
  };

  const handleNodeYChange = (e) => {
    setNewNodeY(parseInt(e.target.value));
  };

  const handleEdgeFromChange = (e) => {
    setNewEdgeFrom(e.target.value);
  };

  const handleEdgeToChange = (e) => {
    setNewEdgeTo(e.target.value);
  };

  const handleHoverNode = (event) => {
    const nodeId = event.node;
    setHoveredNode(nodes.find((node) => node.id === nodeId));
    console.log("Hover In");
  };

  const handleLeaveNode = () => {
    setHoveredNode(null);
    console.log("Hover Out");
  };

  useEffect(() => {
    const networkContainer = networkContainerRef.current;
    if (!networkContainer) return;
    const network = new Network(networkContainer, { nodes, edges }, options);
    const handleAddNode = (event) => {
      if (isAddNodePopupOpen) return;
      handleOpenAddNodePopup(event);
    };

    // const handleAddEdge = (event) => {
    //   if (isAddEdgePopupOpen) return;
    //   handleOpenAddEdgePopup(event);
    // };

    network.on("click", handleAddNode);
    // network.on("click", handleAddEdge)
    network.on("hoverNode", handleHoverNode);
    network.on("blurNode", handleLeaveNode);

    return () => {
      network.off("click", handleAddNode);
      // network.off("click", handleAddEdge);
      network.off("hoverNode", handleHoverNode);
      network.destroy();
    };
  }, [nodes, edges, isAddNodePopupOpen, isAddEdgePopupOpen]);

  // const fitNetwork = () => {
  //   network.current.fit();
  // };

  return (
    <div>
      {/* <Button onClick={fitNetwork}>Fit Network</Button> */}
      {!isEditPopupOpen && <Button onClick={handleOpenEditPopup}>Edit</Button>}
      {isEditPopupOpen && (
        <div>
          <Button onClick={handleOpenAddNodePopup}>Add Node</Button>
          <Button onClick={handleOpenAddEdgePopup}>Add Edge</Button>
          <Button onClick={handleCancelEditPopup}>Cancel</Button>
        </div>
      )}
      {showInstruction && (
        <div className=" text-red-600 text-lg">{instruction}</div>
      )}
      <div style={{ height: "500px" }} ref={networkContainerRef} />

      {isAddNodePopupOpen && (
        <div className="bg-white shadow-lg rounded-lg w-1/2 fixed top-[20%] left-[25%] z-[5]">
          <div className="flex justify-between">
            <span className="m-2 p-1 font-semibold text-xl">
              Fill Node Details
            </span>
            <button className="mr-2" onClick={handleAddNodeClosePopup}>
              Close
            </button>
          </div>
          <div className=" inline-block">
            <div>
              <input
                type="text"
                value={newNodeId}
                onChange={handleNodeIdChange}
                placeholder="Node ID"
              />
            </div>
            <div>
              <input
                type="text"
                value={newNodeName}
                onChange={handleNodeNameChange}
                placeholder="Node Name"
              />
            </div>
            <div>
              <input
                type="text"
                value={newNodeGroup}
                onChange={handleNodeGroupChange}
                placeholder="Node Group"
              />
            </div>
            {/* <div>
              <label>Node X Position:</label>
              <input
                type="number"
                value={newNodeX}
                onChange={handleNodeXChange}
              />
            </div> */}
            {/* <div>
              <label>Node Y Position:</label>
              <input
                type="number"
                value={newNodeY}
                onChange={handleNodeYChange}
              />
            </div> */}
          </div>
          <div className="m-2 p-1">
            <Button onClick={addNode}>Add Node</Button>
            <Button onClick={handleAddNodeClosePopup}>Cancel</Button>
          </div>
        </div>
      )}

      {isAddEdgePopupOpen && (
        <div className="bg-white shadow-lg rounded-lg w-1/2 fixed top-[20%] left-[25%] z-[5]">
          <div className="flex justify-between">
            <span className="m-2 p-1 font-semibold text-xl">
              Fill Edge Details
            </span>
            <button className="mr-2" onClick={handleAddNodeClosePopup}>
              Close
            </button>
          </div>
          <div className=" inline-block">
            <div>
              <input
                type="text"
                value={newEdgeFrom}
                onChange={handleEdgeFromChange}
                placeholder="Node ID"
              />
            </div>
            <div>
              <input
                type="text"
                value={newEdgeTo}
                onChange={handleEdgeToChange}
                placeholder="Node Name"
              />
            </div>
            {/* <div>
              <label>Node X Position:</label>
              <input
                type="number"
                value={newNodeX}
                onChange={handleNodeXChange}
              />
            </div> */}
            {/* <div>
              <label>Node Y Position:</label>
              <input
                type="number"
                value={newNodeY}
                onChange={handleNodeYChange}
              />
            </div> */}
          </div>
          <div className="m-2 p-1">
            <Button onClick={addEdge}>Add Edge</Button>
            <Button onClick={handleAddEdgeClosePopup}>Cancel</Button>
          </div>
        </div>
      )}

      {hoveredNode && (
        <div className="absolute bg-white shadow-lg rounded-lg p-1 z-[5]">
          <div>
            <label>Node ID:</label>
            <span className="font-semibold">{hoveredNode.id}</span>
          </div>
          <div>
            <label>Node Name:</label>
            <span className="font-semibold">{hoveredNode.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
