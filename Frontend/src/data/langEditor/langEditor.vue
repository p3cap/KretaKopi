/*

Copilot made lang editor, tested.

*/

<template>
	<div class="editor-container">
		<header class="editor-header">
			<h1>🌍 Language Editor (from github copilot)</h1>
		</header>
		<div class="editor-header">
			<p class="subtitle">Supported dynamic texts:</p>
			<p class="subtitle" v-for="key in Object.keys(baseDynamicTexts)" :key="key">{{ key }}</p>
		</div>

		<div class="controls">
			<div class="control-group">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="🔍 Search keys..."
					class="search-input"
				/>
			</div>

			<div class="control-group">
				<label class="filter-label">Filter:</label>
				<select v-model="filterMode" class="filter-select">
					<option value="all">A–Z (All)</option>
					<option value="new">✨ Newly Added</option>
					<option value="changed">📝 Edited</option>
					<option value="newOrChanged">🔄 New or Edited</option>
				</select>
			</div>

			<div class="control-group">
				<button
					@click="showAddKeyForm = !showAddKeyForm"
					class="btn btn-add"
					:class="{ active: showAddKeyForm }"
				>
					➕ New Key
				</button>
				<button
					@click="showAddLangForm = !showAddLangForm"
					class="btn btn-add"
					:class="{ active: showAddLangForm }"
				>
					🌍 New Language
				</button>
				<button @click="saveChanges" :disabled="isSaving" class="btn btn-save">
					{{ isSaving ? "Saving..." : "💾 Save Changes" }}
				</button>
			</div>

			<!-- Add Key Form (now shows inputs for all langs) -->
			<div v-if="showAddKeyForm" class="form-group form-vertical">
				<input
					v-model="newKeyInput"
					type="text"
					placeholder="Enter new key name..."
					class="form-input"
					@keyup.enter="addKey"
					@keyup.escape="showAddKeyForm = false"
					autofocus
				/>
				<div class="per-lang-inputs">
					<label v-if="languages.length === 0" class="muted">No languages yet — add one first</label>
					<div v-for="lang in languages" :key="lang" class="lang-input-row">
						<span class="lang-label">{{ lang }}</span>
						<input v-model="newKeyLangValues[lang]" type="text" class="form-input" :placeholder="`Value for ${lang}`" />
					</div>
				</div>
				<div class="form-actions">
					<button @click="addKey" class="btn btn-form">Add Key</button>
					<button @click="showAddKeyForm = false" class="btn btn-form-cancel">Cancel</button>
				</div>
			</div>

			<!-- Add Language Form -->
			<div v-if="showAddLangForm" class="form-group">
				<input
					v-model="newLangInput"
					type="text"
					placeholder="Enter language code (e.g., EN, HU)..."
					class="form-input"
					@keyup.enter="addLang"
					@keyup.escape="showAddLangForm = false"
					autofocus
				/>
				<button @click="addLang" class="btn btn-form">Add Language</button>
				<button @click="showAddLangForm = false" class="btn btn-form-cancel">Cancel</button>
			</div>

			<div v-if="saveStatus" :class="['status-message', saveStatus.type]">{{ saveStatus.message }}</div>
		</div>

		<div class="table-wrapper">
			<table class="translations-table">
				<thead>
					<tr>
						<th class="col-key">Key</th>
						<th v-for="lang in languages" :key="lang" class="col-lang">
							<div class="lang-head">
								<span>{{ lang }}</span>
								<button class="btn-delete-lang" @click="deleteLang(lang)" title="Delete language">✖</button>
							</div>
						</th>
						<th class="col-actions">Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="key in filteredKeys" :key="key" class="translation-row">
						<td class="col-key">
							<input
								v-model="editingKeyDrafts[key]"
								@blur="commitRename(key)"
								@keyup.enter="commitRename(key)"
								class="key-input"
								:class="{ 'new-key': addedKeys[key], 'changed-key': changedKeys[key] }"
							/>
						</td>
						<td v-for="lang in languages" :key="lang" class="col-lang">
							<input
								:value="translations[key] && translations[key][lang] !== undefined ? translations[key][lang] : ''"
								@input="e => updateTranslation(key, lang, e.target.value)"
								type="text"
								class="translation-input"
								:class="{ 'new-key': addedKeys[key], 'new-lang': addedLangs[lang], 'changed-cell': changedCells[`${key}|${lang}`] }"
								:placeholder="lang"
							/>
						</td>
						<td class="col-actions">
							<button @click="deleteKey(key)" class="btn-delete" title="Delete this key">🗑️</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<footer class="editor-footer">
			<p>Total keys: <strong>{{ Object.keys(translations).length }}</strong></p>
			<p>Languages: <strong>{{ languages.join(', ') }}</strong></p>
		</footer>
	</div>
