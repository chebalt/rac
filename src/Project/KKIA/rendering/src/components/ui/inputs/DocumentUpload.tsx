import React from 'react';
import AddSvg from 'assets/icons/AddSvg';
import CloseCircleSvg from 'assets/icons/CloseCircleSvg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowGroup from 'src/shared-components/ArrowGroup';

interface DocumentUploadProps {
  text: string;
  onChange: (files: DocumentFile[]) => void;
  value: DocumentFile[];
}

interface DocumentFile {
  file?: File;
  base64: string;
  type?: string;
  url?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ text, onChange, value }) => {
  const [files, setFiles] = React.useState<DocumentFile[]>(value);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      const newFilesWithBase64 = await Promise.all(
        fileArray.map(async (file) => ({
          file,
          base64: await convertToBase64(file),
          type: file.type,
          url: URL.createObjectURL(file),
          fileName: file.name,
        }))
      );

      const updatedFiles = [...files, ...newFilesWithBase64];
      setFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex gap-3">
      <label
        className="group flex-shrink-0 flex flex-col justify-center items-center w-[129px] h-[129px] gap-2 p-4 border border-dashed border-border-action-secondary-default 
          hover:border-border-action-secondary-hover active:border-border-action-secondary-press 
          bg-surface-action-secondary-default hover:bg-surface-action-secondary-hover 
          active:bg-surface-action-secondary-press cursor-pointer"
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
          ref={fileInputRef}
        />
        <div className="w-6 h-6 text-icon-action-secondary-default group-hover:text-icon-action-secondary-hover active:text-icon-action-secondary-press">
          <AddSvg />
        </div>
        <p
          className="text-body-normal-bold text-text-action-secondary-default 
            group-hover:text-text-action-secondary-hover active:text-text-action-secondary-press"
        >
          {text}
        </p>
      </label>
      <div className="w-full overflow-hidden relative">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            769: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={12}
          modules={[Navigation]}
          navigation={{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }}
          className="w-full"
        >
          {files.map((file, index) => (
            <SwiperSlide key={index} className="w-[129px] h-[129px] ">
              <div className="relative w-[129px] h-[129px] border border-border-action-secondary-default">
                <img
                  src={file.url || file.base64}
                  alt={file.file?.name || 'Document'}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1"
                  onClick={() => handleRemoveFile(index)}
                >
                  <CloseCircleSvg className="w-4 h-4 text-icon-invert fill-icon-invert" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="max-w-[108px] absolute bottom-[50%] translate-y-[50%] right-0 z-10">
          <ArrowGroup nextBtnClassName="slider-button-next" prevBtnClassName="slider-button-prev" />
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
