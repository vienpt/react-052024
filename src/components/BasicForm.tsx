import { FormEvent, useState } from 'react'

type BasicFormProps = {
  email: string;
  password: string;
};

export default function BasicForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<BasicFormProps>({
    email: '',
    password: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // setErrors({ email: '', password: ''})
    //
    if (!email || !password) {
      setErrors({ email: 'Required', password: 'Required' })
    } else if (!email.includes('@')) {
      setErrors({ email: 'Invalid email', password: '' })
    } else if (password.length < 8) {
      setErrors({ email: '', password: 'Password min 8 length' })
    } else {
      setErrors({ email: '', password: '' })
      setTimeout(() => alert(`${email}has been submitted successfully.`), 1000)
    }
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={(e) => handleSubmit(e)}>
      <input
        name="email"
        placeholder="enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>}
      <input
        name="password"
        placeholder="enter your password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && (
        <span className="text-red-500">{errors.password}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  )
}
