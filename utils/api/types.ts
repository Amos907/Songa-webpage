interface CreateRiderData {
  first_name: string;
  last_name: string;
  phone_no: string;
  password: string;
  confirmPassword: string;
}

interface CreateRiderProfile {
  location: string;
  stage_name: string;
  town_of_operation: string;
  job_type: string;
  gender: string;
  rider: string;
}

interface BikeDetails {
  bikeType: string;
  plateNumber: string;
  model: string;
  insuranceProvider: string;
}
