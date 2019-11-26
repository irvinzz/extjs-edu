Ext.define("myapp.view.main", {
    extend: "Ext.container.Container",
    layout: "border",
    items: [{
        region: "center",
        xtype: "myapp.view.cart",
        store: "cartStore",
    }],
});
