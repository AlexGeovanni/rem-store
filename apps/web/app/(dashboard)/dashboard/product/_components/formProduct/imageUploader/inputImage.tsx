"use client"

import {
  type ChangeEvent,
  type DragEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { AlertCircle, ImageIcon, Trash2, UploadCloud } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"


/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export interface ImageUploaderProps {
  /** Existing image URL, normally received while editing a product. */
  value?: string | null
  /** Called whenever a valid file is selected (or null when removed). */
  onChange?: (file: File | null) => void
  /** Allowed MIME types. Defaults to JPEG and WEBP. */
  acceptedTypes?: string[]
  /** Minimum size in bytes. Defaults to 70 KB. */
  minSizeBytes?: number
  /** Maximum size in bytes. Defaults to 150 KB. */
  maxSizeBytes?: number
  /** Optional label shown above the dropzone. */
  label?: string
  /** Extra classes for the root element. */
  className?: string
}

interface SelectedImage {
  file: File
  previewUrl: string
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

const KB = 1024

const formatBytes = (bytes: number): string => {
  if (bytes < KB) return `${bytes} B`
  if (bytes < KB * KB) return `${(bytes / KB).toFixed(1)} KB`
  return `${(bytes / (KB * KB)).toFixed(2)} MB`
}

/**
 * Validates the file against type and size constraints.
 * Returns an error message in Spanish or `null` when the file is valid.
 */
const validateFile = (
  file: File,
  acceptedTypes: string[],
  minSizeBytes: number,
  maxSizeBytes: number,
): string | null => {
  if (!acceptedTypes.includes(file.type)) {
    const readable = acceptedTypes
      .map((t) => t.replace("image/", ".").toUpperCase())
      .join(" o ")
    return `Tipo de archivo no permitido. Solo se aceptan archivos ${readable}.`
  }

  if (file.size < minSizeBytes) {
    return `El archivo es demasiado pequeño (${formatBytes(
      file.size,
    )}). El tamaño mínimo es ${formatBytes(minSizeBytes)}.`
  }

  if (file.size > maxSizeBytes) {
    return `El archivo es demasiado grande (${formatBytes(
      file.size,
    )}). El tamaño máximo es ${formatBytes(maxSizeBytes)}.`
  }

  return null
}


export function InputImage({
  value,
  onChange,
  acceptedTypes = ["image/jpeg", "image/webp"],
  minSizeBytes = 0 * KB,
  maxSizeBytes = 150 * KB,
  label = "Sube una imagen",
  className,
}: ImageUploaderProps) {
  const inputId = useId()
  const errorId = useId()
  const helperId = useId()

  const inputRef = useRef<HTMLInputElement>(null)

  const [image, setImage] = useState<SelectedImage | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    return () => {
      if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl)
    }
  }, [image?.previewUrl])

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      if (!file) return

      setError(null)
      setIsLoading(true)

      const validationError = validateFile(
        file,
        acceptedTypes,
        minSizeBytes,
        maxSizeBytes,
      )

      if (validationError) {
        
        setImage((prev) => {
          if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl)
          return null
        })
        setError(validationError)
        setIsLoading(false)
        return
      }

      const previewUrl = URL.createObjectURL(file)

      setImage((prev) => {
        if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl)
        return { file, previewUrl }
      })
      setIsLoading(false)
      onChange?.(file)
    },
    [acceptedTypes, minSizeBytes, maxSizeBytes, onChange],
  )

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0])
    // Allow re-selecting the same file again later.
    event.target.value = ""
  }

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    handleFile(event.dataTransfer.files?.[0])
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      inputRef.current?.click()
    }
  }

  const handleRemove = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl)
    setImage(null)
    setError(null)
    onChange?.(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const acceptAttr = acceptedTypes.join(",")
  const previewUrl = image?.previewUrl ?? value ?? null
  const hasImage = Boolean(previewUrl)
  return (
    <div className={cn("w-full max-w-md relative", className)}>
      <label
        htmlFor={inputId}
        tabIndex={0}
        role="button"
        aria-describedby={`${helperId}${error ? ` ${errorId}` : ""}`}
        aria-invalid={Boolean(error)}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative h-41 flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed bg-card p-2 text-center transition-colors",
          "hover:border-primary/60 hover:bg-accent/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragging && "border-primary bg-accent/60",
          error
            ? "border-destructive/60 bg-destructive/5"
            : "border-border",
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={acceptAttr}
          onChange={handleInputChange}
          className="sr-only"
          aria-label={label}
        />

        {hasImage ? (
          <div className="h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl ?? "/placeholder.svg"}
              alt={`Vista previa ${image?.file.name ?? "del producto"}`}
              className="h-full w-auto rounded-md border border-border object-cover"
            />
            {/* <div className="w-full text-sm text-muted-foreground">
              <p className="truncate font-medium text-foreground">
                {image?.file.name ?? "Imagen actual del producto"}
              </p>
              <p>{image ? formatBytes(image.file.size) : "Imagen guardada"}</p>
            </div> */}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-4.5">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-full w-12 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors",
                isDragging && "bg-primary/10 text-primary",
              )}
            >
              {isLoading ? (
                <ImageIcon className="h-6 w-6 animate-pulse" />
              ) : (
                <UploadCloud className="h-6 w-6" />
              )}
            </span>
            <p className="text-sm font-medium text-foreground text-balance">
              {label}
            </p>
            <p className="text-xs text-muted-foreground text-pretty">
              Arrastra y suelta una imagen aquí o haz clic para seleccionarla.
            </p>
          </div>
        )}
      </label>

      {/* Error message */}
      {error && (
        <div
          id={errorId}
          role="alert"
          aria-live="polite"
          className="mt-2 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="leading-snug">{error}</p>
        </div>
      )}

      {/* Actions */}
      {hasImage && (
        <div className="flex items-center justify-center gap-2 ">
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer rounded-2xl"
          >
            Cambiar imagen
          </Button> */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            aria-label="Eliminar imagen seleccionada"
            className="absolute w-7 top-0 right-0 z-999 rounded-full cursor-pointer"
          >
            <Trash2 className=" " aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default InputImage
