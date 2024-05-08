import { useState, useEffect } from 'react';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import axios from 'axios';
import { toast } from 'react-toastify';

interface WaitListProps{
    onClose: () => void;
}
const WaitlistPopup: React.FC<WaitListProps> = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [town, setTown] = useState('');
    const [county, setCounty] = useState('');
    const [frequency, setFrequency] = useState('');
    
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
      };
      const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
      };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePhoneChange = (value: string) => {
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      let formattedValue = '';
      if (numericValue.startsWith('0757')) {
        formattedValue = `+254 ${numericValue.slice(1, 4)} ${numericValue.slice(4)}`;
      } else {
        formattedValue = `+${numericValue}`;
      }
      const phoneNumber = parsePhoneNumberFromString(formattedValue);
      if (phoneNumber) {
        setPhoneNumber(phoneNumber.formatInternational());
        // onchange({ phone_no: phoneNumber.formatInternational() })
      } else {
        setPhoneNumber('');
        // updateFields({ phone_no: ''})
      }
    };
    const handleTownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTown(e.target.value);
    };
    const handleCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCounty(e.target.value);
    };
    const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrequency(e.target.value);
    };

  const handleJoinWaitlist = () => {
    // Add your logic here to handle joining the waitlist
    if (!firstName || !lastName || !email || !town || !county || !phoneNumber || !frequency) {
      toast.error('Please fill in all fields.');
      return;
    }
    // const cleanPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/\+/g, '');
    const data = {
        first_name : firstName.trim(),
        last_name : lastName.trim(),
        email,
        phone_number: phoneNumber,
        town_of_residence : town,
        county,
        frequency: parseInt(frequency)
      };
      const endpoint = 'http://127.0.0.1:8000/api/v1/wailtist/'
      axios.post(endpoint, data)
      .then(response => {
        if (response.status === 201) {
          // Handle success, e.g., display a success message
          toast.success('Thank you for joining the waitlist!');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setTown('');
          setCounty('');
          setFrequency('');
          // onClose();
        } else {
          // Handle other status codes if needed
          toast.error('There was an error. Please try again later.');
          console.error('Error:', response);
        }
      })
  };

  return (
    <div className="fixed top-0  w-full h-auto bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white py-4 px-8 rounded-md shadow-md w-[600px] max-h-[100vh] overflow-y-auto relative">
        <span className="absolute top-4 right-2 cursor-pointer text-white bg-black font-extrabold text-lg rounded-full px-2" onClick={onClose}>
            &times;
        </span>
        <div className='flex justify-center align-top'>
            <figure className="h-6 w-12 md:h-20 md:w-20 md:ml-6 relative">
                <Image
                  src="/assets/icons/SONGA-red-logo.png"
                  alt="Songa Logo"
                //   sizes="90vh"
                  fill
                  priority
                />
            </figure>
        </div>
        <h2 className='text-lg text-center font-bold mb-4'>Join the Waitlist</h2>
        <div className="form-group mb-4">
          <label htmlFor="firstName" className="block font-bold">First Name</label>
          <input type="text" name='first_name' id="firstName" placeholder='Enter your first name:' value={firstName} onChange={handleFirstNameChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="lastName" className="block font-bold">Last Name</label>
          <input type="text" name='last_name' id="lastName" placeholder='Enter your last name:' value={lastName} onChange={handleLastNameChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="town" className="block font-bold">Town of Residency:</label>
          <input type="text"  name="town_of_residence" id='town' placeholder='Enter your town of residency:' value={town} onChange={handleTownChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="county" className="block font-bold">County:</label>
          <input type="text" name='county' id="county" placeholder='Enter your county of residency:' value={county} onChange={handleCountyChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="frequency" className="block font-bold">How many times do you use boda boda services in a day?</label>
          <input type="number" name='frequency' id="frequency" placeholder='0' value={frequency} onChange={handleFrequencyChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className='mb-4'>
          <label htmlFor="phoneNumber" className="block font-bold">Phone Number</label>
          <PhoneInput country={'ke'} onlyCountries={['ke']} countryCodeEditable={false}	 inputProps={{name: 'phone', required: true, id: 'phoneNumber'}} value={phoneNumber} onChange={handlePhoneChange} inputStyle={{width:'100%'}}/>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block font-bold">Email</label>
          <input type="email" name='email' id="email" placeholder='Enter your email:' value={email} onChange={handleEmailChange} required className="w-full text-black px-3 py-2 border rounded-md" />
        </div>
        <div className='flex justify-center'>
            <button type='submit' onClick={handleJoinWaitlist} className="bg-[#0F9434] text-white text-lg px-4 py-2 rounded-md">SUBMIT</button>
        </div>
        
      </div>
    </div>
  );
};

export default WaitlistPopup;
