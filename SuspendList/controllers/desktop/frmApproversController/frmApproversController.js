define({
  _masterData: [],

  onNavigate() {
    this.setupDataMap();
    this._initializeActions();
    this._loadApproverData()
      .catch(err => { throw new Error(`Data Initialization Failed: ${err.message}`); });
  },

  _initializeActions() {
    this.view.segHeader.flxCIFNo.onTouchEnd = () => {
      this._sortDataByName()
        .catch(err => { throw new Error(`Sorting Operation Failed: ${err.message}`); });
    };
    //         this.view.txtSearchApprover.onTextChange = () => this._onSearch();

    //         // Navigation to details or edit mode
    //         this.view.segApprovers.onRowClick = () => this._onRowClick();
  },

  /** ---------------- SORTING LOGIC ---------------- **/
  /**
     * Sorts the master data by name and refreshes the segment
     * @returns {Promise<boolean>}
     */
  _sortDataByName() {
    return new Promise((resolve) => {
      // ES6 Ternary operator to determine sort direction logic
      this._masterData.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        const comparison = nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
        return this._isNameAscending ? comparison : (comparison * -1);
      });

      // Toggle state for next click
      this._isNameAscending = !this._isNameAscending;

      // Re-render segment with sorted data
      this._renderSegment(this._masterData);
      resolve(true);
    });
  },
  /** ---------------- DATA MAPPING ---------------- **/
  setupDataMap() {
    this.view.SegApproverScheme.segApprover.widgetDataMap = {
      lblEmployeeNo: "lblEmployeeNo",
      lblName: "lblName",
      lblEmail: "lblEmail",
      lblMobileNo: "lblMobileNo"
    };
  },

  /** ---------------- LOAD DATA (PROMISE) ---------------- **/
  /**
     * Fetches approver data asynchronously
     * @returns {Promise<Array>}
     */
  _loadApproverData() {
    return new Promise((resolve) => {
      const rawApprovers = [
        { no: "555555", name: "Amari Nkosi", email: "amari.nkosi@standardbank.co.za", mobile: "(72) 999-9999" },
        { no: "666666", name: "Chege Nkosi", email: "chege.nkosi@standardbank.co.za", mobile: "(72) 999-9999" },
        { no: "777777", name: "Imani Nkosi", email: "imani.nkosi@standardbank.co.za", mobile: "(72) 999-9999" },
        { no: "888888", name: "Zuri Nkosi", email: "zuri.nkosi@standardbank.co.za", mobile: "(72) 999-9999" },
        { no: "111111", name: "Kofi Mensah", email: "kofi.m@standardbank.co.za", mobile: "(72) 888-8888" },
        { no: "222222", name: "Lindiwe Dube", email: "lindi.d@standardbank.co.za", mobile: "(72) 888-8888" },
        { no: "333333", name: "Musa Zulu", email: "musa.z@standardbank.co.za", mobile: "(72) 777-7777" },
        { no: "444444", name: "Nala Tadesse", email: "nala.t@standardbank.co.za", mobile: "(72) 777-7777" },
        { no: "999999", name: "Thabo Mbeki", email: "thabo.m@standardbank.co.za", mobile: "(72) 666-6666" },
        { no: "101010", name: "Zane Louw", email: "zane.l@standardbank.co.za", mobile: "(72) 555-5555" },
        { no: "999999", name: "Thabo Mbeki", email: "thabo.m@standardbank.co.za", mobile: "(72) 666-6666" },
        { no: "101010", name: "Zane Louw", email: "zane.l@standardbank.co.za", mobile: "(72) 555-5555" }
      ];

      this._masterData = [...rawApprovers]; // Spread operator for cloning
      this._renderSegment(rawApprovers);
      resolve(rawApprovers);
    });
  },

  /** ---------------- RENDER LOGIC ---------------- **/
  /**
     * Maps data to segment with performance batching
     * @param {Array} data 
     */
  _renderSegment(data) {
    //         const defaultIcons = {
    //             imgEdit: "edit_icon.png",
    //             imgDelete: "delete_icon.png"
    //         };

    const segmentData = data.map(item => ({
      //...defaultIcons, // ES6 Spread for consistent row assets
      lblEmployeeNo: item.no,
      lblName: item.name,
      lblEmail: item.email,
      lblMobileNo: item.mobile
    }));

    this.view.SegApproverScheme.segApprover.setData(segmentData);
    // Performance Batching: Ensures UI reflow happens once
    this.view.forceLayout();
  }
});