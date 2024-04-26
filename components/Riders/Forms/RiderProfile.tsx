import React, { useEffect, useState } from "react";
import FormInput from "@/components/Elements/Forms/FormInput";
import FormWrapper from "@/components/Elements/Forms/FormWrapper";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOf, object, string, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { createRiderProfile } from "@/utils";
import { toast } from "react-toastify";
import { array } from "prop-types";


const riderProfileSchema = object({
  location: string().min(1, "Location is required"),
  stage_name: string().min(1, "Stage is required"),
  town_of_operation: string().min(1, "Address is required"),
  job_type: string().min(1, "Job type is required"),
  gender: string().min(1, "Gender is required"),
  rider: string(),
});

export type RiderProfileInput = TypeOf<typeof riderProfileSchema>;

type RiderProfile = {
  location: string;
  stage_name: string;
  town_of_operation: string;
  job_type: string;
  gender: string;
  rider: string;
};

type RiderProfilePassedProps = {
  stepNumber: number;
  stepsCount: number;
};

type RiderProfileProps = RiderProfilePassedProps & {
  updateFields: (fields: Partial<RiderProfile>) => void;
  next: () => void;
  back: () => void;
};

const INITIAL_DATA: RiderProfile = {
  location: "",
  stage_name: "",
  town_of_operation: "",
  job_type: "",
  gender: "",
  rider: ""
};

export default function RiderProfile({
  stepsCount,
  stepNumber,
  updateFields,
  next,
  back,
}: RiderProfileProps) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

  // retrieve riderId from local storage
  useEffect(() => {
    const riderId = localStorage.getItem("riderId");
    console.log(riderId)
    if ((riderId) ) {
      setData((prevData) => ({
        ...prevData,
        rider: riderId,
      }));
    }
  }, []);


  function updateData(fields: Partial<RiderProfile>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
    updateFields(fields);
  }

  async function onSubmitHandler(values: RiderProfile) {
    try {
      setIsLoading(true);
      await createRiderProfile({
        location: values.location,
        stage_name: values.stage_name,
        town_of_operation: values.town_of_operation,
        job_type: values.job_type,
        gender: values.gender,
        rider: values.rider
      });
      next();
    } catch (error: any) {
      if (error && error.error) {
        toast.error(error.error);
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  let methods = useForm<RiderProfileInput>({
    resolver: zodResolver(riderProfileSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const showBackButton = stepNumber && stepNumber !== 1;
  const isLastStep = stepNumber === stepsCount;

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
        action=""
        className="p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormInput
            value={data.location}
            type={"text"}
            label={"Location"}
            required
            name="location"
            onChange={(e) => updateData({ location: e.target.value })}
          />
          <FormInput
            value={data.stage_name}
            type={"text"}
            label={"Stage Name"}
            required
            name="stage_name"
            onChange={(e) => updateData({ stage_name: e.target.value })}
          />

          <FormInput
            value={data.town_of_operation}
            type={"text"}
            label={"Town of Operation"}
            name={"town_of_operation"}
            required
            onChange={(e) => updateData({ town_of_operation: e.target.value })}
          />

          <FormInput
            label={"Job Type"}
            type={"select"}
            name={"job_type"}
            placeholder="Select your job type:"
            required={false}
            value={data.job_type}
            options={[
              { value: "public", label: "public" },
              { value: "private", label: "private" },
          ]}
            onChange={(e) =>
              updateData({ job_type: e.target.value })
            }
          />
          <FormInput
            label={"Gender"}
            type={"select"}
            name={"gender"}
            placeholder="Select a gender"
            required={false}
            value={data.gender}
            options={[
              { value: "male", label: "male" },
              { value: "female", label: "female" },
          ]}
            onChange={(e) =>
              updateData({ gender: e.target.value })
            }
          />

          {/* Hidden rider input */}
          <FormInput
            type={"number"}
            name={"rider"}
            value={data.rider}
            
          />
        </div>
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
              {isLastStep ? "Finish" : "Next"}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
