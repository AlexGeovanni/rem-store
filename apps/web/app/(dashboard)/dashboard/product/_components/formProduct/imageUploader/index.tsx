import InputImage from "./inputImage"


export default function ImageUploader({onChange}:{onChange?: (file: File | null) => void}) {
  return (
    <div className="flex items-center justify-center bg-background p-6">
      <section className="w-full max-w-md space-y-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Subida de imágenes
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            Selecciona o arrastra una imagen <strong>.JPEG</strong> o{" "}
            <strong>.WEBP</strong> de maximo  {" "}
            <strong>150 KB</strong>.
          </p>
        </header>

        <InputImage onChange={onChange} />
      </section>
    </div>
  )
}