</template>

<script setup lang="js">
import { baseDynamicTexts } from "@/data/translate.js"
import { reactive, computed, ref, watch } from "vue"
import translationDictionary from "@/data/langDictionary.js"

// deep copy original to detect changes
const originalTranslations = JSON.parse(JSON.stringify(translationDictionary || {}))

// reactive wrapper (deep clone so edits don't mutate originalTranslations)
const translations = reactive(JSON.parse(JSON.stringify(translationDictionary || {})))
const isSaving = ref(false)
const saveStatus = ref(null)
const searchQuery = ref("")
const newKeyInput = ref("")
const newLangInput = ref("")
const showAddKeyForm = ref(false)
const showAddLangForm = ref(false)
const filterMode = ref("all")

// tracking additions and changes
const addedKeys = reactive({})
const addedLangs = reactive({})
const changedCells = reactive({})
const changedKeys = reactive({})

// drafts for renaming keys
const editingKeyDrafts = reactive({})
// per-lang values in add-key form
const newKeyLangValues = reactive({})

// initialize editing drafts and newKeyLangValues
for (const k in translations) editingKeyDrafts[k] = k
{
	const langs = new Set()
	Object.values(translations).forEach(entry => Object.keys(entry).forEach(l => langs.add(l)))
	for (const l of langs) newKeyLangValues[l] = ""
}

// languages derived from all keys (sorted A–Z)
const languages = computed(() => {
	const set = new Set()
	Object.values(translations).forEach(entry => {
		Object.keys(entry).forEach(lang => set.add(lang))
	})
	return [...set].sort((a, b) => a.localeCompare(b))
})

// keep newKeyLangValues in sync with languages
watch(languages, (langs) => {
	langs.forEach(lang => {
		if (newKeyLangValues[lang] === undefined) newKeyLangValues[lang] = ""
	})
})

// filter keys by search (sorted A–Z)
const filteredKeys = computed(() => {
	const keys = Object.keys(translations).filter(k => k && typeof k === 'string')
	
	// apply search filter
	let filtered = !searchQuery.value.trim()
		? keys
		: keys.filter(key => key.toLowerCase().includes(searchQuery.value.toLowerCase()))
	
	// apply filter mode
	if (filterMode.value === "new") {
		filtered = filtered.filter(key => addedKeys[key])
	} else if (filterMode.value === "changed") {
		filtered = filtered.filter(key => changedKeys[key] || Object.keys(changedCells).some(c => c.startsWith(key + "|")))
	} else if (filterMode.value === "newOrChanged") {
		filtered = filtered.filter(key => addedKeys[key] || changedKeys[key] || Object.keys(changedCells).some(c => c.startsWith(key + "|")))
	}
	
	// sort A–Z
	return filtered.sort((a, b) => a.localeCompare(b))
})

// helpers
function markCellChanged(key, lang) {
	const orig = (originalTranslations[key] && originalTranslations[key][lang] !== undefined) ? originalTranslations[key][lang] : ""
	const curr = (translations[key] && translations[key][lang] !== undefined) ? translations[key][lang] : ""
	changedCells[`${key}|${lang}`] = !addedKeys[key] && !addedLangs[lang] && curr !== orig
}

function updateTranslation(key, lang, value) {
	if (!translations[key]) translations[key] = {}
	translations[key][lang] = value
	markCellChanged(key, lang)
}

// add a new key (uses per-lang inputs)
function addKey() {
	const key = newKeyInput.value.trim()
	if (!key || translations[key]) {
		if (translations[key]) saveStatus.value = { type: "error", message: `Key "${key}" already exists` }
		return
	}
	translations[key] = {}
	languages.value.forEach(lang => {
		translations[key][lang] = newKeyLangValues[lang] ?? ""
		newKeyLangValues[lang] = ""
	})
	addedKeys[key] = true
	editingKeyDrafts[key] = key
	newKeyInput.value = ""
	showAddKeyForm.value = false
	saveStatus.value = { type: "success", message: `Added key "${key}"` }
	setTimeout(() => (saveStatus.value = null), 2000)
}

