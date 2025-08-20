Skip to content
You said:
create a react component of form using typescript with react with all the necessary details
ChatGPT said:
Sure! Here's a complete example of a React + TypeScript form component. This form includes:

Type-safe form data

Basic validation

Controlled form inputs

Form submission handler

Reusable and modular structure

✅ Features:
Uses React Hooks (useState)

Type definitions for form fields

Handles input change, form submit, and validation

📁 FormComponent.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

// Step 1: Define form field types
interface FormData {
  name: string;
  email: string;
  age: number;
  message: string;
}

// Step 2: Initial values
const initialFormData: FormData = {
  name: '',
  email: '',
  age: 0,
  message: '',
};

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  // Step 3: Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || 0 : value,
    }));
  };

  // Step 4: Validation logic
  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email.';
    if (formData.age <= 0) newErrors.age = 'Age must be greater than 0.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    return newErrors;
  };

  // Step 5: Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      // Reset form (optional)
      setFormData(initialFormData);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Contact Form</h2>
      {submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>}
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>

        <div>
          <label>Age:</label>
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          {errors.age && <small style={{ color: 'red' }}>{errors.age}</small>}
        </div>

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <small style={{ color: 'red' }}>{errors.message}</small>}
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
🛠 How to Use
Create a React app with TypeScript:

npx create-react-app my-app --template typescript
Add the component:

Save the code above as FormComponent.tsx in src/.

Import and use it in App.tsx:

import React from 'react';
import FormComponent from './FormComponent';

function App() {
  return (
    <div className="App">
      <FormComponent />
    </div>
  );
}

export default App;
Would you like this to use libraries like React Hook Form, Formik, or integrate with a backend?




Attach

Search

Study

Voice
No file chosenNo file chosen
ChatGPT can make mistakes. Check important info. See Cookie Preferences.

