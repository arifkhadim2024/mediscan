import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { K as Bot, _ as Send, f as Sparkles, i as User } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-CGCM0s9z.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.assistant-BJ8NIO3N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var suggestions = [
	"What is Paracetamol 650?",
	"Can I take Azithromycin after food?",
	"What are the side effects of Pantoprazole?",
	"Any interaction between my medicines?"
];
function AssistantPage() {
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi Rahul! I'm your MediScan AI assistant. Ask me anything about your medicines, dosage, side effects, or interactions."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, typing]);
	const send = (text) => {
		if (!text.trim()) return;
		setMessages((m) => [...m, {
			role: "user",
			content: text
		}]);
		setInput("");
		setTyping(true);
		setTimeout(() => {
			setMessages((m) => [...m, {
				role: "assistant",
				content: `Great question! Based on your prescription, "${text.trim()}" — here's what I found:\n\nParacetamol 650 mg is a pain reliever and fever reducer. Take 1 tablet in the morning and 1 at night, after food, for 5 days. Common side effects are mild and include nausea and rash. Avoid alcohol while on this medicine.`
			}]);
			setTyping(false);
		}, 900);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-2xl sm:text-3xl font-bold flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-9 w-9 place-items-center rounded-xl gradient-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-5 w-5" })
				}), "AI Assistant"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Ask about your medicines in plain English."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "glass flex-1 flex flex-col overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							initial: false,
							children: messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								animate: {
									opacity: 1,
									y: 0
								},
								className: `flex gap-3 ${m.role === "user" ? "justify-end" : ""}`,
								children: [
									m.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${m.role === "user" ? "gradient-primary text-primary-foreground" : "bg-muted"}`,
										children: m.content
									}),
									m.role === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-muted",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
									})
								]
							}, i))
						}),
						typing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-muted rounded-2xl px-4 py-3 flex gap-1",
								children: [
									0,
									1,
									2
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "h-2 w-2 rounded-full bg-primary",
									animate: { y: [
										0,
										-4,
										0
									] },
									transition: {
										duration: .6,
										repeat: Infinity,
										delay: i * .15
									}
								}, i))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
					]
				}),
				messages.length <= 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 sm:px-6 pb-2 flex flex-wrap gap-2",
					children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => send(s),
						className: "text-xs px-3 py-1.5 rounded-full glass hover:bg-primary/10 transition-colors flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-primary" }),
							" ",
							s
						]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						send(input);
					},
					className: "border-t border-border/50 p-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "Ask about your medicines...",
						className: "flex-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "gradient-primary text-primary-foreground",
						disabled: !input.trim() || typing,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				})
			]
		})]
	});
}
//#endregion
export { AssistantPage as component };
