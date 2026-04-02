define({
  _masterData: [],

  
  onNavigate: function () {
    this.setupDataMap();
    this.setupActions();
    this._loadSchemeData();
    this._initializeDefaultView();
  },

  _initializeDefaultView: function() {
    this.view.AddMethod.listData.selectedKey = "MC";

    // Set visibility: flxCompanyEntry visible, others hidden
    this.view.flxCompanyEntry.isVisible = true;
    this.view.flxEmployeeEntry.isVisible = false;
    this.view.flxDocSelect.isVisible = false;

    // Set default labels and button text
    this.view.EntriesSubHdr.lblSubHdr.text = "Company Entries";
    this.view.btnAddCompanyScheme.text = "ADD COMPANY SCHEME";

    // Ensure popups/overlays are hidden
    this.view.flxSchDetailsPopup.isVisible = false;
    this.view.flxAlert.isVisible = false;

    this.view.forceLayout();
  },

  /** ---------------- DATA MAP ---------------- **/
  setupDataMap: function() {
    this.view.SegSuspendList.segSuspend.widgetDataMap = {
      lblDateVal: "lblDateVal", // Used for Scheme ID
      lblCiFNoVal: "lblCiFNoVal",
      lblIDNoVal: "lblIDNoVal",
      lblCustomerNameVal: "lblCustomerNameVal",
      lblReasonVal: "lblReasonVal",
      imgDelete: "imgDelete",
      flxDelete: "flxDelete",
      flxSchemeIDContainer: "flxSchemeIDContainer", // Container for clicking ID
      imgRearrange: "imgRearrange" // Rearrange icon beside ID
    };
  },

  /** ---------------- ACTION SETUP ---------------- **/
  setupActions: function() {
    // Add Company Scheme Button logic
    this.view.btnAddCompanyScheme.onClick = this._onAddActionClick.bind(this);
    this.view.AddMethod.listData.onSelection = this._onAddMethodSelection.bind(this);

    // Scheme Details Popup Close
    this.view.imgCancel.onTouchEnd = () => {
      this.view.flxSchDetailsPopup.isVisible = false;
    };

    // Bottom Action Buttons
    this.view.btnSubmitAddition.onClick = this._handleSubmitAddition.bind(this);
    this.view.btnDiscard.onClick = this._handleDiscardExit.bind(this);
  },

  _onAddActionClick: function() {
    // 1. Determine which fields to validate based on visibility
    let fieldsToValidate = [];

    if (this.view.flxCompanyEntry.isVisible) {
      fieldsToValidate = [
        this.view.SchemeNumber.txtBox,
        this.view.SchemeName.txtBox,
        this.view.CIFNumber.txtBox,
        this.view.EmployerName.txtBox,
        this.view.RegistrationNumber.txtBox
      ];
    } 
    //     else if (this.view.flxEmployeeEntry.isVisible) {
    //       fieldsToValidate = [
    //         this.view.txtEmpID,
    //         this.view.txtEmpName,
    //         this.view.txtEmpDesignation
    //         // Add other employee textboxes here
    //       ];
    //     }

    // 2. Perform Validation
    const isValid = this._validateFields(fieldsToValidate);

    if (isValid) {
      this._onAddCompanyScheme(); // Proceed with adding data
    } else {
      // Optional: you can still show a small top-level message if you want
      voltmx.print("Validation failed: Red borders applied.");
    }
  },

  _validateFields: function(widgets) {
    let allValid = true;
    const errorSkin = "sknTxtBrdRed";
    const defaultSkin = "sknTxtBxf6f8fa"; // Replace with your actual default skin name

    widgets.forEach(widget => {
      const textValue = (widget.text || "").trim();

      if (textValue === "") {
        widget.skin = errorSkin;
        allValid = false;

        // Add an onTextChange listener to reset the skin when user types
        widget.onTextChange = () => {
          if (widget.text.trim() !== "") {
            widget.skin = defaultSkin;
          }
        };
      } else {
        widget.skin = defaultSkin;
      }
    });

    return allValid;
  },

  /** ---------------- ADD SCHEME LOGIC ---------------- **/
  _onAddCompanyScheme: function() {
    // Mandatory fields check
    const id = this.view.SchemeNumber.txtBox.text;
    const name = this.view.SchemeName.txtBox.text;
    const cif = this.view.CIFNumber.txtBox.text;
    const company = this.view.EmployerName.txtBox.text;
    const reg = this.view.RegistrationNumber.txtBox.text;
    // Add new data to master list
    const newScheme = { id, name, cif, company, reg };
    this._masterData.push(newScheme);

    // Refresh segment and clear inputs
    this._parseAndSetData(this._masterData);
    this._clearAddSchemeInputs();
  },

  _clearAddSchemeInputs: function() {
    const defaultSkin = "sknTxtBxf6f8fa";
    const allFields = [
      this.view.SchemeNumber.txtBox,
        this.view.SchemeName.txtBox,
        this.view.CIFNumber.txtBox,
        this.view.EmployerName.txtBox,
        this.view.RegistrationNumber.txtBox
    ];

    allFields.forEach(field => {
      field.text = "";
      field.skin = defaultSkin; // Reset borders when clearing
    });
  },

  /** ---------------- REARRANGE / SORT ---------------- **/
  _onRearrangeClick: function(eventobject, context) {
    // Simple toggle sort by Scheme ID
    this._masterData.sort((a, b) => a.id.localeCompare(b.id));
    this._parseAndSetData(this._masterData);
  },

  /** ---------------- SET DATA TO SEGMENT ---------------- **/
  _parseAndSetData: function (data) {
    const segmentData = data.map(item => {
      return {
        lblDateVal: { text: item.id, skin: "sknLblUnderline" ,onTouchEnd: () => {
          this.view.flxSchDetailsPopup.isVisible = true;
          // Populate popup labels here if needed
          this.view.SchemeID.lblDetailValue.text = item.id;
        }},
        lblCiFNoVal: item.name,
        lblIDNoVal: item.cif,
        lblCustomerNameVal: item.company,
        lblReasonVal: item.reg,
        imgDelete: "icon_delete.png",
        imgRearrange: "icon_rearrange.png", 
        flxDelete: {
          onTouchEnd: this._onDeleteRow.bind(this)
        }
      };
    });

    this.view.SegSuspendList.segSuspend.setData(segmentData);
  },

  /** ---------------- OVERLAY MANAGEMENT (COMMON COMPONENT) ---------------- **/

  _handleSubmitAddition: function() {
    this._setupCommonOverlay({
      type: "SUBMIT",
      image: "icon_alertcheck.png",
      title: "Entries Successfully Submitted",
      desc1: "Your scheme list changes have been submitted for approval.",
      desc2: " View Request History for current status.",
      btnAction: () => {
        new voltmx.mvc.Navigation("frmSchemeReqHistory").navigate();
      }
    });
  },

  _handleDiscardExit: function() {
    this._setupCommonOverlay({
      type: "EXIT",
      image: "icon_alertwarning.png",
      title: "Are you sure?",
      desc1: "Are you sure you want to exit this session?",
      desc2: "All entries added will be discarded.",
      btnAction: () => {
        // Logic to clear data and navigate back or close
        
        this._masterData = [];
        new voltmx.mvc.Navigation({ "appName": "StandardBank",
                                   "friendlyName": "FrmSBHome"
                                  }).navigate();
      }
    });
  },

  _setupCommonOverlay: function(config) {
    const overlay = this.view.AlertUp;
    overlay.imgAlert.src = config.image;
    overlay.lblAlertHdr.text = config.title;
    overlay.lblAlertMessg.text = config.desc1;
    overlay.lblAlertMsg2.text = config.desc2;
    if(config.type === "EXIT"){
      overlay.flxBtnsExist.isVisible = true;
      overlay.flxRequestHistory.isVisible = false;
      overlay.btnExist.onClick = config.btnAction;
    }else if(config.type === "SUBMIT"){
      overlay.flxBtnsExist.isVisible = false;
      overlay.flxRequestHistory.isVisible = true;
      overlay.btnRequestHistory.onClick = config.btnAction;
    }

    overlay.btnCancel.onClick = () => { this.view.flxAlert.isVisible = false; };

    this.view.flxAlert.isVisible = true;
  },

  /** ---------------- LOAD DATA ---------------- **/
  _loadSchemeData: function () {
    const rawData = [
      { id: "987650", name: "HCL Software", cif: "23280225", company: "HCL Software America", reg: "226556765" },
      { id: "987651", name: "Health Systems", cif: "55565125", company: "Health Systems Inc", reg: "485922550" }
    ];
    this._masterData = rawData;
    this._parseAndSetData(rawData);
  },

  _onDeleteRow: function(eventobject, context) {
    this._masterData.splice(context.rowIndex, 1);
    this._parseAndSetData(this._masterData);
  },
  
  _onAddMethodSelection: function() {
    const selectedKey = this.view.AddMethod.listData.selectedKey;

    const MANUAL_COMPANY = "MC";
    const UPLOAD_COMPANY = "UC";
    const MANUAL_EMPLOYEE = "ME";
    const UPLOAD_EMPLOYEE = "UE";

    switch (selectedKey) {
      case MANUAL_COMPANY:
        this._updateUIState({
          visibleFlex: this.view.flxCompanyEntry,
          subHeader: "Company Entries",
          btnText: "ADD COMPANY SCHEME"
        });
        break;

      case UPLOAD_COMPANY:
        this._updateUIState({
          visibleFlex: this.view.flxDocSelect,
          subHeader: "Company Entries",
          btnText: "ADD COMPANY SCHEME FROM FILE"
        });
        break;

      case MANUAL_EMPLOYEE:
        this._updateUIState({
          visibleFlex: this.view.flxEmployeeEntry,
          subHeader: "Employee Entries",
          btnText: "ADD EMPLOYEE SCHEME"
        });
        break;

      case UPLOAD_EMPLOYEE:
        this._updateUIState({
          visibleFlex: this.view.flxDocSelect,
          subHeader: "Employee Entries",
          btnText: "ADD EMPLOYEE SCHEME FROM FILE"
        });
        break;
    }
  },
  _updateUIState: function(config) {
    this.view.flxCompanyEntry.isVisible = false;
    this.view.flxEmployeeEntry.isVisible = false;
    this.view.flxDocSelect.isVisible = false;

    config.visibleFlex.isVisible = true;

    this.view.EntriesSubHdr.lblSubHdr.text = config.subHeader;
    this.view.btnAddCompanyScheme.text = config.btnText;

    this.view.forceLayout();
  },
});