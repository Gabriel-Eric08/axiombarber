import { useState } from 'react'
import { ImagePlus } from 'lucide-react'
import './ImageSlot.css'

/**
 * Mostra a imagem se houver `src`; caso contrário (ou se falhar ao carregar)
 * exibe um placeholder "Sua imagem aqui".
 */
export default function ImageSlot({ src, alt = '', className = '', label = 'Sua imagem aqui', ...rest }) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  return (
    <div className={`imgslot ${showImg ? '' : 'imgslot--empty'} ${className}`} {...rest}>
      {showImg ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="imgslot__ph" role="img" aria-label={alt || label}>
          <ImagePlus size={28} strokeWidth={1.4} />
          <span>{label}</span>
        </div>
      )}
    </div>
  )
}
