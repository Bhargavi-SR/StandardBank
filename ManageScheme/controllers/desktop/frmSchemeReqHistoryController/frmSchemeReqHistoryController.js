define({

  /** ---------------- STATE ---------------- **/
  _masterData: [],
  _filteredData: [],
  _currentFilter: "ALL",

  /** ---------------- ENTRY ---------------- **/
  onNavigate: function () {
    this.view.SrchTextBox.txtSrch.onTextChange = this._onSearch.bind(this);
    this.view.lstFilter.onSelection = this._onListBoxSelect.bind(this);
    this.view.SegSuspendList.segSuspend.onRowClick = this._onClickSuspendData.bind(this);
    
    
    this.setupDataMap();
    this._loadData();
  },

  setupDataMap: function() {
    this.view.SegSuspendList.segSuspend.widgetDataMap = {
      lblDateVal: "lblDateVal",
      lblCiFNoVal: "lblCiFNoVal",
      lblCiFNoValNoVal: "lblCiFNoValNoVal",
      lblCustomerNameVal: "lblCustomerNameVal",
      lblReasonVal: "lblReasonVal",
      flxDelete: "flxDelete"
    };
  },

  _onClickSuspendData: function() {
    let navObj = new voltmx.mvc.Navigation("frmSchHisDetails");
    navObj.navigate();
  },

  /** ---------------- LOAD DATA ---------------- **/
  _loadData: function () {
    this._mockService()
      .then(data => {
        this._masterData = [...data];
        this._filteredData = [...data];
        this._setMainSegment(data);
      
      this.view.forceLayout();
      })
      .catch(err => voltmx.print(err));
  },

  /** ---------------- MOCK DATA ---------------- **/
  _mockService: function () {
    return new Promise(resolve => {
      resolve([
        {date: "01/01/2026", id: "0012345", type: "Suspension", initiator: "John", status: "Approved"},
        {date: "02/01/2026", id: "0012346", type: "Removal", initiator: "Smith", status: "Pending"},
        {date: "03/01/2026", id: "0012347", type: "Removal", initiator: "David", status: "Approved"},
        {date: "04/01/2026", id: "0012348", type: "Suspension", initiator: "Chris", status: "Approved"},
        {date: "05/01/2026", id: "0012349", type: "Suspension", initiator: "Robert", status: "Rejected"},
        {date: "06/01/2026", id: "0012350", type: "Suspension", initiator: "Michel", status: "Pending"}
      ]);
    });
  },

  /** ---------------- MAIN SEGMENT ---------------- **/
  _setMainSegment: function (data) {
    const segData = data.map(item => ({
      lblDateVal: item.date,
      lblCiFNoVal: item.id,
      lblCiFNoValNoVal: item.type, // Map to your template widget name
      lblCustomerNameVal: item.initiator,
      lblReasonVal: {
        text: item.status,
        skin: this._getSkin(item.status)
      },
      flxDelete: {"isVisible": false}
    }));

    this.view.SegSuspendList.segSuspend.setData(segData);
  },

  /** ---------------- LISTBOX SELECT (NEW) ---------------- **/
  _onListBoxSelect: function () {
    // ListBox returns the selectedKey (e.g., "View Approved")
    const selectedKey = this.view.lstFilter.selectedKey;

    /** map filter */
    const map = {
      "All": "ALL",
      "Approved": "Approved",
      "Pending": "Pending",
      "Rejected": "Rejected"
    };

    this._currentFilter = map[selectedKey] || "ALL";

    /** apply filters using current search text */
    const searchText = (this.view.SrchTextBox.txtSrch.text || "").toLowerCase().trim();
    this._applyFilters(searchText);
  },

  /** ---------------- SEARCH ---------------- **/
  _onSearch: function () {
    const text = (this.view.SrchTextBox.txtSrch.text || "")
      .toLowerCase()
      .trim();

    this._applyFilters(text);
  },

  /** ---------------- FILTER ENGINE ---------------- **/
  _applyFilters: function (search = "") {
    let data = [...this._masterData];

    /** 1. Dropdown filter */
    if (this._currentFilter !== "ALL") {
      data = data.filter(x => x.status.includes(this._currentFilter));
    }

    /** 2. Search filter */
    if (search) {
      data = data.filter(x =>
        x.id.toLowerCase().includes(search) ||
        x.type.toLowerCase().includes(search) ||
        x.initiator.toLowerCase().includes(search)
      );
    }

    this._filteredData = data;
    this._setMainSegment(data);
  },

  /** ---------------- STATUS SKIN ---------------- **/
  _getSkin: function (status) {
    if (status.includes("Approved")) return "sknLblSuccessGreen";
    if (status.includes("Pending")) return "sknLblPendingOrange";
    if (status.includes("Rejected")) return "sknLblRejectedRed";

    return "sknLblFormLevel";
  }

});