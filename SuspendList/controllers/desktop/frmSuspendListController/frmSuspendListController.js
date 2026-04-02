define({ 

 customerData: [
    { date: "18/03/2026", cif: "23280545", id: "111235", name: "Zuri Nkosi", reason: "Lorem ipsum dolor sit amet..." },
    { date: "18/03/2026", cif: "25323522", id: "232558", name: "Amari Nkosi", reason: "Lorem ipsum dolor sit amet." },
    { date: "17/03/2026", cif: "85245623", id: "998524", name: "Chege Nkosi", reason: "Lorem ipsum dolor sit amet." },
    { date: "16/03/2026", cif: "99855824", id: "220232134", name: "HCL Software", reason: "Lorem ipsum dolor sit amet." },
    { date: "15/03/2026", cif: "22355678", id: "652445342", name: "HCL South America", reason: "Lorem ipsum dolor sit amet." }
  ],
  
  onNavigate: function(){
    this.view.SrchTextBox.txtSrch.onTextChange = this.searchCustomer;
    this.setSegmentData(this.customerData);
  },
  setSegmentData: function(data) {
    const segData = data.map(item => {
      return {
        "lblDateVal": { "text": item.date },
        "lblCiFNoVal": { "text": item.cif },
        "lblIDNoVal": { "text": item.id },
        "lblCustomerNameVal": { "text": item.name },
        "lblReasonVal": { "text": item.reason }
      };
    });
    this.view.SegSuspendList.segSuspend.setData(segData);
  },
  
  searchCustomer: function() {
    const searchText = this.view.SrchTextBox.txtSrch.text.toLowerCase();
    
    if (!searchText) {
      this.setSegmentData(this.customerData);
      return;
    }

    const filteredData = this.customerData.filter(item => {
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.cif.includes(searchText) ||
        item.id.includes(searchText)
      );
    });

    this.setSegmentData(filteredData);
  }

 });