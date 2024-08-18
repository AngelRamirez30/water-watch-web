
export interface RegisterClientRequest {
  first_name:   string;
  last_name:    string;
  email:        string;
  username:     string;
  password:     string;
  country_code: string;
  phone_number: string;
  state:        string;
  city:         string;
  street:       string;
  house_number: string;
  neighborhood: string;
  postal_code:  string;
}

export interface RegisterClientResponse {
  message: string;
  token:  string;
}

export interface RegisterErrorResponse {
  message: string;
  token:  string;
}
