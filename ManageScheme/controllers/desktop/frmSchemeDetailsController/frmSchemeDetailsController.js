define({ 

  onNavigate: function(){
    this.view.flxPopup.isVisible = false;
    
    this.view.btnReturn.onClick = this.btnReturnClick;
    this.view.SuspensionEntries.segSuspendEntry.onRowClick = this.segRowClick;
    this.view.imgCancel.onTouchEnd = this.cancelClick;
  },
  btnReturnClick: function(){
    var navObj = new voltmx.mvc.Navigation("frmSchemeList");
    navObj.navigate();
  },
  segRowClick: function(){
    this.view.flxPopup.isVisible = true;
  },
  cancelClick: function(){
    this.view.flxPopup.isVisible = false;
  }

});