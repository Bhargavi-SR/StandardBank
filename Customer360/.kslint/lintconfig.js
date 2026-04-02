/* AUTO GENERATED CONTENT */
(function(mod) {
	if (typeof exports == "object" && typeof module == "object") // CommonJS
		module.exports = mod();
	else if (typeof define == "function" && define.amd) // AMD
		return define([], mod);
	else // Plain browser env
		return mod();
})(function() {

return {
    "parser": "kspree",
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "amd": true,
        "mocha": true,
        "jasmine": true,
        "jquery": true
    },
    "rules": {
        "block-scoped-var": "warn",
        "comma-style": "warn",
        "complexity": "warn",
        "constructor-super": "warn",
        "eqeqeq": "warn",
        "guard-for-in": "warn",
        "key-spacing": "error",
        "linebreak-style": "warn",
        "max-depth": [
            "error",
            {
                "max": 200
            }
        ],
        "max-len": [
            "error",
            {
                "code": 800
            }
        ],
        "max-lines": [
            "error",
            {
                "max": 500
            }
        ],
        "max-lines-per-function": [
            "error",
            {
                "max": 400
            }
        ],
        "max-nested-callbacks": [
            "error",
            {
                "max": 200
            }
        ],
        "max-params": [
            "warn",
            {
                "max": 3
            }
        ],
        "max-statements": [
            "warn",
            {
                "max": 10
            }
        ],
        "no-caller": "warn",
        "no-case-declarations": "warn",
        "no-class-assign": "warn",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-const-assign": "warn",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-delete-var": "warn",
        "no-dupe-args": "error",
        "no-dupe-class-members": "warn",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty-character-class": "error",
        "no-empty-pattern": "warn",
        "no-eq-null": "warn",
        "no-eval": "warn",
        "no-ex-assign": "error",
        "no-extra-semi": "error",
        "no-fallthrough": "warn",
        "no-func-assign": "error",
        "no-global-assign": "warn",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-iterator": "warn",
        "no-loop-func": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-multi-str": "warn",
        "no-new-func": "warn",
        "no-new-object": "warn",
        "no-new-symbol": "warn",
        "no-new-wrappers": "warn",
        "no-obj-calls": "error",
        "no-octal": "warn",
        "no-proto": "warn",
        "no-redeclare": "warn",
        "no-regex-spaces": "error",
        "no-script-url": "warn",
        "no-self-assign": "warn",
        "no-shadow": "error",
        "no-sparse-arrays": "error",
        "no-this-before-super": "warn",
        "no-unreachable": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unused-labels": "warn",
        "no-useless-escape": "warn",
        "require-yield": "warn",
        "semi": "warn",
        "use-isnan": "error",
        "valid-typeof": "error",
        "no-_kony-object": "error"
    },
    "parserOptions": {
        "ecmaVersion": 10
    }
}

})
