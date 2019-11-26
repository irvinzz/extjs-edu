Ext.application({
    name: "myapp",

    models: [
        "cartItem",
    ],

    stores: [
        "cartStore",
    ],

    views: [
        "main",
        "cart",
    ],

    mainView: "main",
});
