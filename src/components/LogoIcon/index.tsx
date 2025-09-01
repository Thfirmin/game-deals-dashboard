type LogoIconProps = {
	size?: number
}

export default function LogoIcon({
	size = 36
}: LogoIconProps) {
	const imgSize = Math.floor(size * (8/9))
	const fontSize = {fontSize: size}

	return (
		<div className="flex flex-row items-center gap-2">
			<span className="font-bold text-yellow-500" style={fontSize}>Gam</span>
			<img src="/icon.svg" alt="Logo Icon" width={imgSize} height={imgSize} />
			<span className="font-bold text-yellow-500" style={fontSize}>s Deals</span>
		</div>
	)
}