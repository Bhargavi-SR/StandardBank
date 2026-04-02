define({ 

 onNavigate: function(){
   this.view.btnReturnHistory.onClick = this.returnToHistory.bind(this);
   this.view.btnAccept.onClick = this.onClickAccept.bind(this);
   this.populateHistoryDetails();
   this.populateApprovalStatus();
 },
 returnToHistory: function(){
   let navObj = new voltmx.mvc.Navigation("frmSusRequestHistory");
   navObj.navigate();
 },
  onClickAccept: function(){
    let navForm = {
            "appName": "StandardBank",
            "friendlyName": "FrmSBHome"
          }
   	let navObj = new voltmx.mvc.Navigation(navForm);
    navObj.navigate();
  },
  populateHistoryDetails: function(){
    let historyData = [{"lblCIFNo": "2324769","lblIDNo": "111234","lblCustomerName": "Zuri Nkosi","lblReason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
                       {"lblCIFNo": "2324769","lblIDNo": "111234","lblCustomerName": "Zuri Nkosi","lblReason": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
  					   ];
    
  }
 });