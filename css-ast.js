class CSSAST {

    static fromStr(str) {}

    static fromFile(file) {}

}

export default CSSAST;

function highlightCss(code){
	console.log(code);
	//rulesets
	code = code.replace(/([^{}]*){([^{}]*)}/g, cssRuleSet);
	//default (for @ lines)
	code = "<span data-code-atLine>" + code + "</span>";
	//@word (@media, @keyframes, @import, etc.)
	code = code.replace(/(@\w+)/gi, "<span data-code-atWord>$1</span>");

	function cssRuleSet(match, capture1, capture2, index){
		return cssSelector(capture1) + "<span data-code-ruleSetCurlyBrace>{</span>" + cssRules(capture2) + "<span data-code-ruleSetCurlyBrace>}</span>";
	}

	function cssSelector(selector){
		selector = selector.replace(/(\s[^\w\d]\s)/g, "<span data-code-selectorSyntax>$1</span>");
		selector = selector.replace(/(#[\w\d-]+)/g, "<span data-code-selectorId>$1</span>");
		selector = selector.replace(/(\.[\w\d-]+)/g, "<span data-code-selectorClass>$1</span>");
		selector = selector.replace(/(:[\w\d]+)/g, "<span data-code-selectorPseudoClass>$1</span>");
		selector = selector.replace(/\[(.*)\]/g, "<span data-code-selectorSquareBracket>[</span><span data-code-selectorAttribute>$1</span><span data-code-selectorSquareBracket>]</span>");
		return "<span data-code-selectorDefault>" + selector + "</span>";
	}

	function cssRules(rules){
		rules = rules.replace(/(.+):(.+)/g, "<span data-code-ruleName>$1</span><span data-code-ruleSyntax>:</span><span data-code-ruleValueDefault>$2</span>");
		rules = rules.replace(/(\-?\d+\.?\d*\w*%?)/g, "<span data-code-ruleValueNumber>$1</span>");
		rules = rules.replace(/([\(\),;])/g, "<span data-code-ruleSyntax>$1</span>");
		rules = rules.replace(/!important/gi, "<span data-code-ruleImportant>!important</span>");
		return rules;
	}

	// for (let prop in color){
	// 	let regex = new RegExp("data\-" + prop, "gi");
	// 	code = code.replace(regex, "style=color:" + color[prop] + ";");
	// }

	return code;
}
