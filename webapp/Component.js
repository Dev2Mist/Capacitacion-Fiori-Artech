sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";

  return UIComponent.extend("mi.app.Component", {
    metadata: {
      manifest: "json",
    },

    init: function () {
      // Llama a la función init del padre
      this.ownerComponent.setModel(new ResourceModel({
          bundleName: "artech.capacitacion.i18n.i18n" // <--- CAMBIA ESTO por tu ruta real
      }), "i18n");
      UIComponent.prototype.init.apply(this, arguments);
    },
  });
});
