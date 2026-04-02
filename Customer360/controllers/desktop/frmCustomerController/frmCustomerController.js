define({
  /** ---------------- STATE ---------------- **/
  _masterFinancialData: [],

  /** ---------------- ENTRY ---------------- **/
  onNavigate() {
    this._setupDataMap();
    this._initializeTabActions();
    this._initializeView()
      .catch(err => { throw new Error(`Form Initialization Failed: ${err.message}`); }); // Throwing exception instead of print
  },

  /** ---------------- DATA MAPPING ---------------- **/
  _setupDataMap() {
    this.view.lblOutStandingBalHDr.text = "Outstanding \n   Balance";
    this.view.segInternalExposure.widgetDataMap = {
      lblAcctType: "lblAcctType",
      lblAccNo: "lblAccNo",
      lblBRI: "lblBRI",
      lblOutstandingBal: "lblOutstandingBal",
      lblInstalment: "lblInstalment",
      lblArrearsExcess: "lblArrearsExcess",
      lblAmountDue: "lblAmountDue",
      lblOrgLoanAmt: "lblOrgLoanAmt",
      lblOrgLimit: "lblOrgLimit",
      lblCurrentLimit: "lblCurrentLimit",
      lblInterestRate: "lblInterestRate",
      lblOriginationDate: "lblOriginationDate",
      lblOriginalTerm: "lblOriginalTerm",
      lblRemTerm: "lblRemTerm",
      flxRow: "flxRow"
    };
  },
  /** ---------------- ACTIONS ---------------- **/
  _initializeTabActions() {
    // Tab Click Events
    this.view.flxInternalExpo.onClick = () => this._switchTab("INTERNAL");
    this.view.flxFixedAssets.onClick = () => this._switchTab("FIXED");
    this.view.flxCollateral.onClick = () => this._switchTab("COLLATERAL");
    this.view.flxInsuranceAss.onClick = () => this._switchTab("INSURANCE");
  },

  _switchTab(tabName){
    this.view.flxInternalLine.isVisible = (tabName === "INTERNAL");
    this.view.flxFixedLine.isVisible = (tabName === "FIXED");
    this.view.flxCollateralLine.isVisible = (tabName === "COLLATERAL");
    this.view.flxInsuranceLine.isVisible = (tabName === "INSURANCE");

    const isCollateral = (tabName === "COLLATERAL");
    this.view.flxSegData.isVisible = !isCollateral;
    this.view.flxChart.isVisible = !isCollateral;
    this.view.flxCollaInfo.isVisible = isCollateral;
    //this.view.flxInsuranceInfo.isVisible = isInsurance;
    if (isCollateral) {
        this._buildCollateralUI(GlobalData.collateralData)
            .catch(err => { throw new Error('Dynamic UI Build Failed: ' + err.message); });
    }
  },

  /** ---------------- ASYNC DATA LOADING ---------------- **/
  /**
     * Initializes the view by fetching global data
     * @returns {Promise<boolean>}
     */
  _initializeView() {
    return new Promise((resolve, reject) => {
      try {
        // ES6 Spread operator for default parameters/cloning
        this._masterFinancialData = [...GlobalData.financialRecords];
        this._renderSegment(this._masterFinancialData);
        resolve(true);
      } catch (error) {
        reject(new Error(`Failed to load global data: ${error.message}`));
      }
    });
  },



  /** ---------------- RENDER LOGIC ---------------- **/
  /**
     * Maps data to the segment with performance optimization
     * @param {Array} data - The array of financial records
     */
  _renderSegment(data = []) {
    const processedData = data.map(item => {
      // ES6 Destructuring for clean variable access
      const { 
        type, accNo, bri, balance, instalment, arrears, due,
        origAmount, origLimit, currLimit, rate, date, term, rem 
      } = item;

      // ES6 Ternary operator for conditional row skinning
      //const rowSkin = type === "HMLN" ? "sknRowBlueHighlight" : "sknRowWhite";

      return {
        //flxRow: { skin: rowSkin },
        lblAcctType: type,
        lblAccNo: accNo,
        lblBRI: bri,
        lblOutstandingBal: balance,
        lblInstalment: instalment,
        lblArrearsExcess: arrears,
        lblAmountDue: due,
        lblOrgLoanAmt: origAmount,
        lblOrgLimit: origLimit,
        lblCurrentLimit: currLimit,
        lblInterestRate: rate,
        lblOriginationDate: date,
        lblOriginalTerm: term,
        lblRemTerm: rem
      };
    });

    this.view.segInternalExposure.setData(processedData);

    /** * BATCHING AND PERFORMANCE DOCUMENTATION:
         * forceLayout ensures that all 14+ labels per row have their dimensions 
         * calculated in a single UI thread pass. This is critical for 
         * high-density forms to prevent flickering and lag.
         */
    this.view.forceLayout();
  },

  _buildCollateralUI(data = []) {
    return new Promise((resolve) => {
      // 1. Clear existing dynamic content to prevent duplicates
      this.view.flxCollaInfo.removeAll();

      // 2. Iterate and create rows (Each row contains up to 3 items based on grid)
      let currentHorizontalFlex = null;

      data.forEach((record, index) => {
        // Logic: Create a new horizontal container every 3 items for the grid look
        if (index % 3 === 0) {
          currentHorizontalFlex = this._createHorizontalRow(index);
          this.view.flxCollaInfo.add(currentHorizontalFlex);
        }

        // 3. Create the individual Collateral Card
        const collateralCard = this._createCollateralCard(record, index);
        currentHorizontalFlex.add(collateralCard);
      });

      // Layout Batching Performance: Reflow the entire vertical container once
      this.view.forceLayout();
      resolve(true);
    });
  },
  _createHorizontalRow(index) {
        return new voltmx.ui.FlexContainer({
            "id": "flxRow"+index,
            "top": "20dp",
            "left": "0dp",
            "width": "100%",
            "height": '50%',
          	"skin": "sknFlxTrans",
            "layoutType": voltmx.flex.FLOW_HORIZONTAL,
            "isVisible": true
        }, {}, {});
    },
  _createCollateralCard(record, index) {
        const { type, detail, account, value } = record;
        
        // Use a pre-designed FlexContainer as a template if possible, 
        // otherwise create the hierarchy dynamically:
        const flxCard = new voltmx.ui.FlexContainer({
            "id": "flxCollData"+index,
            "width": "48%",
            "height": "100%",
            "left": "2%",
            "skin": "sknFlxWhiteBGBlckBrdr", // Skin from your Screenshot
            "layoutType": voltmx.flex.FREE_FORM
        }, {}, {});

        // Add Labels (Simplified mapping based on your flxCollType structure)
        const lblType = new voltmx.ui.Label({
            "id": "lblType" + index,
            "text": type,
            "skin": "sknLblFormLevel",
            "top": "15dp", "left": "15dp"
        }, {}, {});

        const lblDetail = new voltmx.ui.Label({
            "id": "lblDetail"+index,
            "text": detail,
          "skin": "sknLblFormLevel",
            "top": "35dp", "left": "15dp"
        }, {}, {});

        const lblAccount = new voltmx.ui.Label({
            "id": "lblAcct" +index,
            "text": account,
          "skin": "sknLblFormLevel",
            "top": "75dp", "left": "15dp"
        }, {}, {});

        const lblVal = new voltmx.ui.Label({
            "id": "lblVal"+index,
            "text": value,
          "skin": "sknLblFormLevel",
            "right": "15dp", //"centerY": "50%",
            //"skin": "sknLblLargeValue"
        }, {}, {});

        flxCard.add(lblType, lblDetail, lblAccount, lblVal);
        return flxCard;
    }
});