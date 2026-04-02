define({ 

onNavigate: function(){
  this.view.btnReturn.onClick = this.returnClick.bind(this);
},
returnClick: function(){
  let navObj = new voltmx.mvc.Navigation("frmSchemeReqHistory");
  navObj.navigate();
}
 });