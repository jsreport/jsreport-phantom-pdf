define(["app", "core/basicModel", "underscore"], function (app, ModelBase, _) {
   
    return ModelBase.extend({
        
        setTemplate: function (templateModel) {
            this.templateModel = templateModel;
            
            if (templateModel.get("phantom") == null) {
                 templateModel.set("phantom", new $entity.Phantom());
            }
            
            this.set(templateModel.get("phantom").initData);
        },

        initialize: function () {
            var self = this;
            this.listenTo(this, "change", function() {
                self.copyAttributesToEntity(self.templateModel.get("phantom"));
            });
        },
    });
});