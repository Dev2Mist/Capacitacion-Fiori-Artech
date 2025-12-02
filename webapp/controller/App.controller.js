sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("artech.capacitacion.fiori.controller.App", {
      onInit: function () {},

      onSaludar: function () {
        var oView = this.getView();
        var oInput = oView.byId("inputNombre");
        var sNombre = oInput.getValue();

        if (!sNombre) {
          MessageToast.show("¡Por favor escribe un nombre!");
          return;
        }

        MessageToast.show("¡Hola " + sNombre + ", bienvenido a Fiori!");
      },
    });
  }
);
