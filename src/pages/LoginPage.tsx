import React from 'react'
import { Formik, Form, Field } from 'formik'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Connexion</h2>
      <Formik initialValues={{ username: '', password: '' }} onSubmit={(v) => console.log(v)}>
        <Form>
          <div className="mb-2">
            <label>Username</label>
            <Field name="username" className="w-full border p-2" />
          </div>
          <div className="mb-2">
            <label>Password</label>
            <Field name="password" type="password" className="w-full border p-2" />
          </div>
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        </Form>
      </Formik>
    </div>
  )
}
