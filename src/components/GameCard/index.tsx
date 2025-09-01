import { Star } from 'lucide-react'
import './style.css'
import Text from '../Text'

type GameCardProps = {
  onClick?: (dealID: string) => void;
  dealID: string;
  title: string;
  imageUrl: string;
  actualPrice: string;
  originalPrice: string;
  discount: string;
  rating: string;
  storeLogoUrl: string;
}

export default function GameCard({
  onClick,
  dealID,
  title,
  imageUrl,
  actualPrice,
  originalPrice,
  discount,
  rating,
  storeLogoUrl
}: GameCardProps) {
  function onClickHandle() {
    if (onClick) onClick(dealID);
  }

  return (
    <div onClick={onClickHandle} className="game-card min-w-sm bg-card-foreground text-card rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:cursor-pointer">

      {/* Header do jogo */}
      <section className="flex items-center gap-3 p-4 border-b border-zinc-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <Text.Subtitle className="text-lg font-bold tracking-wide">{title}</Text.Subtitle>
      </section>

      {/* Preços */}
      <section className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <Text.Body>Actual Price</Text.Body>
          <span className="font-semibold text-green-400">{actualPrice}</span>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <Text.Body>Original Price</Text.Body>
          <span className="line-through text-zinc-500">{originalPrice}</span>
        </div>
        <div className="flex items-center justify-between">
          <Text.Body>Discount</Text.Body>
          <span className="font-semibold text-yellow-400">{discount}</span>
        </div>
        <div className="flex items-center justify-between">
          <Text.Body>Rating</Text.Body>
          <Text.Body className="font-semibold flex flex-row gap-1"><Star className='text-yellow-400' /> {rating}</Text.Body>
        </div>
      </section>

      {/* Loja */}
      <section className="flex items-center justify-between p-4 border-t border-zinc-800">
        <Text.Desc>Available on:</Text.Desc>
        <img
          src={storeLogoUrl}
          alt="Store Logo"
          className="w-8 h-8 rounded"
        />
      </section>
    </div>
  )
}