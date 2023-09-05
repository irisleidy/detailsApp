sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Component"  
  ], function(Controller, JSONModel, Component) {
    "use strict";
  
    return Controller.extend("myapp.controller.App", {
      onInit: function() {
        var oModel = new JSONModel();        
        oModel.loadData("data.json");
        this.getView().setModel(oModel);
      },

      onItemSelected: function(oEvent) {
        var oSelectedItem = oEvent.getParameter("selectedItem");
        var sSelectedKey = oSelectedItem.getKey();
        
        var oModel = this.getView().getModel();
        oModel.setProperty("/selectedItem", sSelectedKey);

        var button = this.getView().byId("btnDetails");
        button.setEnabled(oSelectedItem !== null);
      },
      
      onShowDetails: function() {        
        var oModel = this.getView().getModel();
        console.log('MODEL', oModel)
        var sSelectedKey = oModel.getProperty("/selectedItem");    
        
        // Navegar a la vista de detalles solo si se ha seleccionado un nombre en el ComboBox
        if (sSelectedKey) {
          var oOwnerComponent = Component.getOwnerComponentFor(this.getView());
          var oRouter = oOwnerComponent.getRouter()        
          oRouter.navTo("details", {
            key: sSelectedKey
          });
        }
      }      
    });
  });