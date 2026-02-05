import http from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3001

const server = http.createServer((req, res) => {
	// CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	res.setHeader("Access-Control-Allow-Headers", "Content-Type")

	if (req.method === "OPTIONS") {
		return res.writeHead(200).end()
	}

	// Health check endpoint
	if (req.url === "/health" && req.method === "GET") {
		res.writeHead(200, { "Content-Type": "application/json" })
		return res.end(JSON.stringify({ status: "ok" }))
	}

	// Save translations endpoint
	if (req.url === "/api/save-translations" && req.method === "POST") {
		let body = ""

		req.on("data", chunk => {
			body += chunk.toString()
		})

		req.on("end", () => {
			try {
				const translations = JSON.parse(body)
				const langDictPath = path.join(__dirname, "../langDictionary.js")

				// Generate the JavaScript file content
				const fileContent = `export default ${JSON.stringify(translations, null, 2)}\n`

				// Write to file
				fs.writeFileSync(langDictPath, fileContent, "utf-8")

				console.log(`✓ Translations saved successfully!`)
				res.writeHead(200, { "Content-Type": "application/json" })
				res.end(
					JSON.stringify({
						success: true,
						message: "Translations saved successfully",
					})
				)
			} catch (error) {
				console.error("❌ Error saving translations:", error.message)
				res.writeHead(500, { "Content-Type": "application/json" })
				res.end(
					JSON.stringify({ success: false, error: error.message })
				)
			}
		})

		return
	}

	// 404 for unknown routes
	res.writeHead(404, { "Content-Type": "application/json" })
	res.end(JSON.stringify({ error: "Not found" }))
})

server.listen(PORT, () => {
	console.log(`\n🌍 Language Editor API running on http://localhost:${PORT}\n`)
	console.log("Endpoints:")
	console.log("  GET  /health - Health check")
	console.log("  POST /api/save-translations - Save translations to file\n")
})

// Graceful shutdown
process.on("SIGINT", () => {
	console.log("\nShutting down server...")
	server.close(() => {
		console.log("Server closed")
		process.exit(0)
	})
})
