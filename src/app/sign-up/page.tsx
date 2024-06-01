'use client';
import { useEffect, useRef, useState } from 'react';
import NavbarLogout from '../components/navbar/navbar-logout';
import SignUpStyle from './signUp.module.css';
import axios from 'axios';
import Image from 'next/image';

interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
}

const SignUp = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [paises, setPaises] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    termsAccepted: false,
    country: '',
    city: '',
    streetAddress: '',
    municipality: '',
    postalCode: '',
  });

  useEffect(() => {
    const fetchPaises = async () => {
      const res = await axios.get('https://restcountries.com/v3.1/all');
      const sortedData = res.data.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
      setPaises(sortedData);
    };

    fetchPaises();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    const payload = {
      user: {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        terms_conditions: formData.termsAccepted,
      },
      address: {
        country: formData.country,
        city: formData.city,
        address: formData.streetAddress,
        municipality: formData.municipality,
        postal_code: formData.postalCode,
      },
    };

    try {
        const api = axios.create({
            baseURL: 'http://localhost:8000',
        });
        const response = await api.post('/users/', payload);
        console.log(response.data);
        alert('Usuario registrado con éxito');
    } catch (error) {
        console.error(error);
        alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <>
      <NavbarLogout text="Registro" />
      <main className={SignUpStyle.flexContainer}>
        <form className="bg-white p-12 w-full" onSubmit={handleSubmit}>
          <div className="w-full lg:w-1/2 backdrop-blur-sm flex flex-col m-auto">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Esta información se mostrará públicamente, así que ten cuidado con lo que compartes.
              </p>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Información personal</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Use una dirección permanente donde pueda recibir correo.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre completo
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      autoComplete="given-name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Dirección de correo electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirmar contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    País
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      required
                    >
                      <option value="">Seleccione un país</option>
                      {paises.map((pais) => (
                        <option key={pais.name.common} value={pais.name.common}>
                          {pais.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                    Dirección de la calle
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="streetAddress"
                      id="streetAddress"
                      autoComplete="street-address"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                    Ciudad
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="municipality" className="block text-sm font-medium leading-6 text-gray-900">
                    Estado / Provincia
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="municipality"
                      id="municipality"
                      autoComplete="address-level1"
                      value={formData.municipality}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                    ZIP / Código postal
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      autoComplete="postal-code"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Términos y condiciones</h2>

              <div className="mt-2 space-y-2">
                <fieldset>
                  <div className="mt-2 space-y-2">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="termsAccepted"
                          name="termsAccepted"
                          type="checkbox"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                          required
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <p className="text-gray-500">
                          He leído y acepto los{' '}
                          <a href="" className="text-blue-600">
                            términos y condiciones
                          </a>{' '}
                          del servicio.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignUp;
