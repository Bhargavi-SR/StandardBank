define({ 

  masterHistoryData: [
    {date: "01/01/2026", id: "0012345", type: "Suspension", initiator: "John", status: "Approved"},
    {date: "02/01/2026", id: "0012346", type: "Removal", initiator: "Smith", status: "Pending"},
    {date: "03/01/2026", id: "0012347", type: "Removal", initiator: "David", status: "Approved"},
    {date: "04/01/2026", id: "0012348", type: "Suspension", initiator: "Chris", status: "Approved"},
    {date: "05/01/2026", id: "0012349", type: "Suspension", initiator: "Robert", status: "Rejected"},
    {date: "06/01/2026", id: "0012350", type: "Suspension", initiator: "Michel", status: "Pending"}
  ],

  onNavigate: function(){
    this.view.SrchTextBox.txtSrch.onTextChange = this.applyCombinedFilters;
    this.view.lstFilter.onSelection = this.applyCombinedFilters;
    this.view.SegSuspendList.segSuspend.onRowClick = this.onSegRowClick;
    // Initial Load
    this.applyCombinedFilters();
  },

  applyCombinedFilters: function(){
    const searchText = (this.view.SrchTextBox.txtSrch.text || "").toLowerCase();
    const selectedStatus = this.view.lstFilter.selectedKey; // Assumes keys are 'All', 'Approved', etc.

    const filteredResults = this.masterHistoryData.filter(item => {
      // 1. Check Dropdown Condition
      // We strip 'View ' from the logic or map keys to match item.status
      const statusMatch = (selectedStatus === "All") || 
            (item.status.includes(selectedStatus));

      // 2. Check Search Condition
      const searchMatch = !searchText || 
            item.id.toLowerCase().includes(searchText) || 
            item.type.toLowerCase().includes(searchText) || 
            item.initiator.toLowerCase().includes(searchText);

      return statusMatch && searchMatch;
    });

    this.setSegmentData(filteredResults);
  },

  setSegmentData: function(data){
    const segData = data.map(item => {
      return {
        "lblDateVal": item.date,
        "lblCiFNoVal": { "text": item.id, "skin": "sknIDLink" }, // Apply underline skin
        "lblIDNoVal": item.type,
        "lblCustomerNameVal": item.initiator,
        "lblReasonVal": { 
          "text": item.status, 
          "skin": this.getStatusSkin(item.status) 
        }
      };
    });
    this.view.SegSuspendList.segSuspend.setData(segData);
  },

  getStatusSkin: function(status){
    if (status === "Approved") return "sknLblSuccessGreen";
    if (status === "Rejected") return "sknLblRejectedRed";
    return "sknLblPendingOrange";
  },
  
  onSegRowClick: function(){
    let navObj = new voltmx.mvc.Navigation("frmSusHistoryDetails");
    navObj.navigate();
  }


});