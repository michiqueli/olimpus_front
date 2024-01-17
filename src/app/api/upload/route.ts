import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest): Promise<NextResponse> {
    const data = await request.formData();

    const image = data.get('file');

    if (!image || !(image instanceof File)) {
        return NextResponse.json("No se proporcionó un archivo válido", { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) { reject(err) }
            resolve(result);
        }).end(buffer)
    })

    if (!response) {
        return NextResponse.json("Error al subir la imagen", { status: 500 });
    }

    return NextResponse.json({ message: "imagen subida", url: (await response).secure_url, })
}