import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationForm = () => {

    const [countries, setCountries] = useState([]);

    const getCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Błąd podczas pobierania krajów:', error);
      }
    };
  
    useEffect(() => {
      getCountries();
    }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    birthDate: '',
    country: '',
    gender: '',
    marketingAgreement: false,
    termsAgreement: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = 'Imię musi zawierać co najmniej 2 znaki';
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = 'Nazwisko musi zawierać co najmniej 2 znaki';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Podano niepoprawny adres email';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Hasło musi zawierać co najmniej 8 znaków, jedną cyfrę i jeden znak specjalny';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są identyczne';
    }
    if (+formData.age < 18 || +formData.age > 99) {
      newErrors.age = 'Wiek musi być między 18 a 99';
    }
    if (new Date(formData.birthDate) > new Date()) {
      newErrors.birthDate = 'Data urodzenia nie może być w przyszłości';
    }
    if (!formData.country) {
      newErrors.country = 'Proszę wybrać kraj';
    }
    if (!formData.termsAgreement) {
      newErrors.termsAgreement = 'Zgoda na regulamin jest wymagana';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = (email) => {
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return email;
    } else{
        newErrors.country = 'email źle';
    }
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateForm()) {
      setLoading(false);
      return;
    }


    const formDataJson = {
        ...formData,
        password: '******', 
        confirmPassword: '******'
      };
      
      console.log('Formularz danych:', JSON.stringify(formDataJson, null, 2));

      setLoading(false);
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imię:</label>
        <br />
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange}
          required
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
        
      <div>
        <label>Nazwisko:</label>
        <br />
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange}
          required
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>

      <div>
        <label>Email:</label>
        <br />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Hasło:</label><br />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange}
          required
        />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <div>
        <label>Potwierdź hasło:</label><br />
        <input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      <div>
        <label>Wiek:</label><br />
        <input 
          type="number" 
          name="age" 
          value={formData.age} 
          onChange={handleChange}
          min="18"
          max="99"
          required
        />
        {errors.age && <span>{errors.age}</span>}
      </div>

      <div>
        <label>Data urodzenia:</label><br />
        <input 
          type="date" 
          name="birthDate" 
          value={formData.birthDate} 
          onChange={handleChange}
          required
        />
        {errors.birthDate && <span>{errors.birthDate}</span>}
      </div>

      <div>
        <label>Kraj:</label><br />
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Wybierz kraj</option>
          {countries.map((country) => (
            <option key={country.alpha3Code} value={country.alpha3Code}>
              {country.name}
              <img alt={`${country.name} flag`} width="20" height="15" />
            </option>
          ))}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>

      <div>
        <label>Płeć:</label><br />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Wybierz płeć</option>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
      </div>

      <div>
        <label>Zgody marketingowe:</label><br />
        <input 
          type="checkbox" 
          name="marketingAgreement" 
          checked={formData.marketingAgreement} 
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Zgoda na regulamin:</label><br />
        <input 
          type="checkbox" 
          name="termsAgreement" 
          checked={formData.termsAgreement} 
          onChange={handleChange}
          required
        />
        {errors.termsAgreement && <span>{errors.termsAgreement}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Procesowanie...' : 'Zarejestruj się'}
      </button>
    </form>
  );
};

export default RegistrationForm;