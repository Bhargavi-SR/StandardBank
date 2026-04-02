define({
  /** ---------------- STATE ---------------- **/

  _masterData: [],
  _selectedIndex: null,
  
  _sourceOptions: {
    MANUAL: "ME",
    UPLOAD: "UF"
  },

  _entryOptions: {
    INDIVIDUAL: "Ind",
    SCHEME: "Sch",
    ECOSYSTEM: "Eco"
  },

  /** ---------------- ENTRY ---------------- **/
  onNavigate() {
   // this.setupDataMap();
   // this._loadSuspensionData();
    this.populateSegmentData();
    this._initializeActions();
    this._resetToDefaultView();
  },

  _initializeActions() {
    // Main Source Dropdown
    this.view.ListSource.listData.onSelection = () => {
      this._handleSourceChange()
        .catch(err => { throw new Error(`Source selection failed: ${err.message}`); });
    };

    // Entry Type Dropdown
    this.view.ListEntry.listData.onSelection = () => {
      this._handleEntryChange()
        .catch(err => { throw new Error(`Entry selection failed: ${err.message}`); });
    };
  },

  /** ---------------- VIEW LOGIC ---------------- **/

  /**
     * Resets the screen to the default "Manual Individual" state
     */
  _resetToDefaultView() {
    this.view.ListSource.listData.selectedKey = this._sourceOptions.MANUAL;
    this.view.ListEntry.listData.selectedKey = this._entryOptions.INDIVIDUAL;

    this._handleSourceChange();
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
//     this.view.SuspensionEntries.segSuspendEntry.widgetDataMap = {
//       "lblCIFNo": "lblCIFNo",
//       "lblIDNo": "lblIDNo",
//       "lblCustomerName": "lblCustomerName",
//       "lblReason": "lblReason",
//       "imgDelete": "imgDelete",
//       "flxDelete": "flxDelete"
//     };

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
  /**
     * Toggles visibility between Manual Entry and Document Upload
     */
  _handleSourceChange() {
    return new Promise((resolve) => {
      const isUpload = this.view.ListSource.listData.selectedKey === this._sourceOptions.UPLOAD;

      // Visibility Batching
      this.view.flxDocs.isVisible = isUpload;
      this.view.flxSrch.isVisible = !isUpload;
      this.view.ListEntry.isVisible = !isUpload;

      // If switching to Upload, hide search criteria regardless of Entry selection
      if (isUpload) {
        this.view.SrchCriteria.isVisible = false;
      } else {
        // Re-evaluate entry type visibility when returning to Manual
        this._handleEntryChange();
      }

      this.view.forceLayout();
      resolve(true);
    });
  },

  /**
     * Updates search criteria based on Individual, Scheme, or Ecosystem selection
     */
  _handleEntryChange() {
    return new Promise((resolve) => {
      const entryType = this.view.ListEntry.listData.selectedKey;
      const isIndividual = entryType === this._entryOptions.INDIVIDUAL;

      // Toggle Criteria Flex (Hidden for Individual)
      this.view.SrchCriteria.isVisible = !isIndividual;

      if (!isIndividual) {
        this._updateCriteriaDropdown(entryType);
      }

      this.view.forceLayout();
      resolve(true);
    });
  },

  /**
     * Updates the Criteria Dropdown master data dynamically
     * @param {string} type - Entry Type
     */
  _updateCriteriaDropdown(type) {
    let masterData = [];

    // ES6 Ternary/Switch for dynamic master data
    if (type === this._entryOptions.SCHEME) {
      masterData = [
        ["code", "Scheme Code"],
        ["name", "Scheme Name"],
        ["employer", "Employer Name"]
      ];
    } else if (type === this._entryOptions.ECOSYSTEM) {
      masterData = [
        ["id", "Ecosystem ID"],
        ["name", "Ecosystem Name"]
      ];
    }

    this.view.SrchCriteria.listData.masterData = masterData;
    this.view.SrchCriteria.listData.selectedKey = masterData[0][0];
  }
});