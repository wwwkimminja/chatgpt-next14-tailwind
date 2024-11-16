import Image from 'next/image';

export function Empty() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Image src="/logo.png" width={50} height={50} alt="empty" />
      <h3 className="text-xl md:text-2xl font-bold p-2">
        What can I help you?
      </h3>
    </div>
  );
}