// add a new language
function addLang() {
	const lang = newLangInput.value.trim().toUpperCase()
	if (!lang || languages.value.includes(lang)) {
		if (languages.value.includes(lang)) saveStatus.value = { type: "error", message: `Language "${lang}" already exists` }
		return
	}
	for (const key in translations) {
		translations[key][lang] = ""
	}
	newKeyLangValues[lang] = ""
	addedLangs[lang] = true
	newLangInput.value = ""
	showAddLangForm.value = false
	saveStatus.value = { type: "success", message: `Added language "${lang}"` }
	setTimeout(() => (saveStatus.value = null), 2000)
}

// commit rename of a key
function commitRename(oldKey) {
	const draft = (editingKeyDrafts[oldKey] || "").trim()
	if (!draft || draft === oldKey) {
		editingKeyDrafts[oldKey] = oldKey
		return
	}
	if (translations[draft]) {
		saveStatus.value = { type: "error", message: `Key "${draft}" already exists` }
		editingKeyDrafts[oldKey] = oldKey
		setTimeout(() => (saveStatus.value = null), 2000)
		return
	}
	// move value
	translations[draft] = translations[oldKey]
	delete translations[oldKey]

	// move added/changed flags
	addedKeys[draft] = addedKeys[oldKey] || false
	if (addedKeys[oldKey]) delete addedKeys[oldKey]

	changedKeys[draft] = true

	// move originalTranslations entry
	originalTranslations[draft] = originalTranslations[oldKey] || {}
	delete originalTranslations[oldKey]

	// remap changedCells entries
	Object.keys(changedCells).forEach(k => {
		if (k.startsWith(oldKey + "|")) {
			const rest = k.slice(oldKey.length + 1)
			changedCells[`${draft}|${rest}`] = changedCells[k]
			delete changedCells[k]
		}
	})

	// move editing draft
	editingKeyDrafts[draft] = draft
	delete editingKeyDrafts[oldKey]

	saveStatus.value = { type: "success", message: `Renamed "${oldKey}" → "${draft}"` }
	setTimeout(() => (saveStatus.value = null), 2000)
}

// delete a language (remove column)
function deleteLang(lang) {
	if (!confirm(`Delete language "${lang}" from all keys?`)) return
	for (const key in translations) {
		if (translations[key] && translations[key][lang] !== undefined) delete translations[key][lang]
		delete changedCells[`${key}|${lang}`]
	}
	delete addedLangs[lang]
	saveStatus.value = { type: "success", message: `Deleted language "${lang}"` }
	setTimeout(() => (saveStatus.value = null), 2000)
}

// save to file (unchanged)
async function saveChanges() {
	isSaving.value = true
	saveStatus.value = null
	try {
		const response = await fetch("http://localhost:3001/api/save-translations", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(translations),
		})
		if (response.ok) {
			saveStatus.value = { type: "success", message: "Saved successfully! ✓" }
			setTimeout(() => (saveStatus.value = null), 3000)
		} else {
			const error = await response.json()
			saveStatus.value = { type: "error", message: "Save failed: " + error.error }
		}
	} catch (err) {
		saveStatus.value = { type: "error", message: "Connection error - make sure the backend server is running on port 3001" }
	} finally {
		isSaving.value = false
	}
}

// delete a key
function deleteKey(key) {
	if (confirm(`Delete key "${key}"?`)) {
		// remove related markers
		Object.keys(changedCells).forEach(k => { if (k.startsWith(key + "|")) delete changedCells[k] })
		delete translations[key]
		delete editingKeyDrafts[key]
		delete addedKeys[key]
	}
}
</script>

<style scoped>
* {
	box-sizing: border-box;
}

.editor-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 2rem;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, sans-serif;
	color: #333;
}

