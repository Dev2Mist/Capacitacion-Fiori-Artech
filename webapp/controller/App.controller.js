sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
  function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("mi.app.controller.App", {
      onPulsar: function () {
        // 1. Capturar la vista actual
        var oView = this.getView();

        // 2. Buscar el input por su ID
        var oInput = oView.byId("miInput");

        // 3. Obtener el valor
        var sNombre = oInput.getValue();

        // 4. Mostrar mensaje
        if (sNombre) {
          MessageToast.show("Hola " + sNombre);
        } else {
          MessageToast.show("¡Escribe algo primero!");
        }
      },
    });
  }
);
