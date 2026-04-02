// define({ 

//   onNavigate: function() {
//     this.resetUI();
//     this.setupActions();
//     this.populateSegmentData();
//     // Use bind to ensure 'this' refers to the controller inside the row clicks
//     this.view.segNewListSource.onRowClick = this.onSourceRowClick.bind(this);
//     this.view.segTypeEntry.onRowClick = this.onTypeEntryRowClick.bind(this);
//     this.view.segSearchCriteria.onRowClick = this.onCriteriaRowClick.bind(this);
//   },

//   resetUI: function() {
//     // 1. Hide the Floating Segment Containers (Dropdown menus)
//     this.view.flxSegSourceContainer.setVisibility(false);
//     this.view.flxSegTypeContainer.setVisibility(false);
//     this.view.flxSegCriteriaContainer.setVisibility(false);

//     // 2. Hide Main Form Sections
//     this.view.flxSearchCriteria.setVisibility(false);
//     this.view.flxDocUpload.setVisibility(false);
//     this.view.flxTypeEntry.setVisibility(true); 
//     this.view.flxSrch.setVisibility(true);

//     // 3. Reset Labels
//     this.view.lblSelectedSource.text = "Select Source";
//     this.view.lblSelectedType.text = "Select Type";
//     this.view.lblSelectedCriteria.text = "Select Criteria";

//     this.populateSourceData();
//   },

//   setupActions: function() {
//     this.view.flxSelectedSource.onClick = () => this.toggleVisibility(this.view.flxSegSourceContainer);
//     this.view.flxSelectedType.onClick = () => this.toggleVisibility(this.view.flxSegTypeContainer);
//     this.view.flxSelectedCriteria.onClick = () => this.toggleVisibility(this.view.flxSegCriteriaContainer);
//   },

//   toggleVisibility: function(widget) {
//     widget.setVisibility(!widget.isVisible);
//   },

//   // 3. Handle 'New List Source' Selection
//   onSourceRowClick: function() {
//     const selectedItem = this.view.segNewListSource.selectedRowItems[0];
//     this.view.lblSelectedSource.text = selectedItem.lblSource; 
    
//     // Hide all dropdown segments immediately
//     this.view.flxSegSourceContainer.setVisibility(false);
//     this.view.flxSegTypeContainer.setVisibility(false);
//     this.view.flxSegCriteriaContainer.setVisibility(false);

//     if (selectedItem.id === "MANUAL") {
//       // 1. Reset Child Labels to Defaults when Manual is selected
//       this.view.lblSelectedType.text = "Individual"; // Default per your requirement
//       this.view.lblSelectedCriteria.text = "Select Criteria";
      
//       // 2. Manage UI Visibility
//       this.view.flxTypeEntry.setVisibility(true);
//       this.view.flxDocUpload.setVisibility(false);
//       this.view.flxSrch.setVisibility(true);
//       this.view.flxSearchCriteria.setVisibility(false); // Hide until Type is changed from Individual
      
//       this.populateTypeEntryData();
//     } else {
//       // 1. Reset Child Labels when Upload is selected
//       this.view.lblSelectedType.text = "Select Type";
//       this.view.lblSelectedCriteria.text = "Select Criteria";

//       // 2. Manage UI Visibility
//       this.view.flxDocUpload.setVisibility(true);
//       this.view.flxTypeEntry.setVisibility(false);
//       this.view.flxSrch.setVisibility(false);
//       this.view.flxSearchCriteria.setVisibility(false);
//     }
//   },
  
//   populateTypeEntryData: function() {
//     const typeData = [
//       { "lblType": "Individual", "id": "IND" },
//       { "lblType": "Scheme", "id": "SCH" },
//       { "lblType": "Ecosystem", "id": "ECO" }
//     ];
//     this.view.segTypeEntry.setData(typeData);
//   },

//   onTypeEntryRowClick: function() {
//     const selectedItem = this.view.segTypeEntry.selectedRowItems[0];
//     this.view.lblSelectedType.text = selectedItem.lblType;
    
//     // Close the type dropdown
//     this.view.flxSegTypeContainer.setVisibility(false);
//     // Reset criteria dropdown visibility
//     this.view.flxSegCriteriaContainer.setVisibility(false);

