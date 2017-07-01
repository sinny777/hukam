webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\n<nav class=\"navbar navbar-primary navbar-transparent navbar-fixed-top navbar-color-on-scroll\" id=\"sectionsNav\">\n\t<div class=\"container\">\n        <div class=\"navbar-header\">\n\t\t    \t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#navigation-index\">\n\t\t        \t<span class=\"sr-only\">Toggle navigation</span>\n\t\t        \t<span class=\"icon-bar\"></span>\n\t\t        \t<span class=\"icon-bar\"></span>\n\t\t        \t<span class=\"icon-bar\"></span>\n\t\t    \t</button>\n\t    \t\t<a routerLink=\"/home\">\n\t        \t<div class=\"logo-container\">\n\t                <div class=\"brand\">\n\t                    Hukam\n\t                </div>\n\t\t\t\t\t\t</div>\n\t      \t</a>\n\t    </div>\n\n\t    <div class=\"collapse navbar-collapse\" id=\"navigation-index\">\n\t    \t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t<li *ngIf=\"!currentUser || !currentUser.name\">\n\t\t\t\t\t\t\t\t<a href=\"#\" data-toggle=\"modal\" data-target=\"#loginModal\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">login</i> Login\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li *ngIf=\"currentUser && currentUser.name\" class=\"dropdown\">\n\t\t\t\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t\t\t\t {{currentUser.name}}\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu dropdown-menu-right\">\n\t\t\t\t\t\t\t\t\t\t<li><a routerLink=\"/account\" >Account Settings</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/account/places\">My Places</a></li>\n\t\t\t\t\t\t\t\t\t\t<li class=\"divider\"></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\" (click)=\"logout();\">Logout</a></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li class=\"dropdown\">\n\t\t\t\t\t\t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t\t<i class=\"material-icons\">menu</i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu dropdown-menu-right\">\n\t\t\t\t\t\t\t\t\t\t<li class=\"dropdown-header\">Company</li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/aboutus\">About Us</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/careers\">Careers</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/contact\">Contact Us</a></li>\n\t\t\t\t\t\t\t\t\t\t<li class=\"divider\"></li>\n\t\t\t\t\t\t\t\t\t\t<li class=\"dropdown-header\">Services</li>\n\t\t\t\t\t\t\t\t\t\t<li><a routerLink=\"/iot/hbuddy\" >Home Automation</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/iot/industries\">Industry Solutions</a></li>\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"/iot/agriculture\">Smart Agriculture</a></li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</li>\n\t    \t</ul>\n\t    </div>\n\t</div>\n</nav>\n<!-- End Navbar -->\n\n<!-- Login Modal -->\n<div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n\t<div class=\"modal-dialog modal-login\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"card card-signup card-plain\">\n\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t<button #closeBtn type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\"><i class=\"material-icons\">clear</i></button>\n\n\t\t\t\t\t<div class=\"header header-primary text-center\">\n\t\t\t\t\t\t<h4 class=\"card-title\">Log in</h4>\n\t\t\t\t\t\t<div class=\"social-line\">\n\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" (click)=\"signIn('google');\" class=\"btn btn-just-icon btn-simple\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-google-plus\"></i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" (click)=\"signIn('facebook');\" class=\"btn btn-just-icon btn-simple\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" (click)=\"signIn('linkedin');\" class=\"btn btn-just-icon btn-simple\">\n\t\t\t\t\t\t\t\t<i class=\"fa fa-linkedin\"></i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<form class=\"form\" method=\"\" action=\"http://demos.creative-tim.com/material-kit-pro/index.html\">\n\t\t\t\t\t\t<p class=\"description text-center\">Or Be Classical</p>\n\t\t\t\t\t\t<div class=\"card-content\">\n\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">email</i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<div class=\"form-group is-empty\"><input type=\"text\" class=\"form-control\" placeholder=\"Email...\"><span class=\"material-input\"></span></div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">lock_outline</i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<div class=\"form-group is-empty\"><input type=\"password\" placeholder=\"Password...\" class=\"form-control\"><span class=\"material-input\"></span></div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<!-- If you want to add a checkbox to this form, uncomment this code\n\n\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\" checked>\n\t\t\t\t\t\t\t\t\tSubscribe to newsletter\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer text-center\">\n\t\t\t\t\t<a href=\"http://demos.creative-tim.com/material-kit-pro/index.html#pablo\" class=\"btn btn-primary btn-simple btn-wd btn-lg\">Get Started</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<!--  End Modal -->\n\n\t<!-- <app-dashboard></app-dashboard> -->\n\t<!-- <app-home></app-home> -->\n\t<router-outlet></router-outlet>\n\n<footer class=\"footer\">\n\t<div class=\"container\">\n\t\t\t<nav class=\"pull-left\">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"/\">\n\t\t\t\t\t\t\t\tHukam Technologies\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"/privacy\">\n\t\t\t\t\t\t\t\tPrivacy\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a href=\"/terms\">\n\t\t\t\t\t\t\t\tTerms Of Use\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t</nav>\n\t\t\t<ul class=\"social-buttons pull-center\">\n\t\t\t\t<li>\n\t\t\t\t\t<a rel=\"tooltip\" title=\"Follow us on Twitter\" data-placement=\"top\" href=\"https://twitter.com/HukamTechnologies\" target=\"_blank\" class=\"btn btn-just-icon btn-simple btn-twitter\">\n\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a rel=\"tooltip\" title=\"Like us on Facebook\" data-placement=\"top\" href=\"https://www.facebook.com/HukamTechnologies\" target=\"_blank\" class=\"btn btn-just-icon btn-simple btn-facebook\">\n\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a rel=\"tooltip\" title=\"Follow us on Google\" data-placement=\"top\" href=\"https://www.instagram.com/HukamTechnologies\" target=\"_blank\" class=\"btn btn-just-icon btn-simple btn-google\">\n\t\t\t\t\t\t<i class=\"fa fa-google\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<a rel=\"tooltip\" title=\"Connect with us on LinkedIn\" data-placement=\"top\" href=\"https://www.linkedin.com/HukamTechnologies\" target=\"_blank\" class=\"btn btn-just-icon btn-simple btn-linkedin\">\n\t\t\t\t\t\t<i class=\"fa fa-linkedin\"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\n\t\t\t<div class=\"copyright pull-right\">\n\t\t\t\t\t&copy; 2017, made with <i class=\"material-icons\">favorite</i> by Hukam Technologies.\n\t\t\t</div>\n\t</div>\n</footer>\n\n<script type=\"text/javascript\">\n\n  $().ready(function(){\n    // the body of this function is in assets/material-kit/assets/material-kit.js\n\n        materialKit.initSliders();\n        window_width = $(window).width();\n\n          if (window_width >= 992){\n            big_image = $('.wrapper > .header');\n\n            $(window).on('scroll', materialKitDemo.checkScrollForParallax);\n          }\n\n  });\n</script>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_social_login__ = __webpack_require__("../../../../angular2-social-login/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(_auth, sharedService) {
        this._auth = _auth;
        this.sharedService = sharedService;
        this.currentUser = this.sharedService.getCurrentUser();
    }
    AppComponent.prototype.signIn = function (provider) {
        var _this = this;
        console.log("Sign In to: >>> ", provider);
        this.sub = this._auth.login(provider).subscribe(function (data) {
            console.log(data);
            _this.currentUser = data;
            _this.sharedService.setCurrentUser(_this.currentUser);
            _this.closeBtn.nativeElement.click();
        });
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        this._auth.logout().subscribe(function (data) {
            _this.currentUser = null;
        });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('closeBtn'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "closeBtn", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_social_login__["b" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_social_login__["b" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_shared_service__["a" /* SharedService */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_social_login__ = __webpack_require__("../../../../angular2-social-login/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home_component__ = __webpack_require__("../../../../../src/app/pages/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__agm_core__ = __webpack_require__("../../../../@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__agm_core_services_google_maps_api_wrapper__ = __webpack_require__("../../../../@agm/core/services/google-maps-api-wrapper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__agm_core_services_managers_marker_manager__ = __webpack_require__("../../../../@agm/core/services/managers/marker-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_mqtt_service__ = __webpack_require__("../../../../../src/app/services/mqtt.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_h_buddy_h_buddy_component__ = __webpack_require__("../../../../../src/app/pages/h-buddy/h-buddy.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var providers = {
    "google": {
        "clientId": "874807563899-9kk6gpacomg9t56pqfc4o8n4gn365ppg.apps.googleusercontent.com"
    },
    "linkedin": {
        "clientId": "81ann4egou3i6j"
    },
    "facebook": {
        "clientId": "330079704089458",
        "apiVersion": "v2.9" //like v2.4
    }
};
var appRoutes = [
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home_component__["a" /* HomeComponent */] },
    { path: 'iot/hbuddy', component: __WEBPACK_IMPORTED_MODULE_12__pages_h_buddy_h_buddy_component__["a" /* HBuddyComponent */] },
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_6__pages_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pages_h_buddy_h_buddy_component__["a" /* HBuddyComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_angular2_social_login__["a" /* Angular2SocialLoginModule */],
            __WEBPACK_IMPORTED_MODULE_7__agm_core__["a" /* AgmCoreModule */].forRoot({
                apiKey: 'AIzaSyD3oMSe59cIpUnouvFcWT3oP3iPwsRp5zk'
            })
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__agm_core_services_google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */], __WEBPACK_IMPORTED_MODULE_9__agm_core_services_managers_marker_manager__["a" /* MarkerManager */], __WEBPACK_IMPORTED_MODULE_10__services_mqtt_service__["a" /* MqttService */], __WEBPACK_IMPORTED_MODULE_11__services_shared_service__["a" /* SharedService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

__WEBPACK_IMPORTED_MODULE_3_angular2_social_login__["a" /* Angular2SocialLoginModule */].loadProvidersScripts(providers);
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\nagm-map {\n  height: 500px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n\t<div class=\"header header-filter\" style=\"background-image: url('assets/material-kit/assets/img/bg2.jpeg');\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t<div class=\"brand\">\n\t\t\t\t\t\t<h1>Material Kit.</h1>\n\t\t\t\t\t\t<h3>A Badass Bootstrap UI Kit based on Material Design.</h3>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t</div>\n\n\t<div class=\"main main-raised\">\n\t\t<div class=\"section section-basic\">\n\t    \t<div class=\"container\">\n\t            <div class=\"title\">\n\t                <h2>Basic Elements</h2>\n\t            </div>\n\n\t\t        <div id=\"buttons\">\n\t\t\t\t\t<div class=\"title\">\n\t\t\t\t\t\t<h3>Buttons <br />\n\t\t\t\t\t\t\t<small>Pick your style</small>\n\t\t\t\t\t\t</h3>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t\t\t<button class=\"btn btn-primary\">Default</button>\n\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-round\">Round</button>\n\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-round\">\n\t\t\t\t\t\t\t\t<i class=\"material-icons\">favorite</i> With Icon\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-fab btn-fab-mini btn-round\">\n\t\t\t\t\t\t\t\t<i class=\"material-icons\">favorite</i>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button class=\"btn btn-primary btn-simple\">Simple</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"title\">\n\t                    <h3><small>Pick your size</small></h3>\n\t                </div>\n\t                <div class=\"row\">\n\t                    <div class=\"col-md-8 col-md-offset-2\">\n\t                        <button class=\"btn btn-primary btn-xs\">x-Small</button>\n\t                        <button class=\"btn btn-primary btn-sm\">Small</button>\n\t                        <button class=\"btn btn-primary\">Regular</button>\n\t                        <button class=\"btn btn-primary btn-lg\">Large</button>\n\t                    </div>\n\t                </div>\n\n\t\t\t\t\t<div class=\"title\">\n\t                    <h3><small> Pick your color </small></h3>\n\t                </div>\n\t                <div class=\"row\">\n\t                    <div class=\"col-md-8 col-md-offset-2\">\n\t                        <button class=\"btn\">Default</button>\n\t                        <button class=\"btn btn-primary\">Primary</button>\n\t                        <button class=\"btn btn-info\">Info</button>\n\t                        <button class=\"btn btn-success\">Success</button>\n\t                        <button class=\"btn btn-warning\">Warning</button>\n\t                        <button class=\"btn btn-danger\">Danger</button>\n\t                    </div>\n\t                </div>\n\t                <div class=\"title\">\n\t                    <h3>Links</h3>\n\t                </div>\n\t                <div class=\"row\">\n\t                    <div class=\"col-md-8 col-md-offset-2\">\n\t                        <button class=\"btn btn-simple\">Default</button>\n\t                        <button class=\"btn btn-simple btn-primary \">Primary</button>\n\t                        <button class=\"btn btn-simple btn-info\">Info</button>\n\t                        <button class=\"btn btn-simple btn-success\">Success</button>\n\t                        <button class=\"btn btn-simple btn-warning\">Warning</button>\n\t                        <button class=\"btn btn-simple btn-danger\">Danger</button>\n\t                    </div>\n\t                </div>\n\t\t        </div>\n\n\t\t        <div id=\"inputs\">\n\t\t            <div class=\"title\">\n\t\t                <h3>Inputs</h3>\n\t\t            </div>\n\n\t\t            <div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t                \t<div class=\"form-group\">\n\t\t        \t        \t<input type=\"text\" value=\"\" placeholder=\"Regular\" class=\"form-control\" />\n\t\t                \t</div>\n\t\t                </div>\n\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t\t\t\t\t\t<div class=\"form-group label-floating\">\n\t\t\t\t\t\t\t\t<label class=\"control-label\">With Floating Label</label>\n\t\t\t\t\t\t\t\t<input type=\"email\" class=\"form-control\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t                <div class=\"col-sm-3\">\n\t\t                \t<div class=\"form-group label-floating has-success\">\n\t\t\t\t\t\t\t\t<label class=\"control-label\">Success input</label>\n\t\t                    \t<input type=\"text\" value=\"Success\" class=\"form-control\" />\n\t\t\t\t\t\t\t\t<span class=\"form-control-feedback\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">done</i>\n\t\t\t\t\t\t\t\t</span>\n\t\t                \t</div>\n\t\t                </div>\n\n\t\t                <div class=\"col-sm-3\">\n\t\t                \t<div class=\"form-group label-floating has-error\">\n\t\t\t\t\t\t\t\t<label class=\"control-label\">Error input</label>\n\t\t                    \t<input type=\"email\" value=\"Error Input\" class=\"form-control\" />\n\t\t                    \t<span class=\"material-icons form-control-feedback\">clear</span>\n\t\t                \t</div>\n\t\t                </div>\n\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">group</i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"With Material Icons\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-group\"></i>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"With Font Awesome Icons\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"space-70\"></div>\n\n\t\t\t\t<div id=\"checkRadios\">\n\t\t\t\t    <div class=\"row\">\n\t\t                <div class=\"col-sm-3\">\n\t\t                    <div class=\"title\">\n\t\t                        <h3>Checkboxes</h3>\n\t\t                    </div>\n\n\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\">\n\t\t\t\t\t\t\t\t\tUnchecked\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\" checked>\n\t\t\t\t\t\t\t\t\tChecked\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\" disabled>\n\t\t\t\t\t\t\t\t\tDisabled Unchecked\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\" disabled checked>\n\t\t\t\t\t\t\t\t\tDisabled Checked\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\n\t\t                </div>\n\n\t\t                <div class=\"col-sm-3\">\n\t\t                    <div class=\"title\">\n\t\t                        <h3>Radio Buttons</h3>\n\t\t                    </div>\n\n\t\t\t\t\t\t\t<div class=\"radio\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"optionsRadios\">\n\t\t\t\t\t\t\t\t\tRadio is off\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"radio\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"optionsRadios\" checked=\"true\">\n\t\t\t\t\t\t\t\t\tRadio is on\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"radio\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"optionsRadiosDisabled\" disabled>\n\t\t\t\t\t\t\t\t\tDisabled Radio is off\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"radio\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"optionsRadiosDisabled\" checked=\"true\" disabled>\n\t\t\t\t\t\t\t\t\tDisabled Radio is on\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t                </div>\n\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t                    <div class=\"title\">\n\t\t                        <h3>Toggle Buttons</h3>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"togglebutton\">\n\t\t\t\t            \t<label>\n\t\t\t\t                \t<input type=\"checkbox\" checked=\"\">\n\t\t\t\t\t\t\t\t\tToggle is on\n\t\t\t\t            \t</label>\n\t\t\t\t            </div>\n\n\t\t\t\t\t\t\t<div class=\"togglebutton\">\n\t\t\t\t            \t<label>\n\t\t\t\t                \t<input type=\"checkbox\">\n\t\t\t\t\t\t\t\t\tToggle is off\n\t\t\t\t            \t</label>\n\t\t\t\t            </div>\n\t\t                </div>\n\n\t\t\t\t\t\t<div class=\"col-sm-3\">\n\t\t\t\t\t\t\t<div class=\"title\">\n\t\t                        <h3>Sliders</h3>\n\t\t                    </div>\n\n\t\t\t\t\t\t\t<div id=\"sliderRegular\" class=\"slider\"></div>\n\t\t\t\t\t\t\t<div id=\"sliderDouble\" class=\"slider slider-info\"></div>\n\t\t\t\t\t\t</div>\n\n\t\t            </div>\n\t\t        </div>\n\t    \t</div>\n\t    </div>\n\n\t    <div class=\"section section-navbars\">\n\t        <div class=\"container\" id=\"menu-dropdown\">\n\n\t\t\t\t<div class=\"row\">\n\t                <div class=\"col-md-6\">\n\t                    <div class=\"title\">\n\t                        <h3>Menu</h3>\n\t                    </div>\n\n                        <nav class=\"navbar navbar-default\">\n                        \t<div class=\"container-fluid\">\n\t                            <div class=\"navbar-header\">\n\t                            \t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar\">\n\t                            \t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t\t                            </button>\n\t                            \t<a class=\"navbar-brand\" href=\"#\">Menu</a>\n\t                            </div>\n\n\t                            <div class=\"collapse navbar-collapse\" id=\"example-navbar\">\n\t                            \t<ul class=\"nav navbar-nav\">\n\t                        \t\t\t<li class=\"active\"><a href=\"#\">Link</a></li>\n\t                            \t\t<li><a href=\"#\">Link</a></li>\n\t                                \t<li class=\"dropdown\">\n\t                                \t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown\n\t\t\t\t\t\t\t\t\t\t\t\t<b class=\"caret\"></b>\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t                                    \t<ul class=\"dropdown-menu dropdown-menu-right\">\n\t                                        \t<li class=\"dropdown-header\">Dropdown header</li>\n\t                                        \t<li><a href=\"#\">Action</a></li>\n\t\t                                        <li><a href=\"#\">Another action</a></li>\n\t\t                                        <li><a href=\"#\">Something else here</a></li>\n\t\t                                        <li class=\"divider\"></li>\n\t\t                                        <li><a href=\"#\">Separated link</a></li>\n\t\t                                        <li class=\"divider\"></li>\n\t\t                                        <li><a href=\"#\">One more separated link</a></li>\n\t\t                                    </ul>\n\t                                \t</li>\n\t                            \t</ul>\n\t                            </div>\n\t\t\t\t\t\t\t</div>\n                        </nav>\n\t                </div>\n\t                <div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"title\">\n\t                        <h3>Menu with Icons</h3>\n\t                    </div>\n\n\t                    <nav class=\"navbar navbar-info\">\n\t                    \t<div class=\"container-fluid\">\n\t\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t                            \t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-icons\">\n\t\t                                <span class=\"sr-only\">Toggle navigation</span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t\t                                <span class=\"icon-bar\"></span>\n\t                            \t</button>\n\t                            \t<a class=\"navbar-brand\" href=\"#\">Icons</a>\n\t                            </div>\n\n\t                            <div class=\"collapse navbar-collapse\" id=\"example-navbar-icons\">\n\t                            \t<ul class=\"nav navbar-nav navbar-right\">\n\t                        \t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#pablo\"><i class=\"material-icons\">email</i></a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t                            \t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#pablo\"><i class=\"material-icons\">face</i></a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t                                \t<li class=\"dropdown\">\n\t                                \t\t<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">settings</i>\n\t\t\t\t\t\t\t\t\t\t\t\t<b class=\"caret\"></b>\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t                                    \t<ul class=\"dropdown-menu dropdown-menu-right\">\n\t                                        \t<li class=\"dropdown-header\">Dropdown header</li>\n\t                                        \t<li><a href=\"#\">Action</a></li>\n\t\t                                        <li><a href=\"#\">Another action</a></li>\n\t\t                                        <li><a href=\"#\">Something else here</a></li>\n\t\t                                        <li class=\"divider\"></li>\n\t\t                                        <li><a href=\"#\">Separated link</a></li>\n\t\t                                        <li class=\"divider\"></li>\n\t\t                                        <li><a href=\"#\">One more separated link</a></li>\n\t\t                                    </ul>\n\t                                \t</li>\n\t                            \t</ul>\n\t                            </div>\n\t\t\t\t\t\t\t</div>\n\t                    </nav>\n\n\t                </div>\n\t            </div>\n\t            <div class=\"title\">\n\t                <h3>Navigation</h3>\n\t            </div>\n\t        </div>\n\n\t        <div id=\"navbar\">\n\t            <div class=\"navigation-example\">\n\n\t\t\t\t\t<!-- Navbar Primary  -->\n\t\t\t\t\t<nav class=\"navbar navbar-primary\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-primary\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#pablo\">Primary Color</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-primary\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li class=\"active\">\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">explore</i>\n\t\t\t\t\t\t\t\t\t\t\tDiscover\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">account_circle</i>\n\t\t                                    Profile\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">settings</i>\n\t\t\t\t\t\t\t\t\t\t\tSettings\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Primary -->\n\n\t\t\t\t\t<!-- Navbar Info -->\n\t\t\t\t\t<nav class=\"navbar navbar-info\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-info\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#pablo\">Info Color</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-info\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li class=\"active\">\n\t\t                                <a href=\"#pablo\" >\n\t\t                                    Discover\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t                                    Profile\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t                                    Settings\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Info -->\n\n\t\t\t\t\t<!-- Navbar Success -->\n\t\t\t\t\t<nav class=\"navbar navbar-success\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-success\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#\">Success Color</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-success\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li class=\"active\">\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">explore</i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">account_circle</i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">settings</i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Success -->\n\n\t\t\t\t\t<!-- Navbar Warning -->\n\t\t\t\t\t<nav class=\"navbar navbar-warning\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-warning\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#pablo\">Warning Color</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-warning\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-google-plus\"></i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-instagram\"></i>\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Warning -->\n\n\t\t\t\t\t<!-- Navbar Danger -->\n\t\t\t\t\t<nav class=\"navbar navbar-danger\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-danger\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#pablo\">Danger Color</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-danger\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i> Share\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i> Tweet\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-pinterest\"></i> Pin\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Danger -->\n\n\t\t\t\t\t<!-- Navbar Transparent -->\n\t\t\t\t\t<nav class=\"navbar navbar-transparent\">\n\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t<div class=\"navbar-header\">\n\t\t\t\t\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#example-navbar-transparent\">\n\t\t\t\t\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t<a class=\"navbar-brand\" href=\"#pablo\">Transparent</a>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class=\"collapse navbar-collapse\" id=\"example-navbar-transparent\">\n\t\t\t\t\t\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t                                    <i class=\"fa fa-facebook-square\"></i>\n\t\t                                    Facebook\n\t\t                                </a>\n\t\t                            </li>\n\t\t                            <li>\n\t\t                                <a href=\"#pablo\">\n\t\t                                    <i class=\"fa fa-twitter\"></i>\n\t\t                                    Twitter\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t                                <a href=\"#pablo\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-instagram\"></i> Instagram\n\t\t                                </a>\n\t\t                            </li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</nav>\n\t\t\t\t\t<!-- End Navbar Transparent-->\n\t            </div>\n\t        </div>\n\t\t</div>\n\t\t<!-- End .section-navbars  -->\n\n\t\t<div class=\"section section-tabs\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"title\">\n\t\t\t\t\t\t\t<h3>Tabs with Icons on Card</h3>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- Tabs with icons on Card -->\n\t\t\t\t\t\t<div class=\"card card-nav-tabs\">\n\t\t\t\t\t\t\t<div class=\"header header-success\">\n\t\t\t\t\t\t\t\t<!-- colors: \"header-primary\", \"header-info\", \"header-success\", \"header-warning\", \"header-danger\" -->\n\t\t\t\t\t\t\t\t<div class=\"nav-tabs-navigation\">\n\t\t\t\t\t\t\t\t\t<div class=\"nav-tabs-wrapper\">\n\t\t\t\t\t\t\t\t\t\t<ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\n\t\t\t\t\t\t\t\t\t\t\t<li class=\"active\">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#profile\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">face</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tProfile\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#messages\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">chat</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tMessages\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#settings\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">build</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tSettings\n\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\t\t<div class=\"tab-content text-center\">\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane active\" id=\"profile\">\n\t\t\t\t\t\t\t\t\t\t<p> I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. </p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane\" id=\"messages\">\n\t\t\t\t\t\t\t\t\t\t<p> I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane\" id=\"settings\">\n\t\t\t\t\t\t\t\t\t\t<p>I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. So when you get something that has the name Kanye West on it, it’s supposed to be pushing the furthest possibilities. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- End Tabs with icons on Card -->\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"title\">\n\t\t\t\t\t\t\t<h3>Tabs on Plain Card</h3>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- Tabs on Plain Card -->\n\t\t\t\t\t\t<div class=\"card card-nav-tabs card-plain\">\n\t\t\t\t\t\t\t<div class=\"header header-danger\">\n\t\t\t\t\t\t\t\t<!-- colors: \"header-primary\", \"header-info\", \"header-success\", \"header-warning\", \"header-danger\" -->\n\t\t\t\t\t\t\t\t<div class=\"nav-tabs-navigation\">\n\t\t\t\t\t\t\t\t\t<div class=\"nav-tabs-wrapper\">\n\t\t\t\t\t\t\t\t\t\t<ul class=\"nav nav-tabs\" data-tabs=\"tabs\">\n\t\t\t\t\t\t\t\t\t\t\t<li class=\"active\"><a href=\"#home\" data-toggle=\"tab\">Home</a></li>\n\t\t\t\t\t\t\t\t\t\t\t<li><a href=\"#updates\" data-toggle=\"tab\">Updates</a></li>\n\t\t\t\t\t\t\t\t\t\t\t<li><a href=\"#history\" data-toggle=\"tab\">History</a></li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"content\">\n\t\t\t\t\t\t\t\t<div class=\"tab-content text-center\">\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane active\" id=\"home\">\n\t\t\t\t\t\t\t\t\t\t<p>I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. So when you get something that has the name Kanye West on it, it’s supposed to be pushing the furthest possibilities. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus.</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane\" id=\"updates\">\n\t\t\t\t\t\t\t\t\t\t<p> I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. </p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"tab-pane\" id=\"history\">\n\t\t\t\t\t\t\t\t\t\t<p> I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at. I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- End Tabs on plain Card -->\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<!-- End Section Tabs -->\n\n\t    <div class=\"section section-pagination\">\n\t        <div class=\"container\">\n\t            <div class=\"row\">\n\t                <div class=\"col-md-6\">\n\t                    <div class=\"title\">\n\t                        <h3>Progress Bars</h3>\n\t                    </div>\n\n\t                    <div class=\"progress progress-line-primary\">\n\t                    \t<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 30%;\">\n\t                        <span class=\"sr-only\">60% Complete</span>\n\t                      </div>\n\t                    </div>\n\n\t                    <div class=\"progress progress-line-info\">\n\t                    \t<div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 60%;\">\n\t                    \t\t<span class=\"sr-only\">60% Complete</span>\n\t                    \t</div>\n\t                    </div>\n\n\t                    <div class=\"progress progress-line-danger\">\n\t                    \t<div class=\"progress-bar progress-bar-success\" style=\"width: 35%\">\n\t                            <span class=\"sr-only\">35% Complete (success)</span>\n\t                        </div>\n\t                        <div class=\"progress-bar progress-bar-warning\" style=\"width: 20%\">\n\t                            <span class=\"sr-only\">20% Complete (warning)</span>\n\t                        </div>\n\t                        <div class=\"progress-bar progress-bar-danger\" style=\"width: 10%\">\n\t                            <span class=\"sr-only\">10% Complete (danger)</span>\n\t                        </div>\n\t                    </div>\n\n\t\t\t\t\t\t<br />\n\t\t\t\t\t\t<div class=\"title\">\n\t                        <h3>Navigation Pills</h3>\n\t                    </div>\n\n\t\t\t\t\t\t<ul class=\"nav nav-pills\" role=\"tablist\">\n\t\t\t\t\t\t\t<!--\n\t\t\t\t\t\t\t\tcolor-classes: \"nav-pills-primary\", \"nav-pills-info\", \"nav-pills-success\", \"nav-pills-warning\",\"nav-pills-danger\"\n\t                        -->\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"#dashboard\" role=\"tab\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">dashboard</i>\n\t\t\t\t\t\t\t\t\tDashboard\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li class=\"active\">\n\t                            <a href=\"#schedule\" role=\"tab\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">schedule</i>\n\t\t\t\t\t\t\t\t\tSchedule\n\t                            </a>\n\t                        </li>\n\t                        <li>\n\t                            <a href=\"#tasks\" role=\"tab\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">list</i>\n\t                                Tasks\n\t                            </a>\n\t                        </li>\n\t\t\t\t\t\t\t<li>\n\t                            <a href=\"#payments\" role=\"tab\" data-toggle=\"tab\">\n\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">attach_money</i>\n\t                                Payments\n\t                            </a>\n\t                        </li>\n\t                    </ul>\n\n\t                </div>\n\n\t                <div class=\"col-md-6\">\n\t                    <div class=\"title\">\n\t                        <h3>Pagination</h3>\n\t                    </div>\n\n\t                    <ul class=\"pagination pagination-primary\">\n\t                    <!--\n\t\t\t\t\t\t\tcolor-classes: \"pagination-primary\", \"pagination-info\", \"pagination-success\", \"pagination-warning\", \"pagination-danger\"\n\t                    -->\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">1</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">...</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">5</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">6</a></li>\n\t\t\t\t\t\t\t<li class=\"active\"><a href=\"javascript:void(0);\">7</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">8</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">9</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">...</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">12</a></li>\n\t                    </ul>\n\n\t\t\t\t\t\t<ul class=\"pagination pagination-info\">\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">< prev</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">1</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">2</a></li>\n\t\t\t\t\t\t\t<li class=\"active\"><a href=\"javascript:void(0);\">3</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">4</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">5</a></li>\n\t\t\t\t\t\t\t<li><a href=\"javascript:void(0);\">next ></a></li>\n\t                    </ul>\n\n\t\t\t\t\t\t<div class=\"title\">\n\t                        <h3>Labels </h3>\n\t                    </div>\n\t                    <span class=\"label label-default\">Default</span>\n\t                    <span class=\"label label-primary\">Primary</span>\n\t                    <span class=\"label label-info\">Info</span>\n\t                    <span class=\"label label-success\">Success</span>\n\t                    <span class=\"label label-warning\">Warning</span>\n\t                    <span class=\"label label-danger\">Danger</span>\n\t                </div>\n\t            </div>\n\n\t\t\t\t<div class=\"space\"></div>\n\n\t            <div class=\"title\">\n\t                <h3>Notifications</h3>\n\t            </div>\n\t        </div>\n\t    </div>\n\n\t    <div class=\"section section-notifications\" id=\"notifications\">\n\t        <div class=\"alert alert-info\">\n\t            <div class=\"container-fluid\">\n\t\t\t\t\t<div class=\"alert-icon\">\n\t\t\t\t\t\t<i class=\"material-icons\">info_outline</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"material-icons\">clear</i></span>\n\t\t\t\t\t</button>\n\n\t            \t<b>Info alert:</b> You've got some friends nearby, stop looking at your phone and find them...\n\t            </div>\n\t        </div>\n\t        <div class=\"alert alert-success\">\n\t            <div class=\"container-fluid\">\n\t\t\t\t\t<div class=\"alert-icon\">\n\t\t\t\t\t\t<i class=\"material-icons\">check</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"material-icons\">clear</i></span>\n\t\t\t\t\t</button>\n\t            \t<b>Success Alert:</b> Yuhuuu! You've got your $11.99 album from The Weeknd\n\t            </div>\n\t        </div>\n\t        <div class=\"alert alert-warning\">\n\t             <div class=\"container-fluid\">\n\t\t\t\t\t <div class=\"alert-icon\">\n\t\t\t\t\t\t<i class=\"material-icons\">warning</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"material-icons\">clear</i></span>\n\t\t\t\t\t</button>\n\t                 <b>Warning Alert:</b> Hey, it looks like you still have the \"copyright &copy;  2015\" in your footer. Please update it!\n\t            </div>\n\t        </div>\n\t        <div class=\"alert alert-danger\">\n\t             <div class=\"container-fluid\">\n\t\t\t\t\t <div class=\"alert-icon\">\n\t\t\t\t\t\t<i class=\"material-icons\">error_outline</i>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n\t\t\t\t\t\t<span aria-hidden=\"true\"><i class=\"material-icons\">clear</i></span>\n\t\t\t\t\t</button>\n\t                 <b>Error Alert:</b> Damn man! You screwed up the server this time. You should find a good excuse for your Boss...\n\t            </div>\n\t        </div>\n\t        <div class=\"clearfix\"></div>\n\t    </div><!--  end notifications -->\n\n\t    <div class=\"section\">\n\t        <div class=\"container tim-container\">\n\t            <div class=\"title\">\n\t                <h2>Typography</h2>\n\t            </div>\n\t            <div id=\"typography\">\n\t                <div class=\"row\">\n\t                    <div class=\"tim-typo\">\n\t                        <h1><span class=\"tim-note\">Header 1</span>The Life of Material Kit </h1>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <h2><span class=\"tim-note\">Header 2</span>The Life of Material Kit</h2>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <h3><span class=\"tim-note\">Header 3</span>The Life of Material Kit</h3>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <h4><span class=\"tim-note\">Header 4</span>The Life of Material Kit</h4>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <h5><span class=\"tim-note\">Header 5</span>The Life of Material Kit</h5>\n\t                    </div>\n\t                     <div class=\"tim-typo\">\n\t                        <h6><span class=\"tim-note\">Header 6</span>The Life of Material Kit</h6>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <p><span class=\"tim-note\">Paragraph</span>\n\t                            I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.</p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Quote</span>\n\t                        <blockquote>\n\t                         <p>\n\t                         I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.\n\t                         </p>\n\t                         <small>\n\t                         Kanye West, Musician\n\t                         </small>\n\t                        </blockquote>\n\t                    </div>\n\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Muted Text</span>\n\t                        <p class=\"text-muted\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...\n\t\t\t\t\t\t    </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Primary Text</span>\n\t                        <p class=\"text-primary\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...                        </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Info Text</span>\n\t                        <p class=\"text-info\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...                        </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Success Text</span>\n\t                        <p class=\"text-success\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...                        </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Warning Text</span>\n\t                        <p class=\"text-warning\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...\n\t                        </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <span class=\"tim-note\">Danger Text</span>\n\t                        <p class=\"text-danger\">\n\t                        I will be the leader of a company that ends up being worth billions of dollars, because I got the answers...                        </p>\n\t                    </div>\n\t                    <div class=\"tim-typo\">\n\t                        <h2><span class=\"tim-note\">Small Tag</span>\n\t\t\t\t\t\t\t\tHeader with small subtitle <br>\n\t\t\t\t\t\t\t\t<small>Use \"small\" tag for the headers</small>\n\t\t\t\t\t\t\t</h2>\n\t                    </div>\n\t                </div>\n\t            </div>\n\n\t\t\t\t<div class=\"space-50\"></div>\n\n\t            <div id=\"images\">\n\t                 <div class=\"title\">\n\t                    <h2>Images</h2>\n\t                </div>\n\t                <br>\n\t                <div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-2\">\n\t                        <h4>Rounded Image</h4>\n\t                        <img src=\"assets/material-kit/assets/img/avatar.jpg\" alt=\"Rounded Image\" class=\"img-rounded img-responsive\">\n\t                    </div>\n\t\t\t\t\t\t<div class=\"col-sm-2 col-sm-offset-1\">\n\t                        <h4>Circle Image</h4>\n\t                        <img src=\"assets/material-kit/assets/img/avatar.jpg\" alt=\"Circle Image\" class=\"img-circle img-responsive\">\n\t                    </div>\n\t\t\t\t\t\t<div class=\"col-sm-2 col-sm-offset-1\">\n\t                        <h4>Rounded Raised</h4>\n\t                        <img src=\"assets/material-kit/assets/img/avatar.jpg\" alt=\"Raised Image\" class=\"img-rounded img-responsive img-raised\">\n\t                    </div>\n\n\t                    <div class=\"col-sm-2 col-sm-offset-1\">\n\t                        <h4>Circle Raised</h4>\n\t                        <img src=\"assets/material-kit/assets/img/avatar.jpg\" alt=\"Thumbnail Image\" class=\"img-circle img-raised img-responsive\">\n\t                    </div>\n\t                </div>\n\t                <div class=\"row\">\n\n\t                </div>\n\t            </div>\n\n\t        </div>\n\t    </div>\n\n\t    <div class=\"section\" id=\"javascriptComponents\">\n\t        <div class=\"container\">\n\t            <div class=\"title\">\n\t                <h2>Javascript components</h2>\n\t            </div>\n\n\t            <div class=\"row\" id=\"modals\">\n\t                <div class=\"col-md-6\">\n\t                    <div class=\"title\">\n\t                        <h3>Modal</h3>\n\t                    </div>\n\n\t                    <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#myModal\">\n\t                      Launch demo modal\n\t                    </button>\n\t                </div>\n\t                <div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"title\">\n\t                        <h3>Popovers</h3>\n\t                    </div>\n\n\t                    <button type=\"button\" class=\"btn btn-default\" data-toggle=\"popover\" data-placement=\"left\" title=\"Popover on left\" data-content=\"Here will be some very useful information about his popover.<br> Here will be some very useful information about his popover.\" data-container=\"body\">On left</button>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-toggle=\"popover\" data-placement=\"top\" title=\"Popover on top\" data-content=\"Here will be some very useful information about his popover.\" data-container=\"body\">On top</button>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-toggle=\"popover\" data-placement=\"bottom\" title=\"Popover on bottom\" data-content=\"Here will be some very useful information about his popover.\" data-container=\"body\">On bottom</button>\n\n\t                    <button type=\"button\" class=\"btn btn-default\" data-toggle=\"popover\" data-placement=\"right\" title=\"Popover on right\" data-content=\"Here will be some very useful information about his popover.\" data-container=\"body\">On right</button>\n\n\t                </div>\n\t                <br /><br />\n\n\t\t            <div class=\"col-md-6\">\n\t\t                <div class=\"title\">\n\t\t                    <h3>Datepicker</h3>\n\t\t                </div>\n\t\t                <div class=\"row\">\n\t\t                    <div class=\"col-md-6\">\n\t\t\t\t\t\t\t\t<div class=\"form-group label-static\">\n\t\t\t\t\t\t\t\t\t<label class=\"control-label\">Datepicker</label>\n\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"datepicker form-control\" value=\"03/12/2016\" />\n\t\t\t\t\t\t\t\t</div>\n\n\t\t                    </div>\n\t\t                </div>\n\t\t            </div>\n\n\t\t            <div class=\"col-md-6\">\n\t\t\t\t\t\t<div class=\"title\">\n\t\t\t\t\t\t\t<h3>Tooltips</h3>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-tooltip\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Tooltip on left\" data-container=\"body\">On left</button>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-tooltip\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Tooltip on top\" data-container=\"body\">On top</button>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-tooltip\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Tooltip on bottom\" data-container=\"body\">On bottom</button>\n\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-tooltip\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Tooltip on right\" data-container=\"body\">On right</button>\n\n\t\t                <div class=\"clearfix\"></div><br><br>\n\t\t            </div>\n\n\t\t\t\t\t<div class=\"title\">\n\t\t                <h3>Carousel</h3>\n\t\t            </div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t    <div class=\"section\" id=\"carousel\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\n\t\t\t\t\t\t<!-- Carousel Card -->\n\t\t\t\t\t\t<div class=\"card card-raised card-carousel\">\n\t\t\t\t\t\t\t<div id=\"carousel-example-generic\" class=\"carousel slide\" data-ride=\"carousel\">\n\t\t\t\t\t\t\t\t<div class=\"carousel slide\" data-ride=\"carousel\">\n\n\t\t\t\t\t\t\t\t\t<!-- Indicators -->\n\t\t\t\t\t\t\t\t\t<ol class=\"carousel-indicators\">\n\t\t\t\t\t\t\t\t\t\t<li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>\n\t\t\t\t\t\t\t\t\t\t<li data-target=\"#carousel-example-generic\" data-slide-to=\"1\"></li>\n\t\t\t\t\t\t\t\t\t\t<li data-target=\"#carousel-example-generic\" data-slide-to=\"2\"></li>\n\t\t\t\t\t\t\t\t\t</ol>\n\n\t\t\t\t\t\t\t\t\t<!-- Wrapper for slides -->\n\t\t\t\t\t\t\t\t\t<div class=\"carousel-inner\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"item active\">\n\t\t\t\t\t\t\t\t\t\t\t<img src=\"assets/material-kit/assets/img/bg2.jpeg\" alt=\"Awesome Image\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"carousel-caption\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h4><i class=\"material-icons\">location_on</i> Yellowstone National Park, United States</h4>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"item\">\n\t\t\t\t\t\t\t\t\t\t\t<img src=\"assets/material-kit/assets/img/bg3.jpeg\" alt=\"Awesome Image\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"carousel-caption\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h4><i class=\"material-icons\">location_on</i> Somewhere Beyond, United States</h4>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"item\">\n\t\t\t\t\t\t\t\t\t\t\t<img src=\"assets/material-kit/assets/img/bg4.jpeg\" alt=\"Awesome Image\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"carousel-caption\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h4><i class=\"material-icons\">location_on</i> Yellowstone National Park, United States</h4>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<!-- Controls -->\n\t\t\t\t\t\t\t\t\t<a class=\"left carousel-control\" href=\"#carousel-example-generic\" data-slide=\"prev\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">keyboard_arrow_left</i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t<a class=\"right carousel-control\" href=\"#carousel-example-generic\" data-slide=\"next\">\n\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">keyboard_arrow_right</i>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<!-- End Carousel Card -->\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"section\">\n\t        <div class=\"container text-center\">\n\t            <div class=\"row\">\n\t                <div class=\"col-md-8 col-md-offset-2 text-center\">\n\t                    <h2>Completed with examples</h2>\n\t                    <h4>The kit comes with three pre-built pages to help you get started faster. You can change the text and images and you're good to go. More importantly, looking at them will give you a picture of what you can built with this powerful kit.</h4>\n\t                </div>\n\t            </div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"section section-full-screen section-signup\" style=\"background-image: url('assets/material-kit/assets/img/city.jpg'); background-size: cover; background-position: top center; min-height: 700px;\">\n\t\t\t<div class=\"container\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-4 col-md-offset-4\">\n\t\t\t\t\t\t<div class=\"card card-signup\">\n\t\t\t\t\t\t\t<form class=\"form\" method=\"\" action=\"\">\n\t\t\t\t\t\t\t\t<div class=\"header header-primary text-center\">\n\t\t\t\t\t\t\t\t\t<h4>Sign Up</h4>\n\t\t\t\t\t\t\t\t\t<div class=\"social-line\">\n\t\t\t\t\t\t\t\t\t\t<a href=\"#pablo\" class=\"btn btn-simple btn-just-icon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<a href=\"#pablo\" class=\"btn btn-simple btn-just-icon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t<a href=\"#pablo\" class=\"btn btn-simple btn-just-icon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-google-plus\"></i>\n\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p class=\"text-divider\">Or Be Classical</p>\n\t\t\t\t\t\t\t\t<div class=\"content\">\n\n\t\t\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">face</i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"First Name...\">\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">email</i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"Email...\">\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">lock_outline</i>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"password\" placeholder=\"Password...\" class=\"form-control\" />\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<!-- If you want to add a checkbox to this form, uncomment this code\n\n\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" name=\"optionsCheckboxes\" checked>\n\t\t\t\t\t\t\t\t\t\t\tSubscribe to newsletter\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t<a href=\"#pablo\" class=\"btn btn-simple btn-primary btn-lg\">Get Started</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"col-md-12 text-center\">\n\t\t\t<a href=\"examples/signup-page.html\" class=\"btn btn-simple btn-primary btn-lg\" target=\"_blank\">View Signup Page</a>\n\t\t</div>\n\n\t\t<div class=\"space-50\"></div>\n\t\t<div class=\"section section-examples\">\n\t        <div class=\"container-fluid text-center\">\n\t            <div class=\"row\">\n\t                <div class=\"col-md-6\">\n\t                    <a href=\"examples/landing-page.html\" target=\"_blank\">\n\t                        <img src=\"assets/material-kit/assets/img/landing.jpg\" alt=\"Rounded Image\" class=\"img-rounded img-raised img-responsive\">\n\t                        <button class=\"btn  btn-simple btn-primary btn-lg\">View Landing Page</button>\n\t                    </a>\n\t                </div>\n\t                <div class=\"col-md-6\">\n\t                    <a href=\"examples/profile-page.html\" target=\"_blank\">\n\t                        <img src=\"assets/material-kit/assets/img/profile.jpg\" alt=\"Rounded Image\" class=\"img-rounded img-raised img-responsive\">\n\t                        <button class=\"btn btn-simple btn-primary btn-lg\">View Profile Page</button>\n\t                    </a>\n\t                </div>\n\t            </div>\n\t        </div>\n\t\t</div>\n\n\t    <div class=\"section section-download\">\n\t        <div class=\"container\">\n\t            <div class=\"row text-center\">\n\t                <div class=\"col-md-8 col-md-offset-2\">\n\t                    <h2>Do you love this UI Kit?</h2>\n\t                    <h4>Cause if you do, it can be yours for FREE. Hit the button below to navigate to Creative Tim where you can find the kit. Start a new project or give an old Bootstrap project a new look!</h4>\n\t                </div>\n\t                <div class=\"col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4\">\n\t                    <a href=\"http://www.creative-tim.com/product/material-kit\" class=\"btn btn-primary btn-lg\">\n\t\t\t\t\t\t\t<i class=\"material-icons\">cloud_download</i> Free Download\n\t\t\t\t\t\t</a>\n\t                </div>\n\t\t\t\t</div>\n\n\t\t\t\t<br><br>\n\n\t\t\t\t<div class=\"row text-center\">\n\t\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t                    <h2>Want more?</h2>\n\t                    <h4>We've just launched <a href=\"http://demos.creative-tim.com/material-kit-pro/presentation.html?ref=utp-freebie\" target=\"_blank\">Material Kit PRO</a>. It has a huge number of components, sections and example pages. Start Your Development With A Badass Bootstrap UI Kit inspired by Material Design.</h4>\n\t                </div>\n\t\t\t\t\t<div class=\"col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4\">\n\t\t\t\t\t\t<a href=\"http://demos.creative-tim.com/material-kit-pro/presentation.html?ref=utp-freebie\" class=\"btn btn-upgrade btn-lg\" target=\"_blank\">\n\t\t\t\t\t\t\t<i class=\"material-icons\">unarchive</i> Upgrade to PRO\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t            </div>\n\n\t            <div class=\"row sharing-area text-center\">\n\t                    <h3>Thank you for supporting us!</h3>\n\t                    <a href=\"#\" class=\"btn btn-twitter\">\n\t                        <i class=\"fa fa-twitter\"></i>\n\t                        Tweet\n\t                    </a>\n\t                    <a href=\"#\" class=\"btn btn-facebook\">\n\t                        <i class=\"fa fa-facebook-square\"></i>\n\t                        Share\n\t                    </a>\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-google-plus\">\n\t                        <i class=\"fa fa-google-plus\"></i>\n\t                        Share\n\t                    </a>\n\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-github\">\n\t                        <i class=\"fa fa-github\"></i>\n\t                    \tStar\n\t                    </a>\n\t            </div>\n\t        </div>\n\t    </div>\n\n\t</div>\n\n</div>\n\n<!-- Sart Modal -->\n<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n\t<div class=\"modal-dialog\">\n\t\t<div class=\"modal-content\">\n\t\t\t<div class=\"modal-header\">\n\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\n\t\t\t\t\t<i class=\"material-icons\">clear</i>\n\t\t\t\t</button>\n\t\t\t\t<h4 class=\"modal-title\">Modal title</h4>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.\n\t\t\t\t</p>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-simple\">Nice Button</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-danger btn-simple\" data-dismiss=\"modal\">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<!--  End Modal -->\n"

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__agm_core_services_google_maps_api_wrapper__ = __webpack_require__("../../../../@agm/core/services/google-maps-api-wrapper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core_services_managers_marker_manager__ = __webpack_require__("../../../../@agm/core/services/managers/marker-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mqtt_service__ = __webpack_require__("../../../../../src/app/services/mqtt.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = (function () {
    function DashboardComponent(markerManager, mapsAPIWrapper, mqttService, sharedService) {
        this.markerManager = markerManager;
        this.mapsAPIWrapper = mapsAPIWrapper;
        this.mqttService = mqttService;
        this.sharedService = sharedService;
        this.sensorsData = [];
        this.connectionOptions = {};
        this.showMarkerOnMap = function (markerData) {
            var marker = { "title": markerData.d.uniqueId, "label": markerData.d.uniqueId, "lat": markerData.d.lat, "lng": markerData.d.lng, "iconUrl": "/assets/images/green-small.png" };
            if ((markerData.d.NO2 && markerData.d.NO2 > 220) || (markerData.d.CO && markerData.d.CO > 320)) {
                marker.iconUrl = "/assets/images/blue-small.png";
            }
            if ((markerData.d.NO2 && markerData.d.NO2 > 230) || (markerData.d.CO && markerData.d.CO > 330)) {
                marker.iconUrl = "/assets/images/orange-small.png";
            }
            if ((markerData.d.NO2 && markerData.d.NO2 > 240) || (markerData.d.CO && markerData.d.CO > 340)) {
                marker.iconUrl = "/assets/images/red-small.png";
            }
            for (var _i = 0, _a = this.sensorsData; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.title == marker.title) {
                    this.sensorsData.splice(m);
                }
            }
            this.sensorsData.push(marker);
        };
        this.onMapReadyCall = function (map) {
            this.cityMap = map;
            console.log(this.cityMap);
            this.sensorsData.push(this.cityMarker);
            // this.sensorsData.push({"title":"AQSensor","label":"AQSensor1","lat":32.73807709793893,"lng":-117.12421417236328,"iconUrl":"/assets/images/green-small.png"});
            // this.sensorsData.push({"title":"AQSensor","label":"AQSensor1","lat":32.71757089988447,"lng":-117.13005065917969,"iconUrl":"/assets/images/green-small.png"});
            // this.sensorsData.push({"title":"AQSensor","label":"AQSensor1","lat":32.73302319137002,"lng":-117.08473205566406,"iconUrl":"/assets/images/red-small.png"});
        };
        this.handleMapClick = function (event) {
            console.log(event);
            var marker = { title: "AQSensor", label: "AQSensor1", lat: event.coords.lat, lng: event.coords.lng };
            var isEven = (event.coords.lat * 2) % 2;
            // this.sensorsData.push(marker);
            // this.markerManager.addMarker(marker);
            // marker.map = this.cityMap;
            // this.mapsAPIWrapper.createMarker(marker);
            console.log("Marker should be created: ", isEven, " : ", JSON.stringify(marker));
            // console.log("Add Marker to Map: ", this.cityMap);
        };
        var mqttTopic = "iot-2/type/" + this.sharedService.CONFIG.GATEWAY_TYPE + "/id/000000008c0be72b/evt/airquality/fmt/json";
        this.connectionOptions.subscribeToTopic = mqttTopic;
        this.mqttService.connectMQTT(this.connectionOptions);
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sensorsData = [];
        this.cityMarker = { zoom: 13, title: "San Diego Air Quality Monitoring", lat: 32.7157, lng: -117.1611 };
        this.mqttService.mqttMsgEvent.subscribe(function (message) {
            console.log('\n\nMQTT Message Payload: >> ', message.payloadString);
            var msg = JSON.parse(message.payloadString);
            _this.showMarkerOnMap(msg);
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'app-dashboard',
        template: __webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__agm_core_services_managers_marker_manager__["a" /* MarkerManager */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__agm_core_services_managers_marker_manager__["a" /* MarkerManager */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__agm_core_services_google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__agm_core_services_google_maps_api_wrapper__["a" /* GoogleMapsAPIWrapper */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_mqtt_service__["a" /* MqttService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_mqtt_service__["a" /* MqttService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_shared_service__["a" /* SharedService */]) === "function" && _d || Object])
], DashboardComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/h-buddy/h-buddy.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/h-buddy/h-buddy.component.html":
/***/ (function(module, exports) {

module.exports = "\n\t<div class=\"page-header header-filter clear-filter\" data-parallax=\"true\" style=\"background-image: url('//storage.googleapis.com/hukam-cdn/public/images/slider/hbuddy/smarthome6.jpg');\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t<div class=\"brand\">\n\t\t\t\t\t\t<h1>hBuddy</h1>\n\t\t\t\t\t\t<h4>You have enough to take care of when it comes to your home and your family. <b>hBuddy</b> lets you monitor your entire home, even when you aren’t there.</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"main main-raised\">\n\n\t\t\t\t\t<div class=\"section text-center section-landing\">\n\t\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"title\">Solutions We Power</h2>\n\t\t\t\t\t\t\t\t\t\t\t\t<br />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t    \t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/home-automation-2.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/home-automation-2.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/home-automation-2.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Automation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tMake your home the smartest on the block\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/hbuddy\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/hbuddy\">hBuddy - Our product for Home Automation</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tYou have enough to take care of when it comes to your home and your family. <b>hBuddy</b> lets you monitor your entire home, even when you aren’t there.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/manufacturing2.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/manufacturing2.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/manufacturing2.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tManufacturing Industry\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tOur IIoT Solutions for every indusytry\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/industries\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/industries\">Our IIoT soltions for manufacturing industry</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tWe offer a holistic IIoT solution combining smart sensors, AI-based analytics and the visualization of key insights to reduce operational costs and increase machine uptime.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image \">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/agriculture3.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/agriculture3.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/agriculture3.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSmart Agriculture\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tIoT in Agriculture\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/agriculture\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/agriculture\">IoT and Smart Agriculture</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tSmart farming is a concept quickly catching on in the agricultural business. Offering high-precision crop control, useful data collection, and automated farming techniques, there are clearly many advantages a networked farm has to offer.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\n\n\n\n\t\t\t\t\t\t\t\t<div class=\"features\">\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-primary\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">chat</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">First Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-success\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">verified_user</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">Second Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-danger\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">fingerprint</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">Third Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"section section-gray cd-section\" id=\"footers\">\n\t\t\t<!--         pre-footer areas -->\n\t\t\t\t    <div id=\"pre-footer-areas\">\n\n\t\t\t\t\t\t\t<div class=\"row sharing-area text-center\">\n\t\t\t\t\t\t\t\t\t\t\t<h3>Thank you for supporting us!</h3>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-twitter\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tTweet\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-facebook\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-google-plus\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-google-plus\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-linkedin\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-linkedin\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/h-buddy/h-buddy.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HBuddyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HBuddyComponent = (function () {
    function HBuddyComponent(sharedService) {
        this.sharedService = sharedService;
    }
    HBuddyComponent.prototype.ngOnInit = function () {
        this.currentUser = this.sharedService.getCurrentUser();
    };
    return HBuddyComponent;
}());
HBuddyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'app-h-buddy',
        template: __webpack_require__("../../../../../src/app/pages/h-buddy/h-buddy.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/h-buddy/h-buddy.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_shared_service__["a" /* SharedService */]) === "function" && _a || Object])
], HBuddyComponent);

var _a;
//# sourceMappingURL=h-buddy.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "\n\t<div class=\"page-header header-filter clear-filter\" data-parallax=\"true\" style=\"background-image: url('assets/material-kit/assets/img/bg2.jpeg');\">\n\t\t<div class=\"container\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t<div class=\"brand\">\n\t\t\t\t\t\t<h1>Our IoT Solutions</h1>\n\t\t\t\t\t\t<h4>We offer a holistic IIoT solution combining smart sensors, AI-based analytics and the visualization of key insights to reduce operational costs and increase machine uptime.</h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<div class=\"main main-raised\">\n\n\t\t\t\t\t<div class=\"section text-center section-landing\">\n\t\t\t\t\t\t\t<div class=\"container\">\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-8 col-md-offset-2\">\n\t\t\t\t\t\t\t\t\t\t\t\t<h2 class=\"title\">Solutions We Power</h2>\n\t\t\t\t\t\t\t\t\t\t\t\t<br />\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t    \t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/home-automation-2.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/home-automation-2.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/home-automation-2.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tHome Automation\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tMake your home the smartest on the block\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/hbuddy\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/hbuddy\">hBuddy - Our product for Home Automation</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tYou have enough to take care of when it comes to your home and your family. <b>hBuddy</b> lets you monitor your entire home, even when you aren’t there.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/manufacturing2.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/manufacturing2.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/manufacturing2.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tManufacturing Industry\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tOur IIoT Solutions for every indusytry\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/industries\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/industries\">Our IIoT soltions for manufacturing industry</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tWe offer a holistic IIoT solution combining smart sensors, AI-based analytics and the visualization of key insights to reduce operational costs and increase machine uptime.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"card card-blog card-rotate\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"rotating-card-container\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-image \">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"front\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img class=\"img\" src=\"/assets/images/agriculture3.jpg\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"colored-shadow\" style=\"background-image: url('/assets/images/agriculture3.jpg'); opacity: 1;\"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"back back-background\" style=\"height: 220px; width: 330px; background-image: url('/assets/images/agriculture3.jpg');\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h5 class=\"card-title\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tSmart Agriculture\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</h5>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tIoT in Agriculture\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer text-center\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"/agriculture\" class=\"btn btn-rose btn-round\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">subject</i> Read\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"card-content\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<h4 class=\"card-title\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\t<a href=\"/agriculture\">IoT and Smart Agriculture</a>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</h4>\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t<p class=\"card-description\">\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t\tSmart farming is a concept quickly catching on in the agricultural business. Offering high-precision crop control, useful data collection, and automated farming techniques, there are clearly many advantages a networked farm has to offer.\n\t\t\t\t\t\t    \t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"footer\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>Share: </b>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-google btn-simple\"><i class=\"fa fa-google\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-facebook btn-simple\"><i class=\"fa fa-facebook\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-linkedin btn-simple\"><i class=\"fa fa-linkedin\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-just-icon btn-twitter btn-simple\"><i class=\"fa fa-twitter\"></i></a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t    \t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\n\n\n\n\t\t\t\t\t\t\t\t<div class=\"features\">\n\t\t\t\t\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-primary\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">chat</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">First Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-success\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">verified_user</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">Second Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"icon icon-danger\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"material-icons\">fingerprint</i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class=\"info-title\">Third Feature</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"section section-gray cd-section\" id=\"footers\">\n\t\t\t<!--         pre-footer areas -->\n\t\t\t\t    <div id=\"pre-footer-areas\">\n\n\t\t\t\t\t\t\t<div class=\"row sharing-area text-center\">\n\t\t\t\t\t\t\t\t\t\t\t<h3>Thank you for supporting us!</h3>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-twitter\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-twitter\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tTweet\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-facebook\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-facebook-square\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-google-plus\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-google-plus\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"#\" class=\"btn btn-linkedin\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class=\"fa fa-linkedin\"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\tShare\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(sharedService) {
        this.sharedService = sharedService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.currentUser = this.sharedService.getCurrentUser();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["l" /* Component */])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/pages/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_shared_service__["a" /* SharedService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/mqtt.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_mqtt_mqttws31__ = __webpack_require__("../../../../ng2-mqtt/mqttws31.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_mqtt_mqttws31___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_mqtt_mqttws31__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_service__ = __webpack_require__("../../../../../src/app/services/shared.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MqttService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MqttService = (function () {
    function MqttService(sharedService) {
        this.sharedService = sharedService;
        this.isConnected = false;
        this.mqttMsgEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */](true);
        console.log('IN MqttProvider Constructor >>>>>>>> ');
        this.createMqttClient();
    }
    MqttService.prototype.createMqttClient = function () {
        var _this = this;
        var clientId = this.sharedService.CONFIG.MQTT_OPTIONS.clientId + (new Date().getTime());
        this.client = new __WEBPACK_IMPORTED_MODULE_1_ng2_mqtt_mqttws31__["Paho"].MQTT.Client(this.sharedService.CONFIG.MQTT_OPTIONS.hostname, this.sharedService.CONFIG.MQTT_OPTIONS.port, clientId);
        this.client.onConnectionLost = function (responseObject) {
            console.log('MQTT Connection lost >>> ');
            _this.isConnected = false;
            // this.connectMQTT(this.connectOptions);
        };
        this.client.onMessageArrived = function (message) {
            console.log('MQTT Message arrived: >>> ', message.payloadString);
            _this.mqttMsgEvent.emit(message);
        };
    };
    MqttService.prototype.connectMQTT = function (connectOptions) {
        try {
            this.connectOptions = connectOptions;
            this.client.connect({
                keepAliveInterval: this.sharedService.CONFIG.MQTT_OPTIONS.keepAliveInterval,
                useSSL: this.sharedService.CONFIG.MQTT_OPTIONS.useSSL,
                userName: this.sharedService.CONFIG.MQTT_OPTIONS.api_key,
                password: this.sharedService.CONFIG.MQTT_OPTIONS.auth_token,
                onSuccess: this.onConnected.bind(this),
                onFailure: this.onFailure.bind(this)
            });
        }
        catch (err) {
            console.log("Error while connectin to MQTT:  ", err);
            if (this.connectOptions.subscribeToTopic) {
                this.client.subscribe(this.connectOptions.subscribeToTopic, {});
            }
        }
    };
    MqttService.prototype.onConnected = function () {
        console.log("MQTT Connected: >>>> ");
        this.isConnected = true;
        if (this.connectOptions.subscribeToTopic) {
            this.client.subscribe(this.connectOptions.subscribeToTopic, {});
            console.log("MQTT Subscribed to Topic: ", this.connectOptions.subscribeToTopic);
        }
    };
    MqttService.prototype.onFailure = function (e) {
        console.log("MQTT Connection Failed: >>> ", e);
        this.isConnected = false;
    };
    MqttService.prototype.subscribeTopic = function (topic, options) {
        console.log("IN subscribeTopic: >> ", topic);
        if (this.client && this.isConnected) {
            this.client.subscribe(topic, options);
        }
        else {
            return new Error("MQTT Client not available !! ");
        }
    };
    MqttService.prototype.publishTopic = function (topic, message) {
        console.log("IN publichTopic: >> Topic: ", topic, ", Message: ", message);
        if (this.client && this.isConnected) {
            var packet = new __WEBPACK_IMPORTED_MODULE_1_ng2_mqtt_mqttws31__["Paho"].MQTT.Message(JSON.stringify(message));
            packet.destinationName = topic;
            this.client.send(packet);
        }
        else {
            return new Error("MQTT Client not available !! ");
        }
    };
    return MqttService;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]) === "function" && _a || Object)
], MqttService.prototype, "mqttMsgEvent", void 0);
MqttService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_service__["a" /* SharedService */]) === "function" && _b || Object])
], MqttService);

var _a, _b;
//# sourceMappingURL=mqtt.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/shared.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SharedService = (function () {
    function SharedService() {
        this.CONFIG = {
            API_BASE_URL: "//hukamtechnologies.com/api",
            GATEWAY_TYPE: "AQ-Gateway",
            MQTT_OPTIONS: {
                api_key: "a-kwhgvg-w667tv552u",
                auth_token: "i?ZazBDehiQwoSnKo!",
                orgId: "kwhgvg",
                clientId: "a:kwhgvg:",
                hostname: "kwhgvg.messaging.internetofthings.ibmcloud.com",
                port: 8883,
                protocol: "https",
                connectOnCreate: false,
                path: '/mqtt',
                keepAliveInterval: 3600,
                useSSL: true
            }
        };
        this.sessionData = {};
    }
    SharedService.prototype.setCurrentUser = function (user) {
        console.log("IN setCurrentUser: >> ", user);
        this.currentUser = user;
    };
    SharedService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    return SharedService;
}());
SharedService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SharedService);

//# sourceMappingURL=shared.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map