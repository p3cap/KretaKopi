import { 
	SquareRadical, Languages, Atom, Dumbbell, History, Book,
	FileExclamationPoint
} from "lucide-vue-next"

// general-purpose icons
const generalIcons = {
	"exam": FileExclamationPoint,
}

// subject keywords → icon component directly
const subjectIconMap = [
	{ component: SquareRadical, keywords: ["mat", "math", "mate"] },
	{ component: Languages, keywords: ["lang", "angol", "német", "ger", "en"] },
	{ component: Atom, keywords: ["physics", "fiz", "tud"] },
	{ component: Dumbbell, keywords: ["test", "pe", "physical", "gym"] },
	{ component: History, keywords: ["tör", "his"] },
	{ component: Book, keywords: ["magyar", "tan", "irodalom", "lit"] },
]

function guessIcon(sample_string) {
	sample_string = sample_string.toLowerCase()
	for (const e of subjectIconMap) {
		const { component, keywords } = e
		for (const kw of keywords) {
			if (sample_string.includes(kw)) {
				return component
			}
		}
	}
	// fallback (optional)
	return null
}

export { guessIcon, generalIcons }
