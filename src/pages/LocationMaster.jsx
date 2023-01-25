import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import data from "../data/locationMasterData.json";
import Header from "../components/Header";

const ProductMaster = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Location Master" />
      <GridComponent
        dataSource={data}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ColumnDirective type="checkbox" width="50" />
          <ColumnDirective
            field="Location ID"
            width="100"
            textAlign="Center"
            headerText="Location ID"
          />
          <ColumnDirective
            field="Location Name"
            width="100"
            textAlign="Center"
            headerText="Location Name"
          />
          <ColumnDirective
            field="Location Type"
            width="100"
            textAlign="Center"
            headerText="Location Type"
          />
          <ColumnDirective
            field="Street Address"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="Street Address"
          />
          <ColumnDirective
            field="City"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="City"
          />
          <ColumnDirective
            field="State"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="State"
          />
          <ColumnDirective
            field="Country"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="Country"
          />
          <ColumnDirective
            field="Storage Capacity"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="Storage Capacity"
          />
          <ColumnDirective
            field="Status"
            width="100"
            format="C2"
            textAlign="Center"
            headerText="Status"
          />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default ProductMaster;
