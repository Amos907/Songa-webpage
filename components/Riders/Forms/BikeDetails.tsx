import {useState, useEffect} from 'react'
import FormInput from '../../Elements/Forms/FormInput'
import FormWrapper from '../../Elements/Forms/FormWrapper'
import { FormProvider, useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from 'react-spinners';
import { createBikeDetails, createRiderAccount } from '@/utils';
import { toast } from 'react-toastify';

const bikeDetailsSchema = object({
  type: string()
    .min(2, "Bike type is required"),
  plate_no: string()
    .min(1, "Plate Number is required")
    .min(5, "A valid Plate Number is required"),
  ev_model: string(),
  fuel_model: string(),
  insurance_provider: string(),
  rider: string(),
})

export type BikeDetailsInput = TypeOf<typeof bikeDetailsSchema>;

type BikeDetails = {
  type: string;
  ev_model: string;
  fuel_model: string;
  plate_no: string;
  insurance_provider: string;
  rider: string;
}

type BikeDetailsPassedProps = {
  stepNumber: number;
  stepsCount: number;
}

type BikeDetailsProps = BikeDetailsPassedProps & {
  updateFields: (fields: Partial<BikeDetails>) => void;
  next: () => void;
  back: () => void;
}

// retrieve riderId from local storage
let riderId = localStorage.getItem("riderId");
if (!riderId) {
  console.error("Rider ID not found in local storage");
  riderId = "default"; // Set a default value or error message
}

const INITIAL_DATA: BikeDetails = {
  type: "",
  ev_model: "",
  fuel_model: "",
  plate_no: "",
  insurance_provider: "",
  rider: riderId,
}

export default function BikeDetails({ 
  stepsCount, 
  stepNumber, 
  next, 
  back, 
  updateFields }: BikeDetailsProps) {

  const [data, setData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

    // check if the state of the forms input is being updated
  useEffect(() => {
    console.log("Form data:", data);
  }, [data]);

  function updateData(fields: Partial<BikeDetails>) {
    setData(prev => {
      return { ...prev, ...fields };
    });
     // Only call updateFields if the rider field is not included in the fields object
     if (!fields.hasOwnProperty('rider') && fields.rider !== undefined) {
      updateFields(fields);
     }
    }

  async function onSubmitHandler(data: BikeDetails) {
    try {
      setIsLoading(true);
      console.log("Submitting form....")
      // const isValid = await methods.trigger(); // Trigger form validation
      
        await createBikeDetails({
          type: data.type,
          plate_no: data.plate_no,
          ev_model: data.ev_model || null,
          fuel_model: data.fuel_model || null,
          insurance_provider: data.insurance_provider,
          rider: data.rider
        });
        console.log("Form submitted successfully")
        next();
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

  let methods = useForm<BikeDetailsInput>({
    resolver: zodResolver(bikeDetailsSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const showBackButton = stepNumber && stepNumber !== 1;
  const isLastStep = stepNumber === stepsCount
  

  return (
    <FormProvider {...methods}>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmitHandler)} action="" className="p-5">
        <FormWrapper title=''>
          <FormInput
            label='Make of Bike'
            type='select'
            name='bike_type'
            placeholder='Select your bike type'
            required
            value={data.type}
            options={[
              { value: "EV", label: "EV" },
              { value: "FUEL", label: "Fuel" },
            ]}
            onChange={e => updateData({ type: e.target.value })}
            
          />
        {data.type === "EV" && (
          <FormInput
            label='EV Model'
            value={data.ev_model || ""}
            name='model'
            placeholder='Choose EV bike model name:'
            type='select'
            required={false}
            options={[
                { value: "Ampersand", label: "AMPERSAND" },
                { value: "ENZI", label: "Enzi" },
                { value: "ARC", label: "Arc" },
                { value: "ROAM", label: "Roam" },
                { value: "GREEN", label: "Green" },
            ]}
            onChange={e => updateData({ ev_model: e.target.value })}
        />
    )}
    {data.type === "FUEL" && (
        <FormInput
            label='Fuel Model'
            value={data.fuel_model || ""}
            name='model'
            placeholder='Choose Fuel bike model name:'
            type='select'
            required={false}
            options={[
                { value: "BOXER", label: "Boxer" },
                { value: "TVS", label: "Enzi" },
                { value: "HONDA", label: "Arc" },
                { value: "HAOJUE", label: "Haojue" },
                { value: "HERO", label: "Hero" },
                { value: "CAPTAIN", label: "Captain" },
                { value: "EVERLAST", label: "Everlast" },
                { value: "SONLINK", label: "Sonlink" },
            ]}
            onChange={e => updateData({ fuel_model: e.target.value })}
        />
      )}
          <FormInput
            label='License Plate Number'
            value={data.plate_no}
            type='text'
            name='plate_no'
            required
            onChange={e => updateData({ plate_no: e.target.value })}
          />
          <FormInput
            label='Insurance Provider'
            value={data.insurance_provider}
            name='insurance_provider'
            placeholder='Do you have an insurance provider?'
            type='select'
            required
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            onChange={e => updateData({ insurance_provider: e.target.value })}
          />
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
              disabled={isLoading}
              className="rounded-lg border-[#FB4552] px-4 py-2 border-2 flex items-center justify-center space-x-3 hover:bg-[#FB4552]"
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
