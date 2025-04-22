"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import AccountLayout from '@/app/components/AccountLayout';

function Page() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState('');

  const onSubmit = (data) => {
    // console.log(data);
    setStatus('Sending...');
    emailjs.send(
      'service_atxmjsq', // EmailJS Service ID
      'template_1ipcgn2', // EmailJS Template ID
      {
        mobile: data.mobile,
        email: data.email,
        message: data.message,
      },
      'LS8vhY88JQ7oXhUxW' // EmailJS Public Key
    )
    .then(() => {
      setStatus('Message sent successfully!');
      reset();
    })
    .catch((err) => {
      // console.error('FAILED...', err);
      setStatus('Failed to send message. Please try again later.');
    });
  };

  return (
    <AccountLayout>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Enter a valid 10-digit mobile number',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your mobile number"
                />
                {errors.mobile && (
                  <p className="text-pink-dark text-sm">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Your email"
                />
                {errors.email && (
                  <p className="text-pink-dark text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                  })}
                  className="w-full px-3 bg-white py-2 border border-gray-300 rounded-lg"
                  placeholder="Your message"
                />
                {errors.message && (
                  <p className="text-pink-dark text-sm">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="cursor-pointer inline-block rounded bg-pink-dark px-12 py-3 text-sm capitalize font-medium text-beige-light transition hover:bg-purple-dark"
              >
                Submit Your Query
              </button>
            </form>

            {status && (
              <p className={`mt-4 text-start ${status.includes('successfully') ? 'text-green-600' : 'text-pink-dark'}`}>
                {status}
              </p>
            )}
    </AccountLayout>
  );
}

export default Page;
