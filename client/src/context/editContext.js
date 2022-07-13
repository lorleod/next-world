import { createContext, useState } from "react";
const editContext = createContext();

const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <editContext.Provider value={{ edit, toggleEdit }}>
      {children}
    </editContext.Provider>
  );
};

export default { EditProvider };