//     if (selectedItem.id === "IND") {
//       this.view.flxSearchCriteria.setVisibility(false);
//     } else {
//       this.view.flxSearchCriteria.setVisibility(true);
//       this.view.lblSelectedCriteria.text = (selectedItem.id === "SCH") ? "Scheme Code" : "Ecosystem ID";
//       this.populateSearchCriteria(selectedItem.id);
//     }
//   },
//   populateSourceData: function() {
//     const sourceData = [
//       { "lblSource": "Manual entry(max 10 items)", "id": "MANUAL" },
//       { "lblSource": "Upload file", "id": "UPLOAD" }
//     ];
//     this.view.segNewListSource.setData(sourceData);
//   },
//   populateSearchCriteria: function(typeId) {
//     let criteriaData = [];
//     if (typeId === "SCH") {
//       criteriaData = [
//         { "lblCriteria": "Scheme Code" },
//         { "lblCriteria": "Scheme Name" },
//         { "lblCriteria": "Employee Name" }
//       ];
//     } else if (typeId === "ECO") {
//       criteriaData = [
//         { "lblCriteria": "Ecosystem ID" },
//         { "lblCriteria": "Ecosystem Name" }
//       ];
//     }
//     this.view.segSearchCriteria.setData(criteriaData);
//   },

//   // ... (Keep your populateSearchCriteria and populateSourceData as they were) ...

//   onCriteriaRowClick: function() {
//     const selectedItem = this.view.segSearchCriteria.selectedRowItems[0];
//     this.view.lblSelectedCriteria.text = selectedItem.lblCriteria;
//     this.view.flxSegCriteriaContainer.setVisibility(false);
//   },

//   populateSegmentData: function() {
//     var scope = this;
//     const masterData = [
//       {
//         "lblCIFNo": "23280545",
//         "lblIDNo": "111235",
//         "lblCustomerName": "Zuri Nkosi",
//         "lblReason": "Lorem ipsum dolor sit amet...",
//         "imgDelete": { "src": "icon_delete.png"},
//         "flxDelete": {"onTouchEnd": scope.deleteRow.bind(scope)} // Bind scope here
//       }
//       // ... rest of data
//     ];

//     this.view.SuspensionEntries.segSuspendEntry.widgetDataMap = {
//       "lblCIFNo": "lblCIFNo",
//       "lblIDNo": "lblIDNo",
//       "lblCustomerName": "lblCustomerName",
//       "lblReason": "lblReason",
//       "imgDelete": "imgDelete",
//       "flxDelete": "flxDelete"
//     };

//     this.view.SuspensionEntries.segSuspendEntry.setData(masterData);
//   },

//   deleteRow: function() {
//     // selectedRowIndex returns [sectionIndex, rowIndex]
//     var selectedRowIndex = this.view.SuspensionEntries.segSuspendEntry.selectedRowIndex;
    
//     if (selectedRowIndex) {
//         var rowIndex = selectedRowIndex[1];
//         this.view.SuspensionEntries.segSuspendEntry.removeAt(rowIndex);
//         alert("Record removed from suspend list.");
//     }
//   }
// });

class SuspensionController {
  constructor(viewInstance = {}) {
    if (!viewInstance) throw new Error("View reference is required");

    this.view = viewInstance;
    this.initialize();
  }

  /* ---------- INIT ---------- */
  initialize =()=>{
    this.resetUI();
    this.registerEvents();
    this.populateSegmentData();

    this.view.segNewListSource.onRowClick = this.handleSourceSelection;
    this.view.segTypeEntry.onRowClick = this.handleTypeSelection;
    this.view.segSearchCriteria.onRowClick = this.handleCriteriaSelection;
  };

  /* ---------- RESET UI ---------- */
  resetUI = () => {
    const ui = this.view;

    [
      ui.flxSegSourceContainer,
      ui.flxSegTypeContainer,
      ui.flxSegCriteriaContainer,
      ui.flxSearchCriteria,
      ui.flxDocUpload
    ].forEach(widget => widget.setVisibility(false));

    ui.flxTypeEntry.setVisibility(true);
    ui.flxSrch.setVisibility(true);

    ui.lblSelectedSource.text = "Select Source";
    ui.lblSelectedType.text = "Select Type";
    ui.lblSelectedCriteria.text = "Select Criteria";

    this.populateSourceData();
  };

  /* ---------- EVENTS ---------- */
  registerEvents = () => {
    const ui = this.view;

    ui.flxSelectedSource.onClick = () =>
      this.toggleVisibility(ui.flxSegSourceContainer);

    ui.flxSelectedType.onClick = () =>
      this.toggleVisibility(ui.flxSegTypeContainer);

    ui.flxSelectedCriteria.onClick = () =>
      this.toggleVisibility(ui.flxSegCriteriaContainer);
  };

  toggleVisibility = (widget = {}) => {
    if (!widget.setVisibility)
      throw new Error("Invalid widget passed to toggleVisibility");

    widget.setVisibility(!widget.isVisible);
  };

