import { 
	SquareRadical, Languages, Atom, Dumbbell, History, Book,
	FileExclamationPoint
} from "lucide-vue-next"

// general-purpose icons
const generalIcons = {
	"exam": FileExclamationPoint,
}

// subject keywords → icon component directly
const subjectIconMap = {
	SquareRadical: { keywords: ["mat", "math", "mate"], component: SquareRadical },
	Languages: { keywords: ["lang", "angol", "német", "ger"], component: Languages },
	Atom: { keywords: ["phy", "fiz", "tud"], component: Atom },
	Dumbbell: { keywords: ["test", "pe", "physical"], component: Dumbbell },
	History: { keywords: ["tör", "his"], component: History },
	Book: { keywords: ["magyar", "tan", "irodalom", "lit"], component: Book },
}

function guessIcon(sample_string) {
	sample_string = sample_string.toLowerCase()

	for (const key of Object.keys(subjectIconMap)) {
		const { keywords, component } = subjectIconMap[key]
		for (const kw of keywords) {
			if (sample_string.includes(kw)) {
				return key
			}
		}
	}

	// fallback (optional)
	return null
}

export { guessIcon, generalIcons }
