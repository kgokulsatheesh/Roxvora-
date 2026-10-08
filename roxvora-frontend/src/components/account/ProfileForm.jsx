import { useState } from 'react';

/**
 * ProfileForm — editable form for account profile details.
 *
 * Props:
 *   defaultValues  {object}   — initial field values
 *   onSubmit       {function} — called with form data on submit
 *   isSubmitting   {boolean}  — shows a loading state while saving
 */
const ProfileForm = ({ defaultValues = {}, onSubmit, isSubmitting = false }) => {
    const [values, setValues] = useState({
        firstName: defaultValues.firstName ?? '',
        lastName: defaultValues.lastName ?? '',
        email: defaultValues.email ?? '',
        phone: defaultValues.phone ?? '',
        dateOfBirth: defaultValues.dateOfBirth ?? '',
        gender: defaultValues.gender ?? '',
        newsletter: defaultValues.newsletter ?? true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(values);
    };

    return (
        <form onSubmit={handleSubmit} noValidate aria-label="Profile details form">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="profile-firstName" className="block text-sm font-medium text-primary mb-1.5">
                        First Name
                    </label>
                    <input
                        id="profile-firstName"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        className="input-field w-full"
                        autoComplete="given-name"
                    />
                </div>

                <div>
                    <label htmlFor="profile-lastName" className="block text-sm font-medium text-primary mb-1.5">
                        Last Name
                    </label>
                    <input
                        id="profile-lastName"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        className="input-field w-full"
                        autoComplete="family-name"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="profile-email" className="block text-sm font-medium text-primary mb-1.5">
                    Email Address
                </label>
                <input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    className="input-field w-full"
                    autoComplete="email"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="profile-phone" className="block text-sm font-medium text-primary mb-1.5">
                    Phone Number
                </label>
                <input
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    className="input-field w-full"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="profile-dob" className="block text-sm font-medium text-primary mb-1.5">
                        Date of Birth
                    </label>
                    <input
                        id="profile-dob"
                        name="dateOfBirth"
                        type="date"
                        value={values.dateOfBirth}
                        onChange={handleChange}
                        className="input-field w-full"
                        autoComplete="bday"
                    />
                </div>

                <div>
                    <label htmlFor="profile-gender" className="block text-sm font-medium text-primary mb-1.5">
                        Gender
                    </label>
                    <select
                        id="profile-gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        className="input-field w-full"
                    >
                        <option value="">Prefer not to say</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="newsletter"
                        checked={values.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-secondary focus:ring-secondary"
                    />
                    <span className="text-sm text-primary">
                        Keep me updated with new arrivals and exclusive offers
                    </span>
                </label>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-md inline-flex items-center gap-2"
            >
                {isSubmitting && (
                    <span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                    />
                )}
                {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
        </form>
    );
};

export default ProfileForm;
