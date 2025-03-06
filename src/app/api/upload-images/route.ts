import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const files = formData.getAll('images') as File[]

		if (files.length === 0) {
			return NextResponse.json(
				{ message: 'No images provided.' },
				{ status: 400 },
			)
		}

		const dateObj = new Date()
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
		const year = dateObj.getFullYear().toString()

		const uploadDir = path.join(
			process.cwd(),
			'public',
			'blog',
			`${year}`,
			`${month}`,
			'data',
		)

		// const uploadDir = path.join(process.cwd(), 'public/uploads');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true })
		}

		// Save each image
		for (const file of files) {
			const filePath = path.join(uploadDir, file.name)
			const buffer = Buffer.from(await file.arrayBuffer())
			fs.writeFileSync(filePath, buffer)
		}

		return NextResponse.json({ message: 'Images uploaded successfully!' })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ message: 'Error uploading images.' },
			{ status: 500 },
		)
	}
}
