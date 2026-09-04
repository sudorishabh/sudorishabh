const photos = [
  {
    top: "10%",
    overlap: "0px",
    rotate: -4,
    z: 10,
    size: "w-36 h-44 md:w-40- md:h-40",
    gradient: "from-rose-200 to-rose-300",
  },
  {
    top: "12.5%",
    overlap: "-32px",
    rotate: -2,
    z: 9,
    size: "w-36 h-44 md:w-34 md:h-42",
    gradient: "from-orange-200 to-orange-300",
  },
  {
    top: "8%",
    overlap: "-40px",
    rotate: 2,
    z: 8,
    size: "w-36 h-44 md:w-40 md:h-40",
    gradient: "from-amber-200 to-amber-300",
  },
  {
    top: "12.2%",
    overlap: "-36px",
    rotate: 0,
    z: 4,
    size: "w-36 h-44 md:w-42 md:h-34",
    gradient: "from-sky-200 to-sky-300",
  },
  {
    top: "10%",
    overlap: "-44px",
    rotate: 4,
    z: 3,
    size: "w-36 h-44 md:w-44 md:h-44",
    gradient: "from-emerald-200 to-emerald-300",
  },
  {
    top: "12.5%",
    overlap: "-28px",
    rotate: 0,
    z: 2,
    size: "w-36 h-42 md:w-36 md:h-42",
    gradient: "from-violet-200 to-violet-300",
  },
];

export default function PicsSection() {
  return (
    <div className='relative mx-auto flex h-70 w-[65%] px-20 items-start justify-between overflow-hidden md:h-70'>
      {photos.map((photo, i) => (
        <div
          key={i}
          className={`rounded-sm bg-white border border-gray-900 shadow-lg ${photo.size}`}
          style={{
            marginTop: photo.top,
            marginLeft: photo.overlap,
            zIndex: photo.z,
            transform: `rotate(${photo.rotate}deg)`,
          }}>
          <div
            className={`h-full w-full rounded-[1px]  bg-linear-to-br ${photo.gradient}`}
          />
        </div>
      ))}
      {/* <div className='pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-linear-to-b from-transparent to-neutral-950 backdrop-blur-lg mask-[linear-gradient(to_bottom,transparent,black)] md:h-36' /> */}
    </div>
  );
}
