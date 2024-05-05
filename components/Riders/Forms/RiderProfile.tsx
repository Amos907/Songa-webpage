"use client"
import React, { useEffect, useState } from "react";
import FormInput from "@/components/Elements/Forms/FormInput";
import FormWrapper from "@/components/Elements/Forms/FormWrapper";
import { FormProvider, useForm } from "react-hook-form";
import { TypeOf, object, string, number } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClipLoader } from "react-spinners";
import { createRiderProfile } from "@/utils";
import { toast } from "react-toastify";

type RiderDetails = {
  location: string;
  stage_name: string;
  town_of_operation: string;
  job_type: string;
  gender: string;
  rider: string;
};

type RiderDetailsPassedProps = {
  stepNumber: number;
  stepsCount: number;
};

type RiderDetailsProps = RiderDetailsPassedProps & {
  updateFields: (fields: Partial<RiderDetails>) => void;
  next: () => void;
  back: () => void;
};

let riderId = window.localStorage.getItem("riderId");
if (!riderId) {
  console.error("Rider ID not found in local storage");
  riderId = "default"; // Set a default value or error message
} 


const riderDetailsSchema = object({
  location: string().min(1, "Location is required"),
  stage_name: string().min(1, "Stage is required"),
  town_of_operation: string().min(1, "Address is required"),
  job_type: string().min(1, "Job type is required"),
  gender: string().min(1, "Gender is required"),
  rider: string(),
});

export type RiderDetailsInput = TypeOf<typeof riderDetailsSchema>;


const INITIAL_DATA: RiderDetails = {
  location: "",
  stage_name: "",
  town_of_operation: "",
  job_type: "",
  gender: "",
  rider: riderId,
};

export default function RiderProfile({
  stepsCount,
  stepNumber,
  updateFields,
  next,
  back,
}: RiderDetailsProps) {
  const [data, setData] = useState(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);

//    // retrieve riderId from local storage ---- remove this bit before pushing
//    useEffect(() => {
//     const riderId = localStorage.getItem("riderId");
//     console.log(riderId)
//     // if ((riderId) ) {
//     //   setData((prevData) => ({
//     //     ...prevData,
//     //     rider: riderId.toString(),
//     //   }));
//       // console.log("Data rider:", riderId);
//       // console.log(typeof riderId)
//     }
// , []);
  
function updateData(fields: Partial<RiderDetails>) {
  setData((prev) => {
    return { ...prev, ...fields };
  });

  // Check if fields contain keys other than 'rider'
  const otherFieldsPresent = Object.keys(fields).some(key => key !== 'rider');

  // Call updateFields only if other fields are present
  if (otherFieldsPresent) {
    updateFields(fields);
  }
}

  async function onSubmitHandler(data: RiderDetails) {
    try {
      // console.log("Data before submitting:", values);
      setIsLoading(true);
      await createRiderProfile({
        location: data.location,
        stage_name: data.stage_name,
        town_of_operation: data.town_of_operation,
        job_type: data.job_type,
        gender: data.gender,
        rider: data.rider
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

  let methods = useForm<RiderDetailsInput>({
    resolver: zodResolver(riderDetailsSchema),
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
            type={"hidden"}
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