.editor-header {
	background: white;
	border-radius: 12px;
	padding: 2rem;
	margin-bottom: 2rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.editor-header h1 {
	margin: 0 0 0.5rem 0;
	font-size: 2.5rem;
	color: #667eea;
}

.subtitle {
	margin: 0;
	color: #666;
	font-size: 1rem;
}

.controls {
	background: white;
	border-radius: 12px;
	padding: 1.5rem;
	margin-bottom: 2rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.control-group {
	margin-bottom: 1rem;
}

.control-group:last-child {
	margin-bottom: 0;
}

.search-input {
	width: 100%;
	padding: 0.75rem 1rem;
	font-size: 1rem;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	transition: border-color 0.3s;
}

.search-input:focus {
	outline: none;
	border-color: #667eea;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-label {
	font-weight: 600;
	color: #374151;
	margin-right: 0.5rem;
}

.filter-select {
	padding: 0.6rem 0.75rem;
	font-size: 0.95rem;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	background: white;
	cursor: pointer;
	transition: all 0.3s;
}

.filter-select:hover {
	border-color: #667eea;
}

.filter-select:focus {
	outline: none;
	border-color: #667eea;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn {
	padding: 0.75rem 1.25rem;
	margin-right: 0.75rem;
	margin-bottom: 0.5rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: all 0.3s;
	font-weight: 500;
}

.btn:hover:not(:disabled) {
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.btn-add {
	background: #667eea;
	color: white;
}

.btn-add:hover:not(:disabled) {
	background: #5568d3;
}

.btn-add.active {
	background: #5568d3;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.btn-save {
	background: #10b981;
	color: white;
}

.btn-save:hover:not(:disabled) {
	background: #059669;
}

.form-group {
	display: flex;
	gap: 0.75rem;
	margin-top: 1rem;
	padding-top: 1rem;
	border-top: 1px solid #e0e0e0;
}

.form-input {
	flex: 1;
	padding: 0.75rem 1rem;
	font-size: 1rem;
	border: 2px solid #e0e0e0;
	border-radius: 8px;
	transition: all 0.3s;
	font-family: inherit;
}

.form-input:focus {
	outline: none;
	border-color: #667eea;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-form {
	background: #667eea;
	color: white;
	padding: 0.75rem 1.5rem;
}

.btn-form:hover {
	background: #5568d3;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-form-cancel {
	background: #e5e7eb;
	color: #374151;
	padding: 0.75rem 1.5rem;
}

.btn-form-cancel:hover {
	background: #d1d5db;
	transform: translateY(-2px);
}

.status-message {
	padding: 1rem;
	border-radius: 8px;
	margin-top: 1rem;
	font-weight: 500;
}

.status-message.success {
	background: #d1fae5;
	color: #065f46;
	border: 1px solid #6ee7b7;
}

.status-message.error {
	background: #fee2e2;
	color: #7f1d1d;
	border: 1px solid #fca5a5;
}

.table-wrapper {
	background: white;
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	overflow-x: auto;
}

.translations-table {
	width: 100%;
	border-collapse: collapse;
	font-size: 0.95rem;
}

.translations-table thead {
	background: #f8f9fa;
	border-bottom: 2px solid #e0e0e0;
}

.translations-table th {
	padding: 1rem;
	text-align: left;
	font-weight: 600;
	color: #667eea;
}

.col-key {
	width: 200px;
	min-width: 200px;
}

.col-lang {
	width: 200px;
	min-width: 200px;
}

.col-actions {
	width: 60px;
	min-width: 60px;
	text-align: center;
}

.translation-row {
	border-bottom: 1px solid #f0f0f0;
	transition: background-color 0.2s;
}

.translation-row:hover {
	background-color: #f9fafb;
}

.translations-table td {
	padding: 1rem;
	vertical-align: middle;
}

code {
	background: #f3f4f6;
	padding: 0.25rem 0.5rem;
	border-radius: 4px;
	font-family: "Monaco", "Menlo", monospace;
	color: #667eea;
	font-size: 0.9rem;
}

.translation-input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	font-size: 0.95rem;
	transition: all 0.3s;
	font-family: inherit;
}

.translation-input:focus {
	outline: none;
	border-color: #667eea;
	box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	background: #f9fafb;
}

.btn-delete {
	background: none;
	border: none;
	font-size: 1.2rem;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	border-radius: 6px;
	transition: all 0.3s;
}

.btn-delete:hover {
	background: #fee2e2;
	transform: scale(1.1);
}

/* New/changed highlighting and layout */
.key-input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 6px;
	font-size: 0.95rem;
}
.key-input.new-key { background: #ecfdf5; border-color: #34d399; }
.key-input.changed-key { background: #fffbeb; border-color: #f59e0b; }
.translation-input.new-key { background: #ecfdf5; }
.translation-input.new-lang { background: #eef2ff; }
.translation-input.changed-cell { background: #fff7ed; border-color: #f59e0b; }
.btn-delete-lang {
	margin-left: 8px;
	background: none;
	border: none;
	color: #9ca3af;
	cursor: pointer;
}
.btn-delete-lang:hover { color: #ef4444; }
.form-vertical { flex-direction: column; align-items: stretch; }
.per-lang-inputs { margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.lang-input-row { display:flex; gap:0.5rem; align-items:center; }
.lang-label { width:64px; color:#374151; font-weight:600 }
.form-actions { margin-top:0.5rem }


.editor-footer {
	background: white;
	border-radius: 12px;
	padding: 1.5rem;
	margin-top: 2rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	text-align: center;
	color: #666;
}

.editor-footer p {
	margin: 0.5rem 0;
}

.editor-footer strong {
	color: #667eea;
	font-weight: 600;
}
</style>
