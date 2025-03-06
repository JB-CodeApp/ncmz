import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const filePath = searchParams.get('path') // Get file path from query params

		if (!filePath) {
			return NextResponse.json({ error: 'Missing file path' }, { status: 400 })
		}

		// Construct the absolute path to the MDX file
		const absolutePath = path.join(process.cwd(), 'public', filePath)


		if (!fs.existsSync(absolutePath)) {
			return NextResponse.json({ error: 'MDX file not found' }, { status: 404 })
		}

		const fileContent = fs.readFileSync(absolutePath, 'utf-8')
		const { content } = matter(fileContent)

		return NextResponse.json({ content })
	} catch (error) {
		// console.error('❌ Error reading MDX file:', error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		)
	}
}
