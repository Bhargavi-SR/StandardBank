define({ 

  // 1. Initial UI State on Navigation
  onNavigate: function() {
    this.resetUI();
    this.setupActions();
    this.populateSegmentData();
    this.view.segNewListSource.onRowClick = this.onSourceRowClick.bind(this);
    this.view.segTypeEntry.onRowClick = this.onTypeEntryRowClick.bind(this);
    this.view.segSearchCriteria.onRowClick = this.onCriteriaRowClick.bind(this);
  },

  resetUI: function() {
    // Dropdowns (Segments) are hidden by default
    this.view.flxSegSourceContainer.setVisibility(false);
    this.view.flxSegTypeContainer.setVisibility(false);
    this.view.flxSegCriteriaContainer.setVisibility(false);

    // Form Fields
    //this.view.flxTypeEntry.setVisibility(false);
    this.view.flxSearchCriteria.setVisibility(false);
    this.view.flxDocUpload.setVisibility(false);

    this.view.lblSelectedSource.text = "Select Source";
    this.view.lblSelectedType.text = "Select Type";
    this.view.lblSelectedCriteria.text = "Select Criteria";

    this.populateSourceData();
  },

  setupActions: function() {
    // Toggle Source Segment
    this.view.flxSelectedSource.onClick = () => {
      this.toggleVisibility(this.view.flxSegSourceContainer);
    };

    // Toggle Type Entry Segment
    this.view.flxSelectedType.onClick = () => {
      this.toggleVisibility(this.view.flxSegTypeContainer);
    };

    // Toggle Search Criteria Segment
    this.view.flxSelectedCriteria.onClick = () => {
      this.toggleVisibility(this.view.flxSegCriteriaContainer);
    };
  },

  // Generic Toggle Function
  toggleVisibility: function(widget) {
    const isVisible = widget.isVisible;
    widget.setVisibility(!isVisible);
  },

  // 2. Populate 'New List Source' Segment
  populateSourceData: function() {
    const sourceData = [
      { "lblSource": "Manual entry(max 10 items)", "id": "MANUAL" },
      { "lblSource": "Upload file", "id": "UPLOAD" }
    ];
    this.view.segNewListSource.setData(sourceData);
  },

  // 3. Handle 'New List Source' Selection
  onSourceRowClick: function() {
    const selectedItem = this.view.segNewListSource.selectedRowItems[0];
    this.view.lblSelectedSource.text = selectedItem.lblSource; // Update UI label
    this.view.flxSegSourceContainer.setVisibility(false); // Hide the "dropdown" segment

    if (selectedItem.id === "MANUAL") {
      this.view.flxTypeEntry.setVisibility(true);
      this.view.flxDocUpload.setVisibility(false);
      this.view.flxSrch.setVisibility(true);
      this.populateTypeEntryData();
    } else {
      // Upload File Logic
      this.view.flxDocUpload.setVisibility(true);
      this.view.flxTypeEntry.setVisibility(false);
      this.view.flxSrch.setVisibility(false);
      this.view.flxSearchCriteria.setVisibility(false);
    }
  },

  // 4. Populate 'Type of Entry' Segment
  populateTypeEntryData: function() {
    const typeData = [
      { "lblType": "Individual", "id": "IND" },
      { "lblType": "Scheme", "id": "SCH" },
      { "lblType": "Ecosystem", "id": "ECO" }
    ];
    this.view.segTypeEntry.setData(typeData);
  },

  // 5. Handle 'Type of Entry' Selection
  onTypeEntryRowClick: function() {
    const selectedItem = this.view.segTypeEntry.selectedRowItems[0];
    this.view.lblSelectedCriteria.text = "Select Criteria";
    this.view.lblSelectedType.text = selectedItem.lblType;
    this.view.flxSegTypeContainer.setVisibility(false);

    if (selectedItem.id === "IND") {
      this.view.flxSearchCriteria.setVisibility(false);
    } else {
      this.view.flxSearchCriteria.setVisibility(true);
      this.populateSearchCriteria(selectedItem.id);
    }
  },

  // 6. Populate 'Search Criteria' based on Type
  populateSearchCriteria: function(typeId) {
    let criteriaData = [];

    if (typeId === "SCH") {
      criteriaData = [
        { "lblCriteria": "Scheme Code" },
        { "lblCriteria": "Scheme Name" },
        { "lblCriteria": "Employee Name" }
      ];
    } else if (typeId === "ECO") {
      criteriaData = [
        { "lblCriteria": "Ecosystem ID" },
        { "lblCriteria": "Ecosystem Name" }
      ];
    }

    this.view.segSearchCriteria.setData(criteriaData);
  },

  // 7. Handle 'Search Criteria' Selection
  onCriteriaRowClick: function() {
    const selectedItem = this.view.segSearchCriteria.selectedRowItems[0];
    this.view.lblSelectedCriteria.text = selectedItem.lblCriteria;
    this.view.flxSegCriteriaContainer.setVisibility(false);
  },

  populateSegmentData: function() {
    var scope = this;
    const masterData = [
      {
        "lblCIFNo": "23280545",
        "lblIDNo": "111235",
        "lblCustomerName": "Zuri Nkosi",
        "lblReason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...",
        "imgDelete": { "src": "icon_delete.png"},
        "flxDelete": {"onTouchEnd": scope.deleteRow}
      },
      {
        "lblCIFNo": "25323522",
        "lblIDNo": "232558",
        "lblCustomerName": "Amari Nkosi",
        "lblReason": "Lorem ipsum dolor sit amet consectetur.",
        "imgDelete": { "src": "icon_delete.png"},
        "flxDelete": {"onTouchEnd": scope.deleteRow}
      },
      {
        "lblCIFNo": "85245623",
        "lblIDNo": "998524",
        "lblCustomerName": "Chege Nkosi",
        "lblReason": "Lorem ipsum dolor sit amet consectetur.",
        "imgDelete": { "src": "icon_delete.png"},
        "flxDelete": {"onTouchEnd": scope.deleteRow}
      }
    ];

    // Map the data to the Segment
    // Ensure your Segment's widgetDataMap is set in Iris or via code
    this.view.SuspensionEntries.segSuspendEntry.widgetDataMap = {
      "lblCIFNo": "lblCIFNo",
      "lblIDNo": "lblIDNo",
      "lblCustomerName": "lblCustomerName",
      "lblReason": "lblReason",
      "imgDelete": "imgDelete",
      "flxDelete": "flxDelete"
    };

    this.view.SuspensionEntries.segSuspendEntry.setData(masterData);
  },

  deleteRow: function() {
    var rowIndex = this.view.SuspensionEntries.segSuspendEntry.selectedRowIndex;
    //var rowIndex = context.rowIndex;
    //var sectionIndex = context.sectionIndex;

    // Confirms and removes the row from the segment
    this.view.SuspensionEntries.segSuspendEntry.removeAt(rowIndex[1]);

    // Logic to handle "max 10 items" validation after deletion
    alert("suspend list got deleted");
  },
});