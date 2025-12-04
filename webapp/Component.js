sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";

  return UIComponent.extend("mi.app.Component", {
    metadata: {
      manifest: "json",
    },

    init: function () {
      // Llama a la función init del padre
      UIComponent.prototype.init.apply(this, arguments);
    },
  });
});
