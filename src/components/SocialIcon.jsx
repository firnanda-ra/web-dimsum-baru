import Image from 'next/image'

export default function SocialIcon({ src, alt, tooltip }) {
  return (
    <div className="group relative">
      <div className="rounded-xl border border-black bg-[#e9ecef] p-3 transition-all duration-300 hover:scale-110 hover:bg-[#ced4da]">
        <Image src={src} alt={alt} width={24} height={24} />
      </div>
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#2B333B] px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:opacity-100">
        {tooltip}
      </span>
    </div>
  )
}
