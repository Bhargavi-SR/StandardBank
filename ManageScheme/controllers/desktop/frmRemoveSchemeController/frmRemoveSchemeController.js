define({
    /** ---------------- STATE ---------------- **/
    _removeMethods: {
        MANUAL_COMPANY: "MC",
        UPLOAD_COMPANY: "UC",
        MANUAL_EMPLOYEE: "ME",
        UPLOAD_EMPLOYEE: "UE"
    },

    /** ---------------- ENTRY ---------------- **/
    onNavigate() {
        this._initializeActions();
        this._initializeDefaultView();
    },

    _initializeActions() {
        // ListBox Selection Event
      this.view.AddMethod.listData.onSelection = () => {
            this._handleMethodSelection()
                .catch(err => { throw new Error(`UI Update Failed: ${err.message}`); });
        };
    },

    _initializeDefaultView() {
        // Set initial selection and trigger update
        this.view.AddMethod.listData.selectedKey = this._removeMethods.MANUAL_COMPANY;
        this._handleMethodSelection();
    },

    /** ---------------- LOGIC ---------------- **/

    /**
     * Handles the visibility and text logic based on dropdown selection
     * @returns {Promise<boolean>}
     */
    _handleMethodSelection() {
        return new Promise((resolve) => {
            const selectedMethod = this.view.AddMethod.listData.selectedKey;
            
            // Define Visibility States
            let showSchemeSrch = false;
            let showEmployeeSrch = false;
            let showDocSelect = false;
            let buttonText = "";

            switch (selectedMethod) {
                case this._removeMethods.MANUAL_COMPANY:
                    showSchemeSrch = true;
                    buttonText = "REMOVE COMPANY SCHEME";
                    break;

                case this._removeMethods.UPLOAD_COMPANY:
                    showDocSelect = true;
                    buttonText = "REMOVE COMPANY SCHEMES IN FILE";
                    break;

                case this._removeMethods.MANUAL_EMPLOYEE:
                    showSchemeSrch = true;
                    showEmployeeSrch = true;
                    buttonText = "REMOVE EMPLOYEE FROM SCHEME";
                    break;

                case this._removeMethods.UPLOAD_EMPLOYEE:
                    showDocSelect = true;
                    buttonText = "REMOVE EMPLOYEE FROM SCHEME";
                    break;

                default:
                    throw new Error("Invalid Removal Method selected");
            }

            // Execute UI Update
            this._updateUI({ showSchemeSrch, showEmployeeSrch, showDocSelect, buttonText });
            resolve(true);
        });
    },

    /**
     * Updates widget properties using ES6 destructuring and defaults
     * @param {Object} config - Visibility and text configuration
     */
    _updateUI({ showSchemeSrch = false, showEmployeeSrch = false, showDocSelect = false, buttonText = "" } = {}) {
        // Set Visibility
        this.view.flxSchemeSrch.isVisible = showSchemeSrch;
        this.view.flxEmployeeSrch.isVisible = showEmployeeSrch;
        this.view.flxDocSelect.isVisible = showDocSelect;

        // Set Button Text using Ternary for safety
        this.view.btnAddCompanyScheme.text = buttonText ? buttonText : "SUBMIT";

        // Layout Batching Performance
        this.view.forceLayout();
    },

    /** ---------------- DATA MAPPING ---------------- **/
    
    /**
     * Example of using Spread Operator for segment data defaults
     * @param {Array} rawData - Data from service
     */
    _mapSegmentData(rawData = []) {
        const defaultValues = {
            lblRegID: "N/A",
            imgDelete: "delete_icon.png"
        };

        const processedData = rawData.map(item => ({
            ...defaultValues, // ES6 Spread Operator for defaults
            lblSchemeID: item.schemeID,
            lblSchemeName: item.schemeName,
            lblCIF: item.cifNo
        }));

        this.view.segRemoveEntries.setData(processedData);
    }
});