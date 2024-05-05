import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WaitListProps{
    onClose: () => void;
}
const WaitlistPopup: React.FC<WaitListProps> = ({ onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [town, setTown] = useState('');
    const [county, setCounty] = useState('');
    const [userQuestion, setUserQuestion] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
      };
      const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
      };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleTownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTown(e.target.value);
    };
    const handleCountyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCounty(e.target.value);
    };
    const handleUserQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserQuestion(e.target.value);
    };

  const handleJoinWaitlist = () => {
    // Add your logic here to handle joining the waitlist
    const userData = {
        firstName,
        lastName,
        email,
        town,
        county,
        userQuestion
      };
    alert(`Thank you for joining the waitlist with email: ${email}`);
    setFirstName('');
    setLastName('');
    setEmail('');
    setTown('');
    setCounty('');
    setUserQuestion('');
    onClose();
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-[600px] relative">
        <span className="absolute top-8 right-2 cursor-pointer text-white bg-black font-extrabold text-lg rounded-full px-2" onClick={onClose}>
            &times;
        </span>
        <div className='flex justify-center align-top'>
            <figure className="h-12 w-20 md:h-24 md:w-24 md:ml-6 relative">
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
          <label htmlFor="firstName" className="block font-bold">First Name:</label>
          <input type="text" id="firstName" placeholder='Enter your first name:' value={firstName} onChange={handleFirstNameChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="lastName" className="block font-bold">Last Name:</label>
          <input type="text" id="lastName" placeholder='Enter your last name:' value={lastName} onChange={handleLastNameChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="town" className="block font-bold">Town of Residency:</label>
          <input type="text" id="town" placeholder='Enter your town of residency:' value={town} onChange={handleTownChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="county" className="block font-bold">County:</label>
          <input type="text" id="county" placeholder='Enter your county of residency:' value={county} onChange={handleCountyChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="userQuestion" className="block font-bold">How many times do you use boda boda services in a day?</label>
          <input type="number" id="userQuestion" placeholder='0' value={userQuestion} onChange={handleUserQuestionChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className='flex justify-center'>
            <button onClick={handleJoinWaitlist} className="bg-[#0F9434] text-white text-lg px-4 py-2 rounded-md">SUBMIT</button>
        </div>
        
      </div>
    </div>
  );
};

export default WaitlistPopup;
