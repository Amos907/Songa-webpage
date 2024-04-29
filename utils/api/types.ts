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
  rider: string | undefined;
}

interface BikeDetails {
  type: string;
  ev_model: string | null;
  fuel_model: string | null;
  plate_no: string;
  insurance_provider: string;
  rider: string | undefined;
}

interface uploadDocuments {
  ID_front: File;
  ID_back: File;
  license_front: File;
  license_back: File;
  insurance: File;
  rider: string | undefined;
}
