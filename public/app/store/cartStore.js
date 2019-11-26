Ext.define("myapp.store.cartStore", {
    id: "cartStore",
    extend: "Ext.data.Store",
    model: "myapp.model.cartItem",
    autoSync: true,
    autoLoad: true,
    proxy: {
        type: "localstorage",
        id: "cartItems",
    },
});
