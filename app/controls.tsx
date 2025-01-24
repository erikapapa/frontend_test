import Select from "react-select";
import { User } from "./types/user";
import { useEffect, useState } from "react";

type ControlProps = {
  users: User[],
  getUsers: (users: User[]) => void
}

type SelectType = { 
  label: string, 
  value: string 
}

const Controls = ({users, getUsers} : ControlProps) => {
  const [dirValue, setDirValue] = useState<SelectType | null>({ label: "Ascending", value: "ascending" });
  const [fieldValue, setFieldValue] = useState<SelectType | null>({ label: "Name", value: "name" });

  const handleSort = () => {
    const list = users.sort((a, b) => {
      let val1 = "";
      let val2 = "";

      switch (fieldValue?.value) {
        case "name":
          val1 =  a.name.toLowerCase();
          val2 = b.name.toLowerCase(); 
          break;

        case "company":
          val1 =  a.company.name.toLowerCase();
          val2 = b.company.name.toLowerCase(); 
          break;
        case "email":
          val1 =  a.email.toLowerCase();
          val2 = b.email.toLowerCase(); 
          break;
      }

      if (val1 < val2) {
        return -1;
      }
      if (val1 > val2) {
        return 1;
      }
    
      return 0;
    });

    const sortedList = dirValue?.value === "descending" ? list.reverse() : list;
    getUsers(sortedList);
  }


  const getFieldChange = (selectedOption: SelectType | null) => {
    setFieldValue(selectedOption);
  }

  const getDirChange = (selectedOption: SelectType | null) => {
    setDirValue(selectedOption);
  }

  useEffect(() => {
    handleSort();
  }, [dirValue, fieldValue])


  const fieldOptions = [
    { label: "Name", value: "name" },
    { label: "Company", value: "company" },
    { label: "Email", value: "email" },
  ];
  const directionOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  return (
    <div className="gallery-controls controls">
      <div className="form-group group">
        <label htmlFor="sort-field" className="label">
          Sort Field
        </label>
        <Select
          onChange={(e) => getFieldChange(e)}
          options={fieldOptions}
          inputId="sort-field"
          className="input"
          value={fieldValue}
        />
      </div>
      <div className="form-group group">
        <label htmlFor="sort-direction" className="label">
          Sort Direction
        </label>
        <Select
          options={directionOptions}
          inputId="sort-direction"
          className="input"
          value={dirValue}
          onChange={(e) => getDirChange(e)}
        />
      </div>
    </div>
  );
};

export default Controls;
