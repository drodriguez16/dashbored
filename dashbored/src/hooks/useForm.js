import { useState } from 'react';

export function useForm(initState) {
  const [state, setState] = useState(initState);
  const handleChange = (e) => {
    debugger;
    if (e.target.value === "false" || e.target.value === "true") {
      const value = e.target.value === "false" ? true : false;
      setState({ ...state, [e.target.name]: value });
    }
    else {
      debugger;
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }
  const reset = (model) => {
    setState(model);
  }
  const isNew = (isnew) => {
    setState({ ...state, isNew: isnew });
  }
  return [state, handleChange, reset, isNew]
}
export default useForm;