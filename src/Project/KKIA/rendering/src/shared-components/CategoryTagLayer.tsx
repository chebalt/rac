export default function CategoryTagLayer({ name }: { name: string }) {
  return (
    <div className="absolute bottom-0 left-0 m-6 max-w-[80%] rtl:right-0 rtl:left-auto">
      <div className="text-primary-dark-green px-4 py-2 uppercase text-body-medium-regular bg-lightGray">
        {name}
      </div>
    </div>
  );
}
