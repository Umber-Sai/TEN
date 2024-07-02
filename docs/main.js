/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst router_1 = __webpack_require__(/*! ./router */ \"./src/router.ts\");\nclass App {\n    constructor() {\n        this.router = new router_1.Router();\n        window.addEventListener('DOMContentLoaded', this.handlerRouteChanging.bind(this));\n        window.addEventListener('popstate', this.handlerRouteChanging.bind(this));\n    }\n    handlerRouteChanging() {\n        this.router.openRoute();\n    }\n}\n(new App());\n\n\n//# sourceURL=webpack://ten/./src/app.ts?");

/***/ }),

/***/ "./src/components/products.ts":
/*!************************************!*\
  !*** ./src/components/products.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Products = void 0;\nclass Products {\n    constructor() {\n        this.data = null;\n        this.motherElement = document.getElementById('flats');\n        this.buttonElement = document.getElementById('btn');\n        this.filters = [\"rooms\", \"cost\", \"floor\", \"square\"];\n        if (!this.motherElement)\n            throw new Error('Mother Element \"flats\" not found');\n        const url = 'https://gist.githubusercontent.com/Umber-Sai/456f70b577e706ee6367a0d726768af3/raw/18c911817a11d135fb3906619cf5fabe8bd2f648/database.json';\n        fetch(url)\n            .then((resp) => __awaiter(this, void 0, void 0, function* () { return yield resp.json(); }))\n            .then(data => {\n            this.data = data;\n            console.log(data);\n            this.revealCards(data);\n        });\n        if (this.buttonElement) {\n            this.buttonElement.addEventListener('click', this.filterBtnQuery.bind(this));\n        }\n        else {\n            console.error('Filter button not found');\n        }\n        // new Slider('slider1', 'slider2', 'slider-track', 50);\n        // new RangeSlider()\n    }\n    filterBtnQuery() {\n        let data = this.data;\n        this.filters.forEach((filter) => {\n            const filterInput = document.getElementById(filter);\n            if (!filterInput)\n                throw new Error(`\"${filter}\" input not found `);\n            const filterVal = filterInput.value;\n            if (filterVal) {\n                data = data.filter(item => item[filter].toString() === filterVal);\n            }\n        });\n        this.motherElement.innerHTML = '';\n        this.revealCards(data);\n    }\n    revealCards(data) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const template = yield fetch('card.html')\n                .then((resp) => __awaiter(this, void 0, void 0, function* () { return yield resp.text(); }));\n            data.forEach((flat) => {\n                const card = new DOMParser().parseFromString(template\n                    .replace('{{id}}', flat.id.toString())\n                    .replace('{{cost}}', flat.cost.toString())\n                    .replace('{{square}}', flat.square.toString())\n                    .replace('{{rooms}}', flat.rooms.toString()), \"text/html\").body.firstChild;\n                this.motherElement.appendChild(card);\n            });\n        });\n    }\n}\nexports.Products = Products;\n\n\n//# sourceURL=webpack://ten/./src/components/products.ts?");

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.config = void 0;\nexports.config = {\n    startPage: '#/main'\n};\n\n\n//# sourceURL=webpack://ten/./src/config.ts?");

/***/ }),

/***/ "./src/router.ts":
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Router = void 0;\nconst products_1 = __webpack_require__(/*! ./components/products */ \"./src/components/products.ts\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\nclass Router {\n    constructor() {\n        this.styleElement = document.getElementById('styleElement');\n        this.titleElement = document.getElementById('titleElement');\n        this.motherElement = document.getElementById('content');\n        if (!this.motherElement)\n            throw new Error('content Element not found');\n        this.routes = [\n            {\n                name: 'main',\n                rout: '#/main',\n                style: './styles/main.css',\n                template: './templates/main.html',\n                load() {\n                    new products_1.Products();\n                }\n            },\n            {\n                name: 'apartment',\n                rout: '#/apartment',\n                style: './styles/apartment.css',\n                template: './templates/apartment.html',\n                load() {\n                    // new Products()\n                }\n            }\n        ];\n    }\n    openRoute() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const urlRoute = window.location.hash.split('?');\n            const newRout = this.routes.find(item => item.rout === urlRoute[0]);\n            if (newRout) {\n                this.fillPage(newRout);\n                return;\n            }\n            else {\n                window.location.href = config_1.config.startPage;\n            }\n        });\n    }\n    fillPage(newRout) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (this.styleElement && this.titleElement) {\n                this.styleElement.setAttribute('href', newRout.style);\n                this.titleElement.innerText = newRout.name;\n            }\n            else {\n                throw new Error('styleElement or titleElement Not found');\n            }\n            this.motherElement.innerHTML = yield fetch(newRout.template).then(resp => resp.text());\n            newRout.load();\n        });\n    }\n}\nexports.Router = Router;\n\n\n//# sourceURL=webpack://ten/./src/router.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;