  /* ---------- SOURCE ---------- */
  handleSourceSelection = () => {
    const ui = this.view;
    const [selectedItem] = ui.segNewListSource.selectedRowItems || [];

    if (!selectedItem) throw new Error("No source selected");

    ui.lblSelectedSource.text = selectedItem.lblSource;

    [
      ui.flxSegSourceContainer,
      ui.flxSegTypeContainer,
      ui.flxSegCriteriaContainer
    ].forEach(flx => flx.setVisibility(false));

    const isManual = selectedItem.id === "MANUAL";

    ui.lblSelectedType.text = isManual ? "Individual" : "Select Type";
    ui.lblSelectedCriteria.text = "Select Criteria";

    ui.flxTypeEntry.setVisibility(isManual);
    ui.flxDocUpload.setVisibility(!isManual);
    ui.flxSrch.setVisibility(isManual);
    ui.flxSearchCriteria.setVisibility(false);

    isManual && this.populateTypeEntryData();
  };

  /* ---------- TYPE ---------- */
  populateTypeEntryData = (data = []) => {
    const defaultData = [
      { lblType: "Individual", id: "IND" },
      { lblType: "Scheme", id: "SCH" },
      { lblType: "Ecosystem", id: "ECO" }
    ];

    this.view.segTypeEntry.setData([...data, ...defaultData]);
  };

  handleTypeSelection = () => {
    const ui = this.view;
    const [selectedItem] = ui.segTypeEntry.selectedRowItems || [];

    if (!selectedItem) throw new Error("No type selected");

    ui.lblSelectedType.text = selectedItem.lblType;

    ui.flxSegTypeContainer.setVisibility(false);
    ui.flxSegCriteriaContainer.setVisibility(false);

    const isIndividual = selectedItem.id === "IND";

    ui.flxSearchCriteria.setVisibility(!isIndividual);

    ui.lblSelectedCriteria.text =
      selectedItem.id === "SCH"
        ? "Scheme Code"
        : selectedItem.id === "ECO"
        ? "Ecosystem ID"
        : "Select Criteria";

    !isIndividual && this.populateSearchCriteria(selectedItem.id);
  };

  /* ---------- SOURCE DATA ---------- */
  populateSourceData = (customData = []) => {
    const defaultSource = [
      { lblSource: "Manual entry(max 10 items)", id: "MANUAL" },
      { lblSource: "Upload file", id: "UPLOAD" }
    ];

    this.view.segNewListSource.setData([...customData, ...defaultSource]);
  };

  /* ---------- CRITERIA ---------- */
  populateSearchCriteria = (typeId = "") => {
    const criteriaMap = {
      SCH: [
        { lblCriteria: "Scheme Code" },
        { lblCriteria: "Scheme Name" },
        { lblCriteria: "Employee Name" }
      ],
      ECO: [
        { lblCriteria: "Ecosystem ID" },
        { lblCriteria: "Ecosystem Name" }
      ]
    };

    this.view.segSearchCriteria.setData(criteriaMap[typeId] || []);
  };

  handleCriteriaSelection = () => {
    const ui = this.view;
    const [selectedItem] = ui.segSearchCriteria.selectedRowItems || [];

    if (!selectedItem) throw new Error("No criteria selected");

    ui.lblSelectedCriteria.text = selectedItem.lblCriteria;
    ui.flxSegCriteriaContainer.setVisibility(false);
  };

  /* ---------- SEGMENT DATA (PROMISE BASED) ---------- */
  populateSegmentData = () => {
    return new Promise((resolve, reject) => {
      try {
        const dataset = [
          {
            lblCIFNo: "23280545",
            lblIDNo: "111235",
            lblCustomerName: "Zuri Nkosi",
            lblReason: "Lorem ipsum dolor sit amet...",
            imgDelete: { src: "icon_delete.png" },
            flxDelete: { onTouchEnd: this.deleteRow }
          }
        ];

        const seg = this.view.SuspensionEntries.segSuspendEntry;

        seg.widgetDataMap = {
          lblCIFNo: "lblCIFNo",
          lblIDNo: "lblIDNo",
          lblCustomerName: "lblCustomerName",
          lblReason: "lblReason",
          imgDelete: "imgDelete",
          flxDelete: "flxDelete"
        };

        seg.setData(dataset);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  /* ---------- DELETE ---------- */
  deleteRow = () => {
    const seg = this.view.SuspensionEntries.segSuspendEntry;
    const selectedIndex = seg.selectedRowIndex;

    if (!selectedIndex) throw new Error("No row selected for deletion");

    seg.removeAt(selectedIndex[1]);
  };
}


/* -------- VOLTMX ENTRY -------- */
define({
  onNavigate() {
    this.controllerInstance =
      this.controllerInstance ||
      new SuspensionController(this.view);
  }
});
