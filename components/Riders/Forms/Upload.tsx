import React, { useEffect, useState } from 'react';
import FormWrapper from '../../Elements/Forms/FormWrapper';
import FormInput from "@/components/Elements/Forms/FormInput";
import ImageUploader from '../../Elements/Forms/ImageUploader';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { TypeOf, object, string } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { uploadDocuments } from '@/utils';

type RiderDetails = {
  ID_front: File | null,
  ID_back:  File | null,
  license_front: File | null,
  license_back: File | null,
  insurance: File | null,
  rider:string | undefined;
};

type RiderDetailsPassedProps = {
  stepNumber: number;
  stepsCount: number;
}

type RiderDetailsProps = RiderDetailsPassedProps & {
  updateFields: (fields: Partial<RiderDetails>) => void;
  next: () => void;
  back: () => void;
};


const riderDetailsSchema = object({
  // ID_front: object({
  //   name: string().min(1, "ID front image is required")
  // }),
  // ID_back: object({
  //   name: string().min(1, "ID back image is required")
  // })
});

export type RiderDetailsInput = TypeOf<typeof riderDetailsSchema>;

let riderId = localStorage.getItem("riderId");
if (!riderId) {
  console.error("Rider ID not found in local storage");
  riderId = "default"; // Set a default value or error message
}

const INITIAL_DATA: RiderDetails = {
  ID_front: null,
  ID_back: null,
  license_front: null,
  license_back: null,
  insurance: null,
  rider: riderId,
}

