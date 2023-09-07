sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("myapp.controller.Details", {
    onAfterRendering: function() {      
      var oModel = this.getView().getModel();
      var aItems = oModel.getProperty("/items");
      var oTable = this.getView().byId("myTable");
      var oRouter = this.getOwnerComponent().getRouter();
      new Promise(function(resolve, reject) {
        oRouter.attachRouteMatched(function(oEvent) {
          var sKey = oEvent.getParameter("arguments").key;
          resolve(sKey);
        });
      }).then(function(sKey) {  
        var oSelectedItem = aItems.find(function(item) {
          return item.name === sKey;
        });
        
        // Crear las columnas de la tabla
        for (var key in oSelectedItem) {
          if (oSelectedItem.hasOwnProperty(key)) {                    
            var oColumn = new sap.m.Column({
              header: new sap.m.Text({
                text: key
              })
            });
            oTable.addColumn(oColumn);
          }
        }
        // Limpiar elementos, no salga fila en blanco
        oTable.removeAllItems();

        // Crear la fila con la información
        var oItem = new sap.m.ColumnListItem();
        for (var key in oSelectedItem) {
          if (oSelectedItem.hasOwnProperty(key)) {
            var value = oSelectedItem[key];
            
            var oCell = new sap.m.Text({
              text: value
            });

            oItem.addCell(oCell);
          }
        }
        oTable.addItem(oItem);                
      });           
    }
  });
});