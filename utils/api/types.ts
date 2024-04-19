interface CreateRiderData {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

interface CreateRiderProfile {
  location: string;
  stage_name: string;
  town_of_operation: string;
  job_type: string;
  gender: string;
}

interface BikeDetails {
  bikeType: string;
  plateNumber: string;
  model: string;
  insurance_provider: "yes" | "no";
}
