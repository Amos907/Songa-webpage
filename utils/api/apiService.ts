import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://127.0.0.1:8000";

interface ErrorMessage {
  error: object;
}

// Define a custom response type that represents both success and failure cases
type CustomResponse<T> = AxiosResponse<T> | { error: string };

// Function to check if sessionToken and userId are already present in local storage
// function hasSession(): boolean {
// //   // const sessionToken = localStorage.getItem("sessionToken");
//   const riderId = localStorage.getItem("riderId");
// //   // return sessionToken !== null && userId !== null;
//   return riderId !== null;
// }


export async function createRiderAccount(
  data: CreateRiderData
): Promise<CustomResponse<any>> {
  // Check if sessionToken and userId already exist in local storage
  // if (hasSession()) {
  //   throw { error: "You already have an account." };
  // }

  const endpoint = `${BASE_URL}/rider/api/v1/rider-details/`;

  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(endpoint, requestOptions);
    if (response.status === 201) {
      // Show success toast if status is 201
      toast.success('Rider account created successfully!');
    }
    
    const riderId = response.data.id
    console.log(riderId)
    // Set riderId to localStorage
    localStorage.setItem('riderId', riderId.string());
    
    return response
   
  }
  
   catch (e: any) {
    if (
      e.response &&
      e.response.data &&
      e.response.data.message === "Passwords do not match."
    ) {
      // Show a custom toast message for "rider exists" error
      toast.error('Passwords do not match.');
      throw {
        error: "The rider already exists. Please use a different phone no.",
      };
    } else {
      // Show a generic error message for other errors
      if (e.response && e.response.data && e.response.data.message) {
        throw e.response.data.message;
      } else {
      return { error: "An error occurred while registering the user." }; //fix this later
      }
    }
  }
}

export async function createRiderProfile(
  data: CreateRiderProfile
): Promise<CustomResponse<any>> {
  // Check if the user has an active session
  // if (!hasSession()) {
  //   return { error: "You need to have an account to upload documents." };
  // }
  const endpoint = `${BASE_URL}/rider/api/v1/rider-profile/`;
  
  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("riderId")}`
    },
    data: data,
  };

  try {
    const response = await axios(endpoint, requestOptions);
    if (response.status === 201) {
      // Show success toast if status is 201
      toast.success('Rider profile created successfully!');
    }
    return response;
  } catch (e: any) {
    if (e.response && 
      e.response.data 
      && e.response.data.message) {
      return e.response.data.message;
    } else {
      throw { error: "An error occurred while creating the user profile." };
    }
  }
}

export async function createBikeDetails(
  data: CreateBikeData
): Promise<CustomResponse<any>> {
  // Check if the user has an active session
  // if (!hasSession()) {
  //   throw { error: "You need to have an account to upload documents." };
  // }
  const endpoint = `${BASE_URL}/rider/api/v1/bike-details/`;
  
  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("riderId")}`,
    },
    data: data,
  };

  try {
    const response = await axios(endpoint, requestOptions);
    // toast.success(response.data.message);
    if (response.status === 201) {
      // Show success toast if status is 201
      toast.success('Bike details registered successfully!');
    }
    return response;
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.message) {
      throw e.response.data.message;
    } else {
      throw { error: "An error occurred while registering bike details." };
    }
  }
}

export async function uploadDocuments(
  files: FormData
): Promise<CustomResponse<any>> {
  // Check if the user has an active session
  // if (!hasSession()) {
  //   return { error: "You need to have an account to upload documents." };
  // }
  const endpoint = `${BASE_URL}/rider/api/v1/kyc-images/`;
  
  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("riderId")}`,
    },
    data: files,
  };

  try {
    console.log("Sending request to:", endpoint);
    console.log("Request options:", requestOptions);

    const response = await axios(endpoint, requestOptions);
    console.log("Response received:", response);
    toast.success("Documents uploaded successfully!");
    return response;
  } catch (e: any) {
    console.error("Error uploading documents:", e);
    if (e.response && e.response.data && e.response.data.message) {
      // toast.error(e.response.data.message)
      return { error: e.response.data.message };
    }
    // Show a generic error message for any upload errors
    // toast.error('An error occurred while uploading the documents.');
    return { error: "An error occurred while uploading the documents." };
  }
}


