import InputImage from "./inputImage"

interface ImageUploaderProps {
  value?: string | null
  onChange?: (file: File | null) => void
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  return (
    <div className="flex items-center justify-center ">
      <section className="w-full">
        <header className="mb-6">
          <p className="text-lg font-medium">
            Subida de imágenes
          </p>
          {/* <p className="text-sm text-muted-foreground text-pretty">
            Selecciona o arrastra una imagen <strong>.JPEG</strong> o{" "}
            <strong>.WEBP</strong> de maximo  {" "}
            <strong>150 KB</strong>.
          </p> */}
        </header>

        <div className="grid lg:grid-cols-3 xl:grid-cols-4">
          <InputImage  className="col-span-1" value={value} onChange={onChange} />
        </div>

      </section>
    </div>
  )
}
