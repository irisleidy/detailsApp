sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/UIComponent"
], function(Controller,JSONModel, UIComponent) {
  "use strict";

  return Controller.extend("myapp.controller.Details", {
    onInit: function() {            
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.getRoute("details").attachPatternMatched(this._onRouteMatched, this);
    },
    
    _onRouteMatched: function(oEvent) {
      var sKey = oEvent.getParameter("arguments").key;
      var oModel = this.getView().getModel();
      var aItems = oModel.getProperty("/items");   
      var oSelectedItem = aItems.find(function(item) {
        return item.name === sKey;
      }); 
      if (oSelectedItem) {        
        var oDetailModel = new JSONModel(oSelectedItem);        
        this.getView().setModel(oDetailModel, "detail");        
      }      
    }
  });
});