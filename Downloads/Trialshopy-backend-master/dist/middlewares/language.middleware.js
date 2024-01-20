"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageCheckUp = exports.LanguageSupport = void 0;
var LanguageSupport;
(function (LanguageSupport) {
    LanguageSupport["english"] = "en";
})(LanguageSupport || (exports.LanguageSupport = LanguageSupport = {}));
function languageCheckUp(req, _res, next) {
    const language = req.headers["content-language"];
    const language_support_in_systems = [...Object.values(LanguageSupport)];
    if (language) {
        if (!language_support_in_systems.includes(language))
            req.headers["content-language"] = LanguageSupport.english;
    }
    else {
        req.headers["content-language"] = LanguageSupport.english;
    }
    next();
}
exports.languageCheckUp = languageCheckUp;
//# sourceMappingURL=language.middleware.js.map