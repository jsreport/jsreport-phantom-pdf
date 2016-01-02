define(["jquery", "app", "marionette", "backbone", "./phantom.template.view", "./phantom.template.model"],
    function($, app, Marionette, Backbone, TemplateView, Model) {

        app.on("template-extensions-render", function(context) {
            var view;

            function renderRecipeMenu() {
                if (context.template.get("recipe") === "phantom-pdf") {
                    var model = new Model();
                    model.setTemplate(context.template);
                    view = new TemplateView({ model: model});

                    setTimeout(function() {
                        context.extensionsRegion.show(view, "phantom");
                    }, 0);
                } else {
                    if (view != null)
                        $(view.el).remove();
                }
            }

            renderRecipeMenu();

            context.template.on("change:recipe", function() {
                renderRecipeMenu();
            });
        });
    });