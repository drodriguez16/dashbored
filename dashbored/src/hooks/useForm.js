import { useState } from 'react';

export function useForm(initState) {
  const [state, setState] = useState(initState);
  const handleChange = (e) => {

    if (e.target.value === "false" || e.target.value === "true") {
      const value = e.target.value === "false" ? true : false;
      setState({ ...state, [e.target.name]: value });
    }
    else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }
  const reset = (model) => {
    setState(model);
  }
  return [state, handleChange, reset]
}
export default useForm;