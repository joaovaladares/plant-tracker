/** Redimensiona e comprime uma imagem antes de salvar no IndexedDB */
export async function compressImage(file: File, maxDimension = 800, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      const canvas = document.createElement('canvas')
      let { width, height } = img

      if (width > height) {
        if (width > maxDimension) { height = (height * maxDimension) / width; width = maxDimension }
      } else {
        if (height > maxDimension) { width = (width * maxDimension) / height; height = maxDimension }
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.onerror = reject
    img.src = url
  })
}
