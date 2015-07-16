var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ml_admin_1 = require('ml-admin');
var PIMPipeline = (function () {
    function PIMPipeline() {
    }
    PIMPipeline.prototype.transform = function (input) {
        return [];
    };
    PIMPipeline = __decorate([
        ml_admin_1.cpf({
            scope: '/pim/'
        }), 
        __metadata('design:paramtypes', [])
    ], PIMPipeline);
    return PIMPipeline;
})();
exports.PIMPipeline = PIMPipeline;
//# sourceMappingURL=productPipeline.js.map