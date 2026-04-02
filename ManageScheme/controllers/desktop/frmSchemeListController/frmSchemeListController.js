define({

  /** ---------------- STATE ---------------- **/
  _masterData: [],

  /** ---------------- ENTRY ---------------- **/
  onNavigate: function () {
    this.setupDataMap();
    this.setupActions();
    this._loadSchemeListData();
  },

  /** ---------------- DATA MAP ---------------- **/
  setupDataMap: function() {
    this.view.SchemeList.segSchemeList.widgetDataMap = {
      lblSchemeID: "lblSchemeID",     
      lblSchemeName: "lblSchemeName", 
      lblCIFNo: "lblCIFNo", 
      lblCompanyName: "lblCompanyName", 
      lblRegID: "lblRegID",
      lblStatus: "lblStatus"
    };
  },

  /** ---------------- ACTIONS ---------------- **/
  setupActions: function() {
    this.view.SrchTextBox.txtSrch.onTextChange = this._onSearchScheme.bind(this);
    this.view.SchemeList.segSchemeList.onRowClick = this._onRowClickNavigate.bind(this);
  },

  /** ---------------- LOAD DATA ---------------- **/
  _loadSchemeListData: function () {
    // Mock data based on your "Scheme List" screenshot
    const data = [
      { id: "987650", name: "HCL Software", cif: "23280225", company: "HCL Software America", reg: "226556765", status: "Active" },
      { id: "987651", name: "Health Systems", cif: "55565125", company: "Health Systems Inc", reg: "485922550", status: "Active" },
      { id: "987652", name: "Solar Energies", cif: "91518892", company: "Solar Panels LLC", reg: "884558125", status: "Inactive" },
      { id: "987653", name: "BestMart Retail", cif: "64265024", company: "BestMart Furniture Mfg", reg: "225655227", status: "Inactive" },
      { id: "987654", name: "Petrol Energy", cif: "85123352", company: "Petrol Energy Group", reg: "220232879", status: "Active" }
    ];

    this._masterData = [...data];
    this._parseAndSetSegment(data);
  },

  /** ---------------- SEGMENT MAPPING ---------------- **/
  _parseAndSetSegment: function (data) {
    const segData = data.map(item => ({
      lblSchemeID: { text: item.id, skin: "sknLblUnderline" },
      lblSchemeName: item.name,
      lblCIFNo: item.cif,
      lblCompanyName: item.company,
      lblRegID: item.reg,
      lblStatus: {
        text: item.status,
        skin: item.status === "Active" ? "sknLblSuccessGreen" : "sknLblRejectedRed"
      }
    }));

    this.view.SchemeList.segSchemeList.setData(segData);
    this.view.forceLayout(); 
  },

  /** ---------------- SEARCH LOGIC ---------------- **/
  _onSearchScheme: function () {
    const searchText = (this.view.SrchTextBox.txtSrch.text || "").toLowerCase().trim();

    if (!searchText) {
      this._parseAndSetSegment(this._masterData);
      return;
    }

    const filtered = this._masterData.filter(item => 
                                             item.id.toLowerCase().includes(searchText) ||
                                             item.name.toLowerCase().includes(searchText) ||
                                             item.cif.toLowerCase().includes(searchText) ||
                                             item.company.toLowerCase().includes(searchText)
                                            );

    this._parseAndSetSegment(filtered);
  },

  /** ---------------- NAVIGATION ---------------- **/
  _onRowClickNavigate: function () {
    const selectedItem = this.view.SchemeList.segSchemeList.selectedRowItems[0];
    const navObj = new voltmx.mvc.Navigation("frmSchemeDetails"); // Target screen name
    navObj.navigate(selectedItem);
  }

});