export default function Upload({ stepsCount, stepNumber, updateFields, next, back }: RiderDetailsProps) {

  const [data, setData] = useState<RiderDetails>(INITIAL_DATA)
  const [isLoading, setIsLoading] = useState(false);
  const [isuploadComplete, setIsuploadComplete] = useState(false);

  const [idFrontImage, setIdFrontImage] = useState<File | null>(null);
  const [idBackImage, setIdBackImage] = useState<File | null>(null);
  const [dlFrontImage, setDlFrontImage] = useState<File | null>(null);
  const [dlBackImage, setDlBackImage] = useState<File | null>(null);
  const [insuranceImage, setInsuranceImage] = useState<File | null>(null);

  const [idFrontImageUrl, setIdFrontImageUrl] = useState<string>('');
  const [idBackImageUrl, setIdBackImageUrl] = useState<string>('');
  const [dlFrontImageUrl, setDlFrontImageUrl] = useState<string>('');
  const [dlBackImageUrl, setDlBackImageUrl] = useState<string>('');
  const [insuranceImageUrl, setInsuranceImageUrl] = useState<string>('');

  function updateData(fields: Partial<RiderDetails>) {
    setData(prev => {
      return { ...prev, ...fields };
    });
     // Only call updateFields if the rider field is not included in the fields object
     if (!fields.hasOwnProperty('rider') && fields.rider !== undefined) {
      updateFields(fields);
    }
  }

  const handleImageUpload = (imageData: File, imageName: string, 
    setImage: React.Dispatch<React.SetStateAction<File | null>>, 
    setImageUrl: React.Dispatch<React.SetStateAction<string>>) => {
    const renamedFile = new File([imageData], imageName, { type: imageData.type });
    setImage(renamedFile);
    console.log(renamedFile)
    const imageUrl = URL.createObjectURL(renamedFile);
    setImageUrl(imageUrl);
    console.log("Image URL:", imageUrl);
    updateData({ [imageName]: renamedFile });
    console.log("Updated data:", { [imageName]: renamedFile });
  };

  useEffect(() => {
    // console.log("ID Front Image:", idFrontImage);
    if (idFrontImage) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Data URL of ID Front Image:", reader.result);
        setIdFrontImageUrl(reader.result as string);
      };
      reader.readAsDataURL(idFrontImage);
    }

    if (idBackImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setIdBackImageUrl(reader.result as string);
      };
      reader.readAsDataURL(idBackImage);
    }

    if (dlFrontImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setDlFrontImageUrl(reader.result as string);
      };
      reader.readAsDataURL(dlFrontImage);
    }

    if (dlBackImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setDlBackImageUrl(reader.result as string);
      };
      reader.readAsDataURL(dlBackImage);
    }
    if (insuranceImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setInsuranceImageUrl(reader.result as string);
      };
      reader.readAsDataURL(insuranceImage);
    }
  }, [idFrontImage, idBackImage, dlFrontImage, dlBackImage, insuranceImage]);

  async function onSubmitHandler(data: any) {
    try {
      setIsLoading(true);
      // console.log("ID_front:", data.ID_front);
      // console.log("ID_back:", data.ID_back);
      console.log("Data:", data)
      // Prepare the FormData for document upload
      const formData = new FormData();
     
      if(data.ID_front){  
        formData.append('ID_front', data.ID_front);
        console.log('ID_front appended:', data.ID_front);
      }
      if(data.ID_back){
        formData.append('ID_back', data.ID_back);
        console.log('ID_front appended:', data.ID_back);
      }
      if(data.license_front) {
        formData.append('license_front', data.license_front);
        console.log('ID_front appended:', data.license_front);
      }
      if(data.license_back){
        formData.append('license_back', data.license_back);
        console.log('ID_front appended:', data.license_back);
      }
      if(data.insurance){
        formData.append('insurance', data.insurance);
        console.log('ID_front appended:', data.insurance);
      }
     
      
      // Upload documents
      const res = await uploadDocuments(formData);
      if(res){ //handle success res status
        setIsuploadComplete(true);
        next();
      }

    } catch (error: any) {
      if(error&&error.error){
        toast.error(error.error);
      } else {
        toast.error('An unknown error occurred!');
      }
    } finally {
      setIsLoading(false);
    }
  }

  let methods = useForm<RiderDetailsInput>({
    resolver: zodResolver(riderDetailsSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful , errors},
  } = methods;


  console.log({ errors })
  const showBackButton = stepNumber && stepNumber !== 1;
  const isLastStep = stepNumber === stepsCount


  return (
    <FormProvider {...methods}>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} action="" className="p-5">
        <FormWrapper title="">
          <div className="flex items-center justify-start gap-2 bg-transparent border-[#FB4552] border-[1px] min-h-[48px] rounded-lg px-4">
            {idFrontImage ? (
              <Image src={idFrontImageUrl} alt="ID Front" width={100} height={100} />
            ) : (
              <ImageUploader name="ID_front" require={true} onImageUpload={(file) => handleImageUpload(file, 'ID_front', setIdFrontImage, setIdFrontImageUrl)} />
            )}
            <span className='whitespace-nowrap'><i className='text-[#FB4552]'>*</i> ID_front: {data.ID_front?.name}</span>
            
          </div>

          <div className="flex items-center gap-2 bg-transparent border-[#FB4552] border-[1px] min-h-[48px] rounded-lg px-4">
            {idBackImage ? (
              <Image src={idBackImageUrl} alt="ID Back" width={100} height={100} />
            ) : (
              <ImageUploader name="ID_back" require={true} onImageUpload={(file) => handleImageUpload(file, 'ID_back', setIdBackImage, setIdBackImageUrl)} />
            )}
            <span className='whitespace-nowrap'><i className='text-[#FB4552]'>*</i> ID_back</span>
          </div>

          <div className="flex items-center gap-2 bg-transparent border-[#FB4552] border-[1px] min-h-[48px] rounded-lg px-4">
            {dlFrontImage ? (
              <Image src={dlFrontImageUrl} alt="Driving License Front" width={100} height={100} />
            ) : (
              <ImageUploader name="license_front" onImageUpload={(file) => handleImageUpload(file, "license_front", setDlFrontImage, setDlFrontImageUrl)} />
            )}
            <span className='whitespace-nowrap'>License Front: {data.license_front?.name}</span>
          </div>

          <div className="flex items-center gap-2 bg-transparent border-[#FB4552] border-[1px] min-h-[48px] rounded-lg px-4">
            {dlBackImage ? (
              <Image src={dlBackImageUrl} alt="DL Back" width={100} height={100} />
            ) : (
              <ImageUploader name="license_back" onImageUpload={(file) => handleImageUpload(file, "license_back", setDlBackImage, setDlBackImageUrl)} />
            )}
            <span className='whitespace-nowrap'>License Back: {data.license_back?.name}</span>
          </div>

          <div className="flex items-center gap-2 bg-transparent border-[#FB4552] border-[1px] min-h-[48px] rounded-lg px-4">
            {insuranceImage ? (
              <Image src={insuranceImageUrl} alt="Insurance" width={100} height={100} />
            ) : (
              <ImageUploader name="insurance" require={false} onImageUpload={(file) => handleImageUpload(file, "insurance", setInsuranceImage, setInsuranceImageUrl)} />
            )}
            <span className='whitespace-nowrap'>Insurance: {data.insurance?.name}</span>
          </div>

          {/* rider ID field */}
            {/* Hidden rider input */}
            <FormInput
              type={"hidden"}
              name={"rider"}
              value={data.rider}
            />
        </FormWrapper>
        <div className="mt-[1rem] flex gap-[.5rem] justify-end">
          {showBackButton && (
            <button
            type="button"
            onClick={back}
            className="rounded-lg border-[#FB4552] px-4 py-2 border-2 flex items-center justify-center space-x-3 hover:bg-[#FB4552]"
            >
              Back
            </button>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center">
              <ClipLoader color="#FB4552" loading={isLoading} size={35} />
            </div>
          ) : (
            <button
              type="submit"
              disabled={isLoading||isuploadComplete}
              className="rounded-lg border-[#FB4552] disabled:cursor-not-allowed disabled:opacity-50 px-4 py-2 border-2 flex items-center justify-center space-x-3 hover:bg-[#FB4552]"
            >
              Upload
            </button>
          )}
          
          <button
            type="button"
            disabled={!isuploadComplete}
            onClick={()=> next()}
            className="rounded-lg border-[#FB4552] disabled:cursor-not-allowed disabled:opacity-50 px-4 py-2 border-2 flex items-center justify-center space-x-3 hover:bg-[#FB4552]"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
          
        </div>
      </form>
    </FormProvider>
  )
